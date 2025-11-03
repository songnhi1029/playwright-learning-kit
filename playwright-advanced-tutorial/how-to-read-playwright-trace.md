# Hướng dẫn đọc Playwright Trace Report

Playwright Trace Report là một công cụ mạnh mẽ giúp bạn gỡ lỗi và phân tích các bài kiểm tra tự động của mình. Nó cung cấp một cái nhìn chi tiết về từng bước mà Playwright đã thực hiện, bao gồm các hành động, assertion, trạng thái DOM, ảnh chụp màn hình và các sự kiện mạng.

Dưới đây là một ví dụ về một đoạn `call` trong Trace Report và cách phân tích nó:

```
Expect "toBeVisible"
Time
  start: 2.8s
  duration: 22ms
Parameters
  locator: locator('h2').filter({ hasText: 'Login Page' })
  expression: "to.be.visible"
  expectedValue: undefined
  isNot: false
  timeout: 5000
Return value
  matches: true
  received: "visible"
```

---

### Phân tích từng phần của Trace Report:

#### 1. `Expect "toBeVisible"`

*   **Ý nghĩa:** Đây là loại assertion (khẳng định) mà bài test đang thực hiện. Nó đang kiểm tra xem một phần tử có hiển thị trên trang hay không.

#### 2. `Time`

*   **`start: 2.8s`**:
    *   **Ý nghĩa:** Assertion này bắt đầu vào thời điểm 2.8 giây kể từ khi test case bắt đầu chạy. Điều này giúp bạn hiểu được trình tự thời gian của các sự kiện trong test.
*   **`duration: 22ms`**:
    *   **Ý nghĩa:** Assertion này chỉ mất 22 mili giây để hoàn thành. Đây là một thời gian rất nhanh, cho thấy phần tử đã được tìm thấy và hiển thị gần như ngay lập tức. Nếu thời gian này cao (ví dụ: 4500ms), nó có thể chỉ ra rằng trang đang tải chậm hoặc phần tử mất nhiều thời gian để hiển thị.

#### 3. `Parameters`

Đây là các thông số đầu vào được sử dụng cho assertion `toBeVisible()`:

*   **`locator: locator('h2').filter({ hasText: 'Login Page' })`**:
    *   **Ý nghĩa:** Đây là bộ định vị (Locator) mà assertion đang áp dụng. Nó đang tìm kiếm một phần tử `<h2>` mà bên trong nó có chứa văn bản "Login Page". Thông tin này rất quan trọng để xác định chính xác phần tử nào đang được kiểm tra.
*   **`expression: "to.be.visible"`**:
    *   **Ý nghĩa:** Đây là biểu thức nội bộ của assertion, xác nhận rằng bài test đang kiểm tra trạng thái "visible" (hiển thị).
*   **`expectedValue: undefined`**:
    *   **Ý nghĩa:** Đối với `toBeVisible()`, không có một "giá trị mong đợi" cụ thể nào như khi bạn kiểm tra văn bản (`toHaveText('some text')`). Thay vào đó, nó mong đợi một trạng thái (visible). Do đó, `undefined` ở đây là bình thường và không phải là lỗi.
*   **`isNot: false`**:
    *   **Ý nghĩa:** Cho biết đây là một khẳng định tích cực (positive assertion), tức là `toBeVisible()`, chứ không phải là phủ định (`not.toBeVisible()`).
*   **`timeout: 5000`**:
    *   **Ý nghĩa:** Đây là thời gian chờ tối đa (5000 mili giây = 5 giây) mà Playwright sẽ đợi phần tử trở nên hiển thị trước khi báo lỗi. Nếu phần tử không hiển thị trong khoảng thời gian này, test sẽ thất bại.

#### 4. `Return value`

Đây là kết quả của assertion:

*   **`matches: true`**:
    *   **Ý nghĩa:** Đây là phần quan trọng nhất. Nó cho biết assertion đã **thành công**. Phần tử được định vị (`<h2>` chứa "Login Page") đã được tìm thấy và hiển thị trong khoảng thời gian chờ. Nếu giá trị này là `false`, test đã thất bại.
*   **`received: "visible"`**:
    *   **Ý nghĩa:** Xác nhận trạng thái mà Playwright đã quan sát được cho phần tử. Nó thực sự ở trạng thái "visible".

---

### Tại sao việc đọc Trace lại quan trọng trong dự án?

1.  **Gỡ lỗi hiệu quả:** Khi một test thất bại, Trace Viewer cung cấp "cỗ máy thời gian" để bạn xem chính xác trạng thái của ứng dụng tại thời điểm lỗi. Bạn có thể xem ảnh chụp màn hình, DOM snapshot, console logs và network requests mà không cần chạy lại test.
2.  **Phân tích nguyên nhân gốc rễ:** Trace giúp bạn xác định liệu lỗi là do bộ định vị sai, phần tử bị ẩn, lỗi tải trang, lỗi API hay lỗi JavaScript.
3.  **Phân tích hiệu suất:** Bằng cách xem `duration` của các hành động và assertion, bạn có thể phát hiện các điểm nghẽn hiệu suất trong ứng dụng của mình.
4.  **Xác thực test:** Ngay cả khi test pass, trace cũng xác nhận rằng các bộ định vị của bạn đang hoạt động như mong đợi và các điều kiện được kiểm tra là chính xác.
5.  **Cộng tác:** File `trace.zip` có thể dễ dàng chia sẻ với đồng nghiệp, đảm bảo mọi người đều có cùng bối cảnh khi gỡ lỗi một test thất bại.

Việc thành thạo cách đọc Trace Report là một kỹ năng thiết yếu để duy trì và phát triển các bộ test tự động đáng tin cậy trong bất kỳ dự án nào.
