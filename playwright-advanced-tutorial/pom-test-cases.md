# Các kịch bản kiểm thử ứng dụng Page Object Model

Đây là danh sách các kịch bản kiểm thử (test cases) cho trang web `https://www.saucedemo.com/` sẽ được sử dụng để minh họa cho việc triển khai mẫu thiết kế Page Object Model (POM).

---

### Kịch bản 1: Đăng nhập và Đăng xuất thành công

*   **Tiêu đề:** Người dùng tiêu chuẩn có thể đăng nhập và sau đó đăng xuất thành công.
*   **Các bước:**
    1.  **Given** người dùng đang ở trang Đăng nhập.
    2.  **When** người dùng điền thông tin hợp lệ (`standard_user`, `secret_sauce`) và nhấp vào nút "Login".
    3.  **Then** người dùng sẽ được chuyển đến trang Sản phẩm (Inventory).
    4.  **When** người dùng mở menu bên cạnh và nhấp vào liên kết "Logout".
    5.  **Then** người dùng sẽ được chuyển về lại trang Đăng nhập.

---

### Kịch bản 2: Thêm và xóa một sản phẩm khỏi giỏ hàng

*   **Tiêu đề:** Người dùng có thể thêm một sản phẩm vào giỏ hàng và sau đó xóa nó đi.
*   **Các bước:**
    1.  **Given** người dùng đã đăng nhập thành công.
    2.  **When** người dùng nhấp vào nút "Add to cart" của sản phẩm "Sauce Labs Backpack".
    3.  **Then** biểu tượng giỏ hàng sẽ hiển thị số "1".
    4.  **When** người dùng điều hướng đến trang Giỏ hàng.
    5.  **And** nhấp vào nút "Remove" của sản phẩm "Sauce Labs Backpack".
    6.  **Then** giỏ hàng sẽ trở nên trống rỗng.

---

### Kịch bản 3: Sắp xếp sản phẩm theo giá

*   **Tiêu đề:** Người dùng có thể sắp xếp các sản phẩm theo giá từ cao đến thấp.
*   **Các bước:**
    1.  **Given** người dùng đã đăng nhập thành công.
    2.  **When** người dùng chọn tùy chọn sắp xếp "Price (high to low)".
    3.  **Then** các sản phẩm trên trang sẽ được hiển thị theo thứ tự giá giảm dần.
    *(Lưu ý: Để xác nhận điều này, chúng ta cần lấy giá của tất cả các sản phẩm và so sánh chúng trong mã kiểm thử).*

---

### Kịch bản 4: Đăng nhập không hợp lệ

*   **Tiêu đề:** Hiển thị thông báo lỗi khi đăng nhập với người dùng bị khóa.
*   **Các bước:**
    1.  **Given** người dùng đang ở trang Đăng nhập.
    2.  **When** người dùng cố gắng đăng nhập với thông tin của người dùng bị khóa (`locked_out_user`, `secret_sauce`).
    3.  **Then** một thông báo lỗi chứa văn bản "Sorry, this user has been locked out" sẽ được hiển thị.
