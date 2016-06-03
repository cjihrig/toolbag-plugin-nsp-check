'use strict';

const Path = require('path');
const Code = require('code');
const Lab = require('lab');
const Manager = require('toolbag/lib/manager');
const Nsp = require('../lib');

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.describe;
const it = lab.it;

const fixturesDirectory = Path.join(__dirname, 'fixtures');


describe('NSP Check', () => {
  it('reports vulnerabilities on registration by default', (done) => {
    const manager = new Manager({ errors: { policy: 'throw' } });
    const options = { packagePath: Path.join(fixturesDirectory, 'package-not-ok.json') };

    manager.error = function (err) {
      expect(err).to.be.an.error();
      done();
    };

    Nsp.register(manager, options, (err) => {
      expect(err).to.not.exist();
    });
  });

  it('does nothing if no vulnerabilities are found', (done) => {
    const manager = new Manager({ errors: { policy: 'throw' } });
    const options = { packagePath: Path.join(fixturesDirectory, 'package-ok.json') };

    Nsp.register(manager, options, (err) => {
      expect(err).to.not.exist();
      done();
    });
  });

  it('does not check on registration if checkOnRegister is false', (done) => {
    const manager = new Manager({ errors: { policy: 'throw' } });
    const options = {
      checkOnRegister: false,
      packagePath: Path.join(fixturesDirectory, 'package-not-ok.json')
    };

    Nsp.register(manager, options, (err) => {
      expect(err).to.not.exist();
      done();
    });
  });

  it('supports NSP formatter values', (done) => {
    const manager = new Manager({ errors: { policy: 'throw' } });
    const options = {
      packagePath: Path.join(fixturesDirectory, 'package-not-ok.json'),
      formatter: 'json'
    };

    manager.error = function (err) {
      expect(err).to.be.an.error();
      expect(JSON.parse(err.message)).to.be.an.array();
      done();
    };

    Nsp.register(manager, options, (err) => {
      expect(err).to.not.exist();
    });
  });

  it('supports a custom formatter function', (done) => {
    const manager = new Manager({ errors: { policy: 'throw' } });
    const options = {
      packagePath: Path.join(fixturesDirectory, 'package-not-ok.json'),
      formatter () {
        return 'foobar';
      }
    };

    manager.error = function (err) {
      expect(err).to.be.an.error('foobar');
      done();
    };

    Nsp.register(manager, options, (err) => {
      expect(err).to.not.exist();
    });
  });

  it('can be triggered as nsp-check command', (done) => {
    const manager = new Manager({ errors: { policy: 'throw' } });
    const options = {
      checkOnRegister: false,
      packagePath: Path.join(fixturesDirectory, 'package-not-ok.json')
    };

    Nsp.register(manager, options, (err) => {
      expect(err).to.not.exist();

      const cmd = manager._cmds.get('nsp-check');
      cmd({}, (err, results) => {
        expect(err).to.not.exist();
        expect(results.response).to.be.an.array();
        expect(results.formatted).to.be.a.string();
        done();
      });
    });
  });

  it('handles errors from the NSP API', (done) => {
    const manager = new Manager({ errors: { policy: 'throw' } });
    const options = { packagePath: Path.join(fixturesDirectory, 'not-there.json') };

    manager.error = function (err) {
      expect(err).to.be.an.error();
      done();
    };

    Nsp.register(manager, options, (err) => {
      expect(err).to.not.exist();
    });
  });
});
