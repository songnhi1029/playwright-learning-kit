# 11: Page Object Model (POM)

Page Object Model (POM) là một mẫu thiết kế phổ biến trong tự động hóa kiểm thử. Nó giúp tạo ra các bộ kiểm tra có thể tái sử dụng và dễ bảo trì hơn bằng cách tách logic kiểm tra khỏi các chi tiết triển khai của trang.

## Vấn đề là gì?

Khi ứng dụng của bạn phát triển, các bài kiểm tra của bạn cũng vậy. Nếu bạn viết các bộ chọn và logic tương tác trực tiếp trong các tệp kiểm tra của mình, bạn có thể gặp phải các vấn đề sau:

*   **Lặp lại mã**: Bạn có thể viết cùng một bộ chọn ở nhiều nơi.
*   **Khó bảo trì**: Nếu giao diện người dùng thay đổi, bạn phải cập nhật các bộ chọn ở nhiều nơi.
*   **Khó đọc**: Các bài kiểm tra có thể trở nên lộn xộn với các chi tiết triển khai.

## Giải pháp: Page Object Model

Với POM, bạn tạo một lớp cho mỗi trang hoặc thành phần trong ứng dụng của mình. Lớp này sẽ chứa:

*   **Locators**: Các bộ định vị cho các phần tử trên trang.
*   **Methods**: Các phương thức để tương tác với trang (ví dụ: `login`, `search`).

Các bài kiểm tra của bạn sau đó sẽ sử dụng các phương thức từ các lớp đối tượng trang này, thay vì tương tác trực tiếp với `page`.

## Ví dụ về POM

Giả sử chúng ta có một trang đăng nhập. Thay vì viết mã này trong bài kiểm tra của mình:

```typescript
// Trong tệp kiểm tra
await page.getByLabel('Username').fill('user');
await page.getByLabel('Password').fill('pass');
await page.getByRole('button', { name: 'Sign in' }).click();
```

Chúng ta có thể tạo một lớp `LoginPage`:

**`tests/pages/LoginPage.ts`**
```typescript
import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
```

Bây giờ, bài kiểm tra của bạn trở nên sạch sẽ và dễ đọc hơn nhiều:

**`tests/login.spec.ts`**
```typescript
import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('should allow a user to log in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('user', 'pass');
  // ... xác nhận rằng đăng nhập thành công
});
```

## Lợi ích của POM

*   **Khả năng tái sử dụng**: Logic tương tác được định nghĩa ở một nơi và có thể được sử dụng bởi nhiều bài kiểm tra.
*   **Khả năng bảo trì**: Nếu một bộ chọn thay đổi, bạn chỉ cần cập nhật nó ở một nơi (trong lớp đối tượng trang).
*   **Khả năng đọc**: Các bài kiểm tra trở nên giống như các kịch bản của người dùng hơn là mã kỹ thuật.

Bắt đầu với POM có thể mất nhiều công sức hơn một chút, nhưng nó sẽ mang lại hiệu quả lớn khi bộ kiểm tra của bạn phát triển.

---

## Bài tập thực hành

1.  **Tạo một Page Object đơn giản:** Tạo một lớp Page Object cho trang `http://the-internet.herokuapp.com/checkboxes`.
    *   Lớp nên có các bộ định vị cho hai hộp kiểm.
    *   Thêm các phương thức để tương tác với các hộp kiểm (ví dụ: `checkFirstCheckbox()`).
2.  **Sử dụng Page Object:** Viết một bài kiểm tra sử dụng lớp Page Object mới của bạn để tương tác với các hộp kiểm và xác nhận trạng thái của chúng.
