/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
/* eslint-env mocha */
/*
 * redmine.test.js - test request for redmine
 * Author: wayne <wayne@zanran.me>
 */

const assert = require('assert')
const Redmine = require('../lib/redmine')

/// ////////////////////////////////////////////////////////////
const hostname = process.env.REDMINE_HOST || 'https://redmine.example.org'

describe('Redmine constructor', function () {
  it('should throw host not specified error when no host or config given', function (done) {
    try {
      new Redmine()
      done(new Error('Expected error to be thrown'))
    } catch (e) {
      assert.strictEqual(e.toString(), 'Error: host not specified!')
      done()
    }
  })

  it('should throw invalid hostname error when host is invalid', function (done) {
    try {
      new Redmine(1)
      done(new Error('Expected error to be thrown'))
    } catch (e) {
      assert.strictEqual(
        e.toString(),
        'Error: host should be a string or url object!'
      )
      done()
    }
  })

  it('should throw authentication missing error when no config given', function (done) {
    try {
      new Redmine(hostname)
      done(new Error('Expected error to be thrown'))
    } catch (e) {
      assert.strictEqual(
        e.toString(),
        'Error: You should provide an API key or username & password !'
      )
      done()
    }
  })

  it('should throw authentication missing error when API key and credentials missing', function (done) {
    try {
      new Redmine(hostname, {})
      done(new Error('Expected error to be thrown'))
    } catch (e) {
      assert.strictEqual(
        e.toString(),
        'Error: You should provide an API key or username & password !'
      )
      done()
    }
  })

  it('should throw authentication missing error when password missing', function (done) {
    const config = {
      username: 'dummy-username'
    }
    try {
      new Redmine(hostname, config)
      done(new Error('Expected error to be thrown'))
    } catch (e) {
      assert.strictEqual(
        e.toString(),
        'Error: You should provide an API key or username & password !'
      )
      done()
    }
  })

  it('should throw authentication missing error when username missing', function (done) {
    const config = {
      password: 'dummy-password'
    }
    try {
      new Redmine('http://localhost', config)
      done(new Error('Expected error to be thrown'))
    } catch (e) {
      assert.strictEqual(
        e.toString(),
        'Error: You should provide an API key or username & password !'
      )
      done()
    }
  })

  it('should not throw errors when host and api key given', function (done) {
    const config = {
      apiKey: process.env.REDMINE_APIKEY || 'my-redmine-api-key'
    }
    const redmine = new Redmine(hostname, config)
    assert.strictEqual(redmine.apiKey, 'my-redmine-api-key')
    done()
  })

  it('should not throw errors when host and credentials given', function (done) {
    const config = {
      username: 'dummy-username',
      password: 'dummy-password'
    }
    const redmine = new Redmine(hostname, config)
    assert.strictEqual(redmine.username, 'dummy-username')
    assert.strictEqual(redmine.password, 'dummy-password')
    done()
  })

  it('test-valid-options-attributes', function (done) {
    const config = {
      apiKey: 'dummy-api-key',
      username: 'dummy-username',
      password: 'dummy-password',
      rejectUnauthorized: '1'
    }
    const redmine = new Redmine(hostname, config, 8443)

    assert.strictEqual(redmine.apiKey, 'dummy-api-key')
    assert.strictEqual(redmine.username, 'dummy-username')
    assert.strictEqual(redmine.password, 'dummy-password')
    assert.strictEqual(redmine.rejectUnauthorized, true)

    done()
  })
})
