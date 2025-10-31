# 09: Kiểm thử API

Playwright không chỉ giới hạn ở kiểm thử giao diện người dùng (UI). Nó cũng cung cấp các công cụ mạnh mẽ để kiểm thử API trực tiếp. Điều này rất hữu ích để chuẩn bị dữ liệu phụ trợ, xác minh các điểm cuối (endpoints) hoặc kiểm tra các kịch bản khó tái tạo thông qua giao diện người dùng.

## Đối tượng `request`

Playwright cung cấp một đối tượng `request` có thể được sử dụng để thực hiện các yêu cầu HTTP đến bất kỳ API nào.

**Ví dụ về một yêu cầu GET đơn giản:**

```typescript
import { test, expect } from '@playwright/test';

test('should get user data', async ({ request }) => {
  const response = await request.get('/api/users/1');
  
  // Kiểm tra xem yêu cầu có thành công không (mã trạng thái 2xx)
  expect(response.ok()).toBeTruthy();
  
  // Phân tích cú pháp phản hồi JSON và xác nhận dữ liệu
  const body = await response.json();
  expect(body.name).toBe('John Doe');
});
```

## Thực hiện các loại yêu cầu khác

Bạn có thể thực hiện tất cả các loại yêu cầu HTTP:

*   `request.post()`
*   `request.put()`
*   `request.delete()`
*   `request.patch()`
*   `request.head()`

**Ví dụ về một yêu cầu POST:**

```typescript
import { test, expect } from '@playwright/test';

test('should create a new post', async ({ request }) => {
  const response = await request.post('/api/posts', {
    data: {
      title: 'My new post',
      body: 'This is the body of the post.',
    },
  });

  expect(response.status()).toBe(201); // Created

  const body = await response.json();
  expect(body.title).toBe('My new post');
});
```

## Chia sẻ xác thực với các bài kiểm tra UI

Điều tuyệt vời là các yêu cầu API được thực hiện với đối tượng `request` sẽ tự động sử dụng trạng thái xác thực từ ngữ cảnh trình duyệt. Nếu bạn đã đăng nhập trong các bài kiểm tra UI của mình (sử dụng phương pháp từ bài học `08-authentication.md`), các yêu cầu API của bạn cũng sẽ được xác thực.

Điều này cho phép bạn kết hợp các bài kiểm tra UI và API một cách liền mạch. Ví dụ: bạn có thể tạo một tài nguyên bằng API và sau đó xác minh rằng nó xuất hiện chính xác trong giao diện người dùng.

---

## Bài tập thực hành

1.  **Lấy danh sách bài đăng:** Thực hiện một yêu cầu `GET` đến `https://jsonplaceholder.typicode.com/posts`. Xác nhận rằng phản hồi là `ok` và phần thân phản hồi là một mảng.
2.  **Tạo một bình luận:** Thực hiện một yêu cầu `POST` đến `https://jsonplaceholder.typicode.com/comments` để tạo một bình luận mới cho một bài đăng (`postId: 1`). Xác nhận rằng mã trạng thái là `201`.

**Tệp tiếp theo:** `10-trace-viewer.md`
