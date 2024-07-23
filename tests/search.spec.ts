import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});


test('Realizar una busqueda que no tenga resultados', async ({ page }) => {
  await page.getByRole('button', { name: 'Search' }).click();

  await page.getByPlaceholder('Search docs').click();

  await page.getByPlaceholder('Search docs').fill('hascontent');

  await expect(page.locator('.DocSearch-NoResults p')).toBeVisible();

  await expect(page.locator('.DocSearch-NoResults p')).toHaveText('No results for "hascontent"');

})

test('Limpiar el input de busqueda', async ({ page }) => {
  await page.getByRole('button', { name: 'Search' }).click();

  const searchBox = page.getByPlaceholder('Search Docs');

  await searchBox.click();

  await searchBox.fill('somerandomtext');

  //await expect(page.locator("#docsearch-input")).toHaveText('somerandomtext');

  await expect(searchBox).toHaveAttribute('value', 'somerandomtext');

  await page.getByRole('button', { name: 'Clear the query' }).click();

  await expect(searchBox).toHaveAttribute('value', '');
});

test('Realizar una busqueda que genere al menos tenga un resultado', async ({ page }) => {
  await page.getByRole('button', { name: 'Search' }).click();

  const searchBox = page.getByPlaceholder('Search docs');

  await searchBox.click();

  await page.getByPlaceholder('Search docs').fill('Playwright Test');

  await page.getByPlaceholder('Search docs').fill('toHaveText​');

  const expectedSearch = page.getByRole('link', { name: 'toHaveText​ LocatorAssertions' });
  await expect(expectedSearch).toContainText('toHaveText​');

  // Verity there are sections in the results
  await page.locator('.DocSearch-Dropdown-Container section').nth(1).waitFor();
  const numberOfResults = await page.locator('.DocSearch-Dropdown-Container section').count();
  await expect(numberOfResults).toBeGreaterThan(0);

});
