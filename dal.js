//////////////////////////////////////////////////////////////
//
//                BRING IN THE DEPENDENCIES
//
////////////////////////////////////////////////////////////
require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
const HTTPError = require('node-http-error')
const { pluck, split, head, last, compose, filter } = require('ramda')
const db = new PouchDB(process.env.COUCHDB_URL)
const slugify = require('slugify')
//console.log(process.env)
/////////////////////////////////////////////////////////////////
//
//          CONSTS TO BE SENT TO THE API FOR THE PAINTING IDS
//
/////////////////////////////////////////////////////////////////
// ALL DOCS
const allDocs = options =>
  db.allDocs(options).then(docs => pluck('doc', docs.rows))
//SEE ALL PAINTINGS
const allPaintings = options =>
  db.allDocs(options).then(response => pluck('doc', response.rows))
//GET A PAINTING
const getPainting = id => db.get(id)
//ADD/CREATE PAINTING
const addPainting = doc => {
  doc._id = `painting_${slugify(doc.name)}`
  doc.type = 'painting'
  return addDoc(doc)
}
const addDoc = doc => db.put(doc)
//UPDATE A PAINTING
const updatePainting = painting => db.put(painting)
//DELETE A PAINTING
const deletePainting = id => db.get(id).then(painting => db.remove(painting))
//LIST LIMIT 5 PAINTINGS
const limitPaintings = options => db.allDocs(options)
//FILTER PAINTINGS
const findDocs = query => db.find(query).then(result => result.docs)
const listPaintings = (options, filterPainting) => {
  if (filterPainting) {
    const filterProp = head(split(':', req.query.filterPainting))
    const filterValue = last(split(':', req.query.filterPainting))
    const filterDocs = compose(
      filter(doc => doc[filterProp] === filterValue),
      pluck('doc')
    )
    return db.allDocs(options).then(response => filterDocs(response.rows))
  } else {
    return db.allDocs(options).then(response => pluck('doc', response.rows))
  }
}
/////////////////////////////////////////////////////////////////
//
//          CONSTS TO BE SENT TO THE API FOR THE ARTIST IDS
//
/////////////////////////////////////////////////////////////////
//GET A ARTIST
const getArtist = id => db.get(id)
//ADD/CREATE AN ARTIST
const addArtist = doc => {
  doc._id = `artist_${slugify(doc.name)}`
  doc.type = 'painting'
  return addDoc(doc)
}
//UPDATE AN ARTIST
const updateArtist = artist => db.put(artist)
//DELETE A ARTIST
const deleteArtist = id => db.get(id).then(artist => db.remove(artist))
//LIST AN ARTIST
const listArtists = options =>
  db.allDocs(options).then(response => pluck('doc', response.rows))

/////////////////////////////////////////////////////////////////
//
//          EXPORT THE CONSTS
//
/////////////////////////////////////////////////////////////////

module.exports = {
  allDocs,
  allPaintings,
  findDocs,
  addPainting,
  getPainting,
  deletePainting,
  updatePainting,
  listPaintings,
  addArtist,
  getArtist,
  deleteArtist,
  updateArtist,
  listArtists,
  limitPaintings
}
