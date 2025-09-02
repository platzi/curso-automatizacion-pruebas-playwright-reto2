import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Realizar una busqueda que no tenga resultados', async ({ page }) => {
  await page.locator('svg.DocSearch-Search-Icon').click();

  await page.getByPlaceholder('Search docs').click();

  await page.getByPlaceholder('Search docs').fill('hascontent');

await expect(page.locator('div.DocSearch-NoResults')).toBeVisible();

  await expect(page.locator('.DocSearch-NoResults')).toHaveText('No results for "hascontent"');

})

test('Limpiar el input de busqueda', async ({ page }) => {
  await page.getByRole('button', { name: 'Search (Ctrl+K)'}).click();

  const searchBox = page.getByPlaceholder('Search docs');

  await searchBox.click();

  await searchBox.fill('somerandomtext');

  await expect(searchBox).toHaveValue('somerandomtext');

  await page.getByRole('button', { name: 'Clear the query' }).click();

  await expect(searchBox).toHaveAttribute('value', '');
});

test('Realizar una busqueda que genere al menos tenga un resultado', async ({ page }) => {
  await page.getByRole('button', { name: 'Search (Ctrl+K)'}).click();

  const searchBox = page.getByPlaceholder('Search docs');

  await searchBox.click();

  await page.getByPlaceholder('Search docs').fill('havetext');

  expect(searchBox).toHaveValue('havetext');

  // Verity there are sections in the results
  await page.locator('.DocSearch-Hit-Container').nth(1).waitFor();
  const numberOfResults = await page.locator('.DocSearch-Hit-Container').count();
  await expect(numberOfResults).toBeGreaterThan(0);

});