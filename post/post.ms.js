const XYZ = require('xyz-core')
const CONSTANTS = require('./constants')
const udpTunnel = require('xyz-core/src/Bootstrap/udp.tunnel.bootstrap.js')
const bCastGlobal = require('xyz-core/src/Service/Middleware/service.broadcast.global.js')
const logger = require('xyz-core/src/Log/Logger')

let post = new XYZ(CONSTANTS.CONSTRUCTOR)
post.bootstrap(udpTunnel)

/**
 * @example
 * xyz > call 0 /post/entry '{"_id": "kian" ,"text":"foo" }'
 * note that that you should run entry.post/index.js with --xyz-seed 127.0.0.1:4500 to get a response
 */
post.register('/post/entry', (body, resposnse) => {
  // call entry/post

  post.call({
    servicePath: '/entry/save',
    payload: body
  }, (err, respBody) => {
    if (!err) {
      // braodcast global if success
      post.call({
        servicePath: 'info/entry',
        sendStrategy: bCastGlobal,
        payload: body
      })
    }

    // respond to original sender [front]
    resposnse.jsonify({err: err, body: respBody}, logger.info)
  })
})

console.log(post)
