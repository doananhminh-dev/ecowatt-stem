import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const apiKey = process.env.GROQ_API_KEY;

function buildLocalSuggestion(data: any) {
  const {
    devices = [],
    mode,
    days,
    billingMode,
    totalDay,
    totalPeriod,
    totalCost,
    warnings = [],
    savingGoal,
  } = data;

  if (!devices.length) {
    return "Vui lòng thêm thiết bị để hệ thống phân tích.";
  }

  const sorted = [...devices].sort((a, b) => {
    const aVal = ((a.power || 0) * (a.quantity || 0) * (a.hours || 0)) / 1000;
    const bVal = ((b.power || 0) * (b.quantity || 0) * (b.hours || 0)) / 1000;
    return bVal - aVal;
  });

  const top = sorted[0];
  const topEnergyPerDay = ((top.power || 0) * (top.quantity || 0) * (top.hours || 0)) / 1000;
  const topEnergyPeriod = topEnergyPerDay * days;

  const suggestions: string[] = [];

  suggestions.push("Nhận xét chung:");
  if (top.power >= 100000 || totalPeriod >= 10000) {
    suggestions.push(
      `- Dữ liệu hiện tại có dấu hiệu bất thường. Thiết bị ${top.name} có công suất hoặc mức tiêu thụ quá cao, bạn nên kiểm tra lại để tránh nhập sai số liệu.`
    );
  } else if (totalCost > 500000) {
    suggestions.push(
      `- Chi phí điện trong ${days} ngày đang ở mức khá cao, bạn nên ưu tiên tối ưu các thiết bị tiêu thụ lớn.`
    );
  } else {
    suggestions.push(
      `- Mức tiêu thụ điện hiện tại tương đối hợp lý, nhưng vẫn có thể tiết kiệm thêm.`
    );
  }

  suggestions.push("");
  suggestions.push("Thiết bị đáng chú ý nhất:");
  suggestions.push(
    `- ${top.name} là thiết bị tiêu thụ nhiều điện nhất, ước tính khoảng ${topEnergyPeriod.toFixed(
      2
    )} kWh trong ${days} ngày.`
  );

  suggestions.push("");
  suggestions.push("Gợi ý cụ thể:");

  if (top.name.toLowerCase().includes("quạt")) {
    suggestions.push("- Hãy thử giảm 1 giờ sử dụng quạt mỗi ngày để giảm điện năng tiêu thụ.");
  }

  if (top.name.toLowerCase().includes("đèn")) {
    suggestions.push("- Nên tận dụng ánh sáng tự nhiên và giảm số lượng đèn bật cùng lúc.");
    suggestions.push("- Có thể thay bằng đèn LED để giảm điện năng chiếu sáng.");
  }

  if (top.name.toLowerCase().includes("điều hòa")) {
    suggestions.push("- Điều hòa nên được đặt ở mức nhiệt hợp lý và tắt khi không cần thiết.");
  }

  if (top.name.toLowerCase().includes("máy chiếu")) {
    suggestions.push("- Máy chiếu cần được tắt ngay sau khi sử dụng để tránh hao điện không cần thiết.");
  }

  if (top.name.toLowerCase().includes("tủ lạnh")) {
    suggestions.push("- Tủ lạnh nên hạn chế mở quá lâu và cần chỉnh nhiệt độ phù hợp.");
  }

  suggestions.push("- Nên ưu tiên kiểm tra 3 thiết bị tiêu tốn điện nhiều nhất để giảm chi phí nhanh hơn.");

  if (savingGoal > 0) {
    const estimatedPricePerKwh =
      totalPeriod > 0 ? totalCost / totalPeriod : billingMode === "Đơn giá cố định" ? 3000 : 2500;
    const needReduce = savingGoal / estimatedPricePerKwh;

    suggestions.push(
      `- Để đạt mục tiêu tiết kiệm ${Number(savingGoal).toLocaleString(
        "vi-VN"
      )} ₫, bạn nên giảm khoảng ${needReduce.toFixed(1)} kWh trong ${days} ngày.`
    );
  }

  if (warnings.length > 0) {
    suggestions.push("");
    suggestions.push("Cảnh báo quan trọng:");
    warnings.slice(0, 3).forEach((w: string) => suggestions.push(`- ${w}`));
  }

  suggestions.push("");
  suggestions.push("Ưu tiên nên làm ngay:");
  suggestions.push(
    `- Kiểm tra thiết bị ${top.name}, giảm thời gian sử dụng hoặc thay bằng thiết bị tiết kiệm điện hơn nếu có thể.`
  );

  return suggestions.join("\n");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!apiKey) {
      return NextResponse.json({
        text: buildLocalSuggestion(body),
        source: "AI nội bộ",
      });
    }

    const {
      devices,
      mode,
      days,
      billingMode,
      totalDay,
      totalPeriod,
      totalCost,
      warnings,
      savingGoal,
      top3Devices,
    } = body;

    const groq = new Groq({ apiKey });

    const prompt = `
Bạn là trợ lý AI chuyên phân tích điện năng cho dự án STEM "EcoWatt".

Mục tiêu:
- Phân tích dữ liệu sử dụng điện thực tế của người dùng
- Đưa ra gợi ý THỰC TẾ, CỤ THỂ, KHÁC NHAU theo từng dữ liệu
- Không nói chung chung, không lặp máy móc
- Nếu phát hiện dữ liệu bất thường hoặc công suất quá lớn, phải cảnh báo rõ ràng
- Phù hợp cho học sinh, phụ huynh và người lớn tuổi nên phải dễ hiểu
- Trả lời hoàn toàn bằng tiếng Việt

Dữ liệu đầu vào:
- Chế độ sử dụng: ${mode}
- Số ngày tính toán: ${days}
- Chế độ tính tiền điện: ${billingMode}
- Tổng điện năng/ngày: ${totalDay} kWh
- Tổng điện năng trong kỳ: ${totalPeriod} kWh
- Chi phí điện trong kỳ: ${totalCost} VNĐ
- Mục tiêu tiết kiệm: ${savingGoal} VNĐ

Danh sách thiết bị:
${devices
  .map(
    (d: any, index: number) =>
      `${index + 1}. ${d.name} | Công suất: ${d.power}W | Số lượng: ${d.quantity} | Số giờ/ngày: ${d.hours}`
  )
  .join("\n")}

Top 3 thiết bị tiêu tốn điện:
${top3Devices
  .map(
    (d: any, index: number) =>
      `${index + 1}. ${d.name} | Công suất: ${d.power}W | Số lượng: ${d.quantity} | Giờ/ngày: ${d.hours}`
  )
  .join("\n")}

Cảnh báo hiện tại:
${warnings.join("\n")}

Yêu cầu trả lời:
1. Viết hoàn toàn bằng tiếng Việt
2. Không dùng lời khuyên sáo rỗng
3. Có các phần:
   - Nhận xét chung
   - Thiết bị đáng chú ý nhất
   - Gợi ý cụ thể
   - Ưu tiên nên làm ngay
4. Nếu dữ liệu phi lý, phải nói rõ là bất thường và khuyên kiểm tra lại
5. Trình bày rõ ràng, xuống dòng đẹp
`;

    try {
      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "Bạn là trợ lý AI cho website EcoWatt, chuyên phân tích điện năng và đưa ra gợi ý tiết kiệm điện thực tế bằng tiếng Việt.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      });

      const text =
        completion.choices?.[0]?.message?.content?.trim() ||
        buildLocalSuggestion(body);

      return NextResponse.json({
        text,
        source: "Groq",
      });
    } catch (error) {
      console.error("Lỗi Groq:", error);

      return NextResponse.json({
        text: buildLocalSuggestion(body),
        source: "AI nội bộ",
      });
    }
  } catch (error) {
    console.error("Lỗi route Groq:", error);

    return NextResponse.json({
      text: "Không thể phân tích dữ liệu lúc này.",
      source: "AI nội bộ",
    });
  }
}