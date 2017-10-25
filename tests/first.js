const xsoh = require('../dist/hijri-js.common')

run();

function run() {
    const x = new xsoh();
    
    console.log(' Testing today ==> ', x.today().full )
    console.log(' Testing 24-10-2017 ==> ', x.toHijri('24102017') );
    console.log(' Testing 14-2-1439 ==> ', x.toGregorian('11-7-1386', '-') );    
}