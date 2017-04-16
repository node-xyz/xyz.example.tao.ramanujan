module.exports = {
  CONSTRUCTOR: {
    selfConf: {
      name: 'post',
      logLevel: 'verbose',
      // front node
      seed: ['127.0.0.1:3000'],
      transport: [
        {type: 'HTTP', port: 4500}
      ]
    }
  }
}
