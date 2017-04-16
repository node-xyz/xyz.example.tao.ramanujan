module.exports = {
  CONSTRUCTOR: {
    selfConf: {
      name: 'front.ms',
      logLevel: 'verbose',
      // front node
      seed: ['127.0.0.1:3000'],
      transport: [
        {type: 'HTTP', port: 5000}
      ]
    }
  }
}
