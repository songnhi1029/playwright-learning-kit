# Ví dụ 1: Quy trình làm việc với Agent Trợ lý Code

Ở cấp độ này, bạn không cần viết code phức tạp. Thay vào đó, bạn sử dụng một AI Agent (như Gemini, Copilot, ChatGPT) như một người đồng nghiệp lập trình cùng bạn.

Quy trình làm việc rất đơn giản: **Hỏi -> Nhận code -> Tinh chỉnh và sử dụng.**

### Kịch bản 1: Tạo một locator phức tạp

- **Tình huống:** Bạn cần tìm một thẻ `<li>` chứa một sản phẩm tên là "Awesome T-Shirt" và trong đó phải có một nút "Add to Cart".
- **Prompt bạn hỏi agent:**
  > "Trong Playwright, làm thế nào để viết một locator cho một thẻ `li` chứa đoạn text 'Awesome T-Shirt' và cũng chứa một button có text là 'Add to Cart'?"

- **Kết quả agent có thể trả về:**
  ```typescript
  const productLocator = page.locator('li', { hasText: 'Awesome T-Shirt' })
                            .filter({ has: page.getByRole('button', { name: 'Add to Cart' }) });
  ```

### Kịch bản 2: Viết một test case nhỏ

- **Tình huống:** Bạn muốn viết một test để kiểm tra chức năng tìm kiếm.
- **Prompt bạn hỏi agent:**
  > "Viết một test case Playwright hoàn chỉnh có tên 'should find product'. Test này sẽ:
  > 1. Truy cập trang '/search'.
  > 2. Điền từ 'Laptop' vào input có placeholder là 'Search for products...'.
  > 3. Click vào button có chữ 'Search'.
  > 4. Kiểm tra rằng một heading có nội dung 'Results for "Laptop"' xuất hiện trên trang."

- **Kết quả agent có thể trả về:**
  ```typescript
  import { test, expect } from '@playwright/test';

  test('should find product', async ({ page }) => {
    await page.goto('/search');
    await page.getByPlaceholder('Search for products...').fill('Laptop');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByRole('heading', { name: 'Results for "Laptop"' })).toBeVisible();
  });
  ```

### Lời khuyên

- **Càng chi tiết càng tốt:** Prompt của bạn càng rõ ràng, agent trả về code càng chính xác.
- **Cung cấp ngữ cảnh:** Nếu bạn đang dùng Page Object Model, bạn có thể hỏi: "Trong class `SearchPage` của tôi, hãy thêm một phương thức `searchForProduct(productName: string)` để thực hiện việc tìm kiếm."
- **Luôn kiểm tra lại:** Coi code của agent như một bản nháp. Luôn đọc lại, hiểu và có thể cần chỉnh sửa nhỏ trước khi dùng.
