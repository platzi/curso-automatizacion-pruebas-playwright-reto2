import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Realizar una búsqueda sin resultados", async ({ page }) => {
  await page.locator("button.DocSearch-Button").click();

  const searchBox = page.getByPlaceholder(/search docs/i);

  await searchBox.fill("hascontent");

  await expect(page.locator(".DocSearch-NoResults p")).toBeVisible();

  await expect(page.locator(".DocSearch-NoResults p")).toHaveText(
    'No results for "hascontent"'
  );
});

test("Limpiar el input de búsqueda", async ({ page }) => {
  await page.locator("button.DocSearch-Button").click();

  const searchBox = page.getByPlaceholder(/search docs/i);

  await searchBox.fill("somerandomtext");

  await expect(searchBox).toHaveValue("somerandomtext");

  await page.locator("button.DocSearch-Reset").click();

  await expect(searchBox).toHaveValue("");
});

test("Realizar una búsqueda con resultados", async ({ page }) => {
  await page.locator("button.DocSearch-Button").click();

  const searchBox = page.getByPlaceholder(/search docs/i);

  await searchBox.fill("havetext");

  await expect(searchBox).toHaveValue("havetext");

  // Wait for results to load and verify there is at least one section
  const sections = page.locator(".DocSearch-Dropdown-Container section");
  await sections.first().waitFor();
  const count = await sections.count();
  await expect(count).toBeGreaterThan(0);
  console.log("Number of results:", count);
});
