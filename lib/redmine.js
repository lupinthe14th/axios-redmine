/*!
 * axios-redmine
 * A nodejs library which supports 100% features of Redmine's REST API.
 * Author: lupinthe14th <hideosuzuki@ordinarius-fectum.net>
 * Reference: http://www.redmine.org/projects/redmine/wiki/Rest_api
 */

'use strict()'

/**
 * Module dependencies
 */
const axios = require('axios')
const url = require('url')
const https = require('https')

/**
 * Redmine
 *
 * @param {String} host, Redmine hostname
 * @param {Object} config
 *  - {String} apiKey, API access key for Redmine, if apiKey occured, username and password will be ignored.
 *  - {String} username, username to login Redmine.
 *  - {String} password, password for login Redmine.
 *  - {String} impersonate, impersonate to a login user.
 *  - {Boolean} rejectUnauthorized, If not false a server automatically reject clients with invalid certificates.
 * @param {String} port, Redmine port (defaults to 80)
 */
function Redmine (host, config, port) {
  if (!host) throw new Error('host not specified!')

  if (typeof host === 'string') {
    host = new URL(host)
  } else if (typeof host !== 'object') {
    throw new Error('host should be a string or url object!')
  }
  if (port) {
    host.port = port
    host.host += `:${port.toString()}`
  }

  const baseUrl = url.format(host)
  this.instance = axios.create({ baseURL: baseUrl })

  if (!config || !(config.apiKey || (config.username && config.password))) {
    throw new Error('You should provide an API key or username & password !')
  }
  this.config = config
}

Redmine.prototype = {
  // get & set property
  get apiKey () {
    return this.config.apiKey
  },
  set apiKey (apiKey) {
    this.config.apiKey = apiKey
  },
  get username () {
    return this.config.username
  },
  set username (username) {
    this.config.username = username
  },
  get password () {
    return this.config.password
  },
  set password (password) {
    this.config.password = password
  },
  get impersonate () {
    return this.config.impersonate
  },
  set impersonate (impersonateId) {
    this.config.impersonate = impersonateId
  },
  get rejectUnauthorized () {
    return this.config.rejectUnauthorized === '0'
  },
  set rejectUnauthorized (rejectUnauthorized) {
    this.config.rejectUnauthorized = rejectUnauthorized
  }
}

/**
 * request - request url from Redmine
 */
Redmine.prototype.request = function (method, path, params) {
  const isUpload = path === '/uploads.json'
  const opts = {
    method,
    params: method === 'GET' ? params : undefined,
    data: method === 'PUT' || method === 'POST' ? params : undefined,
    headers: {
      'Content-Type': !isUpload
        ? 'application/json'
        : 'application/octet-stream'
    },
    // auth: { user: this.username, pass: this.password },
    responseType: 'json'
  }

  // tls rejectUnauthorized
  if (this.rejectUnauthorized) {
    const agent = new https.Agent({
      rejectUnauthorized: false
    })
    opts.httpsAgent = agent
  }
  // impersonate to a login user
  if (this.impersonate) {
    opts.headers['X-Redmine-Switch-User'] = this.impersonate
  }

  if (this.apiKey) {
    opts.headers['X-Redmine-API-Key'] = this.config.apiKey
  } else if (this.username && this.password) {
    opts.auth = { username: this.username, password: this.password }
  } else {
    throw new Error('Neither api key nor username/password provided !')
  }

  return this.instance(path, opts)
}

// REST API for issues (Stable)
/**
 * Listing issues
 *    Returns a paginated list of issues. By default, it returns open issues only.
 * http://www.redmine.org/projects/redmine/wiki/Rest_Issues#Listing-issues
 */
Redmine.prototype.issues = function (params) {
  return this.request('GET', '/issues.json', params)
}

/**
 * Showing an issue
 * http://www.redmine.org/projects/redmine/wiki/Rest_Issues#Showing-an-issue
 */
Redmine.prototype.get_issue_by_id = function (id, params) {
  if (typeof id !== 'number') {
    throw new Error('Issue ID must be an integer above ' + id + ' !')
  }

  return this.request('GET', `/issues/${id}.json`, params)
}

/**
 * Creating an issue
 * http://www.redmine.org/projects/redmine/wiki/Rest_Issues#Creating-an-issue
 */
Redmine.prototype.create_issue = function (issue) {
  return this.request('POST', '/issues.json', issue)
}

/**
 * Updating an issue
 * http://www.redmine.org/projects/redmine/wiki/Rest_Issues#Updating-an-issue
 */
