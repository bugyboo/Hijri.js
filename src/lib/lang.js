export default class Lang {

    constructor () {
        this.prefix = 'en';
        this.notation = 'H';
        this.zero = '0';
        this.one = '1';
        this.two = '2';
        this.three = '3';
        this.four = '4';
        this.five = '5';
        this.six = '6';
        this.seven = '7';
        this.eight = '8';
        this.nine = '9';
        this.monthNames = ['Muharram', 'Safar', 'Rabi\' al-awwal', 'Rabi\' al-thani', 'Jumada al-awwal', 'Jumada al-thani', 'Rajab', 'Sha\'aban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'];
        this.monthShortNames = ['Muh', 'Saf', 'Rab1', 'Rab2', 'Jum1', 'Jum2', 'Raj', 'Sha\'', 'Ram', 'Shaw', 'DhuQ', 'DhuH'];    
    }

    formatLocale(hDate) {// For English it will convert from currentLanguages numbers to Arabic numbers.

        return hDate;
    }

}