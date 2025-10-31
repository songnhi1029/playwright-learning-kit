# 10: Playwright Trace Viewer

Playwright Trace Viewer là một công cụ GUI cho phép bạn khám phá các dấu vết được ghi lại của các bài kiểm tra Playwright. Nó giúp bạn gỡ lỗi các bài kiểm tra thất bại và xem những gì đã xảy ra trong quá trình thực thi.

## Dấu vết (Trace) là gì?

Một dấu vết chứa thông tin chi tiết về việc thực thi bài kiểm tra của bạn, bao gồm:

*   **Ảnh chụp nhanh DOM**: Trạng thái của trang tại mỗi bước.
*   **Hành động**: Các hành động của Playwright được thực hiện (ví dụ: `click`, `fill`).
*   **Yêu cầu mạng**: Tất cả các yêu cầu mạng được thực hiện trong quá trình kiểm tra.
*   **Nhật ký bảng điều khiển**: Các thông báo được ghi lại vào bảng điều khiển của trình duyệt.
*   **Thông tin nguồn**: Mã nguồn của bài kiểm tra của bạn được ánh xạ tới các hành động.

## Cách ghi lại một dấu vết

Bạn có thể định cấu hình cách ghi lại dấu vết trong tệp `playwright.config.ts`.

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    // Ghi lại dấu vết cho lần thử lại đầu tiên của một bài kiểm tra thất bại
    trace: 'on-first-retry',
  },
});
```

Các tùy chọn `trace` có sẵn:

*   `'off'`: Không ghi lại dấu vết.
*   `'on'`: Ghi lại dấu vết cho mọi bài kiểm tra.
*   `'retain-on-failure'`: Ghi lại dấu vết cho mọi bài kiểm tra, nhưng xóa nó đối với các lần chạy kiểm tra thành công.
*   `'on-first-retry'`: Ghi lại dấu vết chỉ khi thử lại một bài kiểm tra thất bại lần đầu tiên.

## Mở Trace Viewer

Sau khi chạy các bài kiểm tra của mình, bạn có thể mở báo cáo HTML để xem các dấu vết.

```bash
npx playwright show-report
```

Trong báo cáo, đối với mỗi bài kiểm tra có dấu vết được ghi lại, bạn sẽ thấy một biểu tượng dấu vết. Nhấp vào nó sẽ mở Trace Viewer.

## Sử dụng Trace Viewer

Trace Viewer cung cấp một dòng thời gian về việc thực thi bài kiểm tra của bạn. Bạn có thể:

*   **Di chuyển qua các hành động**: Xem ảnh chụp nhanh DOM trước và sau mỗi hành động.
*   **Kiểm tra các yêu cầu mạng**: Xem chi tiết về các yêu-cầu và phản-hồi.
*   **Xem nhật ký bảng điều khiển**: Gỡ lỗi các vấn đề phía máy khách.
*   **Khám phá DOM**: Kiểm tra DOM tại bất kỳ thời điểm nào trong quá trình kiểm tra.

Trace Viewer là một công cụ vô giá để hiểu tại sao một bài kiểm tra thất bại và để gỡ lỗi các kịch bản phức tạp.

**Tệp tiếp theo:** `11-page-object-model.md`
