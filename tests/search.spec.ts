import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Realizar una busqueda que no tenga resultados', async ({ page }) => {
  await page.getByRole('button', { name: 'Search (Ctrl+K)' }).click();
  await page.getByPlaceholder('Search docs').fill('hascontent');
  await expect(page.locator('.DocSearch-Title')).toBeVisible();
  await expect(page.locator('.DocSearch-Title')).toHaveText('No results for \"hascontent\"');
})

test('Limpiar el input de busqueda', async ({ page }) => {
  await page.getByRole('button', { name: 'Search (Ctrl+K)' }).click();
  const searchBox = page.getByPlaceholder('Search docs');
  await searchBox.fill('somerandomtext');
  await expect(searchBox).toHaveValue('somerandomtext');
  await page.getByRole('button', { name: 'Clear the query' }).click();
  await expect(searchBox).toHaveAttribute('value', '');
});

test('Realizar una busqueda que genere al menos un resultado', async ({ page }) => {
  await page.getByRole('button', { name: 'Search (Ctrl+K)' }).click();
  const searchBox = page.getByPlaceholder('Search docs');
  await searchBox.fill('havetext');
  await expect(searchBox).toHaveValue('havetext');
  // Verity there are sections in the results
  await expect(page.locator('.DocSearch-Dropdown-Container section').nth(1)).toBeVisible();
  const numberOfResults = await page.locator('.DocSearch-Dropdown-Container section').count();
  console.log('Number of result sections:', numberOfResults);
  await expect(numberOfResults).toBeGreaterThan(0);
});