Redmine.prototype.update_issue = function (id, issue) {
  return this.request('PUT', `/issues/${id}.json`, issue)
}

/**
 * Deleting an issue
 * http://www.redmine.org/projects/redmine/wiki/Rest_Issues#Deleting-an-issue
 */
Redmine.prototype.delete_issue = function (id) {
  return this.request('DELETE', `/issues/${id}.json`, {})
}

/**
 * Adding a watcher
 * http://www.redmine.org/projects/redmine/wiki/Rest_Issues#Adding-a-watcher
 */
Redmine.prototype.add_watcher = function (id, params) {
  if (!params.user_id) {
    throw new Error('user_id (required): id of the user to add as a watcher !')
  }

  return this.request('POST', `/issues/${id}/watchers.json`, params)
}

/**
 * Removing a watcher
 * http://www.redmine.org/projects/redmine/wiki/Rest_Issues#Removing-a-watcher
 */
Redmine.prototype.remove_watcher = function (issueId, userId) {
  return this.request(
    'DELETE',
    `/issues/${issueId}/watchers/${userId}.json`,
    {}
  )
}

// REST API for Projects (Stable)
/**
 * Listing projects
 * http://www.redmine.org/projects/redmine/wiki/Rest_Projects#Listing-projects
 */
Redmine.prototype.projects = function (params) {
  return this.request('GET', '/projects.json', params)
}

/**
 * Showing a project
 * http://www.redmine.org/projects/redmine/wiki/Rest_Projects#Showing-a-project
 */
Redmine.prototype.get_project_by_id = function (id, params) {
  return this.request('GET', `/projects/${id}.json`, params)
}

/**
 * Creating a project
 * http://www.redmine.org/projects/redmine/wiki/Rest_Projects#Creating-a-project
 */
Redmine.prototype.create_project = function (params) {
  return this.request('POST', '/projects.json', params)
}

/**
 * Updating a project - Updates the project of given id or identifier
 * http://www.redmine.org/projects/redmine/wiki/Rest_Projects#Updating-a-project
 */
Redmine.prototype.update_project = function (id, params) {
  return this.request('PUT', `/projects/${id}.json`, params)
}

/**
 * Deleting a project - Deletes the project of given id or identifier
 * http://www.redmine.org/projects/redmine/wiki/Rest_Projects#Deleting-a-project
 */
Redmine.prototype.delete_project = function (id) {
  return this.request('DELETE', `/projects/${id}.json`, {})
}

// REST API for Users (Stable)
/**
 * list Users
 * http://www.redmine.org/projects/redmine/wiki/Rest_Users#GET
 */
Redmine.prototype.users = function (params) {
  return this.request('GET', '/users.json', params)
}

/**
 * Returns the user details
 * http://www.redmine.org/projects/redmine/wiki/Rest_Users#GET-2
 */
Redmine.prototype.get_user_by_id = function (id, params) {
  return this.request('GET', `/users/${id}.json`, params)
}

/**
 * Returns current user details
 * http://www.redmine.org/projects/redmine/wiki/Rest_Users#GET-2
 */
Redmine.prototype.current_user = function (params) {
  return this.request('GET', '/users/current.json', params)
}

/**
 * create user
 * http://www.redmine.org/projects/redmine/wiki/Rest_Users#POST
 */
Redmine.prototype.create_user = function (params) {
  return this.request('POST', '/users.json', params)
}

/**
 * update user
 * http://www.redmine.org/projects/redmine/wiki/Rest_Users#PUT
 */
Redmine.prototype.update_user = function (id, params) {
  return this.request('PUT', `/users/${id}.json`, params)
}

/**
 * Deleting user
 * http://www.redmine.org/projects/redmine/wiki/Rest_Users#DELETE
 */
Redmine.prototype.delete_user = function (id) {
  return this.request('DELETE', `/users/${id}.json`, {})
}

// REST API for Time Entries (Stable)
/**
 * Listing time entries
 * http://www.redmine.org/projects/redmine/wiki/Rest_TimeEntries#Listing-time-entries
 */
Redmine.prototype.time_entries = function (params) {
  return this.request('GET', '/time_entries.json', params)
}

/**
 * Showing a time entry
 * http://www.redmine.org/projects/redmine/wiki/Rest_TimeEntries#Showing-a-time-entry
 */
Redmine.prototype.get_time_entry_by_id = function (id) {
  return this.request('GET', `/time_entries/${id}.json`, {})
}

/**
 * Creating a time entry
 * http://www.redmine.org/projects/redmine/wiki/Rest_TimeEntries#Creating-a-time-entry
 */
