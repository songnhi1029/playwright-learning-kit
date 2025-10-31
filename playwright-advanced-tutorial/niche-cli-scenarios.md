# Các kịch bản CLI nâng cao và đặc biệt

Đây là những trường hợp sử dụng chuyên sâu, giải quyết các vấn đề cụ thể mà bạn có thể gặp phải trong các dự án lớn hoặc các quy trình tự động hóa phức tạp.

---

### Kịch bản 1: Sharding - Chia nhỏ bộ kiểm thử ra nhiều máy

*   **Vấn đề:** Bộ kiểm thử của bạn có hàng ngàn bài kiểm tra và mất quá nhiều thời gian để chạy, ngay cả khi chạy song song trên một máy.
*   **Giải pháp:** Sử dụng "sharding" để chia bộ kiểm thử thành nhiều phần và chạy mỗi phần trên một máy riêng biệt trong môi trường CI/CD.
*   **Cách thực hiện:**
    *   Giả sử bạn muốn chia bộ kiểm thử thành 4 phần (4 máy).

    *   **Trên máy 1 (hoặc container 1):**
        ```bash
        npx playwright test --shard=1/4
        ```

    *   **Trên máy 2 (hoặc container 2):**
        ```bash
        npx playwright test --shard=2/4
        ```

    *   **Trên máy 3 (hoặc container 3):**
        ```bash
        npx playwright test --shard=3/4
        ```

    *   **Trên máy 4 (hoặc container 4):**
        ```bash
        npx playwright test --shard=4/4
        ```

    Hệ thống CI của bạn sẽ chạy các lệnh này đồng thời, và sau đó bạn có thể tổng hợp kết quả. Tốc độ chạy kiểm thử sẽ được cải thiện đáng kể.

---

### Kịch bản 2: Global Setup - Chuẩn bị dữ liệu cho toàn bộ quá trình kiểm thử

*   **Vấn đề:** Các bài kiểm tra của bạn yêu cầu một trạng thái cơ sở dữ liệu cụ thể (ví dụ: một tập hợp người dùng, sản phẩm) trước khi *bất kỳ* bài kiểm tra nào được chạy.
*   **Giải pháp:** Sử dụng `globalSetup` trong `playwright.config.ts` để chạy một script thiết lập một lần duy nhất.
*   **Cách thực hiện:**
    1.  **Tạo một tệp `global-setup.ts`:**
        ```typescript
        // global-setup.ts
        import { chromium, FullConfig } from '@playwright/test';
        import { seedDatabase } from './my-db-utils';

        async function globalSetup(config: FullConfig) {
          console.log('Seeding database...');
          await seedDatabase();
          console.log('Database seeded.');
        }

        export default globalSetup;
        ```

    2.  **Cấu hình trong `playwright.config.ts`:**
        ```typescript
        // playwright.config.ts
        export default defineConfig({
          // ...
          globalSetup: require.resolve('./global-setup.ts'),
          // Tương tự, bạn có thể có globalTeardown để dọn dẹp
          globalTeardown: require.resolve('./global-teardown.ts'),
        });
        ```
    Bây giờ, `globalSetup` sẽ chạy một lần trước khi tất cả các bài kiểm tra bắt đầu.

---

### Kịch bản 3: Chạy kiểm thử trên nhiều môi trường (Staging, Production)

*   **Vấn đề:** Bạn muốn chạy cùng một bộ kiểm thử trên môi trường phát triển cục bộ (`localhost`), môi trường staging, và có thể cả môi trường production (chỉ các bài kiểm tra an toàn).
*   **Giải pháp:** Định nghĩa các "project" khác nhau trong `playwright.config.ts`, mỗi project có một `baseURL` khác nhau.
*   **Cách thực hiện:**
    ```typescript
    // playwright.config.ts
    export default defineConfig({
      projects: [
        {
          name: 'local',
          use: { baseURL: 'http://localhost:3000' },
        },
        {
          name: 'staging',
          use: { baseURL: 'https://staging.myapp.com' },
        },
      ],
    });
    ```
    *   **Chạy trên môi trường staging:**
        ```bash
        npx playwright test --project=staging
        ```
    *   **Chạy trên môi trường local (mặc định):**
        ```bash
        npx playwright test --project=local
        ```

---

### Kịch bản 4: Chạy lại chỉ các bài kiểm tra đã thất bại

*   **Vấn đề:** Một lần chạy dài bị thất bại ở một vài bài kiểm tra không ổn định (flaky). Bạn muốn chạy lại *chỉ những bài đã thất bại* mà không cần chạy lại toàn bộ.
*   **Giải pháp:** Playwright tự động tạo một tệp chứa danh sách các bài thất bại. Bạn có thể sử dụng nó để chạy lại.
*   **Cách thực hiện:**
    1.  Sau một lần chạy, nếu có lỗi, Playwright sẽ hiển thị một gợi ý.
    2.  Để chạy lại chỉ các bài thất bại từ lần chạy trước, sử dụng cờ `--last-failed`:
        ```bash
        npx playwright test --last-failed
        ```

---

### Kịch bản 5: Tích hợp với các công cụ khác bằng cách xuất báo cáo JSON

*   **Vấn đề:** Bạn muốn phân tích kết quả kiểm thử bằng một công cụ tùy chỉnh, hoặc tạo một dashboard riêng.
*   **Giải pháp:** Sử dụng reporter `json` để xuất tất cả kết quả ra một tệp JSON, sau đó xử lý tệp này.
*   **Cách thực hiện:**
    ```bash
    # Chạy kiểm thử và xuất kết quả ra tệp results.json
    npx playwright test --reporter=json > results.json
    ```
    Bây giờ bạn có thể viết một script (Node.js, Python, v.v.) để đọc và phân tích tệp `results.json` theo nhu cầu của bạn.
