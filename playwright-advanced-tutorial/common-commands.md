# Bảng tra cứu các lệnh thường dùng

Đây là danh sách các lệnh bạn sẽ sử dụng hàng ngày khi làm việc với Playwright, Git và NPM.

---

### Lệnh Playwright CLI

Đây là những lệnh cốt lõi để chạy và gỡ lỗi các bài kiểm tra của bạn.

*   **Chạy tất cả các bài kiểm tra:**
    ```bash
    npx playwright test
    ```

*   **Chạy một tệp cụ thể:**
    ```bash
    npx playwright test tests/ten-file.spec.ts
    ```

*   **Chạy một bài kiểm tra theo tên:** (Sử dụng cờ `-g` cho "grep")
    ```bash
    npx playwright test -g "Tên bài kiểm tra của tôi"
    ```

*   **Chạy ở chế độ có giao diện (headed mode):** (Để xem trình duyệt thực hiện các hành động)
    ```bash
    npx playwright test --headed
    ```

*   **Chạy trên một trình duyệt cụ thể:**
    ```bash
    npx playwright test --project=chromium
    ```

*   **Chạy với số lượng worker song song cụ thể:**
    ```bash
    npx playwright test --workers=4
    ```

*   **Dừng sau một số lần thất bại nhất định:**
    ```bash
    npx playwright test --max-failures=1
    ```

*   **Thử lại các bài kiểm tra thất bại:**
    ```bash
    npx playwright test --retries=2
    ```

*   **Cập nhật ảnh chụp màn hình (snapshots) cho kiểm thử hình ảnh:**
    ```bash
    npx playwright test --update-snapshots
    ```

*   **Mở chế độ Playwright UI (giao diện người dùng tương tác):**
    ```bash
    npx playwright test --ui
    ```

*   **Mở báo cáo HTML:** (Chạy sau khi các bài kiểm tra đã hoàn thành)
    ```bash
    npx playwright show-report
    ```

*   **Mở Trace Viewer:**
    ```bash
    npx playwright show-trace <đường_dẫn_đến_tệp_trace.zip>
    ```

*   **Khởi động Codegen:** (Để ghi lại hành động và tạo mã)
    ```bash
    npx playwright codegen https://trang-web-cua-ban.com
    ```

*   **Chạy ở chế độ gỡ lỗi:**
    ```bash
    PWDEBUG=1 npx playwright test
    ```

*   **Cài đặt các trình duyệt Playwright:**
    ```bash
    npx playwright install
    # Hoặc cài đặt một trình duyệt cụ thể:
    npx playwright install chromium
    # Hoặc cài đặt trình duyệt và các phụ thuộc hệ thống:
    npx playwright install --with-deps
    ```

*   **Gỡ cài đặt các trình duyệt Playwright:**
    ```bash
    npx playwright uninstall
    ```

*   **Mở một URL trong trình duyệt Playwright:**
    ```bash
    npx playwright open https://example.com
    ```

*   **Chụp ảnh màn hình của một URL:**
    ```bash
    npx playwright screenshot https://example.com screenshot.png
    ```

*   **Tạo tệp PDF từ một URL:**
    ```bash
    npx playwright pdf https://example.com output.pdf
    ```

---

### Lệnh NPM (Node Package Manager)

Đây là những lệnh để quản lý các gói và chạy các kịch bản của dự án.

*   **Cài đặt tất cả các gói phụ thuộc:** (Chạy lần đầu tiên khi bạn clone một dự án)
    ```bash
    npm install
    ```

*   **Cài đặt một gói mới:**
    ```bash
    npm install <tên-gói>
    ```

*   **Chạy một kịch bản được định nghĩa trong `package.json`:** (Ví dụ: `npm test` thường được cấu hình để chạy `npx playwright test`)
    ```bash
    npm test
    # hoặc
    npm run <tên-kịch-bản>
    ```

---

### Lệnh Git & GitHub

Đây là những lệnh cần thiết để quản lý phiên bản mã nguồn của bạn và cộng tác với những người khác.

*   **Kiểm tra trạng thái các thay đổi:**
    ```bash
    git status
    ```

*   **Thêm các thay đổi vào khu vực chờ (staging area):**
    ```bash
    git add .  # Thêm tất cả các tệp đã thay đổi
    git add <tên-tệp> # Chỉ thêm một tệp cụ thể
    ```

*   **Lưu các thay đổi (commit):**
    ```bash
    git commit -m "Mô tả ngắn gọn về những thay đổi của bạn"
    ```

*   **Đẩy các thay đổi lên GitHub:**
    ```bash
    git push
    ```

*   **Kéo các thay đổi mới nhất từ GitHub:**
    ```bash
    git pull
    ```

*   **Tạo một nhánh mới:**
    ```bash
    git branch <tên-nhánh-mới>
    ```

*   **Chuyển sang một nhánh khác:**
    ```bash
    git checkout <tên-nhánh>
    ```
