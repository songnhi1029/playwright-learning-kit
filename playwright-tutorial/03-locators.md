# 03: Locators (Bộ định vị)

Locators là cách bạn tìm thấy các phần tử trên một trang. Playwright cung cấp nhiều cách khác nhau để định vị các phần tử, nhưng cách được khuyến nghị là sử dụng các bộ định vị tích hợp, thân thiện với người dùng.

## Tại sao nên sử dụng Locators?

Locators là trọng tâm của tính năng tự động chờ của Playwright. Một locator đại diện cho một cách để tìm(các) phần tử trên trang bất kỳ lúc nào. Khi bạn thực hiện một hành động trên một locator, Playwright sẽ tự động đợi phần tử đó hiển thị và sẵn sàng trước khi thực hiện hành động.

## Các loại Locators

Playwright khuyến nghị sử dụng các bộ định vị tích hợp bất cứ khi nào có thể vì chúng gần với cách người dùng cảm nhận trang hơn.

*   `page.getByRole()`: Để định vị theo vai trò ARIA, thuộc tính và các trạng thái có thể truy cập. Đây là lựa chọn ưu tiên hàng đầu.
    *   Ví dụ: `page.getByRole('link', { name: 'Get started' })`

*   `page.getByText()`: Để định vị theo nội dung văn bản.
    *   Ví dụ: `page.getByText('Welcome to Playwright')`

*   `page.getByLabel()`: Để định vị các điều khiển biểu mẫu theo văn bản nhãn được liên kết.
    *   Ví dụ: `page.getByLabel('Password')`

*   `page.getByPlaceholder()`: Để định vị một đầu vào theo văn bản giữ chỗ của nó.
    *   Ví dụ: `page.getByPlaceholder('Search docs')`

*   `page.getByAltText()`: Để định vị một phần tử, thường là hình ảnh, theo văn bản thay thế của nó.
    *   Ví dụ: `page.getByAltText('Playwright logo')`

*   `page.getByTitle()`: Để định vị một phần tử theo thuộc tính tiêu đề của nó.
    *   Ví dụ: `page.getByTitle('Issues list')`

## Khi nào nên sử dụng các bộ định vị khác

Nếu bạn không thể tìm thấy một phần tử bằng các bộ định vị tích hợp, bạn có thể sử dụng các bộ chọn CSS hoặc XPath.

*   `page.locator('css=...')` hoặc `page.locator('...')`
    *   Ví dụ: `page.locator('#my-element')`
*   `page.locator('xpath=...')`
    *   Ví dụ: `page.locator('//button')`

---

## Bài tập thực hành

**Trang web để thực hành:** `http://the-internet.herokuapp.com/login`

1.  **Định vị theo văn bản:** Viết một bộ định vị để tìm phần tử `<h2>` có văn bản "Login Page".
2.  **Định vị theo Label:** Viết một bộ định vị để tìm trường nhập liệu có nhãn "Username".
3.  **Định vị theo Role:** Viết một bộ định vị để tìm nút có vai trò là `button` và tên là "Login".

---

## Bài tập thực hành mở rộng

Sử dụng các trang web sau cho các bài tập này:
*   Trang A: `http://the-internet.herokuapp.com/`
*   Trang B: `http://the-internet.herokuapp.com/challenging_dom`

### Cơ bản

1.  **(Trang A)** Định vị liên kết (link) có văn bản "Form Authentication" bằng `getByText`.
2.  **(Trang A)** Định vị tiêu đề chính của trang ("Welcome to the-internet") bằng `getByRole`.
3.  **(Trang A)** Định vị hình ảnh "Fork me on GitHub" bằng `getByAltText`.
4.  **(Trang A)** Định vị phần footer của trang ("Powered by Elemental Selenium") bằng CSS selector.

### Trung bình

5.  **(Trang A -> /login)** Định vị trường nhập liệu "Password" bằng `getByLabel`.
6.  **(Trang A -> /forgot_password)** Định vị trường nhập email bằng `getByPlaceholder` (giả sử nó có placeholder là "E-mail").
7.  **(Trang B)** Định vị bảng (table) trên trang.
8.  **(Trang B)** Định vị tất cả các hàng (`<tr>`) trong phần thân của bảng (`<tbody>`). Sử dụng `locator` và `count()` để xác nhận có 10 hàng.
9.  **(Trang B)** Định vị nút màu xanh dương có chữ "baz".

### Nâng cao

10. **(Trang B)** Định vị ô chứa văn bản "Iuvaret7" và sau đó định vị nút "edit" trên cùng một hàng. (Gợi ý: tìm hàng `<tr>` chứa văn bản, sau đó tìm liên kết `<a>` có chữ "edit" bên trong hàng đó).
11. **(Trang B)** Định vị ô cuối cùng trong cột "Action" (cột chứa các nút edit/delete).
12. **(Trang B)** Định vị phần tử `canvas`.
13. **(Trang B)** Định vị một hàng trong bảng mà **không** chứa văn bản "Apeirian7". (Gợi ý: sử dụng `filter` với `hasNotText`).

**Tệp tiếp theo:** `04-actions.md`
