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
const groups = async () => {
  await redmine.groups().then(response => {
    console.log(response.data)
  })

  const group = {
    group: {
      name: 'rest-api-3-1',
      user_ids: [5]
    }
  }

  await redmine.create_group(group).then(response => {
    console.log(response.data)
    this.id = response.data.group.id
  })

  await redmine
    .group_by_id(this.id, { include: 'users, memberships' })
    .then(response => {
      console.log(JSON.stringify(response.data))
    })

  const uGroup = {
    group: {
      name: 'nodejs',
      user_ids: [5]
    }
  }

  await redmine.update_group(this.id, uGroup).then(response => {
    console.log(response.data)
  })
  await redmine
    .group_by_id(this.id, { include: 'users, memberships' })
    .then(response => {
      console.log(JSON.stringify(response.data))
    })

  await redmine.add_user_to_group(this.id, 6).then(response => {
    console.log(response.data)
  })
  await redmine
    .group_by_id(this.id, { include: 'users, memberships' })
    .then(response => {
      console.log(JSON.stringify(response.data))
    })

  await redmine.remove_user_from_group(this.id, 5).then(response => {
    console.log(response.data)
  })
  await redmine
    .group_by_id(this.id, { include: 'users, memberships' })
    .then(response => {
      console.log(JSON.stringify(response.data))
    })

  await redmine.delete_group(this.id).then(response => {
    console.log(response.data)
  })
  await redmine.groups().then(response => {
    console.log(response.data)
  })
}

groups().catch(err => {
  console.log(err.message)
  console.log(err.request.method)
  console.log(err.request.path)
})
