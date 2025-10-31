# 08: Xử lý xác thực

Trong hầu hết các ứng dụng web, bạn sẽ cần phải đăng nhập để kiểm tra các tính năng được bảo vệ. Việc đăng nhập nhiều lần cho mỗi bài kiểm tra là không hiệu quả. Playwright cung cấp một cách để lưu và tái sử dụng trạng thái xác thực.

## Tại sao phải tái sử dụng trạng thái xác thực?

*   **Tốc độ**: Bỏ qua bước đăng nhập lặp đi lặp lại giúp các bài kiểm tra của bạn chạy nhanh hơn đáng kể.
*   **Độc lập**: Các bài kiểm tra của bạn không còn phụ thuộc vào giao diện người dùng đăng nhập, giúp chúng ổn định hơn.

## Cách lưu trạng thái xác thực

Chiến lược là tạo một bài kiểm tra "thiết lập" riêng biệt để đăng nhập và lưu trạng thái xác thực (cookie và bộ nhớ cục bộ) vào một tệp.

**1. Tạo một tệp thiết lập xác thực:**

Tạo một tệp mới, ví dụ: `tests/auth.setup.ts`.

```typescript
import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Thực hiện các bước đăng nhập
  await page.goto('https://github.com/login');
  await page.getByLabel('Username or email address').fill('your-username');
  await page.getByLabel('Password').fill('your-password');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Chờ cho đến khi trang sau khi đăng nhập được tải
  await expect(page.getByRole('link', { name: 'Your profile' })).toBeVisible();

  // Lưu trạng thái xác thực vào tệp
  await page.context().storageState({ path: authFile });
});
```

**2. Cấu hình Playwright để sử dụng tệp thiết lập:**

Mở tệp `playwright.config.ts` của bạn và thực hiện các thay đổi sau:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    // Thiết lập: Chạy xác thực trước
    { name: 'setup', testMatch: /.*\.setup\.ts/ },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Sử dụng trạng thái đã lưu để xác thực
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    // ... các trình duyệt khác
  ],
});
```

**3. Viết các bài kiểm tra của bạn:**

Bây giờ, các bài kiểm tra của bạn sẽ tự động được xác thực. Bạn có thể truy cập trực tiếp các trang được bảo vệ.

```typescript
import { test, expect } from '@playwright/test';

test('my test', async ({ page }) => {
  await page.goto('https://github.com/settings/profile');
  await expect(page.locator('#user_profile_name')).toHaveValue('your-name');
});
```

Với thiết lập này, Playwright sẽ chạy bài kiểm tra `authenticate` một lần, lưu trạng thái đăng nhập và sau đó tất cả các bài kiểm tra khác sẽ sử dụng trạng thái đó, bỏ qua hoàn toàn giao diện người dùng đăng nhập.

**Tệp tiếp theo:** `09-api-testing.md`
