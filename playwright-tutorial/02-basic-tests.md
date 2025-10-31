# 02: Viết bài kiểm tra cơ bản

Bây giờ bạn đã cài đặt Playwright, hãy cùng tìm hiểu cấu trúc của một bài kiểm tra Playwright cơ bản.

## Cấu trúc của một tệp kiểm tra

Các bài kiểm tra Playwright được viết bằng JavaScript hoặc TypeScript và được đặt trong các tệp có đuôi `.spec.ts` (hoặc `.spec.js`).

Mỗi tệp kiểm tra có thể chứa một hoặc nhiều bài kiểm tra. Đây là một ví dụ đơn giản:

```typescript
import { test, expect } from '@playwright/test';

test('my first test', async ({ page }) => {
  // Your test code goes here
});
```

*   `import { test, expect } from '@playwright/test';`: Dòng này nhập các hàm `test` và `expect` từ thư viện Playwright.
*   `test(...)`: Hàm này định nghĩa một bài kiểm tra mới. Nó có hai đối số: tên của bài kiểm tra và một hàm chứa mã kiểm tra.
*   `async ({ page }) => { ... }`: Hàm này là nơi bạn viết logic kiểm tra của mình. Nó là một hàm không đồng bộ và nhận một đối tượng có chứa `page` làm đối số.
*   `page`: Đây là đối tượng quan trọng nhất trong Playwright. Nó đại diện cho một tab trình duyệt và cung cấp các phương thức để tương tác với trang web.

## Điều hướng đến một trang

Để bắt đầu tương tác với một trang web, bạn cần điều hướng đến nó bằng phương thức `page.goto()`:

```typescript
await page.goto('https://playwright.dev/');
```

## Thực hiện một xác nhận

Sau khi thực hiện một hành động, bạn thường muốn xác minh rằng trang đang ở trạng thái mong đợi. Đây được gọi là một xác nhận.

Playwright sử dụng hàm `expect` cho các xác nhận. Ví dụ: để xác minh rằng tiêu đề của trang có chứa một văn bản cụ thể:

```typescript
await expect(page).toHaveTitle(/Playwright/);
```

---

## Bài tập thực hành

1.  **Kiểm tra tiêu đề trang khác:** Viết một bài kiểm tra mới điều hướng đến `https://www.google.com` và xác nhận rằng tiêu đề của trang là "Google".
2.  **Kiểm tra URL:** Viết một bài kiểm tra điều hướng đến `https://github.com` và sử dụng `expect(page).toHaveURL()` để xác nhận rằng URL chứa "github.com".

**Tệp tiếp theo:** `03-locators.md`
