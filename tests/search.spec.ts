import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Realizar una busqueda que no tenga resultados', async ({ page }) => {
  // Click en el botón de búsqueda (lupa)
  await page.getByRole('button', { name: 'Search'}).click();

  // Seleccionamos el input de búsqueda por placeholder
  await page.getByPlaceholder('Search docs').click();
  await page.getByPlaceholder('Search docs').fill('hascontent');

  // Esperamos a que aparezca el mensaje de no resultados
  await expect(page.locator('.DocSearch-NoResults p')).toBeVisible();
  await expect(page.locator('.DocSearch-NoResults p')).toHaveText('No results for "hascontent"');
});

test('Limpiar el input de busqueda', async ({ page }) => {
    // Abrir el cuadro de búsqueda
  await page.getByRole('button', { name: 'Search'}).click();

  // Obtener el input y escribir texto
  const searchBox = page.getByPlaceholder('Search docs');
  await searchBox.fill('somerandomtext');

  // Verificar que el input tenga el texto escrito
  //await expect(searchBox).toHaveValue('somerandomtext');
  await expect(searchBox).toHaveAttribute('value', 'somerandomtext')

  // Hacer clic en el botón para limpiar el input (botón con aria-label 'Clear query')

  await page.getByRole('button', { name: 'Clear the query'}).click();

  // Verificar que el input esté vacío
  await expect(searchBox).toHaveAttribute('value', '');
});

test('Realizar una busqueda que genere al menos tenga un resultado', async ({ page }) => {

  // Click en el botón de búsqueda (lupa)
  await page.getByRole('button', { name: 'Search ' }).click();

  const searchBox = page.getByPlaceholder('Search docs');

  await searchBox.click();

  await page.getByPlaceholder('Search docs').fill('toHaveText​');

  const expectedSearch = page.getByRole('link', { name: 'toHaveText​ LocatorAssertions' });
  await expect(expectedSearch).toContainText('toHaveText​');

  // Verity there are sections in the results
  await page.locator('.DocSearch-Dropdown-Container section').nth(1).waitFor();
  const numberOfResults = await page.locator('.DocSearch-Dropdown-Container section').count();
  await expect(numberOfResults).toBeGreaterThan(0);

});