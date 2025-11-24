// Type definitions for axios-redmine
// Project: https://github.com/lupinthe14th/axios-redmine
// Definitions by: Claude <https://anthropic.com>

import { AxiosResponse } from 'axios';

/**
 * Redmine client configuration
 */
export interface RedmineConfig {
  /** API access key for Redmine */
  apiKey?: string;
  /** Username to login Redmine */
  username?: string;
  /** Password for login Redmine */
  password?: string;
  /** Impersonate to a login user */
  impersonate?: string;
  /** If not false, server automatically rejects clients with invalid certificates */
  rejectUnauthorized?: string | boolean;
}

/**
 * Generic params for Redmine API requests
 */
export interface RedmineParams {
  [key: string]: any;
}

/**
 * Main Redmine client class
 */
export default class Redmine {
  /**
   * Creates a new Redmine client instance
   * @param host - Redmine hostname (must include protocol, e.g., 'https://redmine.example.com')
   * @param config - Configuration object with authentication credentials
   * @param port - Optional port number
   */
  constructor(host: string | URL, config: RedmineConfig, port?: number);

  // Properties
  apiKey: string;
  username: string;
  password: string;
  impersonate: string;
  rejectUnauthorized: boolean;

  // Core request method
  request(method: string, path: string, params?: RedmineParams): Promise<AxiosResponse<any>>;

