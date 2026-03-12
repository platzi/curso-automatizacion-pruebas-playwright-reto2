import { test, expect } from '@playwright/test';

test.describe('Búsqueda de información en los Docs de Playwright', () => {

	test.beforeEach(async ({ page }) => {
		await page.goto('https://playwright.dev/docs/intro');
	});

	test.afterEach(async ({ page }) => {
		await page.keyboard.press('Escape');
	});

	test('Realizar una busqueda que no tenga resultados', async ({ page }) => {
		await page.locator('.DocSearch.DocSearch-Button').click();
		const searchBox = await page.locator('.DocSearch-Input');
		await searchBox.click();
		await searchBox.fill('hascontent');
		await expect(page.locator('.DocSearch-NoResults p')).toBeVisible();
		await expect(page.locator('.DocSearch-NoResults p')).toHaveText("No results for \"hascontent\"");
	})

	test('Limpiar el input de busqueda', async ({ page }) => {
		await page.locator('.DocSearch.DocSearch-Button').click();
		const searchBox = await page.locator('.DocSearch-Input');
		await searchBox.click();
		await searchBox.fill('somerandomtext');
		await expect(searchBox).toHaveValue('somerandomtext');
		await page.locator('.DocSearch-Reset').click();
		await expect(searchBox).toHaveAttribute('value', '');
	});

	test('Realizar una busqueda que genere al menos tenga un resultado', async ({ page }) => {
		await page.locator('.DocSearch.DocSearch-Button').click();
		const searchBox = await page.locator('.DocSearch-Input');
		await searchBox.click();
		await searchBox.fill('havetext');
		await expect(searchBox).toHaveValue('havetext');
		// Verity there are sections in the results
		await page.locator('.DocSearch-Dropdown-Container section').nth(1).waitFor();
		const numberOfResults = await page.locator('.DocSearch-Dropdown-Container section').count();
		await expect(numberOfResults).toBeGreaterThan(0);
	});

});
