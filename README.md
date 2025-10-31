# Playwright Learning Kit - Bộ công cụ học Playwright toàn diện

Đây là một kho lưu trữ được tạo ra để cung cấp một lộ trình học tập toàn diện và thực tế cho Playwright, từ những khái niệm cơ bản nhất đến các kỹ thuật nâng cao và các vấn đề thực tiễn trong các dự án chuyên nghiệp.

## 🎯 Mục tiêu

Dự án này không chỉ cung cấp lý thuyết mà còn tập trung vào các bài tập thực hành, các kịch bản thực tế, và các "mẹo" giúp bạn nhanh chóng trở thành một chuyên gia về kiểm thử tự động với Playwright.

## 📚 Có gì bên trong?

Kho lưu trữ này được cấu trúc thành các thư mục, mỗi thư mục phục vụ một mục đích học tập cụ thể:

### 1. `playwright-tutorial/`

Thư mục này chứa các bài học nền tảng, giới thiệu các khái niệm cốt lõi của Playwright. Mỗi bài học đều có bài tập thực hành đi kèm.

*   `00-introduction.md`: Giới thiệu về Playwright.
*   `01-setup.md`: Hướng dẫn cài đặt.
*   `02-basic-tests.md`: Viết các bài kiểm tra đầu tiên.
*   `03-locators.md`: Tìm kiếm phần tử.
*   `04-actions.md`: Thực hiện các hành động.
*   `05-assertions.md`: Thực hiện các xác nhận.
*   `06-practical-example.md`: Một ví dụ thực tế kết hợp tất cả.

### 2. `playwright-advanced-tutorial/`

Thư mục này đi sâu vào các chủ đề nâng cao, các mẫu thiết kế, và các vấn đề thực tiễn.

*   **Bài học nâng cao:**
    *   `07-hooks-and-groups.md`: Tổ chức các bài kiểm tra.
    *   `08-authentication.md`: Xử lý đăng nhập.
    *   `09-api-testing.md`: Kiểm thử API.
    *   `10-trace-viewer.md`: Gỡ lỗi với Trace Viewer.
    *   `11-page-object-model.md`: Mẫu thiết kế POM.
*   **Bài tập thực hành:**
    *   `exercises.md`: Các bài tập tổng hợp.
    *   `advanced-exercises-2.md`: Các bài tập nâng cao hơn.
    *   `playwright-dev-exercises.md`: Các thử thách thực tế trên trang `playwright.dev`.
*   **Tài liệu chuyên sâu:**
    *   `bdd-with-playwright.md`: Tích hợp BDD và Cucumber.
    *   `common-cli-errors.md`: Các lỗi CLI thường gặp.
    *   `common-commands.md`: Bảng tra cứu các lệnh thường dùng.
    *   `advanced-cli-usage.md`: Hướng dẫn sử dụng CLI chuyên sâu.
    *   `ecosystem-comparison.md`: So sánh hệ sinh thái Playwright và Selenium.
    *   `key-concepts-for-mastery.md`: Các từ khóa để trở thành chuyên gia.
    *   `latest-playwright-updates.md`: Thông tin về các bản cập nhật mới nhất.
    *   `niche-cli-scenarios.md`: Các kịch bản đặc biệt và nâng cao.
    *   `playwright-pros-and-cons.md`: Điểm mạnh và điểm yếu của Playwright.
    *   `real-world-problems.md`: Các vấn đề thực tế khi làm dự án.

### 3. `tests/`

Thư mục này chứa các tệp mã kiểm thử ví dụ được đề cập trong các bài học.

## 🚀 Cách sử dụng

1.  **Clone kho lưu trữ này:**
    ```bash
    git clone <URL_KHO_LUU_TRU_CUA_BAN>
    ```

2.  **Cài đặt các gói phụ thuộc:**
    ```bash
    cd playwright-learning-kit
    npm install
    ```

3.  **Cài đặt các trình duyệt Playwright:**
    ```bash
    npx playwright install
    ```

4.  **Bắt đầu học:**
    *   Bắt đầu bằng cách đọc các tệp trong thư mục `playwright-tutorial`.
    *   Thực hành các bài tập được đề xuất trong mỗi bài học.

5.  **Chạy các bài kiểm tra:**
    ```bash
    # Chạy tất cả các bài kiểm tra
    npx playwright test

    # Chạy một tệp cụ thể
    npx playwright test tests/example.spec.ts
    ```

Chúc bạn học tốt và có một kho lưu trữ GitHub thật ấn tượng!