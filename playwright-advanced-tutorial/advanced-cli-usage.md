# Hướng dẫn sử dụng Playwright CLI chuyên sâu

Đây là bản hướng dẫn chuyên sâu về cách kết hợp các cờ (flags) và tùy chọn của Playwright CLI để giải quyết các kịch bản phức tạp trong quá trình phát triển và kiểm thử.

---

### 1. Chuyên sâu về `npx playwright test`

Lệnh `test` là lệnh mạnh mẽ nhất, và bạn có thể kết hợp rất nhiều cờ để tinh chỉnh việc chạy kiểm thử.

#### Kết hợp các bộ lọc

Bạn có thể kết hợp bộ lọc theo tệp, theo tên, và theo dự án để chạy chính xác những gì bạn muốn.

*   **Kịch bản:** Chỉ chạy các bài kiểm tra có chứa từ "Login" trong thư mục `tests/api`, và chỉ trên trình duyệt `chromium`.
    ```bash
    npx playwright test tests/api/ --project=chromium -g "Login"
    ```

*   **Kịch bản:** Chạy tất cả các bài kiểm tra ngoại trừ những bài có tag `@slow`.
    ```bash
    npx playwright test --grep-invert "@slow"
    ```

#### Kiểm soát đầu ra và báo cáo

*   **Kịch bản:** Chạy kiểm thử và tạo một báo cáo dạng `junit` (phổ biến cho các hệ thống CI) và lưu vào một thư mục tùy chỉnh.
    ```bash
    npx playwright test --reporter=junit --output=test-results/junit
    ```
    *(Lưu ý: Báo cáo HTML mặc định sẽ vẫn được tạo trong thư mục `playwright-report`)*

#### Kiểm soát thời gian và số lần thử lại

*   **Kịch bản:** Chạy các bài kiểm tra trên `webkit`, thử lại mỗi bài thất bại 2 lần, nhưng dừng toàn bộ quá trình nếu có hơn 5 bài kiểm tra thất bại. Đặt thời gian chờ toàn cục cho mỗi bài là 60 giây.
    ```bash
    npx playwright test --project=webkit --retries=2 --max-failures=5 --timeout=60000
    ```

#### Sử dụng trong môi trường CI (Continuous Integration)

*   **Kịch bản:** Chạy kiểm thử trong môi trường CI, đảm bảo không có bài kiểm tra nào bị `test.only` (gây ra việc bỏ qua các bài khác) và chạy các tệp song song để tăng tốc.
    ```bash
    npx playwright test --forbid-only --fully-parallel
    ```

---

### 2. Chuyên sâu về `npx playwright codegen`

Codegen không chỉ để ghi lại mã. Nó còn là một công cụ gỡ lỗi và thiết lập trạng thái mạnh mẽ.

*   **Kịch bản:** Bắt đầu một phiên Codegen, nhưng tải trạng thái đăng nhập đã lưu trước đó để bạn không cần phải đăng nhập lại. Đồng thời, đặt ngôn ngữ đầu ra là Python và lưu vào một tệp cụ thể.
    ```bash
    npx playwright codegen --load-storage=auth.json --target=python -o tests/my_python_test.py https://app.example.com/dashboard
    ```

*   **Kịch bản:** Ghi lại một quy trình đăng nhập và lưu trạng thái xác thực (cookies, local storage) vào một tệp để tái sử dụng trong các bài kiểm tra sau này.
    ```bash
    npx playwright codegen https://github.com/login --save-storage=github-auth.json
    ```

---

### 3. Chuyên sâu về Gỡ lỗi (Debugging)

*   **Kịch bản:** Bạn muốn gỡ lỗi một bài kiểm tra thất bại cụ thể. Hãy chạy chỉ bài kiểm tra đó ở chế độ có giao diện và bật Playwright Inspector.
    ```bash
    PWDEBUG=1 npx playwright test -g "Tên bài kiểm tra thất bại" --headed
    ```

*   **Kịch bản:** Bạn muốn sử dụng công cụ gỡ lỗi của trình duyệt (Browser DevTools) thay vì Playwright Inspector.
    ```bash
    PWDEBUG=console npx playwright test
    ```
    Sau đó, mở DevTools và sử dụng `playwright.resume()` trong console để tiếp tục thực thi.

---

### 4. Kết hợp các lệnh (Unix Philosophy)

Bạn có thể kết hợp đầu ra của Playwright với các lệnh shell khác bằng cách sử dụng `|` (pipe).

*   **Kịch bản:** Liệt kê tất cả các bài kiểm tra có trong dự án của bạn, sau đó lọc danh sách đó để chỉ hiển thị những bài có chứa từ "API".
    ```bash
    npx playwright test --list | grep "API"
    ```

Việc nắm vững cách kết hợp các cờ và lệnh này sẽ cho phép bạn kiểm soát hoàn toàn quy trình làm việc của mình với Playwright.