Redmine.prototype.create_time_entry = function (params) {
  return this.request('POST', '/time_entries.json', params)
}

/**
 * Updating a time entry
 * http://www.redmine.org/projects/redmine/wiki/Rest_TimeEntries#Updating-a-time-entry
 */
Redmine.prototype.update_time_entry = function (id, params) {
  return this.request('PUT', `/time_entries/${id}.json`, params)
}

/**
 * Deleting a time entry
 * http://www.redmine.org/projects/redmine/wiki/Rest_TimeEntries#Deleting-a-time-entry
 */
Redmine.prototype.delete_time_entry = function (id) {
  return this.request('DELETE', `/time_entries/${id}.json`, {})
}

// REST API for Project Memberships (Alpha)
/**
 * Returns a paginated list of the project memberships. :project_id can be either the project numerical id or the project identifier.
 * http://www.redmine.org/projects/redmine/wiki/Rest_Memberships#GET
 */
Redmine.prototype.membership_by_project_id = function (id, params) {
  return this.request('GET', `/projects/${id}/memberships.json`, params)
}

/**
 * Adds a project member
 * http://www.redmine.org/projects/redmine/wiki/Rest_Memberships#POST
 */
Redmine.prototype.create_project_membership = function (id, params) {
  return this.request('POST', `/projects/${id}/memberships.json`, params)
}

/**
 * Returns the membership of given :id.
 * http://www.redmine.org/projects/redmine/wiki/Rest_Memberships#GET-2
 */
Redmine.prototype.project_membership_by_id = function (id, params) {
  return this.request('GET', `/memberships/${id}.json`, params)
}

/**
 * Updates the membership of given :id. Only the roles can be updated, the project and the user of a membership are read-only.
 * http://www.redmine.org/projects/redmine/wiki/Rest_Memberships#PUT
 */
Redmine.prototype.update_project_membership = function (id, params) {
  return this.request('PUT', `/memberships/${id}.json`, params)
}

/**
 * Deletes a memberships
 * http://www.redmine.org/projects/redmine/wiki/Rest_Memberships#DELETE
 */
Redmine.prototype.delete_project_membership = function (id) {
  return this.request('DELETE', `/memberships/${id}.json`, {})
}

// REST API for Issue Relations (Alpha)
/**
 * Returns the relations for the issue of given id (:issue_id).
 * http://www.redmine.org/projects/redmine/wiki/Rest_IssueRelations#GET
 */
Redmine.prototype.issue_relation_by_issue_id = function (id) {
  return this.request('GET', `/issues/${id}/relations.json`, {})
}

/**
 * Creates a relation for the issue of given id (:issue_id).
 * http://www.redmine.org/projects/redmine/wiki/Rest_IssueRelations#POST
 */
Redmine.prototype.create_issue_relation = function (id, params) {
  return this.request('POST', `/issues/${id}/relations.json`, params)
}

/**
 * Returns the relation of given id.
 * http://www.redmine.org/projects/redmine/wiki/Rest_IssueRelations#GET-2
 */
Redmine.prototype.issue_relation_by_id = function (id) {
  return this.request('GET', `/relations/${id}.json`, {})
}

/**
 * Deletes the relation of given id.
 * http://www.redmine.org/projects/redmine/wiki/Rest_IssueRelations#DELETE
 */
Redmine.prototype.delete_issue_relation = function (id) {
  return this.request('DELETE', `/relations/${id}.json`, {})
}

// REST API for News (Prototype)
/**
 * Returns all news across all projects with pagination
 * http://www.redmine.org/projects/redmine/wiki/Rest_News#GET
 */
Redmine.prototype.news = function (params) {
  return this.request('GET', '/news.json', params)
}

/**
 * Returns all news from project with given id or identifier with pagination.
 * http://www.redmine.org/projects/redmine/wiki/Rest_News#GET-2
 */
Redmine.prototype.new_by_project_id = function (id) {
  return this.request('GET', `/projects/${id}/news.json`, {})
}

// REST API for Versions (Alpha)
/**
 * Returns the versions available for the project of given id or identifier (:project_id).
 *    The response may include shared versions from other projects.
 * http://www.redmine.org/projects/redmine/wiki/Rest_Versions#GET
 */
Redmine.prototype.version_by_project_id = function (id) {
  return this.request('GET', `/projects/${id}/versions.json`, {})
}

/**
 * Creates a version for the project of given id or identifier (:project_id).
 * http://www.redmine.org/projects/redmine/wiki/Rest_Versions#POST
 */
