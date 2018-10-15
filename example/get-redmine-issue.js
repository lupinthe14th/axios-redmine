/*
 * get-redmine-issue - test request for issues
 * Author: lupinthe14th <hideosuzuki@ordinarius-fectum.net>
 */

'use strict()'

const Redmine = require('../lib/redmine')

/// ////////////////////////////////////////////////////////////
const hostname =
  process.env.REDMINE_HOST || 'https://docker.for.mac.host.internal'
const config = {
  apiKey:
    process.env.REDMINE_APIKEY || 'b7ce4d8d3865e79a75da8dba39bc801c12e36488',
  rejectUnauthorized: process.env.REJECT_UNAUTHORIZED
}

const redmine = new Redmine(hostname, config)

/**
 * Dump issue
 */
const dumpIssue = function (issue) {
  console.log('Dumping issue:')
  for (var item in issue) {
    console.log('  ' + item + ': ' + JSON.stringify(issue[item]))
  }
}

redmine
  .issues({ limit: 2 })
  .then(response => {
    for (const i in response.data.issues) {
      dumpIssue(response.data.issues[i])
    }
    console.log('total_count: ' + response.data.total_count)
  })
  .catch(err => {
    console.log(err)
  })

// get issue by id
const params = { include: 'attachments,journals,watchers' }
redmine
  .get_issue_by_id(2, params)
  .then(response => {
    dumpIssue(response.data.issue)
  })
  .catch(err => {
    console.log(err)
  })

redmine
  .delete_issue(1)
  .then(response => {
    console.log('Delete issue #1: ' + JSON.stringify(response.data))
  })
  .catch(err => {
    console.log(err)
  })

// add watchers
redmine
  .add_watcher(2, { user_id: 5 })
  .then(response => {
    console.log(response.data)
  })
  .catch(err => {
    console.log(err)
  })
/*
// remove watchers
redmine
  .remove_watcher(2, 5)
  .then(response => {
    console.log(response.data)
  })
  .catch(err => {
    console.log(err)
  })
*/
