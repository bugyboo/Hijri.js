interface HijriDate{
    year: string;
    month: string;
    day: string;
    splitter: string;
    full: string;
}

interface HijriJs {
    
        today(): HijriDate;
    
        toGregorian(dateString: string, splitter: string): Date;
    
        toHijri(dateString: string, splitter: string): HijriDate;
    
        hijriToGregorian(year: string, month: string, day: string, splitter?: string): Date;
    
        gregorianToHijri(pYear: string, pMonth: string, pDay: string, splitter?: string): HijriDate;    
}

declare const Xsoh: HijriJs;

declare module 'hijri-js' {
    export = Xsoh;
}