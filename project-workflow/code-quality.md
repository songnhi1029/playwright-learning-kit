# Chất lượng mã trong dự án Playwright

Đảm bảo chất lượng mã là một phần quan trọng của mọi dự án phần mềm. Nó giúp duy trì tính dễ đọc, dễ bảo trì và giảm thiểu lỗi. Trong một dự án Playwright, điều này bao gồm việc sử dụng các công cụ như linter, formatter và type checker.

---

### 1. Linting (Kiểm tra cú pháp và phong cách)

*   **Mục đích:** Phát hiện các lỗi cú pháp, lỗi lập trình tiềm ẩn, và đảm bảo tuân thủ các quy tắc phong cách mã hóa.
*   **Công cụ phổ biến:** ESLint (cho JavaScript/TypeScript).
*   **Cách hoạt động:** ESLint phân tích mã của bạn và cảnh báo về các vấn đề dựa trên một bộ quy tắc đã định cấu hình. Nó có thể được tích hợp vào trình soạn thảo mã của bạn và chạy như một phần của quy trình CI.
*   **Lợi ích:**
    *   Phát hiện lỗi sớm.
    *   Đảm bảo tính nhất quán về phong cách mã hóa trong toàn bộ đội ngũ.
    *   Cải thiện khả năng đọc và bảo trì mã.

*   **Ví dụ cấu hình (trong `package.json`):**
    ```json
    "scripts": {
      "lint": "eslint . --ext .ts,.js"
    },
    "devDependencies": {
      "eslint": "^8.0.0",
      "@typescript-eslint/eslint-plugin": "^5.0.0",
      "@typescript-eslint/parser": "^5.0.0"
    }
    ```
    *   **Chạy:** `npm run lint`

---

### 2. Formatting (Định dạng mã tự động)

*   **Mục đích:** Tự động định dạng mã của bạn theo một bộ quy tắc nhất quán, loại bỏ các tranh cãi về phong cách mã hóa.
*   **Công cụ phổ biến:** Prettier.
*   **Cách hoạt động:** Prettier đọc mã của bạn và viết lại nó theo một phong cách đã định cấu hình. Nó thường được chạy trước khi commit mã hoặc khi lưu tệp trong trình soạn thảo mã.
*   **Lợi ích:**
    *   Loại bỏ các cuộc tranh luận về phong cách mã hóa.
    *   Đảm bảo mã luôn được định dạng nhất quán.
    *   Tăng tốc độ xem xét mã (code review) vì không cần phải tập trung vào định dạng.

*   **Ví dụ cấu hình (trong `package.json`):**
    ```json
    "scripts": {
      "format": "prettier --write ."
    },
    "devDependencies": {
      "prettier": "^2.0.0"
    }
    ```
    *   **Chạy:** `npm run format`

---

### 3. Type Checking (Kiểm tra kiểu dữ liệu)

*   **Mục đích:** Phát hiện các lỗi liên quan đến kiểu dữ liệu trong mã TypeScript của bạn trước khi chạy.
*   **Công cụ phổ biến:** TypeScript Compiler (`tsc`).
*   **Cách hoạt động:** `tsc` phân tích mã TypeScript của bạn và đảm bảo rằng tất cả các biến, hàm và đối tượng được sử dụng với các kiểu dữ liệu chính xác.
*   **Lợi ích:**
    *   Phát hiện lỗi sớm, đặc biệt là các lỗi liên quan đến việc truyền sai kiểu dữ liệu.
    *   Cải thiện khả năng tự động hoàn thành (autocompletion) và tái cấu trúc (refactoring) trong trình soạn thảo mã.
    *   Tăng cường sự rõ ràng và dễ hiểu của mã.

*   **Ví dụ cấu hình (trong `package.json`):**
    ```json
    "scripts": {
      "typecheck": "tsc --noEmit"
    },
    "devDependencies": {
      "typescript": "^5.0.0"
    }
    ```
    *   **Chạy:** `npm run typecheck`

---

### Tích hợp vào Workflow

Bạn nên tích hợp các công cụ này vào quy trình phát triển của mình:

*   **Trong trình soạn thảo mã:** Cấu hình ESLint và Prettier để chạy tự động khi lưu tệp.
*   **Pre-commit hooks:** Sử dụng các công cụ như `lint-staged` và `husky` để chạy linter và formatter trên các tệp đã thay đổi trước khi commit.
*   **CI/CD:** Chạy `npm run lint`, `npm run format --check`, và `npm run typecheck` như một phần của quy trình CI để đảm bảo chất lượng mã trước khi hợp nhất vào nhánh chính.
