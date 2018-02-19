const { filter, head, last, pathOr, split } = require('ramda')

function docFilter(req, res) {
  var filterFn = null
  if (pathOr(null, ['query', 'q'], req)) {
    const filterProp = head(split(':', req.query.q)) // age
    const filterValue = last(split(':', req.query.q)) // 65
    filterFn = docs =>
      res.status(200).send(filter(doc => doc[filterProp] == filterValue, docs))
  } else {
    filterFn = docs => res.status(200).send(docs)
  }
  return filterFn
}

module.exports = docFilter
