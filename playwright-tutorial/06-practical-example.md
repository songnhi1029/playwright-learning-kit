# 06: Ví dụ thực tế

Bây giờ, hãy kết hợp tất cả những gì chúng ta đã học được vào một ví dụ thực tế. Chúng ta sẽ viết một bài kiểm tra hoàn chỉnh để tìm kiếm một cái gì đó trên trang web Playwright.

## Kịch bản kiểm tra

1.  Mở trang web `playwright.dev`.
2.  Nhấp vào liên kết "Get started".
3.  Xác minh rằng chúng ta đang ở trang tài liệu.
4.  Tìm kiếm "locators" trong thanh tìm kiếm tài liệu.
5.  Xác minh rằng trang kết quả tìm kiếm hiển thị văn bản "Locators".

## Mã kiểm tra

Đây là mã kiểm tra hoàn chỉnh cho kịch bản trên. Bạn có thể đặt mã này vào một tệp mới, ví dụ: `tests/example-tutorial.spec.ts`.

```typescript
import { test, expect } from '@playwright/test';

test('search for locators', async ({ page }) => {
  // 1. Mở trang web playwright.dev
  await page.goto('https://playwright.dev/');

  // 2. Nhấp vào liên kết "Get started"
  await page.getByRole('link', { name: 'Get started' }).click();

  // 3. Xác minh rằng chúng ta đang ở trang tài liệu
  await expect(page).toHaveURL(/.*docs/);

  // 4. Tìm kiếm "locators" trong thanh tìm kiếm tài liệu
  const searchInput = page.getByPlaceholder('Search docs');
  await searchInput.fill('locators');
  await searchInput.press('Enter');

  // 5. Xác minh rằng trang kết quả tìm kiếm hiển thị văn bản "Locators"
  // Chúng ta sử dụng getByRole để tìm tiêu đề chính trên trang kết quả
  await expect(page.getByRole('heading', { name: 'Locators' })).toBeVisible();
});
```

## Chạy bài kiểm tra

Để chạy bài kiểm tra này, bạn có thể sử dụng lệnh sau:

```bash
npx playwright test tests/example-tutorial.spec.ts
```

## Kết luận

Xin chúc mừng! Bạn đã viết thành công một bài kiểm tra Playwright hoàn chỉnh. Bạn đã học cách điều hướng, sử dụng các bộ định vị, thực hiện các hành động và viết các xác nhận.

Đây chỉ là phần nổi của tảng băng chìm. Playwright có nhiều tính năng mạnh mẽ hơn nữa để khám phá, chẳng hạn như Trace Viewer, Codegen, mocking, v.v. Hãy tiếp tục khám phá tài liệu chính thức để tìm hiểu thêm.
