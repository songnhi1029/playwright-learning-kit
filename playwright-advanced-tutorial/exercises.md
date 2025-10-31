# Bài tập thực hành Playwright

Dưới đây là danh sách các bài tập để bạn thực hành các kỹ năng Playwright của mình. Các bài tập này được thiết kế để áp dụng các khái niệm từ cả hướng dẫn cơ bản và nâng cao.

--- 

### Bài tập 1: Điều hướng và Xác nhận cơ bản

**Mục tiêu:** Làm quen với việc mở một trang và thực hiện một xác nhận đơn giản.

1.  Tạo một tệp kiểm tra mới có tên `tests/practice.spec.ts`.
2.  Viết một bài kiểm tra điều hướng đến `https://www.wikipedia.org/`.
3.  Xác nhận rằng tiêu đề của trang chứa "Wikipedia".
4.  Xác nhận rằng trang có một tiêu đề (`<h1>`) với văn bản "Wikipedia".

---

### Bài tập 2: Tương tác với Biểu mẫu

**Mục tiêu:** Thực hành điền và gửi biểu mẫu.

1.  Viết một bài kiểm tra mới điều hướng đến `https://www.saucedemo.com/`.
2.  Sử dụng `getByPlaceholder` hoặc `getByLabel` để tìm các trường tên người dùng và mật khẩu.
3.  Điền tên người dùng là `standard_user` và mật khẩu là `secret_sauce`.
4.  Nhấp vào nút đăng nhập.
5.  Xác nhận rằng sau khi đăng nhập, URL của trang chứa `/inventory.html`.

---

### Bài tập 3: Xử lý Nội dung Động

**Mục tiêu:** Làm việc với các phần tử không xuất hiện ngay lập tức.

1.  Viết một bài kiểm tra mới điều hướng đến `http://the-internet.herokuapp.com/dynamic_loading/2`.
2.  Nhấp vào nút "Start".
3.  Playwright sẽ tự động chờ. Sau khi thanh tải biến mất, xác nhận rằng văn bản "Hello World!" được hiển thị trên trang.

---

### Bài tập 4: Tái cấu trúc với Hooks và Nhóm

**Mục tiêu:** Tổ chức các bài kiểm tra bằng cách sử dụng `test.describe` và `beforeEach`.

1.  Tạo một nhóm kiểm tra bằng `test.describe('Sauce Demo', ...)`.
2.  Sử dụng hook `beforeEach` để điều hướng đến `https://www.saucedemo.com/` và đăng nhập (sử dụng mã từ Bài tập 2).
3.  Viết hai bài kiểm tra trong nhóm này:
    *   Bài kiểm tra 1: Xác nhận rằng trang `inventory` hiển thị ít nhất một mặt hàng.
    *   Bài kiểm tra 2: Thêm một mặt hàng vào giỏ hàng và xác nhận rằng biểu tượng giỏ hàng được cập nhật.

---

### Bài tập 5: Kiểm thử API

**Mục tiêu:** Sử dụng Playwright để kiểm tra một điểm cuối API công khai.

1.  Viết một bài kiểm tra sử dụng đối tượng `request`.
2.  Thực hiện một yêu cầu `GET` đến `https://jsonplaceholder.typicode.com/users/1`.
3.  Xác nhận rằng phản hồi là `ok` (`response.ok()`)
4.  Xác nhận rằng `Content-Type` của phản hồi là `application/json; charset=utf-8`.
5.  Phân tích cú pháp phần thân JSON và xác nhận rằng tên người dùng là `Bret`.

---

### Bài tập 6: Page Object Model (Nâng cao)

**Mục tiêu:** Tái cấu trúc một bài kiểm tra để sử dụng mẫu thiết kế Page Object Model.

1.  Tạo một thư mục mới `tests/pages`.
2.  Tạo một lớp `LoginPage` trong `tests/pages/LoginPage.ts` cho trang đăng nhập `https://www.saucedemo.com/`.
    *   Lớp này nên có các bộ định vị cho tên người dùng, mật khẩu và nút đăng nhập.
    *   Lớp này nên có một phương thức `login(username, password)`.
3.  Tạo một lớp `InventoryPage` trong `tests/pages/InventoryPage.ts`.
    *   Lớp này nên có một bộ định vị cho tiêu đề trang và các mặt hàng trong kho.
4.  Viết lại bài kiểm tra từ **Bài tập 2** để sử dụng các lớp `LoginPage` và `InventoryPage` mới của bạn.

--- 

Bắt đầu với Bài tập 1 và cho tôi biết nếu bạn cần bất kỳ sự trợ giúp nào hoặc muốn xem giải pháp. Chúc bạn thực hành vui vẻ!