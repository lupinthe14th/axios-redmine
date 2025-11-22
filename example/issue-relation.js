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

// -----------------------------------------------------------------------------
const issueRelation = async () => {
  await redmine.issue_relation_by_issue_id(5).then(response => {
    console.log(response.data)
  })
  const relations = {
    relation: {
      issue_to_id: 6,
      relation_type: 'duplicates'
    }
  }

  await redmine.create_issue_relation(5, relations).then(response => {
    console.log(response.data)
    this.id = response.data.relation.id
  })

  await redmine.issue_relation_by_id(this.id).then(response => {
    console.log(response.data)
  })

  await redmine.delete_issue_relation(this.id).then(response => {
    console.log(response.data)
  })
}

issueRelation().catch(err => {
  console.log(err.message)
  console.log(err.request.method)
  console.log(err.request.path)
})
