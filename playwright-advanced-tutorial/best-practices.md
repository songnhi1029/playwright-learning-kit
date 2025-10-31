# Các phương pháp hay nhất (Best Practices) với Playwright

Đây là bản tóm tắt các phương pháp, quy tắc và lời khuyên quan trọng nhất để viết các bài kiểm thử tự động chất lượng cao, dễ bảo trì và đáng tin cậy với Playwright.

---

### I. Viết và Cấu trúc Kiểm thử

1.  **Giữ các bài kiểm tra ngắn và tập trung:** Mỗi bài kiểm tra chỉ nên xác minh một hành vi hoặc một luồng logic duy nhất. Tránh các bài kiểm tra dài, phức tạp thực hiện nhiều việc khác nhau.

2.  **Sử dụng Page Object Model (POM):** Đây là phương pháp quan trọng nhất để đảm bảo khả năng bảo trì. Tập trung tất cả các bộ định vị (locators) và các phương thức tương tác vào các lớp Page Object riêng biệt.

3.  **Sử dụng Hooks cho việc thiết lập và dọn dẹp:** Sử dụng `beforeEach` và `afterEach` để xử lý các hành động lặp đi lặp lại như điều hướng đến một trang hoặc đăng nhập. Sử dụng `beforeAll` và `afterAll` cho các thiết lập tốn kém chỉ cần chạy một lần.

4.  **Nhóm các bài kiểm tra liên quan:** Sử dụng `test.describe()` để nhóm các bài kiểm tra có cùng một bối cảnh hoặc tính năng. Điều này giúp tổ chức bộ kiểm thử của bạn một cách logic.

5.  **Viết tiêu đề kiểm thử có tính mô tả:** Tiêu đề nên mô tả rõ ràng kịch bản và kết quả mong đợi (ví dụ: `test('should display an error when logging in with invalid credentials', ...)`).

---

### II. Bộ định vị (Locators)

6.  **Ưu tiên các bộ định vị hướng tới người dùng:** Luôn cố gắng sử dụng `getByRole`, `getByText`, `getByLabel`, `getByPlaceholder` trước tiên. Chúng có khả năng chống lại các thay đổi về cấu trúc HTML và phản ánh cách người dùng thực sự tương tác với trang.

7.  **Tránh các bộ chọn "giòn" (Brittle Selectors):** Tránh các bộ chọn CSS hoặc XPath dài, phức tạp, phụ thuộc vào cấu trúc lồng nhau của DOM. Chúng rất dễ bị hỏng khi giao diện người dùng thay đổi.

8.  **Sử dụng `data-testid` cho các phần tử khó:** Hãy làm việc với đội ngũ phát triển để thêm các thuộc tính `data-testid` vào các phần tử khó tìm hoặc không có văn bản/nhãn rõ ràng. Đây là cách tạo ra một "API kiểm thử" ổn định cho giao diện người dùng.

---

### III. Quản lý Dữ liệu

9.  **Cô lập dữ liệu kiểm thử:** Mỗi bài kiểm tra phải hoàn toàn độc lập và không được phụ thuộc vào trạng thái do một bài kiểm tra khác để lại. Điều này đặc biệt quan trọng khi chạy kiểm thử song song.

10. **Sử dụng API để quản lý trạng thái:** Ưu tiên việc tạo và dọn dẹp dữ liệu thông qua các lệnh gọi API (`request`) thay vì thực hiện qua giao diện người dùng. Nó nhanh hơn và đáng tin cậy hơn rất nhiều.

---

### IV. Hiệu suất và Độ tin cậy

11. **Không bao giờ sử dụng `page.waitForTimeout()`:** Đây được coi là một "anti-pattern". Hãy luôn dựa vào cơ chế tự động chờ của Playwright và các xác nhận web-first (`expect(locator).toBe...`).

12. **Chạy kiểm thử song song:** Tận dụng khả năng thực thi song song được tích hợp sẵn của Playwright để tăng tốc đáng kể bộ kiểm thử của bạn.

13. **Sử dụng CI/CD:** Tự động chạy các bài kiểm tra của bạn trên mỗi thay đổi mã nguồn để phát hiện các lỗi hồi quy (regressions) càng sớm càng tốt.

14. **Xử lý ngay các bài kiểm tra không ổn định (Flaky Tests):** Một bài kiểm tra không ổn định cũng tệ như một bài kiểm tra thất bại. Hãy điều tra và sửa chữa nguyên nhân gốc rễ thay vì bỏ qua hoặc chạy lại một cách mù quáng.

---

### V. Dự án và Quy trình làm việc

15. **Sử dụng Linter và Formatter:** Thực thi một phong cách mã hóa nhất quán trong toàn bộ dự án với các công cụ như ESLint và Prettier.

16. **Tận dụng tối đa Trace Viewer:** Sử dụng nó như công cụ gỡ lỗi chính của bạn. Phân tích các dấu vết để hiểu chính xác những gì đã xảy ra trong quá trình thực thi.

17. **Tuân theo Kim tự tháp Kiểm thử:** Cân bằng số lượng các bài kiểm tra E2E của bạn với một số lượng lớn hơn các bài kiểm tra đơn vị (unit test) và tích hợp (integration test). Đừng cố gắng kiểm tra mọi thứ bằng Playwright.

18. **Luôn cập nhật các công cụ:** Thường xuyên cập nhật phiên bản Playwright và các gói phụ thuộc khác để nhận được các tính năng mới nhất, các bản sửa lỗi và cải tiến về hiệu suất.
