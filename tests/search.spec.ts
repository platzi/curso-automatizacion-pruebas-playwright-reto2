import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Realizar una busqueda que no tenga resultados", async ({ page }) => {
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByPlaceholder("Search docs").click();

  await page.getByPlaceholder("Search docs").fill("hascontent");

  await page.getByText(`No results for "hascontent"`).isVisible();
});

test("Limpiar el input de busqueda", async ({ page }) => {
  await page.getByRole("button", { name: "Search" }).click();

  const searchBox = page.getByPlaceholder("Search docs");

  await searchBox.click();

  await searchBox.fill("somerandomtext");

  await expect(searchBox).toHaveValue("somerandomtext");

  // await page.getByText("somerandomtext").isVisible();

  await page.getByRole("button", { name: "Clear the query" }).click();

  await expect(searchBox).toHaveAttribute("value", "");
});

test.only("Realizar una busqueda que genere al menos tenga un resultado", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Search" }).click();

  const searchBox = page.getByPlaceholder("Search docs");

  await searchBox.click();

  await searchBox.fill("havetext");

  await expect(searchBox).toHaveValue("havetext");

  // Verity there are sections in the results
  await page.locator(".DocSearch-Dropdown-Container section").nth(1).waitFor();
  const numberOfResults = await page
    .locator(".DocSearch-Dropdown-Container section")
    .count();
  expect(numberOfResults).toBeGreaterThan(0);
});
