# Các lỗi CLI thường gặp và cách khắc phục

Khi làm việc với dòng lệnh (CLI) và các công cụ phát triển như Playwright, bạn sẽ thường xuyên gặp phải một số lỗi. Dưới đây là danh sách các lỗi phổ biến, nguyên nhân và cách khắc phục chúng.

---

### 1. `command not found` hoặc `No such file or directory`

*   **Nguyên nhân:**
    *   Lệnh bạn gõ không tồn tại hoặc không được cài đặt trên hệ thống của bạn.
    *   Lệnh có thể tồn tại nhưng không nằm trong biến môi trường `PATH` của shell.
    *   Bạn đang cố gắng chạy một tệp hoặc truy cập một thư mục không tồn tại hoặc đường dẫn bị sai.
*   **Khắc phục:**
    *   **Kiểm tra chính tả:** Đảm bảo bạn đã gõ đúng lệnh.
    *   **Cài đặt:** Nếu là một công cụ, hãy đảm bảo bạn đã cài đặt nó (ví dụ: `npm install -g <tên-công-cụ>`).
    *   **Sử dụng `npx`:** Đối với các lệnh Playwright, hãy luôn sử dụng `npx` (ví dụ: `npx playwright test`) để đảm bảo bạn đang chạy phiên bản được cài đặt cục bộ trong dự án của mình.
    *   **Kiểm tra đường dẫn:** Sử dụng `ls` để liệt kê các tệp và thư mục, `pwd` để xem bạn đang ở thư mục nào. Đảm bảo đường dẫn đến tệp/thư mục là chính xác.

---

### 2. `Permission denied`

*   **Nguyên nhân:**
    *   Bạn đang cố gắng ghi vào một thư mục mà bạn không có quyền (ví dụ: thư mục hệ thống).
    *   Bạn đang cố gắng thực thi một script mà không có quyền thực thi.
*   **Khắc phục:**
    *   **Sử dụng `sudo`:** Nếu bạn cần quyền quản trị để thực hiện một hành động (ví dụ: cài đặt gói toàn cục), hãy thử thêm `sudo` vào trước lệnh (ví dụ: `sudo npm install -g`). Cẩn thận khi sử dụng `sudo`.
    *   **Thay đổi quyền:** Đối với các script, hãy cấp quyền thực thi bằng `chmod +x <tên-script.sh>`.
    *   **Kiểm tra quyền thư mục:** Đảm bảo bạn có quyền ghi vào thư mục hiện tại hoặc thư mục đích.

---

### 3. Lỗi liên quan đến NPM/Node.js

*   **`npm ERR! code EACCES`:**
    *   **Nguyên nhân:** Lỗi quyền khi cài đặt các gói NPM toàn cục.
    *   **Khắc phục:** Sửa quyền NPM hoặc sử dụng `nvm` (Node Version Manager) để quản lý các phiên bản Node.js và tránh các vấn đề về quyền.
*   **`Cannot find module '...'`:**
    *   **Nguyên nhân:** Một gói phụ thuộc bị thiếu hoặc không được cài đặt đúng cách.
    *   **Khắc phục:** Chạy `npm install` trong thư mục gốc của dự án để cài đặt tất cả các gói phụ thuộc.
*   **`npm ERR! Maximum call stack size exceeded` hoặc các lỗi liên quan đến `node_modules` bị hỏng:**
    *   **Nguyên nhân:** Thư mục `node_modules` hoặc tệp `package-lock.json` bị hỏng.
    *   **Khắc phục:** Xóa thư mục `node_modules` và tệp `package-lock.json`, sau đó cài đặt lại:
        ```bash
        rm -rf node_modules package-lock.json
        npm install
        ```

---

### 4. Lỗi cụ thể của Playwright

*   **`Error: Playwright browser executable is not found`:**
    *   **Nguyên nhân:** Các trình duyệt cần thiết cho Playwright chưa được cài đặt.
    *   **Khắc phục:** Chạy `npx playwright install` để cài đặt các trình duyệt.
*   **`Timeout exceeded while waiting for element '...'`:**
    *   **Nguyên nhân:** Playwright không thể tìm thấy hoặc tương tác với phần tử trong thời gian chờ mặc định (hoặc đã cấu hình).
    *   **Khắc phục:**
        *   Kiểm tra lại bộ định vị (locator) của bạn xem có chính xác không.
        *   Đảm bảo phần tử hiển thị và có thể tương tác được.
        *   Tăng thời gian chờ cho hành động hoặc xác nhận cụ thể.
        *   Đảm bảo không có yêu cầu mạng nào đang chặn phần tử hiển thị.
*   **`Error: expect(received).toHaveTitle() expected '...' to contain '...'` (hoặc các lỗi xác nhận khác):**
    *   **Nguyên nhân:** Giá trị thực tế không khớp với giá trị mong đợi trong xác nhận của bạn.
    *   **Khắc phục:**
        *   Kiểm tra giá trị mong đợi của bạn có chính xác không.
        *   Sử dụng `page.pause()` hoặc Trace Viewer để kiểm tra trạng thái của trang tại thời điểm xác nhận.
*   **`Error: page.goto: net::ERR_CONNECTION_REFUSED`:**
    *   **Nguyên nhân:** Trang web bạn đang cố gắng truy cập không khả dụng hoặc máy chủ cục bộ của bạn chưa chạy.
    *   **Khắc phục:**
        *   Kiểm tra lại URL.
        *   Đảm bảo máy chủ phát triển cục bộ của bạn đang chạy.
        *   Kiểm tra kết nối internet của bạn.

---

### 5. Lỗi Git

*   **`fatal: not a git repository (or any of the parent directories): .git`:**
    *   **Nguyên nhân:** Bạn đang cố gắng chạy lệnh Git trong một thư mục không phải là kho lưu trữ Git.
    *   **Khắc phục:** Chuyển đến thư mục gốc của kho lưu trữ Git hoặc khởi tạo một kho lưu trữ mới bằng `git init`.
*   **`fatal: Authentication failed for '...'`:**
    *   **Nguyên nhân:** Thông tin đăng nhập của bạn cho kho lưu trữ từ xa không chính xác.
    *   **Khắc phục:** Cập nhật thông tin đăng nhập Git của bạn hoặc đảm bảo khóa SSH của bạn được cấu hình đúng cách.
*   **`error: failed to push some refs to '...' (non-fast-forward)`:**
    *   **Nguyên nhân:** Kho lưu trữ từ xa có các thay đổi mà bạn chưa có trong kho lưu trữ cục bộ của mình.
    *   **Khắc phục:** Kéo các thay đổi mới nhất từ kho lưu trữ từ xa trước khi đẩy:
        ```bash
        git pull
        git push
        ```

---

### 6. Lỗi cú pháp (Syntax Errors)

*   **Nguyên nhân:** Lỗi trong mã của bạn (ví dụ: thiếu dấu ngoặc, sai tên biến, lỗi logic).
*   **Khắc phục:** Đọc kỹ thông báo lỗi của trình biên dịch/thông dịch, sử dụng linter (ESLint, Prettier) và IDE của bạn để phát hiện và sửa lỗi cú pháp.

Việc làm quen với các lỗi này sẽ giúp bạn gỡ lỗi nhanh hơn và trở nên tự tin hơn khi làm việc với CLI.