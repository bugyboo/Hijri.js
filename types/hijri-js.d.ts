
export interface HijriDate{
    year: string;
    month: string;
    day: string;
    splitter: string;
    full: string;
}

declare class HijriJs {

    constructor();

    today(): HijriDate;

    toGregorian(dateString: string, splitter: string): Date;

    toHijri(dateString: string, splitter: string): HijriDate;

    hijriToGregorian(year: string, month: string, day: string, splitter?: string): Date;

    gregorianToHijri(pYear: string, pMonth: string, pDay: string, splitter?: string): HijriDate;
 
}

export default HijriJs;