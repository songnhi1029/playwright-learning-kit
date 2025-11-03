# Bài học: Hiểu rõ các Locators `has` và `getByLabel` trong Playwright

Việc chọn đúng bộ định vị (locator) là chìa khóa để viết các bài kiểm thử tự động ổn định và dễ đọc trong Playwright. Bài học này sẽ làm rõ cách sử dụng hai loại locator quan trọng: tùy chọn `has` trong `page.locator()` và `page.getByLabel()`.

---

### Phần 1: Hiểu về tùy chọn `has` trong `page.locator()`

Tùy chọn `has` được sử dụng để lọc các phần tử được tìm thấy bởi selector chính, dựa trên việc chúng có chứa một phần tử con cụ thể hay không.

#### Nguyên tắc quan trọng:

*   Giá trị của `has` phải là một **Locator**, chứ không phải một chuỗi văn bản.
*   Nó giúp bạn định vị một phần tử cha dựa trên sự tồn tại của một phần tử con bên trong nó.

#### Ví dụ sai (và giải thích):

```typescript
// SAI: 'username' là một chuỗi, không phải Locator
const locatorInputUsername = page.locator('input', { has: 'username' }); 
```

Trong ví dụ trên, `has: 'username'` là không đúng cú pháp. Playwright sẽ không hiểu `'username'` là một Locator và có thể báo lỗi hoặc không tìm thấy phần tử.

#### Ví dụ đúng về cách dùng `has`:

```typescript
// Tìm một thẻ <div> mà bên trong nó có chứa một thẻ <button>
const containerWithButton = page.locator('div', { has: page.locator('button') });

// Tìm một thẻ <li> mà bên trong nó có chứa một thẻ <span> có class là 'item-name'
const listItemWithName = page.locator('li', { has: page.locator('span.item-name') });

// Tìm một thẻ <section> mà bên trong nó có một thẻ <h2> chứa văn bản "Welcome"
const welcomeSection = page.locator('section', { has: page.locator('h2', { hasText: 'Welcome' }) });
```

---

### Phần 2: Sử dụng `page.getByLabel()`

`page.getByLabel()` là một trong những bộ định vị ưu tiên khả năng tiếp cận (accessibility-first locators) của Playwright. Nó được thiết kế để tìm các phần tử điều khiển form (như `input`, `textarea`, `select`) dựa trên văn bản của thẻ `<label>` liên kết với chúng.

#### Cách `<label>` liên kết với `input` trong HTML:

Có hai cách chính để liên kết một thẻ `<label>` với một `input` trong HTML, và `getByLabel()` hỗ trợ cả hai:

1.  **Liên kết rõ ràng (Explicit Association):** Sử dụng thuộc tính `for` trong thẻ `<label>` và thuộc tính `id` trong thẻ `<input>`. Giá trị của `for` phải khớp với giá trị của `id`.
    ```html
    <label for="username-field">Username</label>
    <input type="text" id="username-field" name="username">
    ```
    **Playwright:** `page.getByLabel('Username')` sẽ tìm thấy `<input type="text" id="username-field">`.

2.  **Liên kết ngầm định (Implicit Association):** Thẻ `<input>` được đặt bên trong thẻ `<label>`.
    ```html
    <label>
      Email:
      <input type="email" name="email">
    </label>
    ```
    **Playwright:** `page.getByLabel('Email:')` (hoặc `page.getByLabel('Email')`) sẽ tìm thấy `<input type="email" name="email">`.

#### Lợi ích của `page.getByLabel()`:

*   **Ưu tiên khả năng tiếp cận:** Mô phỏng cách người dùng thực tế và các công nghệ hỗ trợ (như trình đọc màn hình) tương tác với các trường form.
*   **Ổn định:** Ít bị ảnh hưởng bởi sự thay đổi của các thuộc tính CSS class hoặc cấu trúc DOM phức tạp.
*   **Dễ đọc:** Code test trở nên trực quan hơn, dễ hiểu hơn về mục đích của locator.

---

### Tổng kết

*   Sử dụng tùy chọn `has` trong `page.locator()` khi bạn cần tìm một phần tử cha dựa trên sự tồn tại của một phần tử con bên trong nó. Hãy nhớ rằng `has` nhận một **Locator** làm đối số.
*   Sử dụng `page.getByLabel()` khi bạn muốn định vị các trường form (input, textarea, select) dựa trên văn bản của thẻ `<label>` liên kết với chúng. Đây là một cách tiếp cận mạnh mẽ và đáng tin cậy.

Việc lựa chọn locator phù hợp sẽ giúp bạn viết các bài test Playwright hiệu quả, dễ bảo trì và đáng tin cậy hơn rất nhiều.
