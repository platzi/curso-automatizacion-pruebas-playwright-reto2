import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playwright.dev/docs/intro');
});

test('Realizar una busqueda que no tenga resultados', async ({ page }) => {
  
  await page.getByLabel('Search').click();

  await page.getByPlaceholder('Search docs').click();

  await page.getByPlaceholder('Search docs').fill('hascontent');

  await expect(page.locator('.DocSearch-NoResults p')).toBeVisible();

  await expect(page.locator('.DocSearch-NoResults p')).toHaveText('No results for "hascontent"');
});

test('Limpiar el input de busqueda', async ({ page }) => {
  await page.getByRole('button', { name: 'Search' }).click();

  const searchBox = page.getByPlaceholder('Search docs');

  await searchBox.click();

  await searchBox.fill('somerandomtext');

  await expect(searchBox).toHaveValue('somerandomtext');

  await page.getByRole('button', { name: 'Clear the query' }).click();

  await expect(searchBox).toHaveAttribute('value', '');
});