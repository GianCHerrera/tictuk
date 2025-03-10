import { parse, format } from 'date-fns';

export class DateUtils {

    /**
     * Formats a given date string into MM/DD/YYYY format, if given date is empty return todays's date.
     * @param {string} dateArg - The date string in "MMM DD, YYYY" format (e.g., "Mar 10, 2025").
     * @returns {string} - The date in MM/DD/YYYY format.
     */
    convertMMDDYYDate(dateArg: string): string {
        if (!dateArg) {
            const today = new Date();
             return dateArg = ("0" + (today.getMonth() + 1)).slice(-2) + "/" +
                ("0" + today.getDate()).slice(-2) + "/" +
                today.getFullYear();
        }
        const date: Date = parse(dateArg, "MMM dd, yyyy", new Date());
        const formattedDate: string = format(date, "MM/dd/yyyy");
        return formattedDate;
    }
}