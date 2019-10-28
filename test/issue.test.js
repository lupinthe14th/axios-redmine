/* eslint-env mocha */
/*
 * issue.test.js - test request for issues
 * Author: wayne <wayne@zanran.me>
 */

const assert = require('assert')
const Redmine = require('../lib/redmine')
const MockAdapter = require('axios-mock-adapter')

/// ////////////////////////////////////////////////////////////
const hostname = process.env.REDMINE_HOST || 'https://redmine.example.org'
const config = {
  apiKey:
    process.env.REDMINE_APIKEY || 'bed1ba0544b681e530c2447341607f423c9c8781'
}

const redmine = new Redmine(hostname, config)

const mock = new MockAdapter(redmine.instance)

mock.onGet('/issues/1.json').reply(200, {
  issue: {
    project_id: 1,
    subject: 'Example',
    priority_id: 4
  }
})

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
  it('test-get-issue-by-id-1', function (done) {
    redmine.get_issue_by_id(1, {}).then(function (response) {
      assert.strictEqual(response.status, 200)
      assert.strictEqual(response.data.issue.project_id, 1)
      assert.strictEqual(response.data.issue.subject, 'Example')
      assert.strictEqual(response.data.issue.priority_id, 4)
    })
    done()
  })
})
