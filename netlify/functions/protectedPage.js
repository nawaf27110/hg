// netlify/functions/protectedPage.js
const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
  // 1) نجلب الكود والإيميل من الـ Query String:
  const params = event.queryStringParameters;
  const code = (params.code || "").trim();
  const email = (params.email || "").trim().toLowerCase();

  // 2) تحقق كما تريد: يمكنك بدلاً من المقارنة الثابتة جلب بيانات
  //    من Google Sheets أو Airtable أو أي مصدر، ثم قرر قبول أو رفض.
  //    هنا مثال بسيط بمقارنة ثابتة:
  if (code !== "MYCODE" || email !== "test@example.com") {
    // الكود/الإيميل غير مطابق
    return {
      statusCode: 302,
      headers: {
        Location: "/check.html" // إعادة توجيه
      },
      body: ""
    };
  }

  // إذا وصلنا هنا فالكود صحيح. نقرأ الملف HTML المحمي:
  const filePath = path.join(__dirname, "indexProtected.html");
  let htmlContent;
  try {
    htmlContent = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    return {
      statusCode: 500,
      body: "Error reading protected HTML file."
    };
  }

  // نعيد الملف بنجاح
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8"
    },
    body: htmlContent
  };
};
