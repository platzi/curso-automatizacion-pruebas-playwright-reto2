import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Realizar una busqueda que no tenga resultados', async ({ page }) => {
  await page.locator('.DocSearch-Button-Container').click();

  await page.getByPlaceholder('Search docs').click();

  await page.getByPlaceholder('Search docs').fill('hascontent');

  expect(page.locator('.DocSearch-Dropdown')).toBeVisible();

  await expect(page.locator('.DocSearch-Title')).toHaveText('No results for "hascontent"');

})

test('Limpiar el input de busqueda', async ({ page }) => {

  await page.locator('.DocSearch-Button-Container').click();

  const searchBox =  page.getByPlaceholder('Search docs');

  await searchBox.click();

  await searchBox.fill('somerandomtext');

  await expect(page.locator('.DocSearch-Input')).toHaveValue('somerandomtext')

  await page.locator('.DocSearch-Reset').click();

  await expect(page.locator('.DocSearch-Input')).toHaveValue('');
});


test('Realizar una busqueda que genere al menos tenga un resultado', async ({ page }) => {

  await page.locator('.DocSearch-Button-Container').click();

  const searchBox =  page.getByPlaceholder('Search docs');

  await searchBox.click();

  await searchBox.fill('toHaveTest');

  await expect(page.locator('.DocSearch-Input')).toHaveValue('toHaveTest')

  // Verify there are sections in the results
  await page.locator('.DocSearch-Dropdown-Container section').nth(1).waitFor();
  const numberOfResults = await page.locator('.DocSearch-Dropdown-Container section').count();
  expect(numberOfResults).toBeGreaterThan(0);

});