require('dotenv').config()
const PouchDB = require('pouchdb')
const db = new PouchDB(process.env.COUCHDB_URL) //+ process.env.COUCHDB_NAME)

//console.log(process.env.COUCHDB_URL)

const paintings = new PouchDB(process.env.COUCHDB_URL)

db
  .bulkDocs([
    {
      _id: 'painting_starry-night',
      name: 'The Starry Night',
      type: 'painting',
      movement: 'post-impressionism',
      artist: 'Vincent van Gogh',
      yearCreated: 1889,
      museum: { name: 'Museum of Modern Art', location: 'New York' }
    },
    {
      _id: 'painting_water-lilies-nympheas',
      name: 'Water Lilies Nympheas',
      type: 'painting',
      movement: 'impressionism',
      artist: 'Claude Monet',
      yearCreated: 1907,
      museum: { name: 'Art Gallery of Ontario', location: 'Toronto' }
    },
    {
      _id: 'painting_last supper',
      name: 'The Last Supper',
      type: 'painting',
      movement: 'Renaissance',
      artist: 'Leonardo da Vinci',
      yearCreated: 1495,
      museum: { name: 'Santa Maria delle Grazie', location: 'Milan' }
    },
    {
      _id: 'painting_sunday-afternoon-on-the-island-of-la-grande-jatte',
      name: 'A Sunday Afternoon on the Island of La Grande Jatte',
      type: 'painting',
      movement: 'impressionism',
      artist: 'Georges Seurat',
      yearCreated: 1884,
      museum: { name: 'Art Institute of Chicago', location: 'Chicago' }
    },
    {
      _id: 'painting_guernica',
      name: 'Guernica',
      type: 'painting',
      movement: 'surrealism',
      artist: 'Pablo Picasso',
      yearCreated: 1937,
      museum: {
        name: 'Museo Nacional Centro de Arte Reina Sofia',
        location: 'Madrid'
      }
    },
    {
      _id: 'painting_bal-du-moulin-de-la-galette',
      name: 'Bal du moulin de la Galette',
      type: 'painting',
      movement: 'impressionism',
      artist: 'Pierre-Auguste Renoires',
      yearCreated: 1876,
      museum: { name: "Musee d'Orsay", location: 'Paris' }
    },
    {
      _id: 'artist_vincent van gogh',
      artist: 'Vincent van Gogh',
      movement: 'post-impressionism'
    },
    {
      _id: 'artist_claude monet',
      artist: 'Claude Monet',
      movement: 'impressionism'
    },
    {
      _id: 'artist_leonardo da vinci',
      artist: 'Leonardo da Vinci',
      movement: 'Renaissance'
    },
    {
      _id: 'artist_georges seurat',
      artist: 'Georges Seurat',
      movement: 'impressionism'
    },
    {
      _id: 'artist_pablo picasso',
      artist: 'Pablo Picasso',
      movement: 'surrealism'
    },
    {
      _id: 'artist_pierre-auguste renoires',
      artist: 'Pierre-Auguste Renoires',
      movement: 'impressionism'
    }
  ])
  .then(result => console.log('bulkDocs success!', result))
  .catch(err => console.log('bulkDocs Error!', err))
