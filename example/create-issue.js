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
  rejectUnauthorized: process.env.REGECT_UNAUTHORIZED
}

const redmine = new Redmine(hostname, config)

/*
 * create issue
 */
const issue = {
  issue: {
    project_id: 1,
    subject: 'Redmine REST API by Node.js',
    assigned_to_id: 5,
    notes: 'automative update redmine notes by node js',
    priority_id: 4
  }
}

redmine
  .create_issue(issue)
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.log(err)
  })
