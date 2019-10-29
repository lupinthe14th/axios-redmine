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
    project: { id: 1, name: 'Example Project' },
    tracker: { id: 1, name: 'bug' },
    status: { id: 1, name: 'new' },
    priority: { id: 2, name: 'nomal' },
    author: { id: 1, name: 'Redmine Admin' },
    subject: 'Example',
    description: '',
    start_date: '2019-10-29',
    due_date: null,
    done_ratio: 0,
    is_private: false,
    estimated_hours: null,
    total_estimated_hours: null,
    spent_hours: 0,
    total_spent_hours: 0,
    created_on: '2019-10-29T13:50:28Z',
    updated_on: '2019-10-29T13:50:28Z',
    closed_on: null
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
  it('test-get-issue-by-id-1', async function () {
    const response = await redmine.get_issue_by_id(1, {})
    assert.strictEqual(response.status, 200)
    assert.strictEqual(response.data.issue.project.id, 1)
    assert.strictEqual(response.data.issue.subject, 'Example')
    assert.strictEqual(response.data.issue.priority.id, 2)
  })
})
