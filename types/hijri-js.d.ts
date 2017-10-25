export as namespace hijriJs;

export interface HijriDate{
    year: string;
    month: string;
    day: string;
    splitter: string;
    full: string;
}

export const BasicHirjiDate: HijriDate;

export default class HijriJs {

    /**
     * Create a new instance of HijriJs
     */
    constructor();

    /**
     * Gets the Date of today in Hijri
     * @returns interface HijriDate contains Hijri date result
     */
    today(): HijriDate;

    /**
     * This method converts Hijri date to Gregorian date
     * @param dateString The date that will get converted
     * @param splitter The splitter of dateString if any or pass empty if none presented
     */
    toGregorian(dateString: string, splitter: string): Date;

    /**
     * This method converts Gregorian date to Hijri date
     * @param dateString The date that will get converted
     * @param splitter The splitter of dateString if any or pass empty if none presented
     */
    toHijri(dateString: string, splitter: string): HijriDate;

    /**
     * This method converts Hijri date to Gregorian date
     * @param year 
     * @param month 
     * @param day 
     * @param splitter The splitter of dateString if any or pass empty if none presented
     */
    hijriToGregorian(year: string, month: string, day: string, splitter: string): Date;

    /**
     * This method converts Gregorian date to Hijri date
     * @param pYear Year 
     * @param pMonth Month
     * @param pDay Day
     * @param splitter The splitter of dateString if any or pass empty if none presented
     */
    gregorianToHijri(pYear: string, pMonth: string, pDay: string, splitter: string): HijriDate;
 
}
