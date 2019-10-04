const {
  MongoClient
} = require('mongodb');
const assert = require('assert');

const url = 'mongodb://root:example@localhost:27017';

const dbName = 'feathers_mongoose_patch_issue';
const dbPassword = 'secret';

const connectionString = `${url}`;

MongoClient.connect(connectionString, (err, client) => {
  assert.equal(null, err);

  const db = client.db(dbName);

  db.addUser(dbName, dbPassword, {
    roles: [{
      role: 'dbAdmin',
      db: dbName,
    },
    {
      role: 'readWrite',
      db: dbName,
    }
    ],
  }, (secondErr) => {
    assert.equal(null, secondErr);
    client.close();
  });
});
