# Bài 4: Giai đoạn 2 - Tích hợp Agents

Khi đã vững nền tảng Playwright, bạn có thể bắt đầu khai thác sức mạnh của AI Agent. Giai đoạn này sẽ đi từ việc sử dụng agent như một trợ lý đến việc khám phá khả năng tự hành của chúng.

### Cấp độ 1: Agent như một "Trợ lý tạo Code" (Code Assistant)

Đây là cách tiếp cận đơn giản và tức thì nhất.

- **Mục tiêu:** Dùng các LLM (Large Language Model) như Gemini, Copilot, ChatGPT để sinh ra các đoạn code Playwright nhỏ theo yêu cầu.
- **Cách làm:** Thay vì tự viết, bạn ra lệnh bằng ngôn ngữ tự nhiên ngay trong trình soạn thảo code của mình hoặc qua giao diện chat.
- **Ví dụ Prompt:**
    - `"Viết code Playwright để tìm một button có chữ 'Login' và click vào nó."`
    - `"Tạo một assertion trong Playwright để kiểm tra rằng phần tử có id 'welcome-message' chứa đoạn text 'Chào mừng, user!'"`

### Cấp độ 2: Agent "Tự động hóa Test Case" (Test Case Automation)

Ở cấp độ này, bạn xây dựng một công cụ để tự động hóa việc tạo file test.

- **Mục tiêu:** Xây dựng một quy trình mà agent có thể nhận đầu vào là một test case mô tả bằng ngôn ngữ tự nhiên và tạo ra một file test `.spec.ts` hoàn chỉnh.
- **Cách làm:**
    1.  Viết một script (ví dụ: bằng Python hoặc Node.js).
    2.  Script này nhận một file text mô tả test case (ví dụ: `login-test-case.txt`).
    3.  Script gọi API của một LLM, gửi mô tả test case kèm theo một prompt chi tiết. Prompt này nên chứa cả context về cấu trúc dự án (ví dụ: "Hãy tạo code Playwright cho test case sau, sử dụng Page Object Model từ file `tests/pages/LoginPage.ts`...").
    4.  Agent trả về code và script của bạn sẽ lưu lại thành file `login.spec.ts`.

### Cấp độ 3: Agent "Tự hành" (Autonomous Agent)

Đây là cấp độ cao nhất, phức tạp và mang tính nghiên cứu, khám phá.

- **Mục tiêu:** Tạo ra một agent có khả năng tự phân tích một trang web, xác định các luồng cần test, tự tạo test case, chạy và thậm chí là tự sửa lỗi cơ bản.
- **Cách làm:**
    - Agent cần được cung cấp khả năng "nhìn" trang web (thông qua việc phân tích DOM hoặc thậm chí là screenshot).
    - Agent "suy nghĩ" để lập kế hoạch test (ví dụ: "Trang này có form đăng nhập, vậy tôi sẽ test luồng đăng nhập thành công, đăng nhập thất bại...").
    - Agent "hành động" bằng cách tạo và chạy code Playwright.
    - Agent "học" từ kết quả (ví dụ: nếu test thất bại, nó có thể thử thay đổi locator và chạy lại).
