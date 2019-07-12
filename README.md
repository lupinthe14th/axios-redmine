axios-redmine
============

[![npm package](https://nodei.co/npm/axios-redmine.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/axios-redmine/)

[![Build Status](https://travis-ci.org/lupinthe14th/axios-redmine.svg?branch=master)](https://travis-ci.org/lupinthe14th/axios-redmine)
[![Coverage Status](https://coveralls.io/repos/github/lupinthe14th/axios-redmine/badge.svg?branch=master)](https://coveralls.io/github/lupinthe14th/axios-redmine?branch=master)
[![Mergify Status][mergify-status]][mergify]

[mergify]: https://mergify.io
[mergify-status]: https://img.shields.io/endpoint.svg?url=https://gh.mergify.io/badges/lupinthe14th/axios-redmine&style=flat

*[axios-redmine](https://github.com/lupinthe14th/axios-redmine) is a nodejs library that supports 100% the [Redmine's REST API](http://www.redmine.org/projects/redmine/wiki/Rest_api)'s features.*

## Installation

To install axios-redmine, simply:

```shell
npm install axios-redmine
```

## Usage

```js
'use strict()'
const Redmine = require('../lib/redmine')

// protocol required in Hostname, supports both HTTP and HTTPS
const hostname = process.env.REDMINE_HOST || 'https://docker.for.mac.host.internal'
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
  for (const item in issue) {
    console.log('  ' + item + ': ' + JSON.stringify(issue[item]))
  }
}

redmine
  .issues({ limit: 2 })
  .then(response => {
    for (const i in response.data.issues) {
      dumpIssue(response.data.issues[i])
    }
    console.log('total_count: ', response.data.total_count)
  })
  .catch(err => {
    console.log(err)
  })
```

## Supported features for Redmine REST API

| Resource            | Status    | Availability | Supported |
|:--------------------|:----------|-------------:|:---------:|
| Issues              | Stable    |          1.0 |     ✓     |
| Projects            | Stable    |          1.0 |     ✓     |
| Project Memberships | Alpha     |          1.4 |     ✓     |
| Users               | Stable    |          1.1 |     ✓     |
| Time Entries        | Stable    |          1.1 |     ✓     |
| News                | Prototype |          1.1 |     ✓     |
| Issue Relations     | Alpha     |          1.3 |     ✓     |
| Versions            | Alpha     |          1.3 |     ✓     |
| Wiki Pages          | Alpha     |          2.2 |     ✓     |
| Queries             | Alpha     |          1.3 |     ✓     |
| Attachments         | Beta      |          1.3 |     ✓     |
| Issue Statuses      | Alpha     |          1.3 |     ✓     |
| Trackers            | Alpha     |          1.3 |     ✓     |
| Enumerations        | Alpha     |          2.2 |     ✓     |
| Issue Categories    | Alpha     |          1.3 |     ✓     |
| Roles               | Alpha     |          1.4 |     ✓     |
| Groups              | Alpha     |          2.1 |     ✓     |
| Custom Fields       | Alpha     |          2.4 |     ✓     |
| Search              | Alpha     |          3.3 |    N/A    |

## Links

* Redmine wiki page: http://www.redmine.org/projects/redmine/wiki/Rest_api
* NPM package: https://www.npmjs.com/package/axios-redmine


## Notice
+ axios-redmine only supports using the [JSON](http://en.wikipedia.org/wiki/JSON) format.
