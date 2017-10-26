const h = require('../dist/hijri-js')

run();

function run() {
    const x = h.intilizeHijriJs();

    const lang = x.getLang();
    console.log(' Testing properties Lang => ', lang);
    lang.prefix = 'Ar';
    lang.notation = 'BC';
    console.log(' Testing properties Lang => ', lang);
    const originLang = ({
        prefix: 'ES',
        notation: 'DC'
    })
    x.setLang(originLang);
    console.log(' Testing properties Lang => ', x.getLang());    

}