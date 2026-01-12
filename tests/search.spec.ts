import { test, expect, Page } from '@playwright/test';
import { PlaywrightDocsPage } from '../models/PlaywrightDocsPage';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('TC01: Realizar una busqueda que no tenga resultados', async ({ page }) => {
  const searchTerm = 'hascontent';
  const playwrightDocsPage = new PlaywrightDocsPage(page);

  await playwrightDocsPage.search(searchTerm);
  await expect(playwrightDocsPage.noSearchResultsMessage).toBeVisible();
  await expect(playwrightDocsPage.noSearchResultsMessage).toHaveText(`No results for "${searchTerm}"`);
})

test('TC02: Limpiar el input de busqueda', async ({ page }) => {
  const searchTerm = 'somerandomtext';
  const playwrightDocsPage = new PlaywrightDocsPage(page);

  await playwrightDocsPage.search(searchTerm);
  await playwrightDocsPage.clearSearch();
});

test('TC03: Realizar una busqueda que genere al menos tenga un resultado', async ({ page }) => {
  const searchTerm = 'havetext';
  const playwrightDocsPage = new PlaywrightDocsPage(page);

  await playwrightDocsPage.search(searchTerm);
  await expect(playwrightDocsPage.numberOfResults.nth(1)).toBeVisible();

  const numberOfResults = await playwrightDocsPage.numberOfResults.count();
  expect(numberOfResults).toBeGreaterThan(0);
});