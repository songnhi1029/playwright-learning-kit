# Các vấn đề thực tế khi sử dụng Playwright và cách đối phó

Lý thuyết và các ví dụ đơn giản là một chuyện, nhưng khi áp dụng vào một dự án thực tế, bạn sẽ gặp phải những thách thức phức tạp hơn. Dưới đây là những vấn đề phổ biến nhất và các chiến lược để giải quyết chúng.

---

### Vấn đề 1: Flaky Tests - Kẻ thù số một của CI/CD

*   **Mô tả:** "Flaky test" là một bài kiểm tra lúc chạy thì thành công, lúc chạy thì thất bại mà không có bất kỳ thay đổi nào trong mã nguồn. Chúng phá hủy niềm tin vào bộ kiểm thử và làm chậm quy trình phát triển.

*   **Nguyên nhân phổ biến:**
    1.  **Vấn đề về thời gian (Timing):** Bạn sử dụng các lệnh chờ đợi cố định (`page.waitForTimeout()`). Đây là một thói quen rất xấu.
    2.  **Race Conditions:** Giao diện người dùng thay đổi trong khi bài kiểm tra đang chạy (ví dụ: một tiến trình nền cập nhật DOM, một thông báo bật lên bất ngờ).
    3.  **Dữ liệu không ổn định:** Các bài kiểm tra chạy song song và cùng sửa đổi một loại dữ liệu, gây ảnh hưởng lẫn nhau.
    4.  **Animations:** Cố gắng nhấp vào một nút trong khi nó vẫn đang trong quá trình chuyển động hoặc mờ dần.

*   **Giải pháp & Phương pháp hay nhất:**
    *   **Không bao giờ dùng `waitForTimeout` để chờ đợi một phần tử.** Hãy để Playwright tự động chờ bằng cách sử dụng các xác nhận web-first: `await expect(locator).toBeVisible();`.
    *   **Cô lập dữ liệu kiểm thử:** Cách tốt nhất là sử dụng API để tạo dữ liệu mới cho *mỗi bài kiểm tra* trong hook `beforeEach`. Điều này đảm bảo mỗi bài kiểm tra chạy trên một môi trường dữ liệu sạch.
    *   **Sử dụng Trace Viewer:** So sánh dấu vết của một lần chạy thành công và một lần thất bại. Điều này thường cho thấy các vấn đề về thời gian hoặc các yêu cầu mạng bất thường.
    *   **Sử dụng `--retries` trong CI:** Cấu hình Playwright để tự động chạy lại các bài kiểm tra thất bại 1 hoặc 2 lần trong môi trường CI. Đây là một "miếng băng dán" hữu ích, nhưng bạn vẫn phải tìm và sửa nguyên nhân gốc rễ của sự không ổn định.

---

### Vấn đề 2: Quản lý Dữ liệu Kiểm thử là một bài toán khó

*   **Mô tả:** Làm thế nào để đảm bảo mỗi bài kiểm tra có đúng dữ liệu nó cần để chạy, đặc biệt là khi chạy song song? Làm thế nào để dọn dẹp sau đó?

*   **Các phương pháp và sự đánh đổi:**
    1.  **Tạo dữ liệu qua UI:** Chậm, không ổn định và phức tạp. **Nên tránh**.
    2.  **Seed cơ sở dữ liệu trước khi chạy (`globalSetup`):** Tốt cho các dữ liệu chỉ đọc. Nhưng nếu các bài kiểm tra sửa đổi dữ liệu này, chúng sẽ ảnh hưởng lẫn nhau.
    3.  **Tạo dữ liệu qua API trong `beforeEach`:** **Đây là phương pháp được khuyến nghị nhiều nhất.** Nó nhanh, đáng tin cậy và cô lập hoàn toàn các bài kiểm tra. Nhược điểm là nó đòi hỏi một API ổn định và một số công sức để viết mã thiết lập.
    4.  **Khôi phục một "snapshot" cơ sở dữ liệu sạch:** Rất mạnh mẽ nhưng phức tạp, đòi hỏi các công cụ ở cấp độ cơ sở hạ tầng (ví dụ: Docker, ZFS).

---

### Vấn đề 3: Quản lý Trạng thái Đăng nhập cho nhiều vai trò người dùng

*   **Mô tả:** Phương pháp "đăng nhập một lần, lưu trạng thái" rất tuyệt. Nhưng nếu ứng dụng của bạn có nhiều vai trò (ví dụ: Admin, User, Guest) và bạn cần kiểm tra tất cả chúng thì sao?

*   **Giải pháp:** Tạo nhiều tệp thiết lập và nhiều tệp trạng thái đăng nhập, sau đó sử dụng các "project" khác nhau trong `playwright.config.ts`.
    1.  Tạo `admin.setup.ts` -> lưu ra `admin-auth.json`.
    2.  Tạo `user.setup.ts` -> lưu ra `user-auth.json`.
    3.  Trong `playwright.config.ts`, tạo các project tương ứng:
        ```typescript
        projects: [
          // Project để chạy các setup
          { name: 'setup-admin', testMatch: /admin\.setup\.ts/ },
          { name: 'setup-user', testMatch: /user\.setup\.ts/ },

          // Project cho các bài kiểm tra của Admin
          {
            name: 'admin-tests',
            testDir: './tests/admin',
            dependencies: ['setup-admin'],
            use: { storageState: 'admin-auth.json' },
          },

          // Project cho các bài kiểm tra của User
          {
            name: 'user-tests',
            testDir: './tests/user',
            dependencies: ['setup-user'],
            use: { storageState: 'user-auth.json' },
          },
        ],
        ```
    Bây giờ bạn có thể chạy kiểm thử cho một vai trò cụ thể: `npx playwright test --project=admin-tests`.

---

### Vấn đề 4: Kiểm thử End-to-End (E2E) rất chậm

*   **Mô tả:** Dù tối ưu đến đâu, một bộ kiểm thử E2E lớn vẫn sẽ chậm hơn nhiều so với unit test hay integration test. Vậy chúng ta nên kiểm thử những gì?

*   **Chiến lược (Kim tự tháp Kiểm thử):**
    *   **Không dùng E2E để kiểm tra mọi thứ:** Đừng viết một bài kiểm tra E2E để xác thực 20 quy tắc trên một biểu mẫu. Đó là công việc của unit test.
    *   **Tập trung vào các luồng người dùng quan trọng:** Sử dụng E2E để xác minh các "hành trình" quan trọng của người dùng. Ví dụ: "Người dùng có thể đăng ký, thêm sản phẩm vào giỏ hàng, và thanh toán thành công không?"
    *   **Kết hợp E2E và API test:** Sử dụng API test để kiểm tra tất cả các trường hợp ngoại lệ, các quy tắc logic phức tạp của backend. Sử dụng E2E test để đảm bảo giao diện người dùng được "kết nối" đúng cách với backend.

---

### Vấn đề 5: Làm sao để các Bộ định vị (Locators) dễ bảo trì?

*   **Mô tả:** Giao diện người dùng thay đổi (ví dụ: đổi tên class CSS, thay đổi văn bản), và hàng loạt bài kiểm tra bị thất bại.

*   **Giải pháp:**
    1.  **Page Object Model (POM):** Tập trung tất cả các bộ định vị vào một nơi duy nhất. Khi UI thay đổi, bạn chỉ cần cập nhật ở một tệp.
    2.  **Thỏa thuận với đội ngũ phát triển:** Đây là một phương pháp cực kỳ hiệu quả trong các đội ngũ chuyên nghiệp. Hãy khuyến khích (hoặc yêu cầu) các lập trình viên frontend thêm các thuộc tính ổn định, dành riêng cho việc kiểm thử vào các phần tử quan trọng. Thuộc tính phổ biến nhất là `data-testid`.
        *   **Ví dụ:** Thay vì `page.locator('.btn-primary.btn-large')`, bạn sẽ viết `page.getByTestId('submit-login-button')`.
        *   `data-testid` được coi như một "API" cho việc kiểm thử, nó không bị ảnh hưởng bởi các thay đổi về style hay văn bản.
