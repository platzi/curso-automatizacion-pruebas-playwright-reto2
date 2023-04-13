import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Realizar una busqueda que no tenga resultados", async ({ page }) => {
  // await page.getByRole('button').click();
  await page.locator("a.getStarted_Sjon").click();

  //await page.getByPlaceholder('Search docs').click();
  await page.locator(".DocSearch-Button-Placeholder").click();

  await page.getByPlaceholder("Search docs").fill("hascontent");

  // expect(page.locator('.DocSearch-NoResults p')).toBeVisible();
  await page.waitForSelector(".DocSearch-NoResults p", { timeout: 5000 });
  await expect(page.locator(".DocSearch-Title")).toHaveText(
    'No results for "hascontent"'
  );
});

test("Limpiar el input de busqueda", async ({ page }) => {
  await page.getByRole("button", { name: "Search" }).click();

  const searchBox = page.getByPlaceholder("Search docs");

  await searchBox.click();

  await searchBox.fill("somerandomtext");

  await expect(searchBox).toBeVisible();

  await expect(searchBox).toHaveAttribute("value", "somerandomtext");

  await page.getByRole("button", { name: "Clear the query" }).click();

  await expect(searchBox).toHaveAttribute("value", "");
});

test("Realizar una busqueda que genere al menos tenga un resultado", async ({
  page,
}) => {
  await page.locator(".DocSearch-Button-Placeholder").click();

  const searchBox = page.getByPlaceholder("Search docs");

  await searchBox.click();

  await page.getByPlaceholder("Search docs").fill("havetext");

  //expect(searchBox).toHaveText('havetext');
  await expect(searchBox).toHaveAttribute("value", "havetext");

  // Verity there are sections in the results
  await page.locator(".DocSearch-Dropdown-Container section").nth(1).waitFor();
  const numberOfResults = await page
    .locator(".DocSearch-Dropdown-Container section")
    .count();
  await expect(numberOfResults).toBeGreaterThan(0);
});
