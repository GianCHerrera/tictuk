import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class ConfirmationPage extends BasePage {

    private confirmationTitle = 'h1[data-testid="order-confirmation-title"]';
    private orderNumberSpan = 'span[data-testid="your-order-number"]';
    private totalPriceSpan = 'span[data-testid="total-price"]';
    private dateAndTimeP = 'div[class^="PaymentAndTimeSection__TimeDateContainer"] p'
    constructor(page: Page) {
        super(page)
    }

    async waitforConfirmation() {
        const isConfirmationTitleVisible = await this.page.locator(this.confirmationTitle).isVisible();
        if (!isConfirmationTitleVisible) {
            await this.page.waitForSelector(this.confirmationTitle, { timeout: 50000 })
        }
    }

    async confirmationTitleElement() {
        return await this.page.locator(this.confirmationTitle)
    }

    async getOrderNumber() {
        const orderNumber = await this.page.locator(this.orderNumberSpan).textContent();
        console.log(`Order number is: ${orderNumber?.split('#')[1]}`);
        return orderNumber?.split('#')[1];
    }

    async getTotalPrice(){
        const totalPrice = await this.page.locator(this.totalPriceSpan).textContent();
        console.log(`Total price is: ${totalPrice?.split('$')[1]}`);
        return totalPrice?.split('$')[1];
    }

    async getOrderDate(){
        const orderDate = await this.page.locator(this.dateAndTimeP).last().textContent();
        console.log(`Order date is: ${orderDate}`);
        return orderDate;
    }

}