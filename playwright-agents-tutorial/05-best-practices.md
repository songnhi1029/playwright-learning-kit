# Bài 5: Best Practices khi làm việc với Agents

Để khai thác tối đa sức mạnh của AI Agent và tránh các cạm bẫy, hãy tuân thủ các nguyên tắc sau:

### 1. Ra lệnh Rõ ràng, Cụ thể (Be Clear and Specific)

Agent hoạt động tốt nhất khi nhận được yêu cầu rõ ràng. Cung cấp càng nhiều ngữ cảnh (context) càng tốt.

- **Tệ:** `"Test trang login"`
- **Tốt:** `"Tạo một test case Playwright cho luồng đăng nhập thành công. Sử dụng `LoginPage` từ `tests/pages/LoginPage.ts`. Điền username là 'user' và password là 'pass'. Sau khi click nút login, kiểm tra rằng URL của trang đã chuyển hướng đến '/dashboard'."`

### 2. Luôn xác minh Code do Agent tạo ra (Always Verify)

Xem code do agent tạo ra như một bản nháp (draft) của một lập trình viên mới vào nghề. Bạn luôn là người kiểm duyệt cuối cùng, chịu trách nhiệm về chất lượng và sự chính xác của code.

- **Quy trình:** `Generate -> Review -> Refine -> Commit` (Tạo -> Xem xét -> Tinh chỉnh -> Commit).

### 3. Sử dụng Page Object Model (POM)

Đây là best practice quan trọng nhất. Cung cấp cho agent các class POM đã được định nghĩa sẵn sẽ giúp nó:

- **Tạo code có cấu trúc:** Agent sẽ gọi `loginPage.login('user', 'pass')` thay vì tự tìm và điền vào từng input.
- **Dễ bảo trì:** Khi giao diện thay đổi, bạn chỉ cần cập nhật POM, và các test case (kể cả những cái do agent tạo) sẽ không bị ảnh hưởng nhiều.

### 4. Bắt đầu từ những nhiệm vụ nhỏ (Start Small)

Đừng cố gắng tự động hóa toàn bộ quy trình phức tạp ngay từ đầu. Hãy bắt đầu bằng cách để agent giúp bạn những công việc nhỏ, lặp đi lặp lại:

- Viết các locator phức tạp.
- Tạo các assertion chi tiết.
- Chuyển đổi một loạt các bước thủ công thành một hàm trong POM.

### 5. Con người giám sát (Human-in-the-Loop)

Đừng xem agent là công cụ thay thế hoàn toàn con người. Hãy xem nó là một **trợ lý thông minh (intelligent assistant)** giúp bạn loại bỏ các công việc nhàm chán, từ đó bạn có thể tập trung vào các nhiệm vụ có giá trị hơn:

- Xây dựng chiến lược kiểm thử.
- Phân tích các ca kiểm thử phức tạp (edge cases).
- Đảm bảo chất lượng tổng thể của sản phẩm.

### 6. Bảo mật là trên hết (Security First)

**TUYỆT ĐỐI KHÔNG** đưa các thông tin nhạy cảm (như tài khoản, mật khẩu, API key thật) vào các câu lệnh prompt, đặc biệt là khi sử dụng các dịch vụ LLM công khai bên ngoài. Hãy sử dụng dữ liệu giả hoặc các biến môi trường.
