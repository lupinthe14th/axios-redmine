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
    process.env.REDMINE_APIKEY,
  rejectUnauthorized: process.env.REJECT_UNAUTHORIZED
}

const redmine = new Redmine(hostname, config)

const dumpFields = fields => {
  console.log('Dumping Custom Fields:')
  for (const item in fields) {
    console.log('  ' + item + ': ' + JSON.stringify(fields[item]))
  }
}

redmine
  .custom_fields()
  .then(response => {
    for (const i in response.data.custom_fields) {
      dumpFields(response.data.custom_fields[i])
    }
  })
  .catch(err => {
    console.log(err)
  })
