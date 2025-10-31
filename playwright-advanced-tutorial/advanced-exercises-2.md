# Bài tập thực hành Playwright - Nâng cao hơn

Các bài tập này tập trung vào các kịch bản phức tạp và các tính năng nâng cao của Playwright.

---

### Bài tập 1: Kết hợp API và UI

**Mục tiêu:** Sử dụng API để tạo trạng thái và sau đó xác minh trạng thái đó trong giao diện người dùng.

1.  Sử dụng `request.post()` để tạo một bài đăng mới trên `https://jsonplaceholder.typicode.com/posts`. Gửi một đối tượng có `title` và `body`.
2.  Lưu lại `id` của bài đăng mới được tạo từ phản hồi API.
3.  Điều hướng đến `https://jsonplaceholder.typicode.com/posts/{id}` (thay `{id}` bằng id bạn đã lưu).
4.  Xác nhận rằng trang hiển thị tiêu đề và nội dung của bài đăng bạn đã tạo.

---

### Bài tập 2: Tương tác với iFrames

**Mục tiêu:** Học cách làm việc với các phần tử bên trong một iFrame.

1.  Điều hướng đến `http://the-internet.herokuapp.com/iframe`.
2.  Định vị iFrame trên trang. Bạn có thể sử dụng `page.frameLocator()`.
3.  Bên trong iFrame, có một trình soạn thảo văn bản. Xóa nội dung hiện có.
4.  Nhập "Hello from the iframe!" vào trình soạn thảo.
5.  Xác nhận rằng trình soạn thảo bây giờ chứa văn bản bạn đã nhập.

---

### Bài tập 3: Tải tệp lên

**Mục tiêu:** Tự động hóa việc tải tệp lên.

1.  Tạo một tệp văn bản đơn giản trong dự án của bạn, ví dụ: `my-file.txt` với nội dung "Hello world".
2.  Điều hướng đến `http://the-internet.herokuapp.com/upload`.
3.  Sử dụng phương thức `setInputFiles` để chọn tệp `my-file.txt` của bạn cho đầu vào tải lên.
4.  Nhấp vào nút "Upload".
5.  Xác nhận rằng trang tiếp theo hiển thị tên tệp `my-file.txt`.

---

### Bài tập 4: Mocking (Giả lập) Yêu cầu Mạng

**Mục tiêu:** Chặn và giả lập một yêu cầu mạng để kiểm soát dữ liệu được hiển thị trên trang.

1.  Viết một bài kiểm tra điều hướng đến `https://danube-web.shop/`.
2.  Sử dụng `page.route()` để chặn các yêu cầu đến API sách (`/api/books`).
3.  Khi yêu cầu bị chặn, hãy trả về một phản hồi giả lập của riêng bạn. Phản hồi nên là một mảng JSON chỉ chứa một cuốn sách với `title` là "My Mocked Book".
4.  Xác nhận rằng trang chỉ hiển thị một cuốn sách và tiêu đề của nó là "My Mocked Book".

---

### Bài tập 5: Kiểm thử Hồi quy Hình ảnh (Visual Regression)

**Mục tiêu:** Sử dụng tính năng chụp ảnh màn hình của Playwright để phát hiện các thay đổi về giao diện người dùng.

1.  Điều hướng đến `https://playwright.dev/`.
2.  Chụp ảnh màn hình của logo Playwright bằng cách sử dụng `expect(page.getByRole('link', { name: 'Playwright' })).toHaveScreenshot();`.
3.  Chạy bài kiểm tra lần đầu tiên. Playwright sẽ lưu một ảnh chụp màn hình "vàng" (golden screenshot).
4.  Chạy lại bài kiểm tra. Playwright sẽ so sánh ảnh chụp màn hình mới với ảnh đã lưu và báo cáo bất kỳ sự khác biệt nào.
5.  (Tùy chọn) Thử thay đổi kích thước cửa sổ trình duyệt trong bài kiểm tra của bạn và xem bài kiểm tra hồi quy hình ảnh thất bại như thế nào.

---

Những bài tập này sẽ thử thách bạn sử dụng Playwright theo những cách phức tạp và mạnh mẽ hơn. Hãy thử sức và cho tôi biết nếu bạn cần gợi ý!