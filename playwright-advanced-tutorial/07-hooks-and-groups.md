# 07: Hooks và Nhóm kiểm tra

Khi bộ kiểm tra của bạn phát triển, bạn sẽ cần các cách để quản lý trạng thái và tổ chức các bài kiểm tra của mình tốt hơn. Hooks và nhóm kiểm tra giúp bạn làm điều đó.

## Hooks

Hooks là các hàm chạy trước hoặc sau các bài kiểm tra của bạn. Chúng rất hữu ích để thực hiện các tác vụ thiết lập và dọn dẹp.

*   `beforeEach`: Chạy trước mỗi bài kiểm tra trong một tệp.
*   `afterEach`: Chạy sau mỗi bài kiểm tra trong một tệp.
*   `beforeAll`: Chạy một lần trước tất cả các bài kiểm tra trong một tệp.
*   `afterAll`: Chạy một lần sau tất cả các bài kiểm tra trong một tệp.

**Ví dụ:**

```typescript
import { test, expect } from '@playwright/test';

// Chạy một lần trước tất cả các bài kiểm tra
let someResource;
beforeAll(async () => {
  // Thiết lập một tài nguyên, ví dụ: kết nối cơ sở dữ liệu
  someResource = await connectToDatabase();
});

// Chạy trước mỗi bài kiểm tra
beforeEach(async ({ page }) => {
  // Điều hướng đến một trang cụ thể trước mỗi bài kiểm tra
  await page.goto('https://example.com/dashboard');
});

test('my first test', async ({ page }) => {
  // ...
});

test('my second test', async ({ page }) => {
  // ...
});

// Chạy một lần sau tất cả các bài kiểm tra
afterAll(async () => {
  // Dọn dẹp tài nguyên
  await someResource.disconnect();
});
```

## Nhóm kiểm tra với `test.describe`

Bạn có thể nhóm các bài kiểm tra liên quan lại với nhau bằng cách sử dụng `test.describe`. Điều này giúp tổ chức các bài kiểm tra của bạn và cũng cho phép bạn áp dụng hooks cho một nhóm cụ thể.

**Ví dụ:**

```typescript
import { test, expect } from '@playwright/test';

test.describe('Todo App', () => {
  beforeEach(async ({ page }) => {
    await page.goto('/todo');
  });

  test('should add a todo', async ({ page }) => {
    // ...
  });

  test('should complete a todo', async ({ page }) => {
    // ...
  });
});
```

Trong ví dụ này, hook `beforeEach` sẽ chỉ chạy cho các bài kiểm tra bên trong nhóm "Todo App".

---

## Bài tập thực hành

1.  **Tạo một nhóm:** Tạo một tệp kiểm tra mới. Bên trong, tạo một nhóm `test.describe('Checkbox Tests', ...)`.
2.  **Sử dụng `beforeEach`:** Thêm một hook `beforeEach` vào nhóm của bạn để điều hướng đến `http://the-internet.herokuapp.com/checkboxes` trước mỗi bài kiểm tra.
3.  **Viết hai bài kiểm tra:**
    *   Bài kiểm tra 1: Xác nhận rằng hộp kiểm đầu tiên chưa được chọn theo mặc định.
    *   Bài kiểm tra 2: Xác nhận rằng hộp kiểm thứ hai đã được chọn theo mặc định.

**Tệp tiếp theo:** `08-authentication.md`
