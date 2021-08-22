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

// -----------------------------------------------------------------------------

const isseCategory = async () => {
  const dumpObj = obj => {
    for (const item in obj) {
      console.log('  ' + item + ': ' + JSON.stringify(obj[item]))
    }
  }

  await redmine.projects({ include: 'issue_categories' }).then(response => {
    for (const i in response.data.projects) {
      dumpObj(response.data.projects[i])
    }
    console.log('total_count: ' + response.data.total_count)
  })
  const issueCategory = {
    issue_category: {
      name: 'rest api',
      assigned_to_id: 5
    }
  }

  await redmine.create_issue_category(1, issueCategory).then(response => {
    console.log(response.data)
    this.id = response.data.issue_category.id
  })

  await redmine.issue_categories_by_project_id(1).then(response => {
    console.log(response.data)
    dumpObj(response.data.issue_categories)
  })

  await redmine.issue_category_by_id(this.id).then(response => {
    dumpObj(response.data.issue_categories)
  })

  const updateIssueCategory = {
    issue_category: {
      name: 'rest api - 2',
      assigned_to_id: 5
    }
  }

  await redmine
    .update_issue_category(this.id, updateIssueCategory)
    .then(response => {
      console.log(response.data)
    })

  await redmine.issue_category_by_id(this.id).then(response => {
    dumpObj(response.data.issue_categories)
  })

  await redmine.delete_issue_category(this.id).then(response => {
    console.log(response.data)
  })
}

isseCategory().catch(err => {
  console.log(err.message)
  console.log(err.request.method)
  console.log(err.request.path)
})
