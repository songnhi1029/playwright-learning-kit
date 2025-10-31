# Bài tập thực hành nâng cao với playwright.dev

Đây là một bộ bài tập toàn diện được thiết kế để kiểm tra kỹ năng Playwright của bạn trên trang web thực tế `playwright.dev`. Các bài tập này yêu cầu bạn kết hợp các khái niệm đã học để giải quyết các vấn đề phức tạp hơn.

---

### Bài tập 1: Điều hướng, Tìm kiếm và Xác nhận

**Mục tiêu:** Thực hành một luồng người dùng hoàn chỉnh: điều hướng, tìm kiếm và xác nhận kết quả.

1.  Điều hướng đến `https://playwright.dev/`.
2.  Tìm và nhấp vào nút "Docs" trong thanh điều hướng trên cùng.
3.  Trên trang tài liệu, tìm thanh tìm kiếm (có văn bản giữ chỗ là "Search docs").
4.  Nhập "assertions" vào thanh tìm kiếm và nhấn 'Enter'.
5.  Xác nhận rằng một trang kết quả tìm kiếm được tải.
6.  Trên trang kết quả, xác nhận rằng có một tiêu đề chính (`<h1>`) chứa văn bản "Assertions".

---

### Bài tập 2: Tương tác với Menu thả xuống và Xác thực nội dung động

**Mục tiêu:** Làm việc với các thành phần giao diện người dùng động như menu thả xuống thay đổi ngôn ngữ.

1.  Điều hướng đến trang "Assertions" (bạn có thể sử dụng URL trực tiếp hoặc thực hiện lại các bước từ Bài tập 1).
2.  Ở đầu trang, tìm menu thả xuống chọn ngôn ngữ (thường hiển thị "Node.js" theo mặc định).
3.  Nhấp vào menu thả xuống để mở nó.
4.  Chọn "Python".
5.  Xác nhận rằng các đoạn mã trên trang đã thay đổi để hiển thị cú pháp Python. Một cách để làm điều này là tìm một đoạn mã và xác nhận nó chứa từ khóa `def` hoặc `pip install playwright`.
6.  Lặp lại các bước 3-5, nhưng lần này chuyển sang "Java" và xác nhận sự hiện diện của từ khóa `mvn` hoặc `public class`.

---

### Bài tập 3: Chế độ Sáng/Tối và Kiểm thử Hồi quy Hình ảnh

**Mục tiêu:** Tương tác với các nút chuyển đổi trạng thái giao diện người dùng và sử dụng kiểm thử hình ảnh để xác thực các thay đổi trực quan.

1.  Điều hướng đến `https://playwright.dev/`.
2.  Tìm và nhấp vào nút chuyển đổi chế độ sáng/tối (biểu tượng mặt trăng/mặt trời).
3.  Xác nhận rằng thuộc tính `class` của thẻ `<html>` bây giờ chứa "dark".
4.  Sử dụng `toHaveScreenshot()` để chụp ảnh màn hình của phần đầu trang (header) ở chế độ tối. Đặt tên cho ảnh chụp màn hình, ví dụ: `header-dark.png`.
    *   `await expect(page.locator('nav')).toHaveScreenshot('header-dark.png');`
5.  Nhấp lại vào nút chuyển đổi để quay lại chế độ sáng.
6.  Xác nhận rằng lớp "dark" đã bị xóa khỏi thẻ `<html>`.
7.  Chụp ảnh màn hình của phần đầu trang một lần nữa và so sánh nó với một ảnh chụp màn hình cơ sở khác, ví dụ: `header-light.png`.

---

### Bài tập 4: Tái cấu trúc với Page Object Model (Thử thách lớn)

**Mục tiêu:** Áp dụng mẫu thiết kế Page Object Model để tạo mã kiểm thử có cấu trúc và dễ bảo trì.

1.  Tạo một lớp Page Object có tên `DocsPage` trong một tệp mới (`tests/pages/DocsPage.ts`).
2.  Trong `DocsPage`, triển khai các thành phần sau:
    *   **Locators:**
        *   Thanh tìm kiếm
        *   Menu thả xuống ngôn ngữ
        *   Cây điều hướng bên trái
    *   **Methods:**
        *   `async search(query: string)`: Một phương thức để thực hiện tìm kiếm.
        *   `async changeLanguage(language: 'Node.js' | 'Python' | 'Java' | '.NET')`: Một phương thức để thay đổi ngôn ngữ lập trình.
        *   `async navigateTo(linkText: string)`: Một phương thức để nhấp vào một liên kết trong cây điều hướng bên trái.
3.  Viết lại **Bài tập 1 và 2** bằng cách sử dụng lớp `DocsPage` mới của bạn. Các bài kiểm tra của bạn bây giờ nên đọc giống như các kịch bản cấp cao, ví dụ:
    ```typescript
    const docsPage = new DocsPage(page);
    await docsPage.search('assertions');
    // ... xác nhận
    await docsPage.changeLanguage('Python');
    // ... xác nhận
    ```

---

### Bài tập 5: Giả lập Phản hồi API Tìm kiếm (Nâng cao nhất)

**Mục tiêu:** Chặn một yêu cầu mạng thực và cung cấp dữ liệu giả để kiểm tra cách giao diện người dùng xử lý các phản hồi khác nhau.

1.  Điều hướng đến trang tài liệu của Playwright.
2.  Sử dụng `page.route()` để chặn các yêu cầu mạng được thực hiện khi bạn nhập vào thanh tìm kiếm. (Gợi ý: Mở các công cụ cho nhà phát triển của trình duyệt và xem tab Mạng để tìm ra URL của API tìm kiếm, nó có thể là một yêu cầu đến một dịch vụ như Algolia).
3.  Trong trình xử lý `route`, hãy gọi `route.fulfill()` để trả về một phản hồi JSON giả mạo. Phản hồi của bạn nên mô phỏng cấu trúc của kết quả tìm kiếm thực, nhưng chỉ chứa một kết quả duy nhất, ví dụ:
    ```json
    {
      "hits": [{"hierarchy": {"lvl0": "My Fake Result", "lvl1": "A subtitle"}, "url": "https://playwright.dev/docs/intro"}]
    }
    ```
4.  Trong bài kiểm tra của bạn, hãy nhập một cái gì đó vào thanh tìm kiếm.
5.  Xác nhận rằng menu thả xuống kết quả tìm kiếm xuất hiện và chỉ hiển thị "My Fake Result" của bạn.

--- 

Hoàn thành các bài tập này sẽ cho bạn một sự hiểu biết sâu sắc và thực tế về cách sử dụng Playwright trong các kịch bản phức tạp. Chúc may mắn!