# Bài 3: Giai đoạn 1 - Nền tảng Playwright

Trước khi có thể ra lệnh cho một "phi công phụ" (AI Agent), chính bạn phải là một "phi công chính" tài ba. Giai đoạn này tập trung vào việc giúp bạn làm chủ Playwright.

**Mục tiêu:** Thành thạo các kỹ năng cốt lõi của Playwright để có thể tự viết, quản lý và gỡ lỗi các test case phức tạp.

Đây là các kỹ năng bạn cần tập trung, dựa trên các tài liệu có sẵn trong dự án:

1.  **Cài đặt và Cấu trúc:**
    *   Hiểu cách cài đặt Playwright và cấu trúc của một dự án test.
    *   *Tài liệu tham khảo:* `playwright-tutorial/01-setup.md`

2.  **Viết Test Cơ bản:**
    *   Học cú pháp viết test, sử dụng `test`, `expect`.
    *   *Tài liệu tham khảo:* `playwright-tutorial/02-basic-tests.md`

3.  **Locators - Trái tim của Playwright:**
    *   Thành thạo các cách chọn phần tử trên trang (locators) như `getByRole`, `getByText`, `getByLabel`. Đây là kỹ năng quan trọng nhất để giao tiếp với trang web.
    *   *Tài liệu tham khảo:* `playwright-tutorial/03-locators.md`, `playwright-advanced-tutorial/mastering-getbyrole-heading.md`

4.  **Actions và Assertions:**
    *   Thực hiện các hành động người dùng (click, fill, press) và kiểm tra kết quả (assertions) để xác minh hành vi của ứng dụng.
    *   *Tài liệu tham khảo:* `playwright-tutorial/04-actions.md`, `playwright-tutorial/05-assertions.md`

5.  **Page Object Model (POM):**
    *   Học cách cấu trúc code theo pattern POM. Đây là một kỹ thuật cực kỳ quan trọng giúp code của bạn dễ bảo trì, tái sử dụng và là nền tảng vững chắc để agent có thể tạo ra code chất lượng sau này.
    *   *Tài liệu tham khảo:* `playwright-advanced-tutorial/11-page-object-model.md`, `tests/pages/`

6.  **Các chủ đề nâng cao:**
    *   Nắm vững các kỹ thuật phức tạp hơn như xử lý đăng nhập (Authentication), Test API, Debugging và phân tích Trace để tìm lỗi.
    *   *Tài liệu tham khảo:* `playwright-advanced-tutorial/08-authentication.md`, `09-api-testing.md`, `10-trace-viewer.md`

**Bài tập:** Hãy đảm bảo bạn đã đọc và thực hành tất cả các bài học trong thư mục `playwright-tutorial` và `playwright-advanced-tutorial` trước khi chuyển sang giai đoạn tiếp theo.
