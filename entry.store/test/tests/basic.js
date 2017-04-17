const xyzTest = require('xyz-cli')
const expect = require('chai').expect

let processes
let identifiers
let TESTER

before(function(done) {
  this.timeout(10 * 1000)

  xyzTest.setUpTestEnv((p) => {

    processes = p
    identifiers = Object.keys(processes)

    TESTER = xyzTest.getTester()

    // wait for all nodes to find each other
    setTimeout(done, 8 * 1000)
  })
})

it('save', function(done){
  // sae something to db
  TESTER.call({
    servicePath: '/entry/save',
    payload: {_id: 'xyz-tester', text: 'a message from tester'}
  }, (err, data) => {
    // no error should happen
    expect(err).to.equal(null)
    done()
  })
})

it('list', function(done){
  // get a list of all entries
  TESTER.call({
    servicePath: '/entry/list',
    payload: {_id: 'xyz-tester'}
  }, (err , data) => {
    // a list of entries should return
    console.log(err, data);
    expect(typeof(data)).to.equal('object')
    done()
  })
})
