import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Realizar una busqueda que no tenga resultados', async ({ page }) => {
  await page.getByRole('button', { name: "Search" }).click();

  await page.getByPlaceholder('Search docs').click();

  await page.getByPlaceholder('Search docs').fill('hascontent');

  // ** NO TENIA LOS AWAIT POR LO TANTO NO IBA A VALIDAR QUE SUCEDIERA **

  await expect(page.locator('.DocSearch-NoResults p')).toBeVisible();

  // ** AL TEXTO LE FALTABA LOS " " POR LO TANTO AL CARECER DE ELLOS, NO HACIA MATCH CON EL RESULTADO

  await expect(page.locator('.DocSearch-NoResults p')).toHaveText('No results for "hascontent"');

})

test('Limpiar el input de busqueda', async ({ page }) => {
  await page.getByRole('button', { name: 'Search' }).click();

  const searchBox = page.getByPlaceholder('Search docs');

  await searchBox.click();

  await searchBox.fill('somerandomtext');

  // ** EL PLACEHOLDER NO GUARDA LA BUSQUEDA COMO UN TEXT SINO COMO UN VALUE **

  await expect(searchBox).toHaveValue('somerandomtext');

  await page.getByRole('button', { name: 'Clear the query' }).click();

  await expect(searchBox).toHaveAttribute('value', '');
});

test('Realizar una busqueda que genere al menos tenga un resultado', async ({ page }) => {
  await page.getByRole('button', { name: 'Search ' }).click();

  const searchBox = page.getByPlaceholder('Search docs');

  await searchBox.click();

  await page.getByPlaceholder('Search docs').fill('havetext');

  // ** NUEVAMENTE EL INPUT LO GUARDA COMO UN VALUE NO COMO UN TEXTO EN EL INNER Y FALTABA EL AWAIT PARA VALIDAR QUE SUCEDIERA**

  await expect(searchBox).toHaveValue('havetext');

  // Verity there are sections in the results
  await page.locator('.DocSearch-Dropdown-Container section').nth(1).waitFor();
  const numberOfResults = await page.locator('.DocSearch-Dropdown-Container section').count();
  await expect(numberOfResults).toBeGreaterThan(0);

});