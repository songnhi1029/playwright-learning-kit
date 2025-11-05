const fs = require('fs');

// --- PHẦN MÔ PHỎNG AI AGENT ---
// Trong thực tế, bạn sẽ gọi API của một LLM (ví dụ: Gemini API)
async function callAIAgent(prompt) {
  console.log('--- Agent nhận được yêu cầu ---\n', prompt);

  // Mô phỏng LLM phân tích prompt và trả về code Playwright
  const generatedCode = `
import { test, expect } from '@playwright/test';

test('should allow a user to log in successfully', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page).toHaveURL('/dashboard');
});
`;

  console.log('--- Agent đã tạo xong code ---\n');
  return generatedCode;
}

// --- QUY TRÌNH CHÍNH ---
async function main() {
  try {
    // 1. Đọc test case viết bằng ngôn ngữ tự nhiên
    const testCaseDescription = fs.readFileSync('test-case.txt', 'utf-8');
    console.log('Đã đọc xong file test case.');

    // 2. Tạo một prompt chi tiết cho agent
    const prompt = `
      Vui lòng chuyển đổi mô tả test case sau đây thành một file test Playwright hoàn chỉnh.
      Sử dụng các locator của Playwright như getByRole, getByLabel.
      
      Mô tả:
      ${testCaseDescription}
    `;

    // 3. Gọi agent để sinh code
    const playwrightCode = await callAIAgent(prompt);

    // 4. Ghi code đã tạo vào một file .spec.ts
    const outputFilename = 'generated-login.spec.ts';
    fs.writeFileSync(outputFilename, playwrightCode.trim());
    console.log(`Thành công! Đã tạo file test tại: ${outputFilename}`);

  } catch (error) {
    console.error('Đã có lỗi xảy ra:', error);
  }
}

main();
