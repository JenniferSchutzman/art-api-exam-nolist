// const { pathOr, filter, head, split, last } = require('ramda')
//
// module.exports = docFilter
//
// function docFilter(req, res) {
//   var filterFn = null
//   //this pathOr line is checking to make sure the URL filter reqeuest
//   if (pathOr(null, ['query', 'searchFilter'], req)) {
//     const filterProp = head(split(':', req.query.searchFilter)) //this will return a prop such as isOrganic
//     const filterValue = last(split(':', req.query.searchFilter)) //this will return the value such as true
//     //this below functions takes in the filter prop with [] because we a string we cannot use . notation
//     filterFn = docs =>
//       res.status(200).send(filter(doc => doc[filterProp] == filterValue, docs))
//   } else {
//     filterFn = docs => res.status(200).send(docs)
//   }
//   return filterFn
// }
