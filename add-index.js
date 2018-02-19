//ONLY IF NECESSARY TO CREATE INDEX
require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
PouchDB.plugin(require('pouchdb-find'))
const db = new PouchDB(process.env.COUCHDB_URL)

//I COMMENTED OUT ALL OF THE CREATEINDEX() THEN FIND() BC ROO CRASHING WHEN I PUT IN CREATEINDEX
db
  .find({
    selector: {
      type: 'painting',
      fields: [
        '_id',
        '_rev',
        'name',
        'type',
        'movement',
        'artist',
        'yearCreated',
        'museum'
      ],
      sort: ['name'],
      limit: 5
    }
  })
  .then(result => console.log(result))
