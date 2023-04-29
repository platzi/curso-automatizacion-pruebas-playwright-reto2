import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => { // En este caso tenemos un foreach para que en cada URL lo inicialice
  await page.goto('/');
});

test('Realizar una busqueda que no tenga resultados', async ({ page }) => {
  await page.locator("//button[@class='DocSearch DocSearch-Button']").click();

  await page.getByPlaceholder('Search docs').click();

  await page.getByPlaceholder('Search docs').fill('hascontent');

  await page.pause();

  await expect(page.locator("//div[@class='DocSearch-NoResults']")).toBeVisible();

  await expect(page.locator("//div[@class='DocSearch-NoResults']")).toHaveText('No results for "hascontent"');

})


test('Limpiar el input de busqueda', async ({ page }) => {
  await page.getByRole('button', { name: 'Search' }).click();

  const searchBox = page.locator('.DocSearch-Input');

  await searchBox.click();

  await searchBox.fill('somerandomtext');

  await expect(searchBox).toHaveAttribute('value', 'somerandomtext');

  await page.getByRole('button', { name: 'Clear the query' }).click();

  await expect(searchBox).toHaveAttribute('value', '');
});

test('Realizar una busqueda que genere al menos tenga un resultado', async ({ page }) => {
  await page.getByRole('button', { name: 'Search' }).click();

  const searchBox = page.locator('.DocSearch-Input');

  await searchBox.click();

  await searchBox.fill('havetext');

  await expect(searchBox).toHaveAttribute('value', 'havetext');

  // Verity there are sections in the results
  await page.locator('.DocSearch-Dropdown-Container section').nth(1).waitFor();
  const numberOfResults = await page.locator('.DocSearch-Dropdown-Container section').count();
  await expect(numberOfResults).toBeGreaterThan(0);

});