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

const dumpProject = project => {
  console.log('Dumping project:')
  for (const item in project) {
    console.log(`  ${  item  }: ${  JSON.stringify(project[item])}`)
  }
}

const redmineProject = async () => {
  await redmine
    .projects({ include: 'trackers, issue_categories, enabled_modules' })
    .then(response => {
      console.log(response.data)

      for (const i in response.data.projects) {
        dumpProject(response.data.projects[i])
      }

      console.log(`total_count: ${  response.data.total_count}`)
    })

  await redmine
    .get_project_by_id(1, {
      include: 'trackers, issue_categories, enabled_modules'
    })
    .then(response => {
      console.log(response.data)

      dumpProject(response.data.project)
    })

  const project = {
    project: {
      name: 'TEST PROJECT FOR REST API - 2',
      identifier: 'test-rest-api-2',
      enabled_module_names: [
        'boards',
        'calendar',
        'documents',
        'files',
        'gantt',
        'issue_tracking',
        'news'
      ]
    }
  }

  await redmine.create_project(project).then(response => {
    console.log(response.data)
  })

  const updateProject = {
    project: {
      name: 'TEST PROJECT FOR REST API - 5',
      enabled_module_names: ['wiki', 'issue_tracking', 'news']
    }
  }

  await redmine.update_project('test-rest-api-2', updateProject)

  await redmine.delete_project('test-rest-api-2')
}

redmineProject().catch(err => {
  console.log(err)
})
