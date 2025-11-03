# Bài học: Kỹ thuật gỡ lỗi (Debug) và cô lập các bước test trong Playwright

Khi một bài test phức tạp bị thất bại, việc tìm ra nguyên nhân gốc rễ có thể là một thách thức. Playwright cung cấp các công cụ gỡ lỗi mạnh mẽ, nhưng việc sử dụng chúng hiệu quả đòi hỏi một chiến lược đúng đắn. Bài học này sẽ hướng dẫn bạn cách sử dụng chế độ gỡ lỗi và xử lý tình huống khi bạn muốn "bỏ qua" một bước bị lỗi để kiểm tra các bước tiếp theo.

---

### Phần 1: Khởi chạy chế độ gỡ lỗi (Debug Mode)

Để bắt đầu gỡ lỗi, bạn cần chạy Playwright với cờ `--debug`. Lệnh này sẽ mở một trình duyệt có giao diện (headed) và cửa sổ **Playwright Inspector**, cho phép bạn kiểm soát và quan sát từng bước thực thi của test.

Để tập trung vào một test cụ thể, hãy kết hợp `--debug` với đường dẫn file và cờ `-g` (grep):

```bash
# Cú pháp chung:
# npx playwright test [đường_dẫn_file] -g [tên_test] --debug

# Ví dụ thực tế:
npx playwright test tests/my-feature.spec.ts -g "Login with invalid credentials" --debug
```

Khi chạy lệnh này, Playwright sẽ tạm dừng ở dòng đầu tiên của test, chờ bạn ra lệnh.

---

### Phần 2: Câu hỏi cốt lõi - "Làm sao để bỏ qua một `expect` bị lỗi?"

Trong quá trình gỡ lỗi, bạn có thể gặp một `expect` bị lỗi và tự hỏi: "Liệu tôi có thể bỏ qua lỗi này để xem các `expect` tiếp theo hoạt động ra sao không?"

Câu trả lời trực tiếp là: **Không, bạn không thể bỏ qua một `expect` bị lỗi trong một phiên gỡ lỗi đang chạy.**

#### Tại sao không thể?

Đây là hành vi cốt lõi của mọi framework kiểm thử:
1.  Khi một `expect` (assertion) thất bại, nó sẽ **ném ra một lỗi (throw an error)**.
2.  Lỗi này ngay lập tức **dừng việc thực thi của test case hiện tại**.

Playwright Inspector cho phép bạn quan sát trạng thái tại thời điểm xảy ra lỗi, nhưng nó không thể thay đổi quy tắc cơ bản này. Khi test đã dừng vì lỗi, nó không thể tiếp tục.

---

### Phần 3: Giải pháp thực tế - "Bình luận và Chạy lại"

Để đạt được mục tiêu là kiểm tra các bước sau một bước bị lỗi, bạn cần áp dụng một kỹ thuật đơn giản nhưng hiệu quả:

1.  **Xác định dòng code lỗi:** Trong trình soạn thảo code của bạn (ví dụ: VS Code), tìm đến dòng `expect` đang gây ra lỗi.
2.  **Bình luận dòng code đó:** Tạm thời vô hiệu hóa nó bằng cách thêm `//` ở đầu dòng.
3.  **Chạy lại chế độ gỡ lỗi:** Thực thi lại lệnh `npx playwright test ... --debug` của bạn.

#### Ví dụ:

Giả sử test của bạn đang thất bại ở dòng `expect(...).toBeVisible()`.

```typescript
// ... các bước trước đó đã chạy thành công

// Dòng này đang bị lỗi, hãy tạm thời bình luận nó để kiểm tra bước tiếp theo
// await expect(page.locator('.popup-error-message')).toBeVisible(); 

// Bây giờ, bạn có thể gỡ lỗi và kiểm tra xem `expect` tiếp theo có hoạt động không
await expect(page.locator('#username')).toHaveValue(''); 

// ...
```

Bằng cách này, bạn đã "bỏ qua" bước kiểm tra bị lỗi, cho phép Playwright thực thi các dòng code tiếp theo. Điều này giúp bạn cô lập vấn đề và kiểm tra xem phần còn lại của kịch bản có hoạt động như mong đợi hay không.

---

### Tổng kết

*   Sử dụng `npx playwright test --debug` để khởi chạy Playwright Inspector và kiểm soát từng bước của test.
*   Hãy nhớ rằng bạn **không thể bỏ qua một `expect` bị lỗi** khi đang trong một phiên gỡ lỗi.
*   Kỹ thuật hiệu quả nhất để kiểm tra các bước sau một lỗi là **bình luận (comment out) dòng code gây lỗi** và chạy lại chế độ gỡ lỗi. Đây là một kỹ năng gỡ lỗi thiết yếu để cô lập và giải quyết các vấne đề phức tạp.
