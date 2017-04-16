module.exports = {
  CONSTRUCTOR: {
    selfConf: {
      name: 'entry.store',
      logLevel: 'verbose',
      // front node
      seed: ['127.0.0.1:3000'],
      transport: [
        {type: 'HTTP', port: 4000}
      ]
    }
  }
}
