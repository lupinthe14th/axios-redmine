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

const projectMembership = async () => {
  await redmine.membership_by_project_id(1).then(response => {
    console.log(response.data)
  })

  await redmine.project_membership_by_id(5).then(response => {
    console.log(response.data)
  })

  await redmine
    .create_project_membership(1, {
      membership: { user_id: 5, role_ids: [3] }
    })
    .then(response => {
      console.log(response.data)
      this.id = response.data.membership.id
    })

  const membership = {
    role_ids: {
      role_id: 5
    }
  }

  await redmine
    .update_project_membership(this.id, membership)
    .then(response => {
      console.log(response.data)
    })

  await redmine.delete_project_membership(this.id).then(response => {
    console.log(response.data)
  })
}

projectMembership().catch(err => {
  console.log(err)
  console.log(err.response.data.errors)
})
