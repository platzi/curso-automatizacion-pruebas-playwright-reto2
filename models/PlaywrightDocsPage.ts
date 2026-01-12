import { expect, Locator, Page } from "@playwright/test";

export class PlaywrightDocsPage {
  private page: Page;
  private searchInput: Locator;
  private searchButton: Locator;
  private clearButton: Locator;
  
  public noSearchResultsMessage: Locator;
  public numberOfResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search docs');
    this.searchButton = page.getByRole('button', { name: /Search/i });
    this.clearButton = page.getByRole('button', { name: 'Clear the query' });
    this.noSearchResultsMessage = page.locator('.DocSearch-NoResults p');
    this.numberOfResults = page.locator('.DocSearch-Dropdown-Container section');
  }

  async search(searchTerm: string) {
    await this.searchButton.click();
    await this.searchInput.fill(searchTerm);
    expect(this.searchInput).toHaveValue(searchTerm);
  }

  async clearSearch() {
    await this.clearButton.click();
    await expect(this.searchInput).toHaveAttribute('value', '');
  }
}