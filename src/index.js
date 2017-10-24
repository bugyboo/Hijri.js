import Lang from './lib/lang';
import Ummalqura from './lib/ummalqura';

export default class HijriJs {

    constructor(element, lang) {

        if (typeof element === 'string') {
            element = document.querySelector(element);
        }

        if (!element || !element.nodeName) {
            throw new Error('no element is specified to initialize HijriJs');
        }
        
        if (!lang) {
            lang = new Lang();
        }

        this.element = element;
        this.lang = lang;
        this.ummalqura_dat = new Ummalqura();
    }

    toGregorian(dateString, splitter) {
		if (!splitter) {
			splitter = '/';
		}
		// default splitter
		const arrDate = dateString.split(splitter);
		if (arrDate.length >= 3)
			return this.hijriToGregorian(arrDate[2], arrDate[1], arrDate[0]);
    }
    
	toHijri(dateString, splitter) {
		if (!splitter) {
			splitter = '/';
		}
		// default splitter
		const arrDate = dateString.split(splitter);
		if (arrDate.length >= 3) {
			return this.gregorianToHijri(arrDate[2], arrDate[1], arrDate[0]);
		}
    }
    
    hijriToGregorian(year, month, day) {
		const year = parseInt(year);
		const month = parseInt(month);
        const day = parseInt(day);
        
		if (year === 'NaN' || month === 'NaN' || day === 'NaN') {            
            return 'Error Input';
        }

		const iy = year;
		const im = month;
		const id = day;
		const ii = iy -1;
		const iln = (ii *12)+1 + (im-1);
		const i = iln - 16260;
		const mcjdn = id + this.ummalqura_dat[i - 1] -1;
		const cjdn = mcjdn + 2400000;
		return this.julianToGregorian(cjdn);
    }
    
    gregorianToHijri(pYear, pMonth, pDay) {
		//This code the modified version of R.H. van Gent Code, it can be found at http://www.staff.science.uu.nl/~gent0113/islam/ummalqura.htm
		// read calendar data

		let day = parseInt(pDay);
		let month = parseInt(pMonth) -1; // Here we enter the Index of the month (which starts with Zero)
		let year = parseInt(pYear);

		let m = month + 1;
		let y = year;

		// append January and February to the previous year (i.e. regard March as
		// the first month of the year in order to simplify leapday corrections)

		if (m < 3) {
			y -= 1;
			m += 12;
		}

		// determine offset between Julian and Gregorian calendar

		let a = Math.floor(y / 100.);
		let jgc = a - Math.floor(a / 4.) - 2;

		// compute Chronological Julian Day Number (CJDN)

		var cjdn = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day - jgc - 1524;

		a = Math.floor((cjdn - 1867216.25) / 36524.25);
		jgc = a - Math.floor(a / 4.) + 1;
		const b = cjdn + jgc + 1524;
		const c = Math.floor((b - 122.1) / 365.25);
		const d = Math.floor(365.25 * c);
		month = Math.floor((b - d) / 30.6001);
		day = (b - d) - Math.floor(30.6001 * month);

		if (month > 13) {
			c += 1;
			month -= 12;
		}

		month -= 1;
		year = c - 4716;


		// compute Modified Chronological Julian Day Number (MCJDN)

		const mcjdn = cjdn - 2400000;

		// the MCJDN's of the start of the lunations in the Umm al-Qura calendar are stored in 'islamcalendar_dat.js'

		for (var i = 0; i < this.ummalqura_dat.length; i++) {
			if (this.ummalqura_dat[i] > mcjdn)
				break;
		}

		// compute and output the Umm al-Qura calendar date

		var iln = i + 16260;
		var ii = Math.floor((iln - 1) / 12);
		var iy = ii + 1;
		var im = iln - 12 * ii;
		var id = mcjdn - this.ummalqura_dat[i - 1] + 1;
		var ml = this.ummalqura_dat[i] - this.ummalqura_dat[i - 1];
		return new this.HDate(iy, im, id);
    }
    
    julianToGregorian(julianDate) {
		//source from: http://keith-wood.name/calendars.html
		const z = Math.floor(julianDate + 0.5);
		let a = Math.floor((z - 1867216.25) / 36524.25);
		a = z + 1 + a - Math.floor(a / 4);
		const b = a + 1524;
		const c = Math.floor((b - 122.1) / 365.25);
		const d = Math.floor(365.25 * c);
		const e = Math.floor((b - d) / 30.6001);
		const day = b - d - Math.floor(e * 30.6001);
		const month = e - (e > 13.5 ? 13 : 1);
		let year = c - (month > 2.5 ? 4716 : 4715);
		if (year <= 0) {
			year--;
		}// No year zero
		return new Date(year + '/' + (month+1) + '/' + day);
    }
    
    HDate(year, month, day) {
		this.year = year;
		this.month = month;
		this.day = day;
		this.toString = function toString() {
			return this.format(this.year, this.month, this.day, 'dd/mm/yyyyN');
		}
		this.toFormat = function toFormat(format) {
			return this.format(this.year, this.month, this.day, format);
		}
		this.format = function useFormat(year, month, day, format) {
			if (this.validateHijri(year, month, day)) {
				var newFormat = format;

				if (newFormat.indexOf('dd') !== -1)
					newFormat = newFormat.replace('dd', day < '10' ? '0' + day : day);
				else
					newFormat = newFormat.replace('d', day);

				if (newFormat.indexOf('mm') !== -1)
					newFormat = newFormat.replace('mm', month < '10' ? '0' + month : month);
				else
					newFormat = newFormat.replace('m', month);

				if (newFormat.indexOf('yyyy') !== -1)
					newFormat = newFormat.replace('yyyy', year);
				else
					newFormat = newFormat.replace('yy', year.substr((year.length - 2), 2));

				newFormat = newFormat.replace('N', this.lang.notation);
				return this.lang.formatLocale(newFormat);
			}
		}
    }
    
    validateHijri(year, month, day) {
		if (month < 1 || month > 12)
			return false;

		if (day < 1 || day > 30)
			return false;
		return true;
    }
    
    validateGregorian(year, month, day) {
		if (month < 1 || month > 12)
			return false;

		if (day < 1 || day > 31)
			return false;
		return true;
	}    

}