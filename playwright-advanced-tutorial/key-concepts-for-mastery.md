# Các từ khóa và khái niệm để trở thành chuyên gia Playwright

Để trở nên "mạnh hơn" với Playwright, bạn cần nắm vững không chỉ các lệnh, mà cả các **khái niệm (concepts)** và **thuật ngữ (keywords)**. Việc hiểu các từ khóa này sẽ giúp bạn tìm kiếm thông tin hiệu quả hơn, đọc hiểu tài liệu chuyên sâu, và suy nghĩ như một chuyên gia về kiểm thử tự động.

---

### I. Các khái niệm cốt lõi của Playwright

Đây là những nền tảng làm nên sự khác biệt của Playwright.

1.  **Web-First Assertions (Xác nhận Web-First):**
    *   **Từ khóa:** `expect(locator).toBeVisible()`, `expect(page).toHaveURL()`
    *   **Ý nghĩa:** Đây là triết lý cốt lõi của Playwright. Thay vì kiểm tra một giá trị ngay lập tức, các xác nhận này sẽ tự động chờ đợi cho đến khi điều kiện mong muốn được đáp ứng (hoặc hết thời gian chờ). Đây là chìa khóa để viết các bài kiểm tra ổn định.

2.  **Auto-waiting (Tự động chờ):**
    *   **Ý nghĩa:** Playwright sẽ không thực hiện một hành động (như `.click()`) cho đến khi phần tử đó thực sự sẵn sàng để được nhấp (hiển thị, không bị che khuất, không có hoạt ảnh). Bạn không cần phải viết các lệnh chờ đợi thủ công.

3.  **Locators vs. Selectors (Bộ định vị vs. Bộ chọn):**
    *   **Ý nghĩa:** Hiểu rằng một `selector` (như `'#my-id'`) chỉ là một chuỗi văn bản, trong khi một `Locator` (tạo bởi `page.locator()`) là một đối tượng động, biết cách tự tìm lại mình trên trang. Luôn làm việc với `Locator`.

4.  **Browser Context (Ngữ cảnh trình duyệt):**
    *   **Ý nghĩa:** Đây là một môi trường duyệt web độc lập, giống như một cửa sổ ẩn danh hoàn toàn mới. Mỗi tệp kiểm tra được chạy trong một ngữ cảnh riêng, đảm bảo sự cô lập tuyệt đối (không chia sẻ cookies, local storage).

5.  **Trace Viewer (Trình xem dấu vết):**
    *   **Ý nghĩa:** Không chỉ là một công cụ, mà là khái niệm về "gỡ lỗi sau khi xảy ra sự cố" (post-mortem debugging). Khả năng xem lại toàn bộ quá trình thực thi, bao gồm cả trạng thái DOM và các yêu cầu mạng, là một công cụ cực kỳ mạnh mẽ.

---

### II. Thiết kế & Kiến trúc Kiểm thử

Đây là những khái niệm giúp bạn xây dựng một bộ kiểm thử lớn, dễ bảo trì.

6.  **Page Object Model (POM):**
    *   **Ý nghĩa:** Mẫu thiết kế quan trọng nhất trong kiểm thử UI. Nó giúp tách logic của bài kiểm tra ra khỏi chi tiết triển khai của giao diện người dùng, làm cho mã của bạn dễ đọc và dễ bảo trì hơn.

7.  **Test Data Management (Quản lý dữ liệu kiểm thử):**
    *   **Ý nghĩa:** Các chiến lược để tạo, cung cấp và dọn dẹp dữ liệu cho các bài kiểm tra của bạn. Các từ khóa liên quan: `API seeding`, `database snapshots`, `data factories`.

8.  **Test Pyramid (Kim tự tháp Kiểm thử):**
    *   **Ý nghĩa:** Một khái niệm chiến lược nói rằng bạn nên có nhiều unit test, ít integration test hơn, và ít E2E test nhất. Hiểu điều này giúp bạn quyết định *cái gì* nên được tự động hóa bằng Playwright (chỉ các luồng quan trọng).

9.  **Data-Driven Testing (Kiểm thử hướng dữ liệu):**
    *   **Ý nghĩa:** Chạy cùng một kịch bản kiểm thử với nhiều bộ dữ liệu đầu vào khác nhau để kiểm tra các trường hợp khác nhau một cách hiệu quả.

---

### III. CI/CD & DevOps

Đây là những khái niệm để tích hợp các bài kiểm tra của bạn vào quy trình phát triển.

10. **Continuous Integration (CI - Tích hợp liên tục):**
    *   **Ý nghĩa:** Thực hành tự động chạy các bài kiểm tra mỗi khi có một thay đổi trong mã nguồn được đẩy lên.

11. **Parallelization & Sharding (Song song hóa & Phân mảnh):**
    *   **Ý nghĩa:** Các kỹ thuật để chạy các bài kiểm tra đồng thời (trên một hoặc nhiều máy) nhằm giảm đáng kể thời gian chạy.

12. **Reporters (Trình báo cáo):**
    *   **Ý nghĩa:** Các công cụ để tạo ra các báo cáo kết quả kiểm thử dưới các định dạng khác nhau (HTML, JUnit, JSON) để phân tích và tích hợp với các dashboard CI.

---

### IV. Gỡ lỗi & Phân tích Nâng cao

Đây là những kỹ thuật dành cho các chuyên gia.

13. **Flakiness (Tính không ổn định):**
    *   **Ý nghĩa:** Thuật ngữ dùng để chỉ các bài kiểm tra lúc thành công, lúc thất bại. Biết tên của nó là bước đầu tiên để chống lại nó.

14. **Network Mocking (Giả lập mạng):**
    *   **Từ khóa:** `page.route()`, `route.fulfill()`
    *   **Ý nghĩa:** Chặn các yêu cầu mạng và trả về các phản hồi giả để kiểm tra các trường hợp ngoại lệ (ví dụ: lỗi API) hoặc để cô lập hoàn toàn frontend khỏi backend.

15. **Visual Regression Testing (Kiểm thử hồi quy hình ảnh):**
    *   **Từ khóa:** `toHaveScreenshot`
    *   **Ý nghĩa:** So sánh ảnh chụp màn hình của các thành phần UI với một phiên bản "chuẩn" đã được phê duyệt để phát hiện các thay đổi không mong muốn về giao diện.

---

Việc nắm vững và có thể thảo luận về các khái niệm này sẽ không chỉ giúp bạn viết các bài kiểm tra tốt hơn mà còn nâng cao vị thế của bạn như một chuyên gia về kiểm thử tự động.