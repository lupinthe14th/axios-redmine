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

const issues = [
  {
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
  },
  {
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
]

const updateIssue = {
  issue: {
    subject: 'Subject changed',
    notes: 'The subject was changed'
  }
}
const mock = new MockAdapter(redmine.instance)

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
    mock.onGet('/issues/1.json').reply(200, { issue: issues[0] })
    const response = await redmine.get_issue_by_id(1, {})
    assert.strictEqual(response.status, 200)
    assert.deepStrictEqual(response.data.issue, issues[0])
  })
  it('test-listing-issues', async function () {
    mock.onGet('/issues.json').reply(200, { issues: issues })
    const response = await redmine.issues({})
    assert.strictEqual(response.status, 200)
    assert.deepStrictEqual(response.data.issues, issues)
  })
  it('test-creating-an-issue', async function () {
    mock.onPost('/issues.json').reply(201)
    const response = await redmine.create_issue({
      issue: {
        project_id: 1,
        subject: 'Example',
        priority_id: 4
      }
    })
    assert.strictEqual(response.status, 201)
  })
  it('test-updating-an-issue', async function () {
    mock.onPut('/issues/1.json', updateIssue).reply(200)
    const response = await redmine.update_issue(1, updateIssue)
    assert.strictEqual(response.status, 200)
  })
  it('test-adding-a-watcher-with-invalid-user_id', function (done) {
    try {
      redmine.add_watcher(1, 1)
    } catch (e) {
      assert.strictEqual(
        e.toString(),
        'Error: user_id (required): id of the user to add as a watcher !'
      )
    }
    done()
  })
  it('test-adding-a-watcher', async function () {
    mock.onPost('/issues/1/watchers.json').reply(200, { user_id: 1 })
    const response = await redmine.add_watcher(1, { user_id: 1 })
    assert.strictEqual(response.status, 200)
  })
  it('test-removing-a-watcher', async function () {
    mock.onDelete('/issues/1/watchers/1.json').reply(200)
    const response = await redmine.remove_watcher(1, 1)
    assert.strictEqual(response.status, 200)
  })
  it('test-deleting-an-issue', async function () {
    mock.onDelete('/issues/1.json').reply(200)
    const response = await redmine.delete_issue(1)
    assert.strictEqual(response.status, 200)
  })
})
