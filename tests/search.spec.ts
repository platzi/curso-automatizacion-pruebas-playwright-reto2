import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

const searchButton = (page: Page) => page.getByRole('button', { name: /Search/ });
const searchDocs = (page: Page) => page.getByPlaceholder('Search docs');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Realizar una busqueda que no tenga resultados', async ({ page }) => {
  await searchButton(page).click();

  await searchDocs(page).fill('hascontent');

  await expect(page.locator('.DocSearch-Title', { hasText: 'No results found for "hascontent"' })).toBeVisible();

})

test('Limpiar el input de busqueda', async ({ page }) => {
  await searchButton(page).click();

  await searchDocs(page).fill('somerandomtext');

  await page.getByRole('button', { name: 'Clear the query' }).click();

  await expect(searchDocs(page)).toHaveAttribute('value', '');
});

test('Realizar una busqueda que genere al menos tenga un resultado', async ({ page }) => {
  
  await searchButton(page).click();

  await searchDocs(page).fill('havetext');

  // Verify there are sections in the results
  await page.locator('.DocSearch-Dropdown-Container section').nth(1).waitFor();
  const numberOfResults = await page.locator('.DocSearch-Dropdown-Container section').count();
  await expect(numberOfResults).toBeGreaterThan(0);

});