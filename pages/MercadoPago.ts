import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MercadoPagoPage extends BasePage {

    private progressBar = 'div.andes-progress-indicator-circular'
    private creditCard = '#new_card_row button'
    private progressIndicator = '.andes-progress-indicator-circular__svg'
    private cardNumberInput = '#cardNumber'
    private fullNameInput = '#fullname'
    private expirationDateInput = 'input[name="expirationDate"]'
    private expirationDateIframe = 'iframe[name="expirationDate"]'
    private cvvInput = 'input[name="securityCode"]'
    private cardNumberIframe = 'iframe[name="cardNumber"]'
    private cvvIframe = 'iframe[name="securityCode"]'
    private submitButton = '#submit'
    private payButton = 'button[id=":r17:"]'
    private rutNumberInput = '#number'


    constructor(page: Page) {
        super(page)
    }
    async selectCreditCard() {
        await this.page.click(this.creditCard)
    }

    async addCreditCardInfo(cardNumber: string, fullName: string, expirationDate: string, cvv: string) {
        await this.waitForProgressIndicator();
        await this.page.frameLocator(this.cardNumberIframe).locator(this.cardNumberInput).fill(cardNumber);
        await this.page.locator(this.fullNameInput).first().fill(fullName);
        await this.page.frameLocator(this.expirationDateIframe).locator(this.expirationDateInput).fill(expirationDate)
        await this.page.frameLocator(this.cvvIframe).locator(this.cvvInput).first().fill(cvv)
    }

    async waitForProgressIndicator() {
        const isProgressIndicatorElement = await this.page.locator(this.progressIndicator).isVisible()
        if (isProgressIndicatorElement) {
            await this.page.locator(this.progressBar).waitFor({ state: 'hidden', timeout: 10000 });
        }
    }

    async clickOnSubmit() {
        await this.page.click(this.submitButton)
        await this.waitForProgressIndicator();
    }

    async fillRutNumber(number: string) {
        await this.page.locator(this.rutNumberInput).fill(number)
    }

    async clickOnPay(){
        await this.page.click(this.payButton)
    }
}