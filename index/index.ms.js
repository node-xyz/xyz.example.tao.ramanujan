const XYZ = require('xyz-core')
const CONSTANTS = require('./constants')

const index = new XYZ(CONSTANTS.CONSTRUCTOR)

let cachedEntries = []
const MAX = 20 ;

index.register('/search/query', (data, response) => {
  let query = data.query
  let matches = []
  for ( let e of cachedEntries ) {
    if ( e.text.match(new RegExp(query) )) {
      matches.push(e)
    }
  }

  response.jsonify(matches)

})

index.register('/info/entry', (data, response) => {
  cachedEntries.push(data)
  if ( cachedEntries.length > MAX ) {
    cachedEntries.shift()
  }
})
