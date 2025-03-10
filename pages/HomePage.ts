import { Page } from '@playwright/test';
import { BasePage } from './BasePage';


export class HomePage extends BasePage {

    private locationInput = '#home-page-type-location';
    private firstSuggestion = '#react-select-2-option-0';
    private menuItems = 'a[data-testid="menu-item-card"]';
    private addToCartButton = '#menu-page-add-to-cart';
    private checkoutButton = 'button#checkoutButton';

    constructor(page: Page) {
        super(page)
    }

    async searchForStore(store: string) {
        await this.page.fill(this.locationInput, store)
        await this.page.click(this.firstSuggestion)
        await this.page.waitForURL('**/*webviewFlow=true*')
    }

    async addSpecificItemsToCart() {
        const firstItem = this.page.locator(this.menuItems).first().locator('button');
        const laastItem = this.page.locator(this.menuItems).last().locator('button');
        await this.addComplexItem('Required Inner Section')
        await this.addComplexItem('AU-MENU-ITEMS Complex Item - 2')
        await firstItem.click();
        await laastItem.click();
    }

    async addComplexItem(text: string) {
        const item = this.page.locator(`text="${text}"`).locator('xpath=..').locator('button');
        await item.click();
        const radioButton = this.page.locator('text=SingleSelectOption1');
        const radioButtonCount = await radioButton.count();
        if (radioButtonCount !== 1) {
            await radioButton.last().click();
        } else {
            await radioButton.click();
        }
        await this.page.click(this.addToCartButton);
    }

    async proceedToCheckout() {
        await this.page.click(this.checkoutButton);
        await this.page.waitForURL('**/*checkout?*')
    }

}
