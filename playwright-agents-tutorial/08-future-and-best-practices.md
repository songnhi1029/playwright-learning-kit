# Bài 8: Best Practices và Tương lai của Kiểm thử Tự động

Bài học này tổng hợp các nguyên tắc và định hướng quan trọng nhất cho một quy trình kiểm thử UI hiện đại, kết hợp sức mạnh của Playwright, Cucumber (BDD), và AI Agents.

---

### **Theme 1: Nền tảng Vững chắc (Solid Foundation)**

1.  **BDD (Cucumber) là Kim chỉ nam (BDD as the North Star):**
    *   File Gherkin (`.feature`) phải là **nguồn chân lý duy nhất (single source of truth)** mô tả hành vi của ứng dụng. Mọi thứ khác—code Playwright, step definitions, dù do người hay agent viết—đều chỉ nhằm mục đích hiện thực hóa các kịch bản trong file Gherkin.
    *   Điều này đảm bảo mọi người trong team (BA, Product, QA, Dev) đều nói cùng một ngôn ngữ.

2.  **Page Object Model (POM) là Bắt buộc (POM is Mandatory):**
    *   Trong hệ sinh thái có agent, POM còn quan trọng hơn nữa. Nó cung cấp một "API" ổn định, dễ đọc cho ứng dụng của bạn.
    *   **Chỉ thị cho agent:** Thay vì ra lệnh cho agent "điền vào input có id 'user-email'", hãy chỉ thị "sử dụng phương thức `loginPage.enterEmail('email')`". Điều này giúp prompt của bạn ngắn gọn hơn và code do agent tạo ra sẽ có tính bảo trì cao hơn rất nhiều.

3.  **Ưu tiên Locator Bền vững (Resilient Locators):**
    *   Luôn ưu tiên các locator hướng tới người dùng mà Playwright khuyến nghị: `getByRole`, `getByLabel`, `getByText`.
    *   Hãy huấn luyện hoặc chỉ thị cho agent của bạn ưu tiên sử dụng các locator này. Một hệ thống có locator tốt sẽ ít cần đến chức năng "self-healing".

### **Theme 2: Quy trình làm việc với Agent (Agent-Driven Workflow)**

4.  **Agent là Trợ lý, Bạn là Kiến trúc sư (The Agent is the Assistant, You are the Architect):**
    *   Đây là tư duy quan trọng nhất. Vai trò của bạn không còn là viết từng dòng code lặp đi lặp lại, mà là **thiết kế hệ thống**. Bạn thiết kế cấu trúc của POM, xây dựng chiến lược test, và giám sát chất lượng. Agent là người thực thi các chi tiết.

5.  **"Prompt Engineering" là một Kỹ năng Mới:**
    *   Chất lượng đầu ra của agent phụ thuộc hoàn toàn vào chất lượng prompt (câu lệnh) của bạn. Một prompt tốt cần:
        *   **Cụ thể và chi tiết.**
        *   **Cung cấp ngữ cảnh** (ví dụ: "sử dụng POM class `SearchPage` của chúng ta...").
        *   **Yêu cầu định dạng đầu ra** (ví dụ: "trả về một hàm TypeScript hoàn chỉnh...").

6.  **Review, Đừng Tin tưởng Mù quáng (Review, Don't Trust Blindly):**
    *   Luôn coi code do agent tạo ra như một Pull Request từ một lập trình viên mới. Bạn **phải** review nó để đảm bảo tính đúng đắn, hiệu quả và tuân thủ tiêu chuẩn của dự án.

### **Theme 3: Hướng tới Tương lai (Future-Proofing)**

7.  **Bắt đầu với Self-Healing có Giám sát (Start with Supervised Self-Healing):**
    *   Đừng vội vàng xây dựng một hệ thống tự sửa lỗi hoàn toàn tự động. Hãy bắt đầu bằng một cơ chế mà agent chỉ **đề xuất các bản sửa lỗi** trong báo cáo test.
    *   Điều này giúp bạn xây dựng lòng tin vào logic của agent và kiểm chứng các đề xuất của nó trước khi cho phép nó tự động ghi đè code.

8.  **Đầu tư vào Framework và Tích hợp (Invest in Framework and Integration):**
    *   Chất keo kết dính Playwright, Cucumber, và AI Agent chính là framework tùy chỉnh của bạn. Bạn sẽ cần viết các script để tự động hóa quy trình: nhận file `.feature` -> gọi agent để tạo step definitions -> lưu file.
    *   Sự đầu tư ban đầu này sẽ mang lại hiệu quả khổng lồ trong dài hạn.

9.  **Luôn Cập nhật và Thử nghiệm (Continuously Learn and Experiment):**
    *   Lĩnh vực AI phát triển với tốc độ chóng mặt. Các công cụ và kỹ thuật tốt nhất hôm nay có thể trở nên lỗi thời trong vài tháng. Hãy xây dựng văn hóa học hỏi, thử nghiệm các mô hình LLM mới, các kỹ thuật prompt mới và các công cụ mới khi chúng xuất hiện.
