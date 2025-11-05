import { test, expect } from '@playwright/test';

test('tìm phần tử `<h2>` có văn bản "Login Page"', async ({ page }) => {
  await page.goto('http://the-internet.herokuapp.com/login');   
  const locatorH2LoginPage = page.getByRole('heading', { name: 'Login Page', level: 2 });

  await expect(locatorH2LoginPage).toBeVisible(); 
  await expect(locatorH2LoginPage).toHaveCount(1);

});

test('tìm trường nhập liệu có nhãn "Username"', async ({ page }) => {
  await page.goto('http://the-internet.herokuapp.com/login');
  const locatorInputUsername = page.getByLabel('Username');

  await expect(locatorInputUsername).toBeVisible();
  await expect(locatorInputUsername).toHaveCount(1);
});

test('tìm nút có vai trò là `button` và tên là "Login".', async ({ page }) => {
  await page.goto('http://the-internet.herokuapp.com/login');
  const locatorButtonLogin = page.getByRole('button', { name: 'Login' });

  await expect(locatorButtonLogin).toBeVisible();
  await expect(locatorButtonLogin).toHaveCount(1);
});

test('Định vị liên kết (link) có văn bản "Form Authentication" bằng `getByText`', async ({ page }) => {
  await page.goto('http://the-internet.herokuapp.com/login');
  const locatorLinkHidden = page.getByRole('link', {name: 'Form Authentication'});
  await expect(locatorLinkHidden).toBeAttached();
});

test('Định vị nút màu xanh dương có chữ "baz"', async ({ page }) => {
  await page.goto('http://the-internet.herokuapp.com/challenging_dom');
  const locatorBlueButtonBaz = page.getByRole('link', { name: 'baz'});

  try {
    await expect(locatorBlueButtonBaz).toBeVisible();

    try {
      await expect(locatorBlueButtonBaz).toHaveCount(1);
      const backgroundColor = await locatorBlueButtonBaz.evaluate(el => {
        return window.getComputedStyle(el).backgroundColor;
      });
    
      console.log(`Ma mau tim thay: ${backgroundColor}`);
    } catch (error) {
      console.log('Co hon 1 button');
    }
    
  } catch (error) {
    console.log('Khong tim thay button');
  }
  
});

test('Tải lại trang cho đến khi tìm thấy 2 button "baz" mong muốn', async({ page }) => {
  const url = 'http://the-internet.herokuapp.com/challenging_dom';
  const locatorBazButton = page.getByRole('link', { name: /baz/i });
  

  const maxAttempts = 10;
  let elementFound = false;

  for(let attempt = 1; attempt <= maxAttempts; attempt++) {
    await page.goto(url);
    const countButton = await locatorBazButton.count();

    if (countButton > 1) {
      console.log(`${countButton} button duoc tim thay`);
      break;
    }
    
    try {
      await expect(locatorBazButton).toBeVisible();
      console.log('Chi 1 button duoc tim thay');
      
    } catch (error) {
      console.log('0 button duoc tim thay');
    }
  
  }
});


test('Tìm hàng vừa chứa text "Iuvaret7" vừa chứa nút "edit"', async ({ page }) => {
  await page.goto('http://the-internet.herokuapp.com/challenging_dom');

  const textInCell = 'Iuvaret7';

  // Locator này tìm một hàng (row) mà CÓ CHỨA (has) cả hai điều kiện sau:
  const targetRow = page.getByRole('row', {
    has: [
      // Điều kiện 1: Hàng phải chứa một ô có văn bản `textInCell`
      page.getByRole('cell', { has: page.getByRole('link', { name: 'edit' })}),
      page.getByRole('cell', { name: textInCell })
    ]
  });

  // Khẳng định rằng chúng ta đã tìm thấy đúng một hàng như vậy
  await expect(targetRow).toHaveCount(1);

  // Bây giờ, khi đã chắc chắn tìm được đúng hàng,
  // bạn có thể thực hiện hành động trên các phần tử bên trong hàng đó.
  const editButton = targetRow.getByRole('link', { name: 'edit' });
  await expect(editButton).toBeVisible();
  await editButton.click();

  // Khẳng định kết quả sau khi click
  await expect(page).toHaveURL(/edit/);

  console.log(`Đã tìm thấy hàng chứa cả "${textInCell}" và nút "edit", và đã nhấp vào nút "edit".`);
});

