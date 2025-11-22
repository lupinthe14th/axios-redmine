/**
 * TypeScript example for axios-redmine
 *
 * This demonstrates TypeScript support with full type checking and IntelliSense
 */

import Redmine, { RedmineConfig } from 'axios-redmine';

// Configure with type safety
const config: RedmineConfig = {
  apiKey: process.env.REDMINE_APIKEY
};

const hostname = process.env.REDMINE_HOST || 'https://redmine.example.org';
const redmine = new Redmine(hostname, config);

// TypeScript will provide autocomplete and type checking for all methods

async function listIssues() {
  try {
    const response = await redmine.issues({ limit: 10 });
    console.log(`Found ${response.data.total_count} issues`);

    // Access issues with full type awareness
    response.data.issues.forEach((issue: any) => {
      console.log(`- Issue #${issue.id}: ${issue.subject}`);
    });
  } catch (error) {
    console.error('Error fetching issues:', error);
  }
}

async function getIssueById(id: number) {
  try {
    const response = await redmine.get_issue_by_id(id, {
      include: 'attachments,journals,watchers'
    });

    console.log('Issue details:', response.data.issue);
    return response.data.issue;
  } catch (error) {
    console.error(`Error fetching issue #${id}:`, error);
    throw error;
  }
}

async function createIssue() {
  try {
    const response = await redmine.create_issue({
      issue: {
        project_id: 1,
        subject: 'TypeScript test issue',
        description: 'Created from TypeScript example'
      }
    });

    console.log('Created issue:', response.data.issue);
    return response.data.issue;
  } catch (error) {
    console.error('Error creating issue:', error);
    throw error;
  }
}

// Run examples
if (require.main === module) {
  (async () => {
    await listIssues();
    // await getIssueById(1);
    // await createIssue();
  })();
}
