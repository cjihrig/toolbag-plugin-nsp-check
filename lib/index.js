'use strict';

const Path = require('path');
const Check = require('nsp/lib/check');
const Formatters = require('nsp/lib/formatters');
const Merge = require('lodash.merge');
const cwd = process.cwd();
const defaults = {
  checkOnRegister: true,
  packagePath: Path.join(cwd, 'package.json'),
  shrinkwrapPath: Path.join(cwd, 'npm-shrinkwrap.json'),
  offline: false,
  advisoriesPath: undefined
};


module.exports = { register };


function register (manager, options, callback) {
  const settings = Merge({}, defaults, options);

  manager.add('nsp-check', function nspCheck (options, cb) {
    const cmdOptions = Merge({}, settings, options);

    runCheck(cmdOptions, cb);
  });

  if (settings.checkOnRegister === true) {
    manager.on('register', function onRegister () {
      runCheck(settings, function checkCb (err, result) {
        if (err) {
          return manager.error(err);
        }

        if (result.response.length > 0) {
          manager.error(new Error(result.formatted));
        }
      });
    });
  }

  callback();
}


function runCheck (options, callback) {
  let formatter = options.formatter;

  if (typeof formatter !== 'function') {
    formatter = Formatters[formatter] || Formatters.default;
  }

  Check({
    package: options.packagePath,
    shrinkwrap: options.shrinkwrapPath,
    offline: options.offline,
    advisoriesPath: options.advisoriesPath
  }, function checkCb (err, response) {
    const formatted = formatter(err, response);

    callback(err, { response, formatted });
  });
}
