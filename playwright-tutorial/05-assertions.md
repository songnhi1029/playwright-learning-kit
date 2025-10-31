# 05: Assertions (Xác nhận)

Assertions được sử dụng để xác minh rằng ứng dụng của bạn đang ở trạng thái mong đợi. Playwright cung cấp hàm `expect` để tạo các xác nhận.

## Các xác nhận phổ biến

Playwright đi kèm với một tập hợp các trình so khớp dành riêng cho web để giúp bạn viết các xác nhận tốt hơn.

*   `expect(locator).toBeVisible()`: Xác nhận rằng phần tử được tìm thấy bởi bộ định vị là hiển thị.
    ```typescript
    await expect(page.getByText('Welcome')).toBeVisible();
    ```

*   `expect(locator).toBeHidden()`: Xác nhận rằng phần tử bị ẩn.
    ```typescript
    await expect(page.locator('#loading-spinner')).toBeHidden();
    ```

*   `expect(locator).toContainText()`: Xác nhận rằng phần tử có chứa văn bản được cung cấp.
    ```typescript
    await expect(page.locator('p')).toContainText('some text');
    ```

*   `expect(locator).toHaveAttribute()`: Xác nhận rằng phần tử có thuộc tính đã cho.
    ```typescript
    await expect(page.getByRole('link')).toHaveAttribute('href', '/docs/intro');
    ```

*   `expect(page).toHaveURL()`: Xác nhận rằng URL của trang là URL mong đợi.
    ```typescript
    await expect(page).toHaveURL(/.*intro/);
    ```

*   `expect(page).toHaveTitle()`: Xác nhận rằng tiêu đề của trang là tiêu đề mong đợi.
    ```typescript
    await expect(page).toHaveTitle(/Playwright/);
    ```

## Sửa đổi phủ định `.not`

Tất cả các xác nhận có thể được phủ định bằng cách sử dụng `.not`.

```typescript
await expect(page.getByText('Error')).not.toBeVisible();
```

## Tự động chờ

Giống như các hành động, các xác nhận của Playwright cũng tự động chờ. `expect` sẽ tiếp tục thử lại cho đến khi điều kiện được đáp ứng hoặc hết thời gian chờ.

---

## Bài tập thực hành

1.  **Xác nhận hiển thị:** Sau khi đăng nhập thành công trên `http://the-internet.herokuapp.com/login` (xem bài tập của bài 04), xác nhận rằng một phần tử có văn bản "You logged into a secure area!" được hiển thị.
2.  **Xác nhận thuộc tính:** Điều hướng đến `https://playwright.dev/`. Xác nhận rằng liên kết "Get started" có thuộc tính `href` chứa `/docs/intro`.
3.  **Xác nhận phủ định:** Trên trang đăng nhập, xác nhận rằng một phần tử có văn bản "Invalid password" ban đầu không được hiển thị.

**Tệp tiếp theo:** `06-practical-example.md`
