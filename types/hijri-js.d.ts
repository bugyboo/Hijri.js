declare class HijriJs {
    constructor(element: string | HTMLElement);

    today();

    toGregorian(dateString: string, splitter: string);

    toHijri(dateString: string, splitter: string);

    validateHijri(year: string, month:string, day: string);  
    
    validateGregorian(year: string, month: string, day: string);    
}

export default HijriJs;