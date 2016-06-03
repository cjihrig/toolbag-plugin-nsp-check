# toolbag-plugin-nsp-check

[![Current Version](https://img.shields.io/npm/v/toolbag-plugin-nsp-check.svg)](https://www.npmjs.org/package/toolbag-plugin-nsp-check)
[![Build Status via Travis CI](https://travis-ci.org/continuationlabs/toolbag-plugin-nsp-check.svg?branch=master)](https://travis-ci.org/continuationlabs/toolbag-plugin-nsp-check)
![Dependencies](http://img.shields.io/david/continuationlabs/toolbag-plugin-nsp-check.svg)

[![belly-button-style](https://cdn.rawgit.com/continuationlabs/belly-button/master/badge.svg)](https://github.com/continuationlabs/belly-button)

[Toolbag](https://github.com/continuationlabs/toolbag) plugin that checks your dependencies against the Node Security Project's known vulnerabilities database.

## Supported Parameters


### Example Configuration

Add `toolbag-plugin-nsp-check` to your `package.json`. Configure the plugin in `.toolbagrc.js` as shown below.

```javascript
'use strict';

const NspCheck = require('toolbag-plugin-nsp-check');

module.exports = function config (defaults, callback) {
  callback(null, {
    plugins: [
      {
        plugin: NspCheck,
        options: {}
      }
    ]
  });
};
```
