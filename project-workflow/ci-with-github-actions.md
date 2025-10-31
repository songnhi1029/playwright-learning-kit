# CI với GitHub Actions cho Playwright


### Bây giờ, tôi sẽ tạo tệp playwright.yml với nội dung cấu hình CI. Tệp này sẽ định
  nghĩa một quy trình thực hiện các bước sau trên một máy chủ ảo mỗi khi bạn đẩy mã:

   1. Lấy mã nguồn mới nhất.
   2. Cài đặt Node.js.
   3. Cài đặt các gói phụ thuộc của dự án.
   4. Cài đặt các trình duyệt Playwright.
   5. Chạy các bài kiểm tra.
   6. Tải lên báo cáo kết quả để bạn có thể xem.

### Điều gì sẽ xảy ra tiếp theo?

  1. Bây giờ, bạn hãy add, commit, và push những thay đổi này (bao gồm cả thư mục
    .github mới) lên kho lưu trữ GitHub của bạn.
  2. Ngay sau khi bạn đẩy mã lên, hãy truy cập kho lưu trữ của bạn trên GitHub và nhấp
    vào tab "Actions".
  3. Bạn sẽ thấy một workflow mới đang chạy. Đây chính là quy trình CI của chúng ta
    đang thực thi các bài kiểm tra Playwright trên một máy chủ ảo của GitHub.

### Từ bây giờ, mỗi khi bạn đẩy mã lên nhánh main, các bài kiểm tra sẽ được tự động
chạy, đảm bảo rằng không có thay đổi nào làm hỏng chức năng hiện có của ứng dụng.

---

Continuous Integration (CI) là một quy trình tự động xây dựng và kiểm thử mã nguồn mỗi khi có một thay đổi mới. Việc thiết lập CI cho dự án Playwright của bạn đảm bảo rằng các bài kiểm tra luôn được chạy một cách nhất quán, giúp phát hiện lỗi sớm.

Chúng ta đã sử dụng GitHub Actions, một công cụ CI/CD được tích hợp sâu vào GitHub, để tự động hóa việc này.

---

### Tệp workflow `.github/workflows/playwright.yml`

Đây là tệp cấu hình chính cho quy trình CI của chúng ta. Hãy cùng phân tích từng phần:

```yaml
name: Playwright Tests
```
*   **`name`**: Tên của workflow, sẽ hiển thị trên tab "Actions" của GitHub.

```yaml
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
```
*   **`on`**: Định nghĩa các sự kiện sẽ kích hoạt workflow này.
    *   `push: branches: [ main ]`: Chạy workflow mỗi khi có ai đó đẩy mã lên nhánh `main`.
    *   `pull_request: branches: [ main ]`: Chạy workflow mỗi khi có ai đó tạo một Pull Request nhắm vào nhánh `main`.

```yaml
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
```
*   **`jobs`**: Nơi định nghĩa các công việc cần thực hiện. Chúng ta có một job tên là `test`.
    *   `timeout-minutes`: Thời gian tối đa cho phép job chạy (để tránh các lỗi treo vô hạn).
    *   `runs-on`: Loại máy chủ ảo sẽ được sử dụng để chạy job. `ubuntu-latest` là một lựa chọn phổ biến và tiết kiệm chi phí.

```yaml
    steps:
```
*   **`steps`**: Một chuỗi các hành động tuần tự mà job sẽ thực hiện.

    1.  **`uses: actions/checkout@v4`**: Hành động này sẽ tải mã nguồn từ kho lưu trữ của bạn vào máy chủ ảo.

    2.  **`uses: actions/setup-node@v4`**: Cài đặt Node.js vào máy chủ ảo để có thể chạy các lệnh `npm` và `npx`.

    3.  **`run: npm ci`**: Cài đặt tất cả các gói phụ thuộc được định nghĩa trong `package-lock.json`. Lệnh `npm ci` được khuyến nghị cho CI vì nó nhanh hơn và đảm bảo cài đặt chính xác phiên bản của các gói, tránh các lỗi không mong muốn.

    4.  **`run: npx playwright install --with-deps`**: Cài đặt các trình duyệt (Chromium, Firefox, WebKit) và các phụ thuộc hệ thống cần thiết cho chúng trên máy chủ Ubuntu.

    5.  **`run: npx playwright test`**: Đây là bước chính, thực thi tất cả các bài kiểm tra Playwright của bạn.

    6.  **`uses: actions/upload-artifact@v4`**: Hành động này rất quan trọng. Nó sẽ lấy thư mục `playwright-report` (chứa báo cáo HTML) và lưu nó lại dưới dạng một "artifact" của lần chạy. `if: always()` đảm bảo rằng báo cáo luôn được tải lên, ngay cả khi các bài kiểm tra thất bại.

---

### Cách xem kết quả

1.  Sau khi đẩy mã lên GitHub, hãy vào kho lưu trữ của bạn và nhấp vào tab **"Actions"**.
2.  Bạn sẽ thấy workflow "Playwright Tests" đang chạy hoặc đã hoàn thành.
3.  Nhấp vào một lần chạy cụ thể để xem chi tiết các bước.
4.  Sau khi lần chạy hoàn tất, ở cuối trang tóm tắt, bạn sẽ thấy một mục **"Artifacts"**. Tại đây, bạn có thể tải xuống `playwright-report` dưới dạng tệp zip. Giải nén và mở tệp `index.html` để xem báo cáo kiểm thử chi tiết, giống như khi bạn chạy ở máy cục bộ.
