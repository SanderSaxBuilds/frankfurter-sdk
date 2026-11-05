
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { FrankfurterSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await FrankfurterSDK.test()
    equal(null !== testsdk, true)
  })

})
