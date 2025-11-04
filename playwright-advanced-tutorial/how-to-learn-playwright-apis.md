# Bài học: Phương pháp tìm hiểu và làm chủ các API của Playwright

Playwright là một thư viện lớn với rất nhiều hàm (API) mạnh mẽ. Thay vì nhớ hết mọi thứ, kỹ năng quan trọng nhất là biết cách tự tìm hiểu và khám phá các API khi bạn cần chúng. Bài học này sẽ hướng dẫn bạn các phương pháp hiệu quả nhất để làm chủ Playwright, lấy `getByRole` làm ví dụ.

---

### Vấn đề: "Làm sao để biết các tùy chọn của `getByRole`?"

Giả sử bạn biết có hàm `getByRole` nhưng không chắc nó có những tùy chọn nào ngoài `name` và `level`. Làm thế nào để tìm ra?

### Phần 1: Nguồn thông tin đáng tin cậy nhất - Tài liệu chính thức (Official Docs)

Đây là "nguồn chân lý duy nhất" (single source of truth) cho mọi thứ về Playwright. Hãy tập thói quen truy cập nó đầu tiên.

**Quy trình tìm kiếm:**

1.  **Truy cập trang chủ:** Mở trình duyệt và vào [https://playwright.dev/](https://playwright.dev/).
2.  **Sử dụng thanh tìm kiếm:** Gõ "getByRole" vào thanh tìm kiếm ở đầu trang. Kết quả đầu tiên thường sẽ là trang tài liệu API mà bạn cần.
3.  **Đọc trang tài liệu API:** Trang này sẽ có cấu trúc rất rõ ràng:
    *   **Mô tả:** Giải thích mục đích của hàm.
    *   **Chữ ký hàm (Signature):** Hiển thị các tham số và kiểu dữ liệu của chúng.
    *   **Bảng tùy chọn (Options Table):** Đây là phần quan trọng nhất. Nó liệt kê tất cả các thuộc tính bạn có thể truyền vào đối tượng `options`, ví dụ:
        *   `name` (string | RegExp): Lọc theo tên có thể truy cập.
        *   `level` (number): Lọc theo cấp độ heading.
        *   `exact` (boolean): Có khớp chính xác văn bản hay không.
        *   `includeHidden` (boolean): Có bao gồm các phần tử bị ẩn hay không.
    *   **Ví dụ sử dụng:** Cung cấp các đoạn code mẫu để bạn nhanh chóng nắm bắt cách dùng.

> **Bài học:** Hãy đánh dấu trang [https://playwright.dev/docs/api/class-page](https://playwright.dev/docs/api/class-page) làm trang yêu thích. Đây là nơi chứa tài liệu cho hầu hết các API bạn sẽ dùng hàng ngày.

---

### Phần 2: Người bạn đồng hành đắc lực - Tự động hoàn thành của IDE (IDE Autocompletion)

Nếu bạn đang viết code, IDE (như Visual Studio Code) là cách nhanh nhất để khám phá các tùy chọn mà không cần rời khỏi trình soạn thảo.

**Cách hoạt động:**

Khi bạn đang gõ code và sử dụng TypeScript (hoặc JavaScript được cấu hình tốt), IDE sẽ phân tích các định nghĩa kiểu của Playwright và đưa ra gợi ý.

1.  Gõ `page.getByRole('heading', {`
2.  Ngay sau khi bạn gõ dấu ngoặc nhọn `{`, một cửa sổ pop-up sẽ hiện ra, liệt kê tất cả các tùy chọn hợp lệ như `name`, `level`, `exact`, v.v.

```typescript
// Khi bạn gõ đến đây, IDE sẽ hiển thị các gợi ý
page.getByRole('heading', { 
    // name: ...
    // level: ...
    // exact: ...
    // includeHidden: ...
});
```

3.  Bạn có thể dùng các phím mũi tên để duyệt qua danh sách, đọc mô tả ngắn gọn và chọn tùy chọn bạn cần. Di chuột qua một tùy chọn cũng sẽ hiển thị thông tin chi tiết hơn.

> **Bài học:** Luôn chú ý đến các gợi ý của IDE. Chúng là một cách cực kỳ hiệu quả để học và viết code nhanh hơn, chính xác hơn.

---

### Phần 3: Kỹ thuật nâng cao - Đọc định nghĩa kiểu (Type Definitions)

Đây là một kỹ thuật nâng cao hơn, nhưng nó cho bạn thấy chính xác cách Playwright được định nghĩa. Tất cả các gợi ý của IDE đều đến từ các file này.

*   Trong dự án của bạn, bạn có thể tìm các file có đuôi `.d.ts` trong thư mục `node_modules/@playwright/test`.
*   Các file này định nghĩa các `interface` cho các đối tượng `options`. Ví dụ, bạn có thể tìm thấy một `interface` tên là `PageGetByRoleOptions` định nghĩa tất cả các thuộc tính hợp lệ cho `getByRole`.

> **Bài học:** Bạn không cần phải làm điều này thường xuyên, nhưng biết rằng nó tồn tại sẽ giúp bạn hiểu sâu hơn về cách TypeScript và Playwright hoạt động cùng nhau.

---

### Tổng kết: Quy trình học một API mới

Lần tới khi bạn muốn tìm hiểu một hàm mới, hãy thử quy trình sau:

1.  **Nhu cầu:** "Tôi muốn tìm một phần tử theo [một tiêu chí nào đó]..."
2.  **Tìm kiếm:** Lên trang `playwright.dev` và tìm kiếm từ khóa liên quan.
3.  **Thử nghiệm nhanh:** Mở IDE, gõ tên hàm và xem các gợi ý tự động hoàn thành.
4.  **Đọc sâu:** Quay lại tài liệu chính thức để đọc kỹ mô tả, các tùy chọn và ví dụ.
5.  **Áp dụng:** Viết code thực tế và xem nó hoạt động như thế nào.

Bằng cách kết hợp **Tài liệu chính thức** và **Tự động hoàn thành của IDE**, bạn có thể tự tin tìm hiểu và làm chủ bất kỳ phần nào của thư viện Playwright.
