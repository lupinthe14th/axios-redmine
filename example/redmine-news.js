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

const dumpNews = fields => {
  for (const item in fields) {
    console.log('  ' + item + ': ' + JSON.stringify(fields[item]))
  }
}

redmine
  .news()
  .then(response => {
    console.log(response.data)
    for (const i in response.data.news) {
      dumpNews(response.data.news[i])
    }
  })
  .catch(err => {
    console.log(err)
  })

redmine
  .new_by_project_id(2)
  .then(response => {
    console.log(response.data)
    dumpNews(response.data.news)
  })
  .catch(err => {
    console.log(err)
  })
