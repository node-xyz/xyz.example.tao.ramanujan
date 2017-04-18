module.exports = {
  CONSTRUCTOR: {
    selfConf: {
      name: 'index.ms',
      logLevel: 'verbose',

      // front node
      seed: ['127.0.0.1:3000'],
      
      transport: [
        {type: 'HTTP', port: 6000}
      ]
    }
  }
}
