require('dotenv').config()
const express = require('express')
const app = express()
const HTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const {
  isEmpty,
  join,
  prop,
  head,
  last,
  split,
  filter,
  pathOr,
  not,
  propOr
} = require('ramda')
app.use(bodyParser.json())
////////////////////////////////////////////////////////////////////////
//
//         BRING IN CONSTS FROM OTHER FILES & CREATE CONSTS FOR API ALONE
//
////////////////////////////////////////////////////////////////////////
const {
  allDocs,
  findDocs,
  addPainting,
  getPainting,
  deletePainting,
  updatePainting,
  listPaintings,
  limitPaintings,
  addArtist,
  getArtist,
  deleteArtist,
  updateArtist,
  listArtists
} = require('./dal')
const port = propOr(9999, 'PORT', process.env)
const errNextr = next => err =>
  next(new HTTPError(err.status, err.message, err))
const objClean = require('./lib/clean-obj')
const reqFieldChecker = require('./lib/check-req-fields')
const docFilter = require('./lib/search-filter')
const paintingRequiredFieldChecker = reqFieldChecker([
  'name',
  'movement',
  'artist',
  'yearCreated',
  'museum'
])
const artistRequiredFieldChecker = reqFieldChecker([
  'movement',
  'artist',
  'type'
])
const putPaintingRequiredFieldChecker = reqFieldChecker([
  '_id',
  '_rev',
  'name',
  'movement',
  'artist',
  'yearCreated',
  'museum',
  'type'
])
const putArtistRequiredFieldChecker = reqFieldChecker([
  '_id',
  '_rev',
  'movement',
  'artist',
  'type'
])
////////////////////////////////////////////////////////////////////////
//
//                      GET TO THE PORT
//
////////////////////////////////////////////////////////////////////////
app.get('/', function(req, res, next) {
  res.send('Welcome to the Art API. Manage all the paintings for much win.')
})
////////////////////////////////////////////////////////////////////////
//
//                      SEE ALL DOCS
//
////////////////////////////////////////////////////////////////////////
app.get('/paintings', (req, res, next) => {
  listPaintings({ include_docs: true }).then(artists =>
    res.send(artists).catch(err => next(new HTTPError()))
  )
})
////////////////////////////////////////////////////////////////////////
//
//                      CREATE A PAINTING
//
////////////////////////////////////////////////////////////////////////
app.post('/paintings', function(req, res, next) {
  const missingfields = paintingRequiredFieldChecker(req.body)
  if (not(isEmpty(missingfields))) {
    next(new HTTPError(err.status, err.message, err))
  }
  addPainting(req.body)
    .then(addedPaintingResult => res.status(201).send(addedPaintingResult))
    .catch(errNextr(next))
})
////////////////////////////////////////////////////////////////////////
//
//                      CREATE AN ARTIST
//
////////////////////////////////////////////////////////////////////////
app.post('/artists', function(req, res, next) {
  const missingfields = paintingRequiredFieldChecker(req.body)
  if (not(isEmpty(missingfields))) {
    next(errNextr(next))
  }
  addArtist(req.body)
    .then(addedPaintingResult => res.status(201).send(addedPaintingResult))
    .catch(errNextr(next))
})
////////////////////////////////////////////////////////////////////////
//
//                      RETRIEVE A PAINTING
//
////////////////////////////////////////////////////////////////////////
app.get('/paintings/{id}', (req, res, next) =>
  getPainting(req.params.id)
    .then(painting => res.send(painting))
    .catch(errNextr(next))
)
////////////////////////////////////////////////////////////////////////
//
//                      UPDATE A PAINTING
//
////////////////////////////////////////////////////////////////////////
app.put('/paintings/{id}', (req, res, next) => {
  const bodyCleaner = objClean(
    '_id',
    '_rev',
    'name',
    'movement',
    'artist',
    'yearCreated',
    'museum',
    'type'
  )
  const readyPainting = bodyCleaner(req.body)
  const cleanPainting = putPaintingRequiredFieldChecker(readyPainting)
  isEmpty(cleanPainting)
    ? updatePainting(req.body)
    : console.log('property fields do not match')
  updatePainting(req.body)
    .then(updatedResult => res.send(updatedResult))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})
