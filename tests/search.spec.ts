import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playwright.dev/');
});

test('Realizar una busqueda que no tenga resultados', async ({ page }) => {
  await page.locator('a.navbar__item.navbar__link:has-text("Docs")').click();

  await page.locator('span.DocSearch-Button-Placeholder').click();

  await page.locator('#docsearch-input').fill('hascontent');


  await expect(page.locator('p.DocSearch-Title')).toBeVisible();

  await expect(page.locator('p.DocSearch-Title')).toHaveText('No results for "hascontent"');



})

test('Limpiar el input de busqueda', async ({ page }) => {
  await page.locator('span.DocSearch-Button-Placeholder' ).click();

  const searchBox = page.getByPlaceholder('Search docs');

  await searchBox.click();

  await searchBox.fill('somerandomtext');

  await expect(searchBox).toHaveValue('somerandomtext');

  await page.getByLabel('Clear the query').click();

  await expect(searchBox).toHaveAttribute('value', '');
});

test('Realizar una busqueda que genere al menos tenga un resultado', async ({ page }) => {
  await page.getByRole('button', { name: 'Search ' }).click();

  const searchBox = page.getByPlaceholder('Search docs');

  await searchBox.click();

  await page.getByPlaceholder('Search docs').fill('havetext');

  await expect(searchBox).toHaveValue('havetext');

  // Verity there are sections in the results
  await page.locator('.DocSearch-Dropdown-Container section').nth(1).waitFor();
  const numberOfResults = await page.locator('.DocSearch-Dropdown-Container section').count();
  await expect(numberOfResults).toBeGreaterThan(0);

});