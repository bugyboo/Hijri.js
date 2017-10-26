declare module "hijri-js" {

    namespace HijriJs {

        function intilizeHijriJs(): HijriJs;
    
        interface Lang {
            prefix: string;
            notation: string;
            zero: string;
            one: string;
            two: string;
            three: string;
            four: string;
            five: string;
            six: string;
            seven: string;
            eight: string;
            nine: string;
            monthNames: Array<string>;
            monthShortNames: Array<string>;
        }

        interface HijriDate {
            year: string;
            month: string;
            day: string;
            splitter: string;
            full: string;
            monthName: string;
            monthShortName: string;
            plain: string;
        }

        interface HijriJs {
            
            /**
             * Get the Language format data
             */
            getLang(): Lang;

            /**
             * Set the Language format data
             */
            setLang(value: Lang): void;

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
    
    }

    export = HijriJs;
        
}
    