const { test, expect } = require('@playwright/test');

// --- PHẦN MÔ PHỎNG AI AGENT ---
async function callHealingAgent(failedLocator, dom) {
  console.log(`
--- [AGENT] Kích hoạt Agent Tự sửa lỗi cho locator: ${failedLocator} ---`);

  // Trong thực tế, bạn sẽ gửi `failedLocator` và `dom` đến API của LLM.
  const prompt = `
    Một test Playwright đã thất bại vì không tìm thấy locator: "${failedLocator}".
    Đây là toàn bộ DOM của trang tại thời điểm xảy ra lỗi:
    ${dom.substring(0, 2000)}...

    Dựa trên locator gốc và nội dung DOM, hãy tìm một locator mới, bền vững hơn (ưu tiên getByRole) để thay thế.
    Chỉ trả về locator mới.
  `;

  console.log("[AGENT] Đang phân tích DOM và tìm locator thay thế...");
  // console.log("[AGENT] Gửi prompt đến LLM:", prompt); // Bỏ comment để xem prompt

  // Mô phỏng LLM trả về một locator mới, bền vững hơn.
  const suggestedLocator = "page.getByRole('button', { name: 'Sign In' })";
  console.log(`[AGENT] Đã tìm thấy locator đề xuất: ${suggestedLocator}`);

  return suggestedLocator;
}

// --- PHẦN MÔ PHỎNG TEST RUNNER ---
async function runTestWithHealing(page, testLogic) {
  try {
    // Chạy logic test bình thường
    await testLogic(page);
    console.log("\n[RUNNER] Test thành công ở lần chạy đầu tiên!");
  } catch (error) {
    // Chỉ kích hoạt self-healing nếu lỗi là do không tìm thấy locator
    if (error.name === 'TimeoutError') {
      console.log(`
[RUNNER] Test thất bại với lỗi Timeout. Bắt đầu quy trình tự sửa lỗi...`);
      
      // 1. Lấy DOM của trang tại thời điểm lỗi
      const dom = await page.content();

      // 2. Trích xuất locator bị lỗi từ thông báo lỗi (đây là phần mô phỏng)
      const failedLocator = "page.getByTestId('login-button')"; // Giả sử ta trích xuất được locator này

      // 3. Gọi agent để tìm locator mới
      const newLocator = await callHealingAgent(failedLocator, dom);

      // 4. Thử chạy lại test với locator mới
      console.log(`[RUNNER] Thử chạy lại test với locator mới: ${newLocator}`);
      try {
        // Trong một kịch bản thực tế, bạn sẽ cần một cách để thay thế locator trong `testLogic`
        // Ở đây chúng ta mô phỏng bằng cách chạy lại một hành động cụ thể
        await page.getByRole('button', { name: 'Sign In' }).click(); // Dùng locator mà agent đề xuất
        await expect(page).toHaveURL('/dashboard');
        console.log("[RUNNER] Test đã thành công sau khi tự sửa lỗi!");

      } catch (retryError) {
        console.error("[RUNNER] Test vẫn thất bại sau khi thử sửa lỗi.", retryError.message);
        throw retryError; // Ném lỗi cuối cùng
      }

    } else {
      // Nếu là lỗi khác (ví dụ: assertion sai), thì ném lỗi ra ngoài
      console.error("Test thất bại với lỗi không phải Timeout:", error.message);
      throw error;
    }
  }
}

// --- ĐỊNH NGHĨA VÀ CHẠY TEST ---
test.describe('Self-Healing Demo', () => {
  test('should log in successfully, potentially with self-healing', async ({ page }) => {
    
    // Logic test gốc (với locator có thể bị lỗi)
    const originalTestLogic = async (p) => {
      await p.goto('/login');
      await p.getByLabel('Email').fill('user@example.com');
      await p.getByLabel('Password').fill('password123');
      // Dòng này sẽ gây ra lỗi Timeout vì locator không tồn tại
      await p.getByTestId('login-button').click({ timeout: 2000 }); 
      await expect(p).toHaveURL('/dashboard');
    };

    // Chạy test thông qua runner có khả năng tự sửa lỗi
    await runTestWithHealing(page, originalTestLogic);
  });
});
