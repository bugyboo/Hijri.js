const h = require('../dist/hijri-js')

run();

function run() {
    const x = h.initialize();

    console.log(' Testing today ==> ', x.today() );
    console.log(' Testing 24-10-2017 ==> ', x.toHijri('24102017') );
    console.log(' Testing 10-02-1439 ==> ', x.toGregorian('10-2-1439', '-') );
    console.log(' Testing 28-08-1410 ==> ', x.toGregorian('28-8-1410', '-') ); 
    console.log(' Testing 07-07-1396 ==> ', x.toGregorian('7-7-1396', '-') );    
    console.log(' Testing 11-07-1386 ==> ', x.toGregorian('11-7-1386', '-') );       
}