# Bài 7: Tích hợp Agents với Cucumber (BDD)

Kết hợp AI Agents với Cucumber (và BDD - Behavior-Driven Development) là một sự kết hợp rất tự nhiên và mạnh mẽ. Ngôn ngữ Gherkin của Cucumber (`Given-When-Then`) vốn dĩ đã là ngôn ngữ tự nhiên có cấu trúc, đây là đầu vào hoàn hảo cho một AI agent.

Sự kết hợp này mở ra hai ứng dụng chính rất hiệu quả:

1.  **Tự động tạo Step Definitions (Phần code "kết dính")**
2.  **Tự động tạo file `.feature` từ yêu cầu cấp cao**

---

### **1. Ứng dụng 1: Tự động tạo Step Definitions**

Đây là ứng dụng phổ biến và hữu ích nhất.

*   **Vấn đề:** Trong Cucumber, bạn viết các bước bằng Gherkin trong file `.feature`. Sau đó, bạn phải viết "code kết dính" (step definitions) trong các file (ví dụ: `.ts`) để ánh xạ từng bước Gherkin tới hành động cụ thể của Playwright. Công việc này tốn thời gian và có tính lặp lại.

*   **Giải pháp với Agent:** Agent có thể làm việc này giúp bạn.
    *   **Quy trình:**
        1.  Bạn viết file `login.feature` với các bước Gherkin.
        2.  Bạn đưa file này cho một agent (hoặc từng bước một).
        3.  Agent sẽ tự động sinh ra code Playwright tương ứng cho mỗi bước.

*   **Ví dụ:**
    *   **Bạn viết Gherkin step:**
      ```gherkin
      When I enter "user@example.com" into the "Email" input
      ```
    *   **Prompt bạn đưa cho Agent:**
      > "Hãy tạo step definition trong Playwright-Cucumber (TypeScript) cho Gherkin step sau: `When I enter "user@example.com" into the "Email" input`"

    *   **Agent sẽ tạo ra code:**
      ```typescript
      import { When } from "@cucumber/cucumber";
      import { ICustomWorld } from "./custom-world";

      When(
        "I enter {string} into the {string} input",
        async function (this: ICustomWorld, text: string, inputLabel: string) {
          const { page } = this;
          await page.getByLabel(inputLabel).fill(text);
        }
      );
      ```

### **2. Ứng dụng 2: Tự động tạo file `.feature`**

Đây là ứng dụng cao cấp hơn, giúp đẩy nhanh quá trình phân tích yêu cầu.

*   **Vấn đề:** Đôi khi bạn có một yêu cầu, một user story, nhưng chưa được viết thành các kịch bản Gherkin chi tiết.

*   **Giải pháp với Agent:** Agent có thể đóng vai trò như một "trợ lý Business Analyst".
    *   **Quy trình:**
        1.  Bạn cung cấp cho agent một user story.
        2.  Agent phân tích và tạo ra một file `.feature` hoàn chỉnh với các kịch bản (Scenarios) hợp lý.

*   **Ví dụ:**
    *   **Bạn cung cấp User Story:**
      > "Là một người dùng, tôi muốn có thể đăng nhập vào trang web bằng email và mật khẩu để tôi có thể truy cập vào trang quản trị của mình."

    *   **Prompt bạn đưa cho Agent:**
      > "Dựa trên user story sau, hãy tạo một file Gherkin `.feature` hoàn chỉnh, bao gồm cả kịch bản đăng nhập thành công và đăng nhập thất bại: [dán user story vào đây]"

    *   **Agent sẽ tạo ra file `.feature`:**
      ```gherkin
      Feature: User Login

        As a user
        I want to log in to the website
        So I can access my dashboard

        Scenario: Successful login with valid credentials
          Given I am on the login page
          When I enter "user@example.com" into the "Email" input
          And I enter "correct-password" into the "Password" input
          And I click the "Log In" button
          Then I should be redirected to the "/dashboard" page

        Scenario: Failed login with invalid credentials
          Given I am on the login page
          When I enter "user@example.com" into the "Email" input
          And I enter "wrong-password" into the "Password" input
          And I click the "Log In" button
          Then I should see an error message "Invalid credentials"
      ```

### **Lợi ích chính**

-   **Tăng tốc độ phát triển:** Giảm đáng kể thời gian viết code lặp lại cho step definitions.
-   **Tập trung vào hành vi:** Giúp đội ngũ (BA, QA, Dev) tập trung vào việc mô tả hành vi của tính năng thay vì cú pháp code.
-   **Tính nhất quán:** Agent giúp tạo ra code và kịch bản có cấu trúc nhất quán.
