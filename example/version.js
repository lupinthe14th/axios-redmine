/*
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

// -----------------------------------------------------------------------------

redmine.version_by_project_id(1, function (err, data) {
  if (err) throw err

  console.log(data)
})
/*
var version = {
  version: {
    name: 'test for version (bugfix - last)'
  }
};
redmine.create_version(4, version, function(err, data) {
  if (err) throw err;

  console.log(data);
});

/*
redmine.version_by_id(1, function(err, data) {
  if (err) throw err;

  for (var item in data.version) {
    console.log(data.version[item]);
  }
});
/*
redmine.delete_version(1, function(err, data) {
  if (err) throw err;

  console.log(data);
});
*/

redmine.queries(function (err, data) {
  if (err) throw err

  console.log(data)
})

redmine.attachment_by_id(178, function (err, data) {
  if (err) throw err

  console.log(data)
})

redmine.issue_statuses(function (err, data) {
  if (err) throw err

  console.log(data)
})

redmine.trackers(function (err, data) {
  if (err) throw err

  console.log(data)
})

redmine.issue_priorities(function (err, data) {
  if (err) throw err

  console.log(data)
})

redmine.time_entry_activities(function (err, data) {
  if (err) throw err

  console.log(data)
})

redmine.roles(function (err, data) {
  if (err) throw err

  console.log(data)
})

redmine.role_by_id(4, function (err, data) {
  if (err) throw err

  console.log(data)
})
