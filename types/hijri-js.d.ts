declare namespace HijriJs {
    export interface HijriDate{
        year: string;
        month: string;
        day: string;
        splitter: string;
        full: string;
    }
}

declare class HijriJs {

    constructor();

    today(): HijriJs.HijriDate;

    toGregorian(dateString: string, splitter: string): Date;

    toHijri(dateString: string, splitter: string): HijriJs.HijriDate;

    hijriToGregorian(year: string, month: string, day: string, splitter: string): Date;

    gregorianToHijri(pYear: string, pMonth: string, pDay: string, splitter: string): HijriJs.HijriDate;
 
}

export default HijriJs;