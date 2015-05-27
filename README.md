#toner-phantom


[![Build Status](https://travis-ci.org/jsreport/toner-phantom.png?branch=master)](https://travis-ci.org/jsreport/toner-phantom)

**[Toner](https://github.com/jsreport/toner) recipe for printing html into pdf using [phantomjs](http://phantomjs.org/)**

```bash
npm install toner-phantom
```

```js
toner.recipe("phantom-pdf", require("toner-phantom")({..});
```

This recipe is wrapper around [phantom-html-to-pdf](https://github.com/pofider/phantom-html-to-pdf). All the options passed will be forwarded into the corresponding package.