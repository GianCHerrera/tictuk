import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { MercadoPagoPage } from '../pages/MercadoPago';
import { ConfirmationPage } from '../pages/ConfirmationPage';
import { DateUtils } from '../utils/DatesUtils';
import { GetReportNew } from '../api/getReportNew';

test('Checkout flow', async ({ page }) => {
    const homaPage = new HomePage(page);
    const checkoutPage = new CheckoutPage(page);
    const mercadoPagoPage = new MercadoPagoPage(page);
    const confirmationPage = new ConfirmationPage(page);
    const dateUtils = new DateUtils();
    const getReportNew = new GetReportNew();

    await homaPage.navigate('https://staging.njs-qa1.lji.li/');
    await homaPage.searchForStore('700 Wilshire Blvd, Santa Monica, CA 90401, USA.');
    await homaPage.addSpecificItemsToCart();
    await homaPage.proceedToCheckout();

    await checkoutPage.fillCostumerInfo('Gian Herrera', '+57 3193219951', 'ghianherrera@live.com')
    const isUpsellAdded = await checkoutPage.isUpsellAdded()
    await expect.soft(isUpsellAdded).toBeVisible();

    await checkoutPage.selectPayment("Online Payment");
    await checkoutPage.proceedToPayment();

    await mercadoPagoPage.selectCreditCard();
    await mercadoPagoPage.addCreditCardInfo('5031 7557 3453 0604', 'APRO', '1125', '123');
    await mercadoPagoPage.clickOnSubmit();
    await mercadoPagoPage.fillRutNumber('11.111.111-1');
    await mercadoPagoPage.clickOnSubmit();
    await mercadoPagoPage.clickOnPay();

    await confirmationPage.waitforConfirmation()
    const confirmationTitle = await confirmationPage.confirmationTitleElement()
    await expect.soft(confirmationTitle).toBeVisible();
    const extractedOrderNumber = await confirmationPage.getOrderNumber();
    const extractedOrderPrice = await confirmationPage.getTotalPrice();
    const extractedDate = await confirmationPage.getOrderDate();
    const formattedDate = dateUtils.convertMMDDYYDate(extractedDate || '');

    const response = await getReportNew.postData(formattedDate);

    const apiOrderPrice = getReportNew.getApiPrice(response, extractedOrderNumber || '');
    const apiOrderNumber = getReportNew.getApiOrderNumber(response, extractedOrderNumber || '');
    expect.soft(extractedOrderNumber).toEqual(apiOrderNumber);
    expect.soft(extractedOrderPrice).toEqual(apiOrderPrice);

});
