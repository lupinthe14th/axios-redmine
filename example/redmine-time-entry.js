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

const dumpTimeEntry = fields => {
  for (const item in fields) {
    console.log('  ' + item + ': ' + JSON.stringify(fields[item]))
  }
}

redmine
  .time_entries()
  .then(response => {
    console.log(response.data)
    for (const i in response.data.time_entries) {
      dumpTimeEntry(response.data.time_entries[i])
    }
  })
  .catch(err => {
    console.log(err.message)
    console.log(err.request.method)
    console.log(err.request.path)
  })
redmine
  .get_time_entry_by_id(4)
  .then(response => {
    dumpTimeEntry(response.data.time_entry)
  })
  .catch(err => {
    console.log(err.message)
    console.log(err.request.method)
    console.log(err.request.path)
  })
/*
redmine.delete_time_entry(5, function(err, data) {
  if (err) throw err;

  console.log(data);
});
*/

const timeEntry = {
  time_entry: {
    project_id: 1,
    activity_id: 8,
    hours: '3'
  }
}

redmine
  .create_time_entry(timeEntry)
  .then(response => {
    console.log(response.data)
  })
  .catch(err => {
    console.log(err.message)
    console.log(err.response.data.errors)
    console.log(err.request.method)
    console.log(err.request.path)
  })

const timeEntryUpdate = {
  time_entry: {
    issue_id: '12',
    hours: 3
  }
}

redmine
  .update_time_entry(1, timeEntryUpdate)
  .then(response => {
    console.log(response.data)
  })
  .catch(err => {
    console.log(err.message)
    console.log(err.request.method)
    console.log(err.request.path)
  })
