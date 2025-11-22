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

/**
 * Example 1: List issues with pagination
 */
async function listIssues(limit = 10): Promise<void> {
  try {
    const response = await redmine.issues({ limit });
    console.log(`Found ${response.data.total_count} issues`);

    // Access issues with full type awareness
    response.data.issues.forEach((issue: any) => {
      console.log(`- Issue #${issue.id}: ${issue.subject}`);
    });
  } catch (error) {
    console.error('Error fetching issues:', error);
  }
}

/**
 * Example 2: Get a specific issue by ID with related data
 */
async function getIssueById(id: number): Promise<any> {
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

/**
 * Example 3: Create a new issue
 */
async function createIssue(projectId: number, subject: string, description: string): Promise<any> {
  try {
    const response = await redmine.create_issue({
      issue: {
        project_id: projectId,
        subject: subject,
        description: description,
        priority_id: 2 // Normal priority
      }
    });

    console.log('Created issue:', response.data.issue);
    return response.data.issue;
  } catch (error) {
    console.error('Error creating issue:', error);
    throw error;
  }
}

/**
 * Example 4: Update an existing issue
 */
async function updateIssue(id: number, updates: any): Promise<void> {
  try {
    const response = await redmine.update_issue(id, {
      issue: updates
    });

    console.log(`Issue #${id} updated successfully`);
  } catch (error) {
    console.error(`Error updating issue #${id}:`, error);
    throw error;
  }
}

/**
 * Example 5: Working with projects
 */
async function listProjects(): Promise<void> {
  try {
    const response = await redmine.projects({ limit: 5 });
    console.log('Projects:');
    response.data.projects.forEach((project: any) => {
      console.log(`- ${project.name} (${project.identifier})`);
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
}

/**
 * Example 6: Complete workflow - Create, update, and query issue
 */
async function completeWorkflow(): Promise<void> {
  try {
    // Step 1: Create a new issue
    console.log('\n=== Step 1: Creating issue ===');
    const newIssue = await createIssue(
      1,
      'TypeScript integration test',
      'Testing axios-redmine with TypeScript'
    );
    const issueId = newIssue.id;

    // Step 2: Get the created issue
    console.log('\n=== Step 2: Fetching created issue ===');
    await getIssueById(issueId);

    // Step 3: Update the issue
    console.log('\n=== Step 3: Updating issue ===');
    await updateIssue(issueId, {
      status_id: 2, // In Progress
      notes: 'Updated via TypeScript example'
    });

    // Step 4: List all recent issues
    console.log('\n=== Step 4: Listing recent issues ===');
    await listIssues(5);

  } catch (error) {
    console.error('Workflow error:', error);
  }
}

// Main execution
if (require.main === module) {
  (async () => {
    console.log('=== axios-redmine TypeScript Examples ===\n');

    // Run individual examples
    console.log('--- Example 1: List Issues ---');
    await listIssues(3);

    console.log('\n--- Example 2: List Projects ---');
    await listProjects();

    // Uncomment to run the complete workflow
    // This will create, update, and query issues
    // console.log('\n--- Complete Workflow ---');
    // await completeWorkflow();

    console.log('\n=== Examples completed ===');
  })();
}

// Export functions for use in other modules
export {
  listIssues,
  getIssueById,
  createIssue,
  updateIssue,
  listProjects,
  completeWorkflow
};
