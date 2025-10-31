# Các ứng dụng thực tiễn của Page Object Model (POM)

Page Object Model (POM) không chỉ là một mẫu thiết kế cứng nhắc, mà là một triết lý có thể được áp dụng một cách linh hoạt trong nhiều kịch bản khác nhau, từ cơ bản đến rất phức tạp. Dưới đây là các ứng dụng thực tiễn của POM, được sắp xếp theo mức độ phức tạp.

---

### 1. Ứng dụng cơ bản: Các trang riêng biệt (Pages)

*   **Kịch bản:** Một trang web có các trang riêng biệt như Trang chủ, Trang giới thiệu, Trang liên hệ.
*   **Cách áp dụng:** Đây là cách sử dụng kinh điển nhất. Bạn tạo một lớp cho mỗi trang: `HomePage.ts`, `AboutPage.ts`, `ContactPage.ts`.
*   **Lợi ích:**
    *   **Tổ chức:** Tất cả các bộ định vị và phương thức liên quan đến một trang được gom lại một nơi.
    *   **Dễ tìm kiếm:** Khi cần tìm một thứ gì đó liên quan đến trang chủ, bạn biết chính xác phải mở tệp `HomePage.ts`.

---

### 2. Ứng dụng thực tế: Các thành phần tái sử dụng (Reusable Components)

*   **Kịch bản:** Các phần của giao diện người dùng xuất hiện trên nhiều trang, ví dụ:
    *   `Header` (Đầu trang): Chứa logo, menu điều hướng, nút đăng nhập, biểu tượng giỏ hàng.
    *   `Footer` (Chân trang): Chứa các liên kết thông tin, bản quyền.
    *   `Search Bar` (Thanh tìm kiếm).
    *   `Cookie Banner` (Thông báo cookie).
*   **Cách áp dụng:** Tạo các lớp "Component Object" cho các thành phần này: `HeaderComponent.ts`, `FooterComponent.ts`. Sau đó, các Page Object lớn hơn sẽ *bao gồm* các component này.
*   **Ví dụ:**
    ```typescript
    // tests/components/HeaderComponent.ts
    export class HeaderComponent {
      // ... locators và methods cho header
      async goToCart() { /* ... */ }
    }

    // tests/pages/HomePage.ts
    import { HeaderComponent } from '../components/HeaderComponent';
    export class HomePage {
      readonly header: HeaderComponent;
      constructor(page: Page) {
        this.header = new HeaderComponent(page);
      }
    }

    // Trong bài kiểm tra:
    await homePage.header.goToCart();
    ```
*   **Lợi ích:** **DRY (Don't Repeat Yourself)**. Nếu biểu tượng giỏ hàng trong header thay đổi, bạn chỉ cần cập nhật nó ở một nơi duy nhất: `HeaderComponent.ts`.

---

### 3. Ứng dụng nâng cao: Các mục trong một danh sách động (Items in a Dynamic List)

*   **Kịch bản:** Một danh sách các kết quả tìm kiếm, một danh sách sản phẩm, hoặc một bảng dữ liệu với nhiều hàng. Mỗi mục/hàng lại có các nút tương tác riêng (ví dụ: Sửa, Xóa, Xem chi tiết).
*   **Cách áp dụng:** Tạo một lớp đại diện cho **một mục duy nhất** trong danh sách đó, ví dụ: `ProductItemComponent.ts` hoặc `TableRowComponent.ts`. Page Object chính (ví dụ: `ProductListPage`) sẽ có một phương thức để lấy một component cụ thể dựa trên tên hoặc ID.
*   **Ví dụ:**
    ```typescript
    // tests/components/ProductItemComponent.ts
    export class ProductItemComponent {
      constructor(private readonly rootLocator: Locator) {}
      async addToCart() { await this.rootLocator.getByRole('button', { name: 'Add to cart' }).click(); }
      async getPrice() { /* ... */ }
    }

    // tests/pages/ProductListPage.ts
    export class ProductListPage {
      private getProductByName(name: string): Locator {
        return this.page.locator('.inventory_item', { hasText: name });
      }

      product(name: string): ProductItemComponent {
        return new ProductItemComponent(this.getProductByName(name));
      }
    }

    // Trong bài kiểm tra:
    await productListPage.product('Sauce Labs Backpack').addToCart();
    ```
*   **Lợi ích:** Đóng gói logic phức tạp của việc tương tác với các mục lặp lại. Bài kiểm tra trở nên rất dễ đọc, giống như bạn đang thao tác với các đối tượng trong thế giới thực.

---

### 4. Ứng dụng chuyên sâu: Các Modal và Dialog

*   **Kịch bản:** Các hộp thoại xác nhận ("Bạn có chắc chắn muốn xóa không?"), các modal đăng ký nhận tin, các cửa sổ chọn ngày tháng.
*   **Cách áp dụng:** Tạo một lớp riêng cho mỗi loại dialog, ví dụ: `ConfirmationDialog.ts`. Phương thức kích hoạt dialog (ví dụ: `clickDeleteButton()`) sẽ trả về một instance của lớp dialog đó.
*   **Ví dụ:**
    ```typescript
    // tests/pages/SettingsPage.ts
    import { ConfirmationDialog } from '../components/ConfirmationDialog';
    export class SettingsPage {
      async deleteAccount(): Promise<ConfirmationDialog> {
        await this.page.getByRole('button', { name: 'Delete Account' }).click();
        return new ConfirmationDialog(this.page);
      }
    }

    // tests/components/ConfirmationDialog.ts
    export class ConfirmationDialog {
      async confirm() { await this.page.getByRole('button', { name: 'Yes, Delete' }).click(); }
      async cancel() { /* ... */ }
    }

    // Trong bài kiểm tra:
    const confirmationDialog = await settingsPage.deleteAccount();
    await confirmationDialog.confirm();
    ```
*   **Lợi ích:** Làm cho việc xử lý các luồng công việc không đồng bộ và các cửa sổ bật lên trở nên cực kỳ rõ ràng, có cấu trúc và dễ bảo trì.

---

Bằng cách áp dụng POM theo những cách này, bạn có thể xây dựng một bộ kiểm thử tự động mạnh mẽ, có cấu trúc tốt và có khả năng thích ứng với sự thay đổi của ứng dụng một cách dễ dàng.