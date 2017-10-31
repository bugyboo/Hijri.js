# hijri-js

[![npm](https://img.shields.io/badge/npm-1.0.25-blue.svg)](https://www.npmjs.com/package/hijri-js)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.5.3-blue.svg)](https://www.typescriptlang.org)
[![build](https://img.shields.io/badge/build-success-green.svg)](https://www.typescriptlang.org)


[xsoh's Hijri.js](https://github.com/xsoh) for Nodejs

This package provides JavaScript, TypeScript and script build files for npm. 


Hijri.js
========

A simple implementation for the Islamic calender(Hijri) in Javascript with types.

## Install

The best way to install and use hijri-js is with npm or yarn package managment. It's registered
as [hijri-js](https://www.npmjs.com/package/hijri-js).

#### npm 

```
$ npm install hijri-js --save
```

#### yarn 

```
$ yarn add hijri-js --save
```

## Usage

### Current day in hijri or other conversions
To get Today in Hijri:
``` Node.js

const hijri = require('hijri-js')

run();

function run() {
    const x = hijri.initialize();
    
    console.log(' today      ==> ', x.today().full )
    console.log(' 24-10-2017 ==> ', x.toHijri('24102017').plain );
    console.log(' 24-10-2017 ==> ', x.toHijri('24/10/2017', '/') );
    console.log(' 11-07-1386 ==> ', x.toGregorian('11-7-1386', '-') );    
}

```

#### From sources

If you want to use the development version of the plugin, build from source
manually. The development version may be unstable.

```
$ git clone https://github.com/bugyboo/hijri-js.git
$ cd hijri-js
$ yarn install
$ npm run build
```

#### Examples

Comming soon..! Node.Js express example on how to consume this libraray.








