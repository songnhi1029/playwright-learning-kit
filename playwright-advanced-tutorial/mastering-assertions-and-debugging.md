# Bài học: Nguyên tắc viết Assertions trong Playwright

Việc viết các bài kiểm thử (test) tốt không chỉ dừng lại ở việc mô phỏng hành động của người dùng. Sức mạnh thực sự của một bộ test tự động nằm ở các câu lệnh khẳng định (assertions) mạnh mẽ và rõ ràng. Bài học này sẽ tổng hợp các phương pháp hay nhất (best practices) về việc sử dụng `expect` trong Playwright.

---

### Phần 1: Nguyên tắc vàng - "Mỗi kỳ vọng, một `expect`"

Một câu hỏi thường gặp là: "Có nên gộp nhiều điều kiện vào một `expect` hay không?". Câu trả lời là **không**. 

Việc sử dụng nhiều câu lệnh `expect` riêng biệt cho từng điều kiện cụ thể **được coi là một phương pháp hay nhất (best practice)**.

#### Tại sao đây là Best Practice?

1.  **Tăng tính rõ ràng (Improves Clarity):** Mỗi assertion là một câu lệnh rõ ràng về một kỳ vọng duy nhất. Điều này làm cho mục đích của bài test trở nên minh bạch.
2.  **Đơn giản hóa việc gỡ lỗi (Simplifies Debugging):** Khi test thất bại, bạn biết chính xác kỳ vọng nào đã không được đáp ứng, giúp bạn xác định và sửa lỗi nhanh hơn rất nhiều.
3.  **Dễ bảo trì (Enhances Maintainability):** Khi giao diện người dùng thay đổi, việc cập nhật hoặc xóa các assertion riêng lẻ sẽ dễ dàng hơn nhiều so với việc phải chỉnh sửa một khối logic phức tạp.

#### Ví dụ thực tế:

```typescript
// CÁCH LÀM TỐT: Rất rõ ràng và dễ gỡ lỗi
await expect(button).toBeVisible();      // Kỳ vọng 1: Nút phải hiển thị
await expect(button).toBeEnabled();     // Kỳ vọng 2: Nút phải được bật (không bị vô hiệu hóa)
await expect(button).toHaveText('Submit'); // Kỳ vọng 3: Nút phải có chữ "Submit"
```

---

### Phần 2: Luồng thực thi và kết quả của Test Case

Hai quy tắc quan trọng bạn cần nhớ về cách một test case được thực thi:

1.  **Một `expect` fail -> Toàn bộ test case fail**
    *   Một test case là một chuỗi các kiểm tra. Nếu bất kỳ một kiểm tra nào trong chuỗi đó thất bại, thì toàn bộ mục tiêu của test case không được hoàn thành. Do đó, chỉ cần một `expect` thất bại, test case đó sẽ được đánh dấu là **thất bại (fail)**.

2.  **Một `expect` fail -> Các `expect` sau đó không được chạy**
    *   Khi một `expect` thất bại, nó sẽ ném ra một lỗi. Framework kiểm thử sẽ bắt lỗi này, dừng ngay lập tức việc thực thi các dòng code còn lại trong test case đó và chuyển sang test case tiếp theo. Điều này giúp tiết kiệm thời gian và cung cấp phản hồi về lỗi một cách nhanh nhất.

> **Tóm lại:** Một test case giống như một danh sách kiểm tra (checklist). Bạn phải hoàn thành tất cả các mục trong danh sách. Nếu bạn thất bại ở một mục, bạn sẽ dừng lại và báo cáo rằng công việc chưa hoàn thành.

---

### Bước tiếp theo: Gỡ lỗi với Trace Viewer

Khi một assertion thất bại, bước tiếp theo là tìm hiểu tại sao. Công cụ mạnh mẽ nhất cho việc này là **Trace Viewer**.

Để tìm hiểu sâu hơn về cách đọc và phân tích file trace, hãy tham khảo bài viết:
[**Hướng dẫn đọc Playwright Trace Report**](./how-to-read-playwright-trace.md)

---

### Tổng kết

Để viết các bài test tự động chất lượng cao, hãy nhớ:

1.  **Tuân thủ nguyên tắc "một kỳ vọng, một `expect`"** để test rõ ràng và dễ bảo trì.
2.  **Hiểu rằng một lỗi nhỏ sẽ làm cả test case thất bại** và dừng lại ngay lập tức.
3.  **Sử dụng Trace Viewer như một công cụ chính** để gỡ lỗi khi test thất bại.