Redmine.prototype.create_version = function (id, params) {
  return this.request('POST', `/projects/${id}/versions.json`, params)
}

/**
 * Returns the version of given id
 * http://www.redmine.org/projects/redmine/wiki/Rest_Versions#GET-2
 */
Redmine.prototype.version_by_id = function (id) {
  return this.request('GET', `/versions/${id}.json`, {})
}

/**
 * Updates the version of given id
 * http://www.redmine.org/projects/redmine/wiki/Rest_Versions#PUT
 */
Redmine.prototype.update_version = function (id, params) {
  return this.request('PUT', `/versions/${id}.json`, params)
}

/**
 * Deletes the version of given id
 * http://www.redmine.org/projects/redmine/wiki/Rest_Versions#DELETE
 */
Redmine.prototype.delete_version = function (id) {
  return this.request('DELETE', `/versions/${id}.json`, {})
}

// REST API for Wiki Pages (Alpha)
/**
 * Getting the pages list of a wiki
 * http://www.redmine.org/projects/redmine/wiki/Rest_WikiPages#Wiki-Pages
 */
Redmine.prototype.wiki_by_project_id = function (id) {
  return this.request('GET', `/projects/${id}/wiki/index.json`, {})
}

/**
 * Getting a wiki page
 * http://www.redmine.org/projects/redmine/wiki/Rest_WikiPages#Getting-a-wiki-page
 */
Redmine.prototype.wiki_by_title = function (id, title, params) {
  return this.request('GET', `/projects/${id}/wiki/${title}.json`, params)
}

/**
 * Getting an old version of a wiki page
 * http://www.redmine.org/projects/redmine/wiki/Rest_WikiPages#Getting-an-old-version-of-a-wiki-page
 */
Redmine.prototype.wiki_history_by_title = function (id, title, version, params) {
  return this.request(
    'GET',
    `/projects/${id}/wiki/${title}/${version}.json`,
    params
  )
}

/**
 * Creating or updating a wiki page
 * http://www.redmine.org/projects/redmine/wiki/Rest_WikiPages#Creating-or-updating-a-wiki-page
 */
Redmine.prototype.create_wiki = function (id, title, params) {
  return this.request('PUT', `/projects/${id}/wiki/${title}.json`, params)
}

/**
 * Deletes the issue category of given id.
 * http://www.redmine.org/projects/redmine/wiki/Rest_IssueCategories#DELETE
 */
Redmine.prototype.delete_wiki = function (id, title) {
  return this.request('DELETE', `/projects/${id}/wiki/${title}.json`, {})
}

// REST API for Queries (Alpha)
/**
 * Returns the list of all custom queries visible by the user (public and private queries) for all projects.
 * http://www.redmine.org/projects/redmine/wiki/Rest_Queries#GET
 */
Redmine.prototype.queries = function (params) {
  return this.request('GET', '/queries.json', params)
}

// REST API for Attachments (Beta)
/**
 * Returns the description of the attachment of given id.
 *  The file can actually be downloaded at the URL given by the content_url attribute in the response.
 * http://www.redmine.org/projects/redmine/wiki/Rest_Attachments#GET
 */
Redmine.prototype.attachment_by_id = function (id) {
  return this.request('GET', `/attachments/${id}.json`, {})
}

// REST API for Issue Statuses (Alpha)
/**
 * Returns the list of all issue statuses.
 * http://www.redmine.org/projects/redmine/wiki/Rest_IssueStatuses#GET
 */
Redmine.prototype.issue_statuses = function () {
  return this.request('GET', '/issue_statuses.json', {})
}

// REST API for Trackers (Alpha)
/**
 * Returns the list of all trackers.
 * http://www.redmine.org/projects/redmine/wiki/Rest_Trackers#GET
 */
Redmine.prototype.trackers = function () {
  return this.request('GET', '/trackers.json', {})
}

// REST API for Enumerations (Alpha)
/**
 * Returns the list of issue priorities.
 * http://www.redmine.org/projects/redmine/wiki/Rest_Enumerations#GET
 */
Redmine.prototype.issue_priorities = function () {
  return this.request('GET', '/enumerations/issue_priorities.json', {})
}

/**
 * Returns the list of time entry activities.
 * http://www.redmine.org/projects/redmine/wiki/Rest_Enumerations#GET-2
 */
Redmine.prototype.time_entry_activities = function () {
  return this.request('GET', '/enumerations/time_entry_activities.json', {})
}

// REST API for Issue Categories (Alpha)
/**
 * Returns the issue categories available for the project of given id or identifier (:project_id).
 * http://www.redmine.org/projects/redmine/wiki/Rest_IssueCategories#GET
 */
