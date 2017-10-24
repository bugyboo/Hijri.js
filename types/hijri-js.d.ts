declare class HijriJs {

    constructor(lang: Lang);

    today(): string;

    toGregorian(dateString: string, splitter: string): void;

    toHijri(dateString: string, splitter: string): void;

    validateHijri(year: string, month:string, day: string): boolean;  
    
    validateGregorian(year: string, month: string, day: string): boolean;    
}

export default HijriJs;