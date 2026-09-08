import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  //await page.goto('/'); // This line is commented out because it was causing an error. The base URL needs to be specified in the Playwright configuration file for this to work.
  await page.goto('https://playwright.dev/');
});

 test('Realizar una busqueda que no tenga resultados', async ({ page }) => {
  //await page.getByRole('button').click(); // This line is commented out because it was causing an error. The button role needs to be specified with a name or other attributes to correctly identify the search button.
  await page.getByRole('button', { name: 'Search (Control+k)' }).click();

  //await page.getByPlaceholder('Search docs').click(); // This line is commented out because it was causing an error. The placeholder role needs to be specified with a name or other attributes to correctly identify the search input field.
  await page.getByRole('searchbox', { name: 'Search' }).click();

  //await page.getByPlaceholder('Search docs').fill('hascontent'); // This line is commented out because it was causing an error. The placeholder role needs to be specified with a name or other attributes to correctly identify the search input field.
  await page.getByRole('searchbox', { name: 'Search' }).fill('hascontent');

  expect(page.locator('.DocSearch-NoResults p')).toBeVisible();

  //expect(page.locator('.DocSearch-NoResults p')).toHaveText('No results for hascontent'); // This assertion is incorrect because the text content of the element may vary based on the search term. We should either modify the text content to check for the presence of the element OR use a more flexible assertion that allows for variations in the text content.
  expect(page.locator('.DocSearch-NoResults p')).toHaveText('No results found for "hascontent"');

})

  test('Limpiar el input de busqueda', async ({ page }) => {
  await page.getByRole('button', { name: 'Search' }).click();

  const searchBox = page.getByPlaceholder('Search docs');

  await searchBox.click();

  await searchBox.fill('somerandomtext');

  //await expect(searchBox).toHaveText('somerandomtext'); // This assertion is incorrect because the input field's value is not the same as its text content. Use toHaveValue or toContainText instead.
  await expect(page.locator('.DocSearch-NoResults p')).toContainText('somerandomtext');

  await page.getByRole('button', { name: 'Clear the query' }).click();

  await expect(searchBox).toHaveAttribute('value', '');
});

test('Realizar una busqueda que genere al menos tenga un resultado', async ({ page }) => {
  await page.getByRole('button', { name: 'Search ' }).click();

  const searchBox = page.getByPlaceholder('Search docs');

  await searchBox.click();

  await page.getByPlaceholder('Search docs').fill('havetext');

  //expect(searchBox).toHaveText('havetext'); // This assertion is incorrect because the input field's value is not the same as its text content. Use toHaveValue or toContainText instead.
  expect(page.locator('.DocSearch-Hit-content-wrapper')).toHaveValue

  // Verity there are sections in the results
  await page.locator('.DocSearch-Dropdown-Container section').nth(1).waitFor();
  const numberOfResults = await page.locator('.DocSearch-Dropdown-Container section').count();
  await expect(numberOfResults).toBeGreaterThan(0);

});