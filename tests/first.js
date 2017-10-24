const xsoh = require('../dist/hijri-js.common')

run();

function run() {
    const x = new xsoh();
    
    console.log(' Print function ==> ', x.gregorianToHijri('2018', '12', '22') );
    console.log(' Testing 2017-12-12 ==> ', x.toHijri('24-10-2017', '-').toString);
    console.log(' Testing 1438-12-12 ==> ', x.toGregorian('4-2-1439', '-') )
}