  // Issues API (Stable)
  /**
   * Returns a paginated list of issues. By default, it returns open issues only.
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Issues#Listing-issues
   */
  issues(params?: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Returns the issue of given id
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Issues#Showing-an-issue
   */
  get_issue_by_id(id: number, params?: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Creates an issue
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Issues#Creating-an-issue
   */
  create_issue(issue: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Updates the issue of given id
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Issues#Updating-an-issue
   */
  update_issue(id: number, issue: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Deletes the issue of given id
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Issues#Deleting-an-issue
   */
  delete_issue(id: number): Promise<AxiosResponse<any>>;

  /**
   * Adds a watcher to the issue
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Issues#Adding-a-watcher
   */
  add_watcher(id: number, params: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Removes a watcher from the issue
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Issues#Removing-a-watcher
   */
  remove_watcher(issueId: number, userId: number): Promise<AxiosResponse<any>>;

  // Projects API (Stable)
  /**
   * Returns all projects
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Projects#Listing-projects
   */
  projects(params?: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Returns the project of given id or identifier
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Projects#Showing-a-project
   */
  get_project_by_id(id: string | number, params?: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Creates a project
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Projects#Creating-a-project
   */
  create_project(params: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Updates the project of given id or identifier
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Projects#Updating-a-project
   */
  update_project(id: string | number, params: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Deletes the project of given id or identifier
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Projects#Deleting-a-project
   */
  delete_project(id: string | number): Promise<AxiosResponse<any>>;

  // Users API (Stable)
  /**
   * Returns a list of users
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Users#GET
   */
  users(params?: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Returns the user details
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Users#GET-2
   */
  get_user_by_id(id: number, params?: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Returns current user details
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Users#GET-2
   */
  current_user(params?: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Creates a user
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Users#POST
   */
  create_user(params: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Updates a user
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Users#PUT
   */
  update_user(id: number, params: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Deletes a user
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Users#DELETE
   */
  delete_user(id: number): Promise<AxiosResponse<any>>;

  // Time Entries API (Stable)
  /**
   * Returns time entries
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_TimeEntries#Listing-time-entries
   */
  time_entries(params?: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Returns the time entry of given id
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_TimeEntries#Showing-a-time-entry
   */
  get_time_entry_by_id(id: number): Promise<AxiosResponse<any>>;

  /**
   * Creates a time entry
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_TimeEntries#Creating-a-time-entry
   */
  create_time_entry(params: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Updates a time entry
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_TimeEntries#Updating-a-time-entry
   */
  update_time_entry(id: number, params: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Deletes a time entry
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_TimeEntries#Deleting-a-time-entry
   */
  delete_time_entry(id: number): Promise<AxiosResponse<any>>;

  // Project Memberships API (Alpha)
  /**
   * Returns a paginated list of the project memberships
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Memberships#GET
   */
  membership_by_project_id(id: string | number, params?: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Adds a project member
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Memberships#POST
   */
  create_project_membership(id: string | number, params: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Returns the membership of given id
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Memberships#GET-2
   */
  project_membership_by_id(id: number, params?: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Updates the membership of given id
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Memberships#PUT
   */
  update_project_membership(id: number, params: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Deletes a membership
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Memberships#DELETE
   */
  delete_project_membership(id: number): Promise<AxiosResponse<any>>;

  // Issue Relations API (Alpha)
  /**
   * Returns the relations for the issue of given id
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_IssueRelations#GET
   */
  issue_relation_by_issue_id(id: number): Promise<AxiosResponse<any>>;

  /**
   * Creates a relation for the issue of given id
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_IssueRelations#POST
   */
  create_issue_relation(id: number, params: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Returns the relation of given id
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_IssueRelations#GET-2
   */
  issue_relation_by_id(id: number): Promise<AxiosResponse<any>>;

  /**
   * Deletes the relation of given id
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_IssueRelations#DELETE
   */
  delete_issue_relation(id: number): Promise<AxiosResponse<any>>;

  // News API (Prototype)
  /**
   * Returns all news across all projects with pagination
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_News#GET
   */
  news(params?: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Returns all news from project with given id or identifier
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_News#GET-2
   */
  new_by_project_id(id: string | number): Promise<AxiosResponse<any>>;

  // Versions API (Alpha)
  /**
   * Returns the versions available for the project
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Versions#GET
   */
  version_by_project_id(id: string | number): Promise<AxiosResponse<any>>;

  /**
   * Creates a version for the project
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Versions#POST
   */
  create_version(id: string | number, params: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Returns the version of given id
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Versions#GET-2
   */
  version_by_id(id: number): Promise<AxiosResponse<any>>;

  /**
   * Updates the version of given id
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Versions#PUT
   */
  update_version(id: number, params: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Deletes the version of given id
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Versions#DELETE
   */
  delete_version(id: number): Promise<AxiosResponse<any>>;

  // Wiki Pages API (Alpha)
  /**
   * Getting the pages list of a wiki
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_WikiPages#Wiki-Pages
   */
  wiki_by_project_id(id: string | number): Promise<AxiosResponse<any>>;

  /**
   * Getting a wiki page
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_WikiPages#Getting-a-wiki-page
   */
  wiki_by_title(id: string | number, title: string, params?: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Getting an old version of a wiki page
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_WikiPages#Getting-an-old-version-of-a-wiki-page
   */
  wiki_history_by_title(id: string | number, title: string, version: number, params?: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Creating or updating a wiki page
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_WikiPages#Creating-or-updating-a-wiki-page
   */
  create_wiki(id: string | number, title: string, params: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Deletes a wiki page
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_WikiPages#DELETE
   */
  delete_wiki(id: string | number, title: string): Promise<AxiosResponse<any>>;

  // Queries API (Alpha)
  /**
   * Returns the list of all custom queries visible by the user
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Queries#GET
   */
  queries(params?: RedmineParams): Promise<AxiosResponse<any>>;

  // Attachments API (Beta)
  /**
   * Returns the description of the attachment of given id
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Attachments#GET
   */
  attachment_by_id(id: number): Promise<AxiosResponse<any>>;

  /**
   * Updates attachments
   * @see https://www.redmine.org/projects/redmine/wiki/Rest_Attachments#PATCH
   */
  update_attachment(id: number, params: RedmineParams): Promise<AxiosResponse<any>>;

  // Issue Statuses API (Alpha)
  /**
   * Returns the list of all issue statuses
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_IssueStatuses#GET
   */
  issue_statuses(): Promise<AxiosResponse<any>>;

  // Trackers API (Alpha)
  /**
   * Returns the list of all trackers
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Trackers#GET
   */
  trackers(): Promise<AxiosResponse<any>>;

  // Enumerations API (Alpha)
  /**
   * Returns the list of issue priorities
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Enumerations#GET
   */
  issue_priorities(): Promise<AxiosResponse<any>>;

  /**
   * Returns the list of time entry activities
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Enumerations#GET-2
   */
  time_entry_activities(): Promise<AxiosResponse<any>>;

  // Issue Categories API (Alpha)
  /**
   * Returns the issue categories available for the project
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_IssueCategories#GET
   */
  issue_categories_by_project_id(id: string | number): Promise<AxiosResponse<any>>;

  /**
   * Creates an issue category for the project
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_IssueCategories#POST
   */
  create_issue_category(id: string | number, params: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Returns the issue category of given id
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_IssueCategories#GET-2
   */
  issue_category_by_id(id: number): Promise<AxiosResponse<any>>;

  /**
   * Updates the issue category of given id
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_IssueCategories#PUT
   */
  update_issue_category(id: number, params: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Deletes the issue category of given id
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_IssueCategories#DELETE
   */
  delete_issue_category(id: number): Promise<AxiosResponse<any>>;

  // Roles API (Alpha)
  /**
   * Returns the list of roles
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Roles#GET
   */
  roles(): Promise<AxiosResponse<any>>;

  /**
   * Returns the list of permissions for a given role
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Roles#GET-2
   */
  role_by_id(id: number): Promise<AxiosResponse<any>>;

  // Groups API (Alpha)
  /**
   * Returns the list of groups
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Groups#groupsformat
   */
  groups(): Promise<AxiosResponse<any>>;

  /**
   * Creates a group
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Groups#POST
   */
  create_group(params: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Returns details of a group
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Groups#GET-2
   */
  group_by_id(id: number, params?: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Updates an existing group
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Groups#PUT
   */
  update_group(id: number, params: RedmineParams): Promise<AxiosResponse<any>>;

  /**
   * Deletes an existing group
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Groups#DELETE
   */
  delete_group(id: number): Promise<AxiosResponse<any>>;

  /**
   * Adds an existing user to a group
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Groups#POST-2
   */
  add_user_to_group(groupId: number, userId: number): Promise<AxiosResponse<any>>;

  /**
   * Removes a user from a group
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_Groups#DELETE-2
   */
  remove_user_from_group(groupId: number, userId: number): Promise<AxiosResponse<any>>;

  // Custom Fields API (Alpha)
  /**
   * Returns the list of custom fields
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_CustomFields#GET
   */
  custom_fields(): Promise<AxiosResponse<any>>;

  // Common API
  /**
   * Uploads a file to redmine
   * @see http://www.redmine.org/projects/redmine/wiki/Rest_WikiPages#Attaching-files
   */
  upload(content: any): Promise<AxiosResponse<any>>;
}
