/*
 * get-redmine-issue - test request for issues
 * Author: wayne <wayne@zanran.me>
 */

'use strict()'

const Redmine = require('../lib/redmine')

/// ////////////////////////////////////////////////////////////
const hostname = process.env.REDMINE_HOST || 'redmine.zanran.me'
const config = {
  apiKey: process.env.REDMINE_APIKEY || 'bed1ba0544b681e530c2447341607f423c9c8781',
  format: 'json'
}

const redmine = new Redmine(hostname, config)

// -----------------------------------------------------------------------------
const dumpObj = function (obj) {
  for (const item in obj) {
    console.log('  ' + item + ': ' + JSON.stringify(obj[item]))
  }
}

redmine.wiki_by_project_id(1, function (err, data) {
  if (err) throw err

  for (const i in data.wiki_pages) { dumpObj(data.wiki_pages[i]) }
})

/*
redmine.wiki_by_title(1, 'Hello_world', {include: 'attachments'}, function(err, data) {
  if (err) throw err;

  dump_obj(data.wiki_page);
});

redmine.wiki_history_by_title(1, 'Hello_world', 1, {include: 'attachments'}, function(err, data) {
  if (err) throw err;

  dump_obj(data.wiki_page);
});

redmine.delete_wiki(1, 'Hello_world', function(err, data) {
  if (err) throw err;

  dump_obj(data);
});
*/

// create Wiki
const wiki = {
  wiki_page: {
    text: 'node js test redmine rest api',
    comment: 'nodejs'
  }
}

redmine.ceate_wiki('vw-mib3', 'rest-api-wiki-2', wiki, function (err, data) {
  if (err) throw err

  dumpObj(data)
})
