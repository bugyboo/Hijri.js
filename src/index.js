import Ummalqura from './lib/ummalqura';
import Lang from './lib/lang';

const lang = new Lang();
const ummalqura = new Ummalqura();
const ummalqura_dat = ummalqura.ummalqura_dat;

export default class HijriJs {

  constructor() {
    this.lang = lang;
    //console.log('Insideer ummalqura_dat ==> ' + ummalqura_dat.toString());
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

  hijriToGregorian(year, month, day) {
    var year = parseInt(year);
    var month = parseInt(month);
    var day = parseInt(day);
  
    console.log('insider h to g 1 ==> ', year, month, day);
  
    if (year === 'NaN' || month === 'NaN' || day === 'NaN') {
      return 'Error Input';
    }
  
    var iy = year;
    var im = month;
    var id = day;
    var ii = iy - 1;
    var iln = ii * 12 + 1 + (im - 1);
    var i = iln - 16260;
    var mcjdn = id + ummalqura_dat[i - 1] - 1;
    var cjdn = mcjdn + 2400000;
    console.log('insider h to g ==> ', cjdn);
    return this.julianToGregorian(cjdn);
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

  gregorianToHijri(pYear, pMonth, pDay) {
    //This code the modified version of R.H. van Gent Code, it can be found at http://www.staff.science.uu.nl/~gent0113/islam/ummalqura.htm
    // read calendar data

    var day = parseInt(pDay);
    var month = parseInt(pMonth) - 1; // Here we enter the Index of the month (which starts with Zero)
    var year = parseInt(pYear);

    console.log('insider G to H ==> ', day, month, year);

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
    return new this.HDate(iy, im, id);
  }

  julianToGregorian(julianDate) {
    //source from: http://keith-wood.name/calendars.html
    console.log('insider j to g ==> ', julianDate);
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
    console.log('insider j to g ==> ', year, month, day);    
    if (year <= 0) {
      year--;
    } // No year zero
    return new Date(year + '/' + (month + 1) + '/' + day);
  }

  HDate(year, month, day) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.toString = function toString() {
      return this.format(this.year, this.month, this.day, 'dd/mm/yyyyN');
    };
    this.toFormat = function toFormat(format) {
      return this.format(this.year, this.month, this.day, format);
    };
    this.format = function useFormat(year, month, day, format) {
      if (this.validateHijri(year, month, day)) {
        var newFormat = format;

        if (newFormat.indexOf('dd') !== -1)
          newFormat = newFormat.replace('dd', day < '10' ? '0' + day : day);
        else newFormat = newFormat.replace('d', day);

        if (newFormat.indexOf('mm') !== -1)
          newFormat = newFormat.replace(
            'mm',
            month < '10' ? '0' + month : month
          );
        else newFormat = newFormat.replace('m', month);

        if (newFormat.indexOf('yyyy') !== -1)
          newFormat = newFormat.replace('yyyy', year);
        else
          newFormat = newFormat.replace('yy', year.substr(year.length - 2, 2));

        newFormat = newFormat.replace('N', this.lang.notation);
        return this.lang.formatLocale(newFormat);
      }
    };
  }

  validateHijri(year, month, day) {
    if (month < 1 || month > 12) return false;

    if (day < 1 || day > 30) return false;
    return true;
  }

  validateGregorian(year, month, day) {
    if (month < 1 || month > 12) return false;

    if (day < 1 || day > 31) return false;
    return true;
  }  
}

