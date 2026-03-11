import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Realizar una busqueda que no tenga resultados", async ({ page }) => {
  // Asegúrate de que el botón sea visible antes de hacer clic
  await expect(
    page.getByRole("button", { name: "Search (Ctrl+K)" }),
  ).toBeVisible();

  // Realiza el clic en el botón
  await page.getByRole("button", { name: "Search (Ctrl+K)" }).click();

  await page.getByPlaceholder("Search docs").click();

  await page.getByPlaceholder("Search docs").fill("hascontent");

  await expect(
    page.locator(".DocSearch-NoResults .DocSearch-Title"),
  ).toBeVisible();

  await expect(
    page.locator(".DocSearch-NoResults .DocSearch-Title"),
  ).toHaveText('No results for "hascontent"');
});

test("Limpiar el input de busqueda", async ({ page }) => {
  // Asegúrate de que el botón sea visible antes de hacer clic
  await expect(
    page.getByRole("button", { name: "Search (Ctrl+K)" }),
  ).toBeVisible();

  // Realiza el clic en el botón
  await page.getByRole("button", { name: "Search (Ctrl+K)" }).click();

  const searchBox = page.getByPlaceholder("Search docs");

  await searchBox.click();

  await searchBox.fill("somerandomtext");

  await expect(searchBox).toHaveValue("somerandomtext");

  await page.getByRole("button", { name: "Clear the query" }).click();

  await expect(searchBox).toHaveAttribute("value", "");
});

test("Realizar una busqueda que genere al menos tenga un resultado", async ({
  page,
}) => {
  // Asegúrate de que el botón sea visible antes de hacer clic
  await expect(
    page.getByRole("button", { name: "Search (Ctrl+K)" }),
  ).toBeVisible();

  // Realiza el clic en el botón
  await page.getByRole("button", { name: "Search (Ctrl+K)" }).click();

  const searchBox = page.getByPlaceholder("Search docs");

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
