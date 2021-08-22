/*
 * Author: lupinthe14th <hideosuzuki@ordinarius-fectum.net>
 */

'use strict()'

const Redmine = require('axios-redmine')

/// ////////////////////////////////////////////////////////////
const hostname =
  process.env.REDMINE_HOST || 'https://docker.for.mac.host.internal'
const config = {
  apiKey:
    process.env.REDMINE_APIKEY || 'b7ce4d8d3865e79a75da8dba39bc801c12e36488',
  rejectUnauthorized: process.env.REJECT_UNAUTHORIZED
}

const redmine = new Redmine(hostname, config)

/*
 * update issue
 */
const issue = {
  issue: {
    subject: 'Redmine REST API by Node.js',
    assigned_to_id: 5,
    notes: 'automative update redmine notes by node js'
  }
}

redmine
  .update_issue(5, issue)
  .then(response => {
    console.log(response.data)
  })
  .catch(err => {
    console.log(err)
  })
