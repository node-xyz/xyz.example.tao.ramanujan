const XYZ = require('xyz-core')
const CONSTANTS = require('./constants')
const redis = require('redis')
const redisClient = redis.createClient()

let entryStore = new XYZ(CONSTANTS.CONSTRUCTOR)

/**
 * @example call 0 /entry/list
 */
entryStore.register('/entry/list', (body, response) => {
  let _id = body._id

  redisClient.get(_id, (err, reply) => {
    if (err) throw err
    response.jsonify(JSON.parse(reply))
  })
})

/**
 * Save a new entry
 * @example
 * xyz > single entry.store/index.js
 * xyz > call 0 /entry/list '{"_id": "kian" ,"text":"foo" }'
 */
entryStore.register('/entry/save', (body, response) => {
  let _id = body._id
  let text = body.text

  // check if the user has any entries
  redisClient.get(_id, (err, reply) => {
    if (err) throw err

    // create a redis store if not
    if (reply === null) {
      redisClient.set(_id, JSON.stringify([{text: text, _id: _id}]))
    }

    // fetch and append if yes
    else {
      let entries = JSON.parse(reply)
      entries.push({text: text, _id: _id})
      redisClient.set(_id, JSON.stringify(entries), redis.log)
    }

    // send confirmation to sender
    response.jsonify('saved')
  })
})

// console.log(entryStore)
