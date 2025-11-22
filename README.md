# axios-redmine

[![npm package](https://nodei.co/npm/axios-redmine.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/axios-redmine/)

[![Build Status](https://github.com/lupinthe14th/axios-redmine/actions/workflows/ci.yml/badge.svg)](https://github.com/lupinthe14th/axios-redmine/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/lupinthe14th/axios-redmine/branch/master/graph/badge.svg)](https://codecov.io/gh/lupinthe14th/axios-redmine)
[![npm version](https://badge.fury.io/js/axios-redmine.svg)](https://www.npmjs.com/package/axios-redmine)
[![Node.js Version](https://img.shields.io/node/v/axios-redmine.svg)](https://nodejs.org/)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

A comprehensive Node.js library that supports **100% of Redmine's REST API** features, built with [axios](https://github.com/axios/axios).

## Features

✨ **Complete API Coverage** - Supports all Redmine REST API endpoints
🔒 **TypeScript Support** - Full type definitions with IntelliSense
⚡ **Promise-based** - Modern async/await syntax
🛡️ **Secure** - Regular security updates and dependency maintenance
📦 **Lightweight** - Minimal dependencies

## Requirements

- **Node.js** >= 20.0.0
- **Redmine** >= 1.0 (depends on features used)
## Installation

To install axios-redmine, simply:

```shell
npm install axios-redmine
```

## Usage

```js
'use strict()'
const Redmine = require('axios-redmine')

// protocol required in Hostname, supports both HTTP and HTTPS
const hostname = process.env.REDMINE_HOST || 'https://docker.for.mac.host.internal'
const config = {
  apiKey: process.env.REDMINE_APIKEY,
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

## TypeScript Support

axios-redmine includes TypeScript type definitions for enhanced developer experience with autocomplete and type checking:

```typescript
import Redmine, { RedmineConfig } from 'axios-redmine';

const config: RedmineConfig = {
  apiKey: process.env.REDMINE_APIKEY
};

const redmine = new Redmine('https://redmine.example.org', config);

// Full IntelliSense and type checking
async function getIssues() {
  const response = await redmine.issues({ limit: 10 });
  console.log(response.data.issues);
}
```

See [example/typescript-example.ts](example/typescript-example.ts) for more examples.

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
