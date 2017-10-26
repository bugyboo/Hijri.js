import Ummalqura from './lib/ummalqura';
import Lang from './lib/lang';

const ummalqura = new Ummalqura();
const ummalqura_dat = ummalqura.ummalqura_dat;

export default class HijriJs {

  constructor() {
    this.lang = new Lang();
  }

  getLang() {
    return this.lang;
  }

  setLang(value) {
    this.lang = value;
  }

  today() {
    var today = new Date();
		return this.gregorianToHijri(today.getFullYear(), (today.getMonth()+1), today.getDate(), '/');
	}

  toGregorian(dateString, splitter) {
    var arrDate;
    if (!splitter) {
      const year = dateString.substring(4,8);
      const month = dateString.substring(2,4);
      const day = dateString.substring(0,2);
      arrDate = [day, month, year];
      splitter = '/';
    } else {
    // default splitter
      arrDate = dateString.split(splitter);
    }
    if (arrDate.length < 3) {
      throw new 'Error in input values';
    }
    return this.hijriToGregorian(arrDate[2], arrDate[1], arrDate[0], splitter);
  } 

  hijriToGregorian(year, month, day, splitter) {
    if (!splitter) {
      splitter = '/';
    }

    var year = parseInt(year);
    var month = parseInt(month);
    var day = parseInt(day);
  
    if (year === 'NaN' || month === 'NaN' || day === 'NaN') {
       throw new 'Error in input values';
    }
  
    var iy = year;
    var im = month;
    var id = day;
    var ii = iy - 1;
    var iln = ii * 12 + 1 + (im - 1);
    var i = iln - 16260;
    var mcjdn = id + ummalqura_dat[i - 1] - 1;
    var cjdn = mcjdn + 2400000;
    
    return this.julianToGregorian(cjdn, splitter);
  }
  
  toHijri(dateString, splitter) {
    var arrDate;
    if (!splitter) {
      const year = dateString.substring(4,8);
      const month = dateString.substring(2,4);
      const day = dateString.substring(0,2);
      arrDate = [day, month, year];
      splitter = '/';
    }else{
    // default splitter
      arrDate = dateString.split(splitter);
    }

    if (arrDate.length < 3) {
      throw new 'Error in input values';
    }
    return this.gregorianToHijri(arrDate[2], arrDate[1], arrDate[0], splitter);

  }

  gregorianToHijri(pYear, pMonth, pDay, splitter) {
    if (!splitter) {
      splitter = '/';
    }    

    //This code the modified version of R.H. van Gent Code, it can be found at http://www.staff.science.uu.nl/~gent0113/islam/ummalqura.htm
    // read calendar data

    var day = parseInt(pDay);
    var month = parseInt(pMonth) - 1; // Here we enter the Index of the month (which starts with Zero)
    var year = parseInt(pYear);

    var m = month + 1;
    var y = year;

    // append January and February to the previous year (i.e. regard March as
    // the first month of the year in order to simplify leapday corrections)

    if (m < 3) {
      y -= 1;
      m += 12;
    }

    // determine offset between Julian and Gregorian calendar

    var a = Math.floor(y / 100);
    var jgc = a - Math.floor(a / 4) - 2;

    // compute Chronological Julian Day Number (CJDN)

    var cjdn =
      Math.floor(365.25 * (y + 4716)) +
      Math.floor(30.6001 * (m + 1)) +
      day -
      jgc -
      1524;

    a = Math.floor((cjdn - 1867216.25) / 36524.25);
    jgc = a - Math.floor(a / 4) + 1;
    var b = cjdn + jgc + 1524;
    var c = Math.floor((b - 122.1) / 365.25);
    var d = Math.floor(365.25 * c);
    month = Math.floor((b - d) / 30.6001);
    day = b - d - Math.floor(30.6001 * month);

    if (month > 13) {
      c += 1;
      month -= 12;
    }

    month -= 1;
    year = c - 4716;

    // compute Modified Chronological Julian Day Number (MCJDN)

    var mcjdn = cjdn - 2400000;

    // the MCJDN's of the start of the lunations in the Umm al-Qura calendar are stored in 'islamcalendar_dat.js'

    for (var i = 0; i < ummalqura_dat.length; i++) {
      if (ummalqura_dat[i] > mcjdn) break;
    }

    // compute and output the Umm al-Qura calendar date

    var iln = i + 16260;
    var ii = Math.floor((iln - 1) / 12);
    var iy = ii + 1;
    var im = iln - 12 * ii;
    var id = mcjdn - ummalqura_dat[i - 1] + 1;
    var ml = ummalqura_dat[i] - ummalqura_dat[i - 1];
    return new this.hijriDate(iy, im, id, splitter, this.lang);
  }

  julianToGregorian(julianDate, splitter) {
    // source from: http://keith-wood.name/calendars.html

    var z = Math.floor(julianDate + 0.5);
    var a = Math.floor((z - 1867216.25) / 36524.25);
    a = z + 1 + a - Math.floor(a / 4);
    var b = a + 1524;
    var c = Math.floor((b - 122.1) / 365.25);
    var d = Math.floor(365.25 * c);
    var e = Math.floor((b - d) / 30.6001);
    var day = b - d - Math.floor(e * 30.6001);
    var month = e - (e > 13.5 ? 13 : 1);
    var year = c - (month > 2.5 ? 4716 : 4715);

    if (year <= 0) {
      year--;
    } // No year zero

    return new Date(year + splitter + month + splitter + day);
  }

  hijriDate(year, month, day, splitter, lang) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.splitter = splitter;
    this.monthName = lang.monthNames[month];
    this.monthShortName = lang.monthShortNames[month];
    this.full = (day + ' - ' + this.monthName + '(' + month + ') - ' + year);
    this.plain = (day + splitter + month + splitter + year);
  }
}

