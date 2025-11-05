# Bài học: Xử lý các lỗi có chủ đích (Expected Failures) với `try...catch`

Trong kiểm thử tự động, hầu hết chúng ta mong đợi tất cả các `expect` (assertion) sẽ thành công. Nhưng sẽ ra sao nếu một phần của logic test lại là **mong đợi một `expect` thất bại** và vẫn muốn thực thi các bước tiếp theo? Bài học này sẽ đi sâu vào kỹ thuật sử dụng `try...catch` để xử lý các kịch bản nâng cao này.

---

### Phần 1: Vấn đề - `expect` thất bại sẽ dừng toàn bộ Test Case

Như chúng ta đã biết, khi một `expect` thất bại, nó sẽ ném ra một lỗi (error) và ngay lập tức dừng việc thực thi của test case hiện tại. Đây là hành vi tiêu chuẩn và mong muốn trong 99% các trường hợp.

Tuy nhiên, trong một số kịch bản đặc biệt, việc một `expect` thất bại lại là điều chúng ta mong muốn xảy ra. Ví dụ:

*   Bạn muốn xác nhận rằng một phần tử **không nên tồn tại**, và bạn muốn kiểm tra xem `expect(...).toBeAttached()` có thất bại hay không.
*   Bạn muốn kiểm tra khả năng phục hồi của hệ thống khi một hành động không thành công.

Nếu chỉ viết `expect` như bình thường, test case sẽ dừng lại và báo lỗi, không cho phép bạn chạy các bước tiếp theo.

---

### Phần 2: Giải pháp - Bắt lỗi của `expect` bằng `try...catch`

Để giải quyết vấn đề này, chúng ta có thể sử dụng khối lệnh `try...catch` của JavaScript/TypeScript. Ý tưởng là:

1.  **`try`**: Đặt câu lệnh `expect` mà bạn mong đợi sẽ thất bại vào trong khối `try`.
2.  **`catch`**: Nếu `expect` trong `try` ném ra lỗi, khối `catch` sẽ "bắt" lấy lỗi đó, ngăn không cho nó làm dừng toàn bộ test case. Code bên trong khối `catch` sẽ được thực thi.
3.  **Sau `try...catch`**: Code sau khối `try...catch` sẽ tiếp tục được thực thi như bình thường.

---

### Phần 3: Cấu trúc và ví dụ chi tiết

Đây là cấu trúc hoàn chỉnh để xử lý một `expect` được mong đợi là sẽ thất bại và tiếp tục thực thi.

**Kịch bản:** Chúng ta đang ở một trang mà chúng ta **mong đợi không có** liên kết "Form Authentication". Chúng ta sẽ cố gắng tìm và khẳng định nó hiển thị, và mong đợi `expect(...).toBeVisible()` sẽ thất bại.

```typescript
import { test, expect } from '@playwright/test';

test('Xử lý expect thất bại khi không tìm thấy link và tiếp tục chạy', async ({ page }) => {
  // Điều hướng đến một trang mà chúng ta biết không có link "Form Authentication"
  // Ví dụ: trang chủ của the-internet.herokuapp.com
  await page.goto('http://the-internet.herokuapp.com/');

  let expectedFailureOccurred = false; // Biến cờ để xác nhận lỗi đã xảy ra

  try {
    // Đây là expect mà chúng ta MONG ĐỢI nó sẽ thất bại
    // vì link "Form Authentication" không có trên trang chủ.
    const formAuthLink = page.getByRole('link', { name: 'Form Authentication' });
    await expect(formAuthLink).toBeVisible({ timeout: 1000 }); // Đặt timeout ngắn để fail nhanh

    // Nếu code chạy đến được đây, nghĩa là expect trên đã PASS một cách bất ngờ.
    // Điều này có nghĩa là link "Form Authentication" đã hiển thị, ngược với mong đợi của test.
    // Chúng ta cần báo lỗi nếu expect này pass.
    throw new Error('Lỗi logic: Link "Form Authentication" đáng lẽ phải ẩn nhưng lại hiển thị!');

  } catch (error) {
    // Khối này sẽ chạy khi `expect(...).toBeVisible()` thất bại (như mong đợi).
    console.log('Đã bắt được lỗi từ expect thất bại như dự kiến:', error.message);
    expectedFailureOccurred = true; // Đặt cờ là lỗi đã xảy ra
  }

  // Code sau khối try...catch vẫn tiếp tục được thực thi
  console.log('Tiếp tục thực thi các chức năng sau khi bắt lỗi thành công...');

  // BẮT BUỘC: Khẳng định rằng lỗi đã thực sự xảy ra như mong đợi.
  // Nếu không có bước này, test sẽ pass ngay cả khi expect trong try không thất bại.
  expect(expectedFailureOccurred).toBe(true);

  // Các chức năng/expect khác mà bạn muốn thực hiện sau đó
  const welcomeHeading = page.getByRole('heading', { name: 'Welcome to the-internet' });
  await expect(welcomeHeading).toBeVisible();

  console.log('Đã hoàn thành các bước tiếp theo.');
});

