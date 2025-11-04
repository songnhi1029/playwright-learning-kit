# Bài học: Làm chủ `getByRole('heading')` trong Playwright

`getByRole` là một trong những bộ định vị (locator) mạnh mẽ và được khuyến nghị nhất của Playwright. Nó giúp bạn viết các bài test ổn định, dễ đọc và ưu tiên khả năng tiếp cận (accessibility). Bài học này sẽ đi sâu vào cách sử dụng `getByRole('heading')` từ cơ bản đến nâng cao.

---

### Phần 1: Khái niệm cơ bản - "Role" là gì?

Để hiểu `getByRole`, trước tiên bạn cần hiểu "role" (vai trò) trong ngữ cảnh của web.

1.  **Nguồn gốc từ Web Accessibility (Khả năng tiếp cận web):**
    *   "Role" là một khái niệm từ **ARIA (Accessible Rich Internet Applications)**, một bộ tiêu chuẩn giúp các trang web và ứng dụng trở nên dễ tiếp cận hơn, đặc biệt là với người dùng sử dụng các công nghệ hỗ trợ như trình đọc màn hình (screen readers).
    *   Mỗi "role" mô tả **mục đích** hoặc **chức năng** của một phần tử trên trang. Ví dụ: `role="button"` cho biết phần tử này hoạt động như một nút bấm, `role="navigation"` cho biết đây là một khu vực điều hướng.

2.  **`role="heading"` nghĩa là gì?**
    *   `role="heading"` chỉ định rằng một phần tử là một **tiêu đề** (đề mục) của một phần nội dung.
    *   Trong HTML, các thẻ tiêu đề từ `<h1>` đến `<h6>` đã được **ngầm định** gán `role="heading"`. 
        *   `<h1>` có `role="heading"` và cấp độ (level) là 1.
        *   `<h2>` có `role="heading"` và cấp độ là 2.
        *   ... và cứ thế tiếp tục.
    *   Điều này giúp các công nghệ hỗ trợ hiểu được cấu trúc phân cấp của trang, ví dụ: "Đây là tiêu đề chính của trang" (`h1`), "Đây là tiêu đề của một mục con" (`h2`).

---

### Phần 2: Khi nào nên sử dụng `getByRole('heading')`?

#### 1. Mức độ cơ bản: Tìm một tiêu đề bất kỳ

Khi bạn muốn tìm một tiêu đề mà không quan tâm nó là `h1`, `h2`, hay `h3`.

*   **Mục đích:** Tìm các tiêu đề, đề mục trên trang.
*   **Ví dụ:**
    ```typescript
    // Tìm tiêu đề đầu tiên trên trang
    const firstHeading = page.getByRole('heading').first();
    ```

#### 2. Mức độ trung bình: Tìm tiêu đề theo tên (văn bản)

Đây là cách sử dụng phổ biến nhất. Bạn tìm một tiêu đề dựa trên văn bản mà nó hiển thị.

*   **Mục đích:** Tìm một tiêu đề cụ thể mà bạn biết trước nội dung của nó.
*   **Ví dụ:**
    ```typescript
    // Tìm tiêu đề có văn bản là "Login Page"
    const loginHeading = page.getByRole('heading', { name: 'Login Page' });

    await expect(loginHeading).toBeVisible();
    ```
*   **So sánh với `getByText`:** `getByRole('heading', { name: '...' })` tốt hơn `getByText('...')` vì nó đảm bảo phần tử tìm được không chỉ có văn bản đúng mà còn phải có vai trò là một tiêu đề.

#### 3. Mức độ nâng cao: Tìm tiêu đề theo tên và cấp độ (`level`)

Đây là cách sử dụng mạnh mẽ nhất, giúp bạn kiểm tra cả cấu trúc ngữ nghĩa (semantic structure) của trang.

*   **Mục đích:** Xác nhận một tiêu đề cụ thể không chỉ có văn bản đúng mà còn phải có cấp độ đúng (ví dụ: phải là `<h2>`, không phải `<h1>` hay `<h3>`). Điều này rất quan trọng cho SEO và khả năng tiếp cận.
*   **Ví dụ:**
    ```typescript
    // Tìm tiêu đề có văn bản là "Login Page" VÀ phải là thẻ <h2>
    const loginH2 = page.getByRole('heading', { name: 'Login Page', level: 2 });

    await expect(loginH2).toBeVisible();
    ```
    Nếu trang web sử dụng thẻ `<h1>` hoặc `<h3>` cho "Login Page", bộ định vị này sẽ thất bại, giúp bạn phát hiện ra các lỗi về cấu trúc HTML.

---

### Phần 3: Tại sao `getByRole` lại tốt hơn các locator khác (như CSS)?

Hãy so sánh `page.getByRole('heading', { name: 'Login Page' })` với `page.locator('h2.title')`.

1.  **Chống lại sự thay đổi (Resilience):**
    *   Nếu lập trình viên đổi class từ `h2.title` thành `h2.main-title`, bộ định vị CSS `page.locator('h2.title')` sẽ **thất bại**.
    *   Tuy nhiên, `page.getByRole('heading', { name: 'Login Page' })` vẫn **thành công** vì vai trò và nội dung của nó không thay đổi. Các bài test của bạn sẽ ổn định hơn.

2.  **Ưu tiên khả năng tiếp cận (Accessibility-First):**
    *   Việc sử dụng `getByRole` buộc bạn phải suy nghĩ về trang web theo cách mà người dùng sử dụng công nghệ hỗ trợ trải nghiệm nó. Nếu test của bạn không tìm thấy phần tử qua `getByRole`, đó có thể là một dấu hiệu cho thấy trang của bạn có vấn đề về khả năng tiếp cận.

3.  **Dễ đọc và dễ hiểu (Readability):**
    *   `getByRole('heading', { name: 'Welcome' })` tự nó đã giải thích rõ mục đích: "Tìm một tiêu đề có chữ Welcome".
    *   `page.locator('h1.welcome-title.text-bold')` khó hiểu hơn và chứa các chi tiết về cách triển khai (implementation details) không cần thiết.

---

### Tổng kết:

*   **Sử dụng `getByRole('heading')`** khi bạn cần tìm các tiêu đề trên trang.
*   **Thêm tùy chọn `{ name: '...' }`** để tìm tiêu đề theo văn bản của nó.
*   **Thêm tùy chọn `{ level: ... }`** khi cấp độ của tiêu đề (`h1`, `h2`,...) là quan trọng đối với test của bạn.
*   **Ưu tiên `getByRole`** hơn các bộ định vị CSS hoặc XPath cho các phần tử có vai trò rõ ràng (như heading, button, link, navigation) để làm cho các bài test của bạn mạnh mẽ, dễ đọc và có ý nghĩa hơn.
