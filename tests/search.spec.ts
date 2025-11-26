import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Realizar una busqueda que no tenga resultados', async ({ page }) => {

  const keywordSearched = 'hascontent';
  
  await page.getByRole('button', { name: 'Search (Ctrl+K)' }).click();
  await page.getByPlaceholder('Search docs').click();
  await page.getByPlaceholder('Search docs').fill(keywordSearched);
  await expect(page.locator('.DocSearch-NoResults p')).toBeVisible();
  await expect(page.locator('.DocSearch-NoResults p')).toHaveText(
    `No results for "${keywordSearched}"`,
  );

})

test('Limpiar el input de busqueda', async ({ page }) => {

  const keywordSearched = 'somerandomtext';

  await page.getByRole('button', { name: 'Search (Ctrl+K)' }).click();
  const searchBox = page.getByPlaceholder('Search docs');
  await searchBox.click();
  await searchBox.fill(keywordSearched);
  await expect(searchBox).toHaveValue(keywordSearched);
  await page.getByRole('button', { name: 'Clear the query' }).click();
  await expect(searchBox).toHaveAttribute('value', '');
});

test('Realizar una busqueda que genere al menos tenga un resultado', async ({ page }) => {

  const keybwordSearched = 'havetext';

  await page.getByRole('button', { name: 'Search (Ctrl+K)' }).click();
  const searchBox = page.getByPlaceholder('Search docs');
  await searchBox.click();
  await page.getByPlaceholder('Search docs').fill(keybwordSearched);
  await expect(searchBox).toHaveValue(keybwordSearched);

  // Verity there are sections in the results
  await page.locator('.DocSearch-Dropdown-Container section').nth(1).waitFor();
  const numberOfResults = await page.locator('.DocSearch-Dropdown-Container section').count();
  await expect(numberOfResults).toBeGreaterThan(0);

});