////////////////////////////////////////////////////////////////////////
//
//                     DELETE A PAINTING
//
////////////////////////////////////////////////////////////////////////
app.delete('/paintings/{id}', (req, res, next) =>
  deletePainting(req.params.id)
    .then(deletedResult => res.send(deletedResult))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
)
//////////////////////////////////////////////////////////////////////
//
//                    LIST LIMIT  5 PAINTINGS
//
//////////////////////////////////////////////////////////////////////
app.get('/paintings', (req, res, next) => {
  limitPaintings({
    include_docs: true,
    startkey: 'painting_',
    endkey: 'painting_\ufff0',
    limit: 5
  })
    .then(paintings => res.send(paintings))
    .catch(err => errNextr(next))
})

//////////////////////////////////////////////////////////////////////
//
//                    FILTER PAINTINGS BY NAME & LIMIT TO 5
//
//////////////////////////////////////////////////////////////////////
app.get('/paintings', (req, res, next) => {
  const filter = pathOr(null, ['query', 'filter'], req)

  limitPaintings(
    {
      include_docs: true,
      startkey: 'painting_',
      endkey: 'painting_\ufff0',
      limit: 5
    },
    filter
  )
    .then(paintings => res.send(paintings))
    .catch(err => errNextr(next))
})
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//             SWITCHING TO ARTIST CRUB BELOW
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
//
//                      CREATE AN ARTIST
//
////////////////////////////////////////////////////////////////////////
app.post('/artists', function(req, res, next) {
  const missingfields = artistRequiredFieldChecker(req.body)
  if (not(isEmpty(missingfields))) {
    next(new HTTPError(err.status, err.message, err))
  }
  addArtist(req.body)
    .then(addedArtistResult => res.status(201).send(addedPaintingResult))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})
////////////////////////////////////////////////////////////////////////
//
//                      RETRIEVE AN ARTIST
//
////////////////////////////////////////////////////////////////////////
app.get('/artists/{id}', (req, res, next) =>
  getArtist(req.params.id)
    .then(artist => res.send(artist))
    .catch(errNextr(next))
)
////////////////////////////////////////////////////////////////////////
//
//                      UPDATE AN ARTIST
//
////////////////////////////////////////////////////////////////////////
app.put('/artists/{id}', (req, res, next) => {
  const bodyCleaner = objClean('_id', '_rev', 'movement', 'artist', 'type')
  const readyArtist = bodyCleaner(req.body)
  const cleanArtist = putArtistRequiredFieldChecker(readyArtist)
  isEmpty(cleanArtist)
    ? updateArtist(req.body)
    : console.log('property fields do not match')
  updatePainting(req.body)
    .then(updatedResult => res.send(updatedResult))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})
////////////////////////////////////////////////////////////////////////
//
//                     DELETE AN ARTIST
//
////////////////////////////////////////////////////////////////////////
app.delete('/artists/{id}', (req, res, next) =>
  deleteArtist(req.params.id)
    .then(deletedResult => res.send(deletedResult))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
)
////////////////////////////////////////////////////////////////////////
//
//                     SEE ALL ARTISTS
//
////////////////////////////////////////////////////////////////////////
app.get('/artists', (req, res, next) => {
  listArtists({ include_docs: true }).then(artists =>
    res.send(artists).catch(err => next(new HTTPError()))
  )
})
///////////////////////////////////////////////////////////////////////
//
//                      ERROR HANDLER
//
///////////////////////////////////////////////////////////////////////
app.use((err, req, res, next) => {
  console.log('ERROR', err)
  res.status(err.status).send(err.message)
})
///////////////////////////////////////////////////////////////////////
//
//                      TURN ON THE PORT
//
///////////////////////////////////////////////////////////////////////
if (!module.parent) {
  app.listen(process.env.PORT || 4000, () =>
    console.log('PAINTINGS!', process.env.PORT || 4000)
  )
}

module.exports = app
