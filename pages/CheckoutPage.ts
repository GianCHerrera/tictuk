import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {

    private nameInput = '#checkout-page-name-input';
    private nameCheckmark = 'svg[data-testid="checkmark-icon-name-input"]';
    private phoneInput = '#checkout-page-phone-input';
    private phoneCheckmark = 'svg[data-testid="checkmark-icon-phone-input"]';
    private emailInput = '#checkout-page-email-input';
    private emailCheckmark = 'svg[data-testid="checkmark-icon-email-input"]';
    private upsellSpan = 'span[data-testid="upsell-added"]';
    private submitOrder = '#checkout-page-submit-order';
    private spinner = 'div.lds-spinner'


    constructor(page: Page) {
        super(page)
    }
    async fillCostumerInfo(name: string, phone: string, email: string) {
        await this.page.fill(this.nameInput, name)
        await this.page.locator('h1').first().click()
        await this.page.locator(this.nameCheckmark).waitFor({ state: 'visible' })
        await this.page.fill(this.phoneInput, phone)
        await this.page.locator('h1').first().click()
        await this.page.locator(this.phoneCheckmark).waitFor({ state: 'visible' })
        await this.page.fill(this.emailInput, email)
        await this.page.locator('h1').first().click()
        await this.page.locator(this.emailCheckmark).waitFor({ state: 'visible' })
        await this.waitForLoaderIfVisible()
    }

    async isUpsellAdded() {
        return await this.page.locator(this.upsellSpan)
    }

    async selectPayment(text: string) {
        text = text.toLowerCase()
        const paymentelement = this.page.locator(`text=${text}`)
        await paymentelement.scrollIntoViewIfNeeded();
        await this.waitForLoaderIfVisible()
        await paymentelement.click();
        await this.waitForLoaderIfVisible()
        const inputList = await this.page.locator('span[data-testid="payment-method-option"] input').all()
        let correctInput: any;
        if (text.includes('cash')) {
            correctInput = inputList[0]
        } else if (text.includes('credit')) {
            correctInput = inputList[1]
        } else if (text.includes('online')) {
            correctInput = inputList[2]
        } else {
            console.error(`${text} - payment type does not exist`);
        }
        if (correctInput) {
            const isSelected = await correctInput.isChecked();
            if (!isSelected) {
                await correctInput.click();
            }
        }
        await this.waitForLoaderIfVisible()
    }

    async proceedToPayment() {
        await this.page.locator(this.submitOrder).click({ noWaitAfter: true, timeout: 10000 });
        await this.page.waitForFunction(() => window.location.href.includes("sandbox.mercadopago.cl/checkout/v1/redirect/"), {
            timeout: 20000,
            polling: 500
        });
        await this.page.waitForLoadState("domcontentloaded");
    }
}