import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Navega a la página web de Playwright antes de cada prueba.
  await page.goto('https://playwright.dev/'); 
});

test('Realizar una busqueda que no tenga resultados', async ({ page }) => {
  // Hace clic en el botón de búsqueda.
  await page.locator("button[aria-label='Search']").click(); 

  // Hace clic en el cuadro de búsqueda.
  await page.getByPlaceholder('Search docs').click(); 

  // Rellena el cuadro de búsqueda con el término 'hascontent'.
  await page.getByPlaceholder('Search docs').fill('hascontent'); 

  // Verifica que el título de la búsqueda esté visible.
  await expect(page.locator('.DocSearch-Title')).toBeVisible(); 

  // Verifica que el texto del título sea 'No results for "hascontent"'.
  await expect(page.locator('.DocSearch-Title')).toHaveText('No results for "hascontent"'); 
})

test('Limpiar el input de busqueda', async ({ page }) => {
  // Hace clic en el botón de búsqueda.
  await page.getByRole('button', { name: 'Search' }).click(); 

  // Obtiene el cuadro de búsqueda.
  const searchBox = page.getByPlaceholder('Search docs'); 

  // Hace clic en el cuadro de búsqueda.
  await searchBox.click(); 

  // Rellena el cuadro de búsqueda con el término 'somerandomtext'.
  await searchBox.fill('somerandomtext'); 

  // Verifica que el valor del cuadro de búsqueda sea 'somerandomtext'.
  await expect(searchBox).toHaveAttribute('value', 'somerandomtext'); 

  // Hace clic en el botón para borrar la consulta de búsqueda.
  await page.getByRole('button', { name: 'Clear the query' }).click(); 

  // Verifica que el valor del cuadro de búsqueda esté vacío.
  await expect(searchBox).toHaveAttribute('value', ''); 
});

test('Realizar una busqueda que genere al menos tenga un resultado', async ({ page }) => {
  // Hace clic en el botón de búsqueda.
  await page.getByRole('button', { name: 'Search' }).click(); 

  // Obtiene el cuadro de búsqueda.
  const searchBox = page.getByPlaceholder('Search docs'); 

  // Hace clic en el cuadro de búsqueda.
  await searchBox.click(); 

  // Rellena el cuadro de búsqueda con el término 'havetext'.
  await page.getByPlaceholder('Search docs').fill('havetext'); 

  // Verifica que el valor del cuadro de búsqueda sea 'havetext'.
  expect(searchBox).toHaveAttribute('value', 'havetext'); 

  // Verifica que haya secciones en los resultados de la búsqueda.
  // Espera a que aparezca al menos una sección en los resultados de la búsqueda.
  await page.locator('.DocSearch-Dropdown-Container section').nth(1).waitFor(); 
  // Cuenta el número de secciones en los resultados de la búsqueda.
  const numberOfResults = await page.locator('.DocSearch-Dropdown-Container section').count(); 
  // Verifica que el número de secciones sea mayor que cero.
  await expect(numberOfResults).toBeGreaterThan(0); 
});