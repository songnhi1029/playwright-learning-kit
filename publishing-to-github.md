# Hướng dẫn từng bước để đưa dự án lên GitHub

Đây là quy trình chuẩn để khởi tạo một kho lưu trữ Git cục bộ và đẩy nó lên một kho lưu trữ mới trên GitHub.

---

### Bước 1: Tạo một kho lưu trữ mới trên GitHub

1.  Mở trình duyệt và truy cập [GitHub](https://github.com). Đăng nhập vào tài khoản của bạn.
2.  Ở góc trên bên phải, nhấp vào dấu `+` và chọn **"New repository"**.
3.  **Repository name:** Đặt tên cho kho lưu trữ của bạn (ví dụ: `playwright-learning-kit`).
4.  **Description:** Thêm một mô tả ngắn gọn (tùy chọn).
5.  Chọn **"Public"** để mọi người có thể xem kho lưu trữ của bạn.
6.  **Quan trọng:** **KHÔNG** đánh dấu vào các ô "Add a README file", "Add .gitignore", hoặc "Choose a license". Chúng ta đã có các tệp này trong dự án rồi.
7.  Nhấp vào nút **"Create repository"**.

Sau khi tạo xong, bạn sẽ được chuyển đến một trang có chứa URL của kho lưu trữ. URL sẽ có dạng `https://github.com/TEN_CUA_BAN/TEN_DU_AN.git`. Hãy sao chép URL này.

---

### Bước 2: Chuẩn bị và đẩy dự án từ máy của bạn

Bây giờ, hãy mở Terminal và thực hiện các lệnh sau từ thư mục gốc của dự án.

1.  **Khởi tạo kho lưu trữ Git cục bộ:**
    Lệnh này sẽ biến thư mục dự án của bạn thành một kho lưu trữ Git và tạo một nhánh mặc định có tên là `main`.
    ```bash
    git init -b main
    ```

2.  **Thêm tất cả các tệp vào khu vực chờ (staging):**
    Lệnh này sẽ thêm tất cả các tệp và thư mục trong dự án của bạn để chuẩn bị cho lần commit đầu tiên.
    ```bash
    git add .
    ```

3.  **Tạo commit đầu tiên:**
    Lệnh này sẽ lưu lại một "ảnh chụp nhanh" của dự án của bạn với một thông điệp mô tả.
    ```bash
    git commit -m "Initial commit: Add comprehensive Playwright learning materials"
    ```

4.  **Kết nối kho lưu trữ cục bộ với kho lưu trữ trên GitHub:**
    Thay thế `<URL_KHO_LUU_TRU_CUA_BAN>` bằng URL bạn đã sao chép ở Bước 1.
    ```bash
    git remote add origin <URL_KHO_LUU_TRU_CUA_BAN>
    ```
    *Ví dụ:* `git remote add origin https://github.com/your-username/playwright-learning-kit.git`

5.  **Đẩy (push) mã của bạn lên GitHub:**
    Lệnh này sẽ tải tất cả các tệp và lịch sử commit của bạn từ máy cục bộ lên kho lưu trữ trên GitHub. Cờ `-u` sẽ thiết lập nhánh `main` cục bộ để theo dõi nhánh `main` từ xa, vì vậy trong các lần đẩy sau, bạn chỉ cần gõ `git push`.
    ```bash
    git push -u origin main
    ```

---

Sau khi hoàn tất, hãy tải lại trang GitHub của bạn. Bạn sẽ thấy toàn bộ dự án của mình đã có mặt trên đó.