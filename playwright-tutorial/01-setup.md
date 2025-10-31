# 01: Cài đặt Playwright

Trước khi chúng ta có thể viết các bài kiểm tra, chúng ta cần cài đặt Playwright. Playwright được phân phối dưới dạng gói NPM.

## Khởi tạo một dự án Node.js

Nếu bạn chưa có, hãy tạo một thư mục mới cho dự án của bạn và khởi tạo một dự án Node.js:

```bash
npm init -y
```

## Cài đặt Playwright

Cách dễ nhất để bắt đầu với Playwright là sử dụng trình khởi tạo của nó. Lệnh này sẽ cài đặt Playwright, các trình duyệt cần thiết và tạo các tệp cấu hình mặc định.

```bash
npm init playwright@latest
```

Trong quá trình cài đặt, bạn sẽ được hỏi một vài câu hỏi. Bạn có thể chọn các tùy chọn mặc định.

Sau khi cài đặt xong, bạn sẽ thấy các tệp sau trong dự án của mình:

*   `playwright.config.ts`: Tệp cấu hình cho Playwright.
*   `tests/`: Một thư mục chứa các tệp kiểm tra ví dụ.
*   `package.json`: Tệp kê khai dự án của bạn, bây giờ sẽ bao gồm Playwright.

## Chạy các bài kiểm tra

Bạn có thể chạy các bài kiểm tra của mình bằng lệnh sau:

```bash
npx playwright test
```

Lệnh này sẽ tìm tất cả các tệp kiểm tra trong dự án của bạn và thực thi chúng.

**Tệp tiếp theo:** `02-basic-tests.md`