Redmine.prototype.issue_categories_by_project_id = function (id) {
  return this.request('GET', `/projects/${id}/issue_categories.json`, {})
}

/**
 * Creates an issue category for the project of given id or identifier (:project_id).
 * http://www.redmine.org/projects/redmine/wiki/Rest_IssueCategories#POST
 */
Redmine.prototype.create_issue_category = function (id, params) {
  return this.request('POST', `/projects/${id}/issue_categories.json`, params)
}

/**
 * Returns the issue category of given id.
 * http://www.redmine.org/projects/redmine/wiki/Rest_IssueCategories#GET-2
 */
Redmine.prototype.issue_category_by_id = function (id) {
  return this.request('GET', `/issue_categories/${id}.json`, {})
}

/**
 * Updates the issue category of given id
 * http://www.redmine.org/projects/redmine/wiki/Rest_IssueCategories#PUT
 */
Redmine.prototype.update_issue_category = function (id, params) {
  return this.request('PUT', `/issue_categories/${id}.json`, params)
}

/**
 * Deletes the issue category of given id.
 * http://www.redmine.org/projects/redmine/wiki/Rest_IssueCategories#DELETE
 */
Redmine.prototype.delete_issue_category = function (id) {
  return this.request('DELETE', `/issue_categories/${id}.json`, {})
}

// REST API for Roles (Alpha)
/**
 * Returns the list of roles.
 * http://www.redmine.org/projects/redmine/wiki/Rest_Roles#GET
 */
Redmine.prototype.roles = function () {
  return this.request('GET', '/roles.json', {})
}

/**
 * Returns the list of permissions for a given role
 * http://www.redmine.org/projects/redmine/wiki/Rest_Roles#GET-2
 */
Redmine.prototype.role_by_id = function (id) {
  return this.request('GET', `/roles/${id}.json`, {})
}

// REST API for Groups (Alpha)
/**
 * Returns the list of Groups
 * http://www.redmine.org/projects/redmine/wiki/Rest_Groups#groupsformat
 */
Redmine.prototype.groups = function () {
  return this.request('GET', '/groups.json', {})
}

/**
 * Creates a Group
 * http://www.redmine.org/projects/redmine/wiki/Rest_Groups#POST
 */
Redmine.prototype.create_group = function (params) {
  return this.request('POST', '/groups.json', params)
}

/**
 * Returns details of a group.
 * http://www.redmine.org/projects/redmine/wiki/Rest_Groups#GET-2
 */
Redmine.prototype.group_by_id = function (id, params) {
  return this.request('GET', `/groups/${id}.json`, params)
}

/**
 * Updates an existing group
 * http://www.redmine.org/projects/redmine/wiki/Rest_Groups#PUT
 */
Redmine.prototype.update_group = function (id, params) {
  return this.request('PUT', `/groups/${id}.json`, params)
}

/**
 * Deletes an existing group
 * http://www.redmine.org/projects/redmine/wiki/Rest_Groups#DELETE
 */
Redmine.prototype.delete_group = function (id) {
  return this.request('DELETE', `/groups/${id}.json`, {})
}

/**
 * Adds an existing user to a group
 * http://www.redmine.org/projects/redmine/wiki/Rest_Groups#POST-2
 */
Redmine.prototype.add_user_to_group = function (groupId, userId) {
  const params = {
    user_id: userId
  }
  return this.request('POST', `/groups/${groupId}/users.json`, params)
}

/**
 * Removes a user from a group
 * http://www.redmine.org/projects/redmine/wiki/Rest_Groups#DELETE-2
 */
Redmine.prototype.remove_user_from_group = function (groupId, userId) {
  return this.request('DELETE', `/groups/${groupId}/users/${userId}.json`, {})
}

// REST API for Custom Fields (Alpha)
/**
 * Get custom fields
 * http://www.redmine.org/projects/redmine/wiki/Rest_CustomFields#GET
 */
Redmine.prototype.custom_fields = function () {
  return this.request('GET', '/custom_fields.json', {})
}

// REST API for Search (Alpha)
// http://www.redmine.org/projects/redmine/wiki/Rest_Search
// Not documented yet.

// REST API for Common (Alpha)
/**
 * upload a file to redmine
 * http://www.redmine.org/projects/redmine/wiki/Rest_WikiPages#Attaching-files
 */

Redmine.prototype.upload = function (content) {
  return this.request('POST', '/uploads.json', content)
}

module.exports = Redmine
