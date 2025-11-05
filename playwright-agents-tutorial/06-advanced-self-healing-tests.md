# Bài 6: Kỹ thuật nâng cao - Test tự sửa lỗi (Self-Healing)

"Self-healing" là một trong những ứng dụng cao cấp và mạnh mẽ nhất của AI agent trong kiểm thử tự động. Nó giải quyết một trong những vấn đề đau đầu nhất: bảo trì test.

### **Vấn đề: Tại sao Test hay bị "gãy"?**

Trong các dự án phát triển nhanh, giao diện người dùng (UI) thay đổi liên tục. Một developer có thể đổi `id` của một nút, thay đổi class CSS, hoặc sửa lại cấu trúc HTML. Khi đó, các locator trong test script của Playwright (ví dụ: `page.locator('#submit-button')`) sẽ không còn tìm thấy phần tử, và test case sẽ thất bại. Việc sửa những lỗi này tốn rất nhiều thời gian.

### **Giải pháp: Test tự sửa lỗi với AI Agent**

Đây là cách một hệ thống self-healing sử dụng agent hoạt động:

**Bước 1: Test thất bại và Agent được kích hoạt**

- Một test case Playwright chạy và thất bại, thường là với lỗi `TimeoutError` vì không tìm thấy locator.
- Thay vì dừng lại, framework sẽ tự động kích hoạt một AI agent và cung cấp cho nó toàn bộ "hiện trường vụ án":
    - Tên test case và dòng code bị lỗi.
    - Locator đã thất bại (ví dụ: `getByTestId('old-submit-button')`).
    - Toàn bộ mã HTML (DOM) của trang tại thời điểm xảy ra lỗi.

**Bước 2: Agent phân tích và "chẩn đoán"**

- Agent nhận tất cả thông tin và bắt đầu phân tích. Nó sử dụng một mô hình ngôn ngữ lớn (LLM) để suy luận, giống như một developer có kinh nghiệm.
- **Prompt (câu lệnh) nội bộ của agent có thể trông như sau:**
  > "Locator `getByTestId('old-submit-button')` đã thất bại. Dựa trên ngữ cảnh (tên test là 'đăng nhập thành công'), locator này có thể đang cố tìm một nút 'Submit' hoặc 'Login'. Đây là mã HTML của trang hiện tại. Hãy tìm một phần tử khác có khả năng cao nhất là nút 'Submit' mới. Hãy ưu tiên các thuộc tính như text ('Login', 'Sign In'), role ('button'), hoặc các thuộc tính gần giống."

**Bước 3: Agent tìm ra giải pháp và đề xuất "phương thuốc"**

- Dựa trên phân tích, agent có thể tìm thấy một phần tử mới, ví dụ: `<button data-testid="new-login-btn">Login</button>`.
- Nó xác định rằng đây có lẽ là phần tử đúng và đề xuất một hoặc nhiều locator mới, có thể theo thứ tự ưu tiên về độ bền:
    1.  `page.getByRole('button', { name: 'Login' })` (Bền nhất)
    2.  `page.getByTestId('new-login-btn')` (Nếu quy ước dự án dùng test-id)

**Bước 4: "Chữa trị" và xác minh**

Hệ thống có thể được cấu hình theo hai cách:

1.  **Tự động (Fully Autonomous):**
    - Agent tự động thử lại test case với locator mới mà nó cho là đúng nhất.
    - Nếu test case chạy thành công, agent có thể tự động sửa code trong file test của bạn và đánh dấu là "đã tự sửa lỗi".

2.  **Giám sát (Human-in-the-Loop):**
    - Agent sẽ không tự sửa code. Thay vào đó, nó tạo ra một báo cáo chi tiết trong kết quả test:
      > "Test 'test login' đã thất bại. **Lỗi đề xuất:** Locator `getByTestId('old-submit-button')` không còn tồn tại. **Đề xuất sửa:** Thay thế bằng `getByRole('button', { name: 'Login' })`. Tôi 95% chắc chắn đây là giải pháp đúng."
    - Developer xem lại đề xuất này và quyết định có áp dụng hay không.

### **Ứng dụng trong thực tế**

- **Giảm thời gian bảo trì:** Đây là lợi ích lớn nhất. Thay vì phải tự đi tìm và sửa từng locator bị gãy, agent đã làm giúp bạn.
- **Tăng độ tin cậy của bộ test:** Test suite trở nên "dẻo dai" hơn, ít bị ảnh hưởng bởi những thay đổi nhỏ về UI.
- **Giải phóng developer/QA:** Giúp đội ngũ tập trung vào việc viết test cho các tính năng mới thay vì sửa lỗi các test cũ.

Đây là một lĩnh vực rất mới và đang phát triển nhanh, đòi hỏi sự kết hợp giữa Playwright, các API của LLM, và một framework tùy chỉnh để quản lý toàn bộ quy trình này.
