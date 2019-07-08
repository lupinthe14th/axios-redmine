/* eslint-env mocha */
/*
 * issue.test.js - test request for issues
 * Author: wayne <wayne@zanran.me>
 */

const assert = require('assert')
const Redmine = require('../lib/redmine')

/// ////////////////////////////////////////////////////////////
const hostname = process.env.REDMINE_HOST || 'redmine.ordinarius-fectum.net'
const config = {
  apiKey:
    process.env.REDMINE_APIKEY || 'bed1ba0544b681e530c2447341607f423c9c8781'
}

const redmine = new Redmine(hostname, config)

describe('issue.test.js', function () {
  it('test-get-issue-with-invalid-id', function (done) {
    const params = { include: 'attachments,journals,watchers' }
    try {
      redmine.get_issue_by_id('0', params)
    } catch (e) {
      assert.strictEqual(
        e.toString(),
        'Error: Issue ID must be an integer above 0 !'
      )
    }
    done()
  })
})
