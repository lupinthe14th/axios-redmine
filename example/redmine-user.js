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

const dumpUser = function (user) {
  console.log('Dumping user:')
  for (const item in user) {
    console.log('  ' + item + ': ' + JSON.stringify(user[item]))
  }
}

redmine
  .users({ status: 1 })
  .then(response => {
    for (const i in response.data.issues) {
      dumpUser(response.data.issues[i])
    }
    console.log('total_count: ', response.data.total_count)
  })
  .catch(err => {
    console.log(err)
  })

redmine
  .get_user_by_id(9, { include: 'memberships,groups' })
  .then(response => {
    dumpUser(response.data.user)
  })
  .catch(err => {
    console.log(err)
  })

redmine
  .current_user({ include: 'memberships,groups' })
  .then(response => {
    dumpUser(response.data.user)
  })
  .catch(err => {
    console.log(err)
  })

/*
var user = {
  user: {
    login: 'wayne1',
    firstname: 'zanran1',
    lastname: 'tianxiaxi1',
    mail: 'wayne@ctwushu1.com',
    password: 'password',
    status: '3'
  }
};
redmine.create_user(user, function(err, data) {
  if (err) throw err;

  console.log(data);
});

/*
var user = {
  user: {
    mail: 'wayne@zanran.me'
  }
};
redmine.update_user(5, user, function(err, data) {
  if (err) throw err;

  console.log(data);
});

redmine.delete_user('37', function(err, data) {
  if (err) {
    console.log(err);
    return ;
  } else {
    console.log('Delete user #1: ' + JSON.stringify(data));
  }
});
*/
