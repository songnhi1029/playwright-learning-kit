# Page Object Model (POM) - Hướng dẫn chuyên sâu

Đây là một tài liệu chuyên sâu về Page Object Model (POM), một trong những mẫu thiết kế quan trọng nhất để xây dựng các bộ kiểm thử tự động có khả năng mở rộng và bảo trì.

---

### 1. Tại sao POM lại quan trọng? "Nỗi đau" khi không có POM

Hãy xem xét một bài kiểm tra không sử dụng POM:

```typescript
// tests/bad-example.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Sauce Demo without POM', () => {
  test('should add an item to the cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('should sort items by price', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="product_sort_container"]').selectOption('hilo');
    // ... more logic
  });
});
```

**Vấn đề:**
*   **Lặp lại mã:** Các bước đăng nhập và các bộ định vị (locators) được lặp lại ở cả hai bài kiểm tra.
*   **Khó bảo trì:** Nếu `data-test="username"` thay đổi, bạn phải sửa nó ở **mọi nơi** nó được sử dụng.
*   **Khó đọc:** Bài kiểm tra bị trộn lẫn giữa logic nghiệp vụ ("thêm vào giỏ hàng") và chi tiết triển khai ("điền vào locator X").

---

### 2. Các nguyên tắc cốt lõi của một POM tốt

1.  **Một Lớp cho mỗi Trang/Thành phần:** Mỗi tệp Page Object nên đại diện cho một trang hoặc một thành phần có thể tái sử dụng trên giao diện người dùng.

2.  **Không chứa `expect` (Assertions):** Các lớp Page Object chỉ nên cung cấp các phương thức để tương tác với trang (ví dụ: `.login()`, `.addItemToCart()`). Việc xác nhận kết quả (`expect`) nên được thực hiện trong các tệp kiểm tra (`.spec.ts`). Điều này giúp tách biệt rõ ràng giữa "hành động" và "xác nhận".

3.  **Phương thức trả về `this` hoặc một Page Object khác:**
    *   Nếu một hành động giữ người dùng ở lại trên cùng một trang, phương thức nên trả về `this` để cho phép "chaining" (gọi phương thức nối tiếp).
    *   Nếu một hành động đưa người dùng đến một trang mới, phương thức nên trả về một instance của Page Object cho trang mới đó. Ví dụ: `loginPage.login()` nên trả về một `new InventoryPage(page)`.

---

### 3. POM nâng cao: Component Objects

POM không chỉ dành cho các trang đầy đủ. Bạn có thể tạo các "Component Object" cho các thành phần được tái sử dụng trên nhiều trang.

*   **Ví dụ:** Một trang web có một `Header` (đầu trang) với giỏ hàng và menu, và một `Sidebar` (thanh bên) với các liên kết điều hướng. Bạn có thể tạo các lớp `HeaderComponent` và `SidebarComponent`.

*   Sau đó, các Page Object lớn hơn có thể bao gồm các component này:
    ```typescript
    import { HeaderComponent } from './components/HeaderComponent';

    export class InventoryPage {
      readonly header: HeaderComponent;

      constructor(page: Page) {
        this.page = page;
        this.header = new HeaderComponent(page);
      }
    }
    ```
    Trong bài kiểm tra, bạn có thể viết: `await inventoryPage.header.goToCart();`

---

### 4. Ví dụ thực tế hoàn chỉnh: `saucedemo.com`

**Cấu trúc thư mục:**
```
/tests
  /pages
    LoginPage.ts
    InventoryPage.ts
  saucedemo-pom.spec.ts
```

**`tests/pages/LoginPage.ts`**
```typescript
import { type Page, type Locator, expect } from '@playwright/test';
import { InventoryPage } from './InventoryPage';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string): Promise<InventoryPage> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    return new InventoryPage(this.page);
  }
}
```

**`tests/pages/InventoryPage.ts`**
```typescript
import { type Page, type Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
  }

  async addItemToCart(itemName: string) {
    // Xây dựng locator động dựa trên tên sản phẩm
    const addButton = this.page.locator(`[data-test="add-to-cart-${itemName}"]`);
    await addButton.click();
  }

  async getCartCount(): Promise<string> {
    return await this.cartBadge.innerText();
  }
}
```

**`tests/saucedemo-pom.spec.ts`**
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';

test.describe('Sauce Demo with POM', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    inventoryPage = await loginPage.login('standard_user', 'secret_sauce');
  });

  test('should add an item to the cart', async () => {
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('should sort items by price', async () => {
    await inventoryPage.sortDropdown.selectOption('hilo');
    // ... thêm logic xác nhận sắp xếp ở đây
  });
});
```

### Kết luận

Như bạn có thể thấy, các bài kiểm tra bây giờ trở nên **sạch sẽ, dễ đọc, và dễ bảo trì hơn rất nhiều**. Logic đăng nhập được đóng gói trong `LoginPage`, và các hành động trên trang sản phẩm nằm trong `InventoryPage`. Nếu một locator thay đổi, bạn chỉ cần sửa nó ở một nơi duy nhất.