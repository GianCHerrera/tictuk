import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;
    private loader = 'img[data-testid="loader"]'
    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string) {
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle')
    }

    async waitForLoaderIfVisible() {
        const isLoaderVisible = await this.page.locator(this.loader).isVisible()
        if (isLoaderVisible) {
            await this.page.waitForSelector(this.loader, { state: 'detached', timeout:10000 });
        }
    }

    sleep = (ms: number) => new Promise(resolve => setTimeout(()=>{
        console.log('espere ms: ',ms);
        resolve
    }, ms));

}

