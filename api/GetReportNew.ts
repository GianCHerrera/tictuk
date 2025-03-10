
export class GetReportNew {
    private url = 'https://mng-qa1.lji.li'
    private response = {};

    async postData(date: string) {
        const body = {
            "accessKey": "123",
            "chainId": "8315bf51-dd7c-364d-f63e-fbdcfca69ab0",
            "endDate": date, // Format: MM/DD/YYYY
            "isChain": true,
            "reportFor": "8315bf51-dd7c-364d-f63e-fbdcfca69ab0",
            "startDate": date, // Format: MM/DD/YYYY
            "storeId": "48499619-0afe-3382-da0d-408b6be8c835",
            "successOnly": true
        };
        const response = await fetch(`${this.url}/api/getReportNew`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }

    getApiPrice(response: any, orderNumber: string) {
        let price = '';
        response.orders.forEach(order => {
            if (order['_id'] == orderNumber) price = order.grandTotalStrIncludingAll
        });
        return price;
    }

    getApiOrderNumber(response: any, orderNumber: string) {
        let apiOrder = ''
        response.orders.forEach(order => {
            if (order['_id'] == orderNumber) apiOrder= order.return_order_number
        });
        return apiOrder;
    }


}
