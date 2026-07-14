import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://playwright.dev/docs/intro");
});

test("Realizar una busqueda que no tenga resultados", async ({ page }) => {
  //await page.getByRole("button").click();
  await page.locator(".DocSearch-Button-Container").click();

  const searchBox = page.locator(".DocSearch-Input");

  await searchBox.click();

  await searchBox.fill("hascontent");

  expect(page.locator(".DocSearch-NoResults p")).toBeVisible();

  expect(page.locator(".DocSearch-NoResults p")).toHaveText(
    'No results found for "hascontent"',
  );
});

test("Limpiar el input de busqueda", async ({ page }) => {
  await page.locator(".DocSearch-Button-Container").click();

  const searchBox = page.locator(".DocSearch-Input");

  await searchBox.click();

  await searchBox.fill("somerandomtext");

  await expect(searchBox).toHaveValue("somerandomtext");

  await page.locator(".DocSearch-Clear").click();

  await expect(searchBox).toHaveAttribute("value", "");
});

test("Realizar una busqueda que genere al menos tenga un resultado", async ({
  page,
}) => {
  await page.locator(".DocSearch-Button-Container").click();

  const searchBox = page.locator(".DocSearch-Input");
  await searchBox.click();

  await page.getByPlaceholder("Search docs").fill("havetext");

  expect(searchBox).toHaveValue("havetext");

  // Verity there are sections in the results
  await page.locator(".DocSearch-Dropdown-Container section").nth(1).waitFor();
  const numberOfResults = await page
    .locator(".DocSearch-Dropdown-Container section")
    .count();
  await expect(numberOfResults).toBeGreaterThan(0);
});
