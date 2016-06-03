# toolbag-plugin-nsp-check

[![Current Version](https://img.shields.io/npm/v/toolbag-plugin-nsp-check.svg)](https://www.npmjs.org/package/toolbag-plugin-nsp-check)
[![Build Status via Travis CI](https://travis-ci.org/continuationlabs/toolbag-plugin-nsp-check.svg?branch=master)](https://travis-ci.org/continuationlabs/toolbag-plugin-nsp-check)
![Dependencies](http://img.shields.io/david/continuationlabs/toolbag-plugin-nsp-check.svg)

[![belly-button-style](https://cdn.rawgit.com/continuationlabs/belly-button/master/badge.svg)](https://github.com/continuationlabs/belly-button)

[Toolbag](https://github.com/continuationlabs/toolbag) plugin that checks your dependencies against the Node Security Project's known vulnerabilities database. Checks against the NSP API can be made at startup time, or at any point during runtime via the toolbag command `nsp-check`.

## Supported Parameters

- `checkOnRegister` (boolean) - If `true`, the NSP API is checked on plugin registration. Otherwise, the `nsp-check` command must be explicitly invoked. Defaults to `true`.
- `packagePath` (string) - The `package.json` file to check. Defaults to `package.json` in `process.cwd()`. This value is passed directly to the `nsp` module.
- `shrinkwrapPath` (string) - The `npm-shrinkwrap.json` file to check. Defaults to `npm-shrinkwrap.json` in `process.cwd()`. This value is passed directly to the `nsp` module.
- `formatter` (string or function) - If this is a string, it can be any formatter supported by `nsp` (`'json'`, `'summary'`, etc.). If this is a function, it will be used to format NSP API output. Defaults to the `nsp` default format.

### Example Configuration

Add `toolbag-plugin-nsp-check` to your `package.json`. Configure the plugin in `.toolbagrc.js` as shown below.

```javascript
'use strict';

const NspCheck = require('toolbag-plugin-nsp-check');
const Path = require('path');

module.exports = function config (defaults, callback) {
  callback(null, {
    plugins: [
      {
        plugin: NspCheck,
        options: {
          checkOnRegister: true,
          packagePath: Path.join(process.cwd(), 'package.json')
        }
      }
    ]
  });
};
```
