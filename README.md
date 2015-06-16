#toner-phantom

[![Build Status](https://travis-ci.org/jsreport/toner-phantom.png?branch=master)](https://travis-ci.org/jsreport/toner-phantom)

**[Toner](https://github.com/jsreport/toner) recipe for printing html into pdf using [phantomjs](http://phantomjs.org/)**

```bash
npm install toner-phantom
```

```js
toner.recipe("phantom-pdf", require("toner-phantom")({..});

toner.render({
	template: {
		content: "fooo",
		engine: "jsrender",
		phantom: {
			header: "{{:name}}"
		}		
	},
	data : {
		name: "Jan Blaha"
	}
});
```

This recipe is wrapper around [phantom-html-to-pdf](https://github.com/pofider/phantom-html-to-pdf). All the options passed to `template.phantom` will be forwarded into the corresponding package. See its documentation for all options.