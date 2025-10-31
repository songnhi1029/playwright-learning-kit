# 04: Actions (Hành động)

Khi bạn đã định vị được một phần tử, bạn có thể thực hiện các hành động trên đó. Playwright cung cấp một tập hợp các phương thức để mô phỏng tương tác của người dùng.

## Các hành động phổ biến

*   `.click()`: Nhấp vào một phần tử.
    ```typescript
    await page.getByRole('link', { name: 'Get started' }).click();
    ```

*   `.fill()`: Xóa trường văn bản và nhập một giá trị mới.
    ```typescript
    await page.getByLabel('Password').fill('my-secret-password');
    ```

*   `.press()`: Nhấn một phím trên bàn phím.
    ```typescript
    await page.getByPlaceholder('Search docs').press('Enter');
    ```

*   `.check()`: Đánh dấu một hộp kiểm hoặc nút radio.
    ```typescript
    await page.getByLabel('I agree to the terms').check();
    ```

*   `.uncheck()`: Bỏ đánh dấu một hộp kiểm.
    ```typescript
    await page.getByLabel('Subscribe to newsletter').uncheck();
    ```

*   `.selectOption()`: Chọn một hoặc nhiều tùy chọn trong một menu thả xuống.
    ```typescript
    await page.getByLabel('Sort by').selectOption('price-descending');
    ```

*   `.hover()`: Di chuột qua một phần tử.
    ```typescript
    await page.getByRole('button', { name: 'Submit' }).hover();
    ```

*   `.dblclick()`: Nhấp đúp vào một phần tử.
    ```typescript
    await page.getByText('Double-click me').dblclick();
    ```

## Tự động chờ

Một trong những tính năng mạnh mẽ nhất của Playwright là tự động chờ. Trước khi thực hiện bất kỳ hành động nào, Playwright sẽ thực hiện một loạt các kiểm tra khả năng hành động trên phần tử. Ví dụ, khi bạn gọi `.click()`, Playwright sẽ đảm bảo rằng phần tử:

*   Được đính kèm vào DOM
*   Hiển thị
*   Ổn định (không có hoạt ảnh)
*   Nhận các sự kiện (không bị che khuất bởi phần tử khác)
*   Được bật

Điều này giúp loại bỏ một trong những nguyên nhân chính gây ra các bài kiểm tra không ổn định.

---

## Bài tập thực hành

1.  **Điền và nhấp:** Điều hướng đến `http://the-internet.herokuapp.com/login`. Sử dụng hành động `.fill()` để nhập "tomsmith" vào trường tên người dùng và "SuperSecretPassword!" vào trường mật khẩu. Sau đó, sử dụng hành động `.click()` để nhấp vào nút đăng nhập.
2.  **Đánh dấu hộp kiểm:** Điều hướng đến `http://the-internet.herokuapp.com/checkboxes`. Nhấp vào hộp kiểm đầu tiên để đánh dấu nó. Nhấp vào hộp kiểm thứ hai để bỏ đánh dấu nó.
3.  **Chọn từ danh sách thả xuống:** Điều hướng đến `http://the-internet.herokuapp.com/dropdown`. Sử dụng hành động `.selectOption()` để chọn "Option 2" từ danh sách thả xuống.

**Tệp tiếp theo:** `05-assertions.md`
