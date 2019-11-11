/* eslint-env mocha */
/*
 * projects.test.js - test request for project
 * Author: lupinthe14th <hideosuzuki@ordinarius-fectum.net>
 */

const assert = require('assert')
const Redmine = require('../lib/redmine')
const MockAdapter = require('axios-mock-adapter')

/// ////////////////////////////////////////////////////////////
const hostname = process.env.REDMINE_HOST || 'https://redmine.example.org'
const config = {
  username: 'dummy-username',
  password: 'dummy-password',
  rejectUnauthorized: '1'
}

const redmine = new Redmine(hostname, config)

const projects = [
  {
    id: 1,
    name: 'TEST PROJECT FOR REST API - 1',
    identifier: 'first',
    description: '',
    status: 1,
    is_public: true,
    trackers: [
      { id: 1, name: 'bug' },
      { id: 2, name: 'feature' },
      { id: 3, name: 'support' }
    ],
    issue_categories: [],
    enabled_modules: [
      { id: 1, name: 'issue_tracking' },
      { id: 2, name: 'time_tracking' },
      { id: 3, name: 'news' },
      { id: 4, name: 'documents' },
      { id: 5, name: 'files' },
      { id: 6, name: 'wiki' },
      { id: 7, name: 'repository' },
      { id: 8, name: 'boards' },
      { id: 9, name: 'calendar' },
      { id: 10, name: 'gantt' }
    ],
    created_on: '2019-10-29T13:50:16Z',
    updated_on: '2019-10-29T13:50:16Z'
  },
  {
    id: 2,
    name: 'TEST PROJECT FOR REST API - 2',
    identifier: 'second',
    description: '',
    status: 1,
    is_public: true,
    trackers: [
      { id: 1, name: 'bug' },
      { id: 2, name: 'feature' },
      { id: 3, name: 'support' }
    ],
    issue_categories: [],
    enabled_modules: [
      { id: 1, name: 'issue_tracking' },
      { id: 2, name: 'time_tracking' },
      { id: 3, name: 'news' },
      { id: 4, name: 'documents' },
      { id: 5, name: 'files' },
      { id: 6, name: 'wiki' },
      { id: 7, name: 'repository' },
      { id: 8, name: 'boards' },
      { id: 9, name: 'calendar' },
      { id: 10, name: 'gantt' }
    ],
    created_on: '2019-10-29T13:50:16Z',
    updated_on: '2019-10-29T13:50:16Z'
  }
]
const updateProject = {
  project: {
    name: 'rename test project',
    enabled_module_names: ['wiki', 'issue_tracking', 'news']
  }
}

const mock = new MockAdapter(redmine.instance)

describe('project.test.js', function () {
  it('test-listing-projects', async function () {
    mock.onGet('/projects.json').reply(200, { projects: projects })
    const response = await redmine.projects({})
    assert.strictEqual(response.status, 200)
    assert.deepStrictEqual(response.data.projects, projects)
  })
  it('test-showing-project', async function () {
    mock.onGet('/projects/1.json').reply(200, { projects: projects[0] })
    const response = await redmine.get_project_by_id(1, {})
    assert.strictEqual(response.status, 200)
    assert.deepStrictEqual(response.data.projects, projects[0])
  })
  it('test-creating-project', async function () {
    mock.onPost('/projects.json').reply(201)
    const response = await redmine.create_project({
      project: {
        name: 'test project',
        identifier: 'test',
        enabled_module_names: ['time_tracking', 'issue_tracking']
      }
    })
    assert.strictEqual(response.status, 201)
  })
  it('test-updateing-project', async function () {
    mock.onPut('/projects/test.json', updateProject).reply(200)
    const response = await redmine.update_project('test', updateProject)
    assert.strictEqual(response.status, 200)
  })
  it('test-deleteing-project', async function () {
    mock.onDelete('/projects/test.json').reply(200)
    const response = await redmine.delete_project('test')
    assert.strictEqual(response.status, 200)
  })
})
