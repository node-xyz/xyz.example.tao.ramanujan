const express = require('express')
const XYZ = require('xyz-core')
const CONSTANTS = require('./constants')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const client = new XYZ(CONSTANTS.CONSTRUCTOR)

app.post('/post', (req, resp) => {
  client.call({
    servicePath: req.body.servicePath,
    payload: req.body.payload
  }, (err, body) => {
    if (err) {
      resp.status(500).json({err: err})
    } else {
      resp.json({body: body})
    }
  })
})

app.listen(client.id().port + 1, (e) => {
  console.log(`express app listening on port ${client.id().port + 1}`)
})
