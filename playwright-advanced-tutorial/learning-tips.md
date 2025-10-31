# Mẹo học và sử dụng Playwright hiệu quả

Dưới đây là một số mẹo và phương pháp hay nhất sẽ giúp bạn học nhanh hơn và viết các bài kiểm tra tốt hơn với Playwright.

### 1. Lạm dụng Codegen (`npx playwright codegen`)

Đây là công cụ học tập số một của bạn. Bất cứ khi nào bạn không chắc chắn về cách viết mã cho một hành động hoặc cách tìm một bộ định vị, hãy mở Codegen và thực hiện hành động đó theo cách thủ công. Quan sát mã mà nó tạo ra. Điều này sẽ dạy bạn cách Playwright "suy nghĩ".

### 2. Luôn mở sẵn Trace Viewer

Trace Viewer không chỉ dành cho các bài kiểm tra thất bại. Hãy tạo thói quen chạy các bài kiểm tra với tùy chọn `trace: 'on'` trong quá trình phát triển. Sau khi chạy, hãy mở dấu vết (`npx playwright show-trace <tên_tệp_dấu_vết>.zip`). Việc xem lại dòng thời gian, ảnh chụp nhanh DOM và các yêu cầu mạng sẽ cho bạn một sự hiểu biết sâu sắc về những gì đang xảy ra.

### 3. Gỡ lỗi với `page.pause()` và Chế độ `--headed`

Khi một bài kiểm tra không hoạt động như mong đợi, hãy thêm `await page.pause();` vào mã của bạn. Khi Playwright chạy đến dòng đó, nó sẽ tạm dừng việc thực thi và mở Playwright Inspector. Tại đây, bạn có thể:
*   Thử các bộ định vị khác nhau.
*   Thực hiện từng bước các hành động tiếp theo.
*   Xem trang web trông như thế nào tại thời điểm đó.

Kết hợp điều này với việc chạy ở chế độ có giao diện (`--headed`) để có được phản hồi trực quan tức thì.

### 4. Ưu tiên các Bộ định vị Thân thiện với Người dùng

Luôn cố gắng sử dụng các bộ định vị như `getByRole`, `getByText`, `getByLabel` trước tiên. Các bộ định vị này có khả năng chống lại các thay đổi về cấu trúc HTML và gần với cách người dùng thực sự tương tác với trang của bạn. Chỉ sử dụng các bộ chọn CSS hoặc XPath khi không còn lựa chọn nào khác.

### 5. Đọc kỹ thông báo lỗi

Thông báo lỗi của Playwright rất chi tiết và hữu ích. Khi một bài kiểm tra thất bại, đừng chỉ nhìn vào dòng mã bị lỗi. Hãy đọc toàn bộ thông báo lỗi. Nó thường cho bạn biết chính xác vấn đề là gì, ví dụ:
*   `Timeout... waiting for selector "..."` (Không tìm thấy phần tử).
*   `Element is not visible` (Phần tử bị ẩn).
*   `Element is not stable...` (Phần tử đang có hoạt ảnh hoặc đang di chuyển).

### 6. Kết hợp UI và API

Đừng chỉ dựa vào các hành động trên giao diện người dùng. Nếu bạn cần tạo dữ liệu thử nghiệm (ví dụ: tạo một người dùng, thêm sản phẩm vào giỏ hàng), hãy thực hiện thông qua các yêu cầu API (`request`). Điều này sẽ làm cho các bài kiểm tra của bạn nhanh hơn và đáng tin cậy hơn rất nhiều.

### 7. Viết các bài kiểm tra nhỏ, tập trung

Mỗi bài kiểm tra chỉ nên xác minh một điều duy nhất. Tránh viết các bài kiểm tra dài, phức tạp thực hiện nhiều xác nhận khác nhau. Các bài kiểm tra nhỏ hơn dễ gỡ lỗi, dễ bảo trì và dễ hiểu hơn.
