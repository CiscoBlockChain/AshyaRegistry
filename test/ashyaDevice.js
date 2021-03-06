var AshyaDevice = artifacts.require("AshyaDevice");
var AshyaRegistry = artifacts.require("AshyaRegistry");

contract(AshyaDevice, function(accounts) {

  /* from: https://ethereum.stackexchange.com/questions/38756/how-to-test-contract-functions-with-onlyowner-modifier */
  let instance
  let owner = accounts[0]
  let otherAccount = accounts[1]


  beforeEach(async () => {
    device = await AshyaDevice.deployed()
    registry = await AshyaRegistry.deployed()
  })


  it("should register the device", async () => {
    try {
      //let result = await device.registerDevice.call({from: owner, value: web3.toWei(0.001, "ether")})
      let rAddr = registry.address;
      let result = await device.registerDevice(rAddr, {from: owner, value: 100000000000000000, gas: 4712388, gasPrice: 100000000000})
      console.log(result)
    } catch (e) {
      assert.fail(null, null, `${e}`)
    }
  })

  it("get item count", async () => {
    try {
      // d.then(i => i.getURLCount())
      let result = await registry.getItemCount({from: otherAccount})
      console.log(result)
    } catch (e) {
      console.log('failed')
      assert.fail(null, null, `${e}`)
    }
  })
  it("should return item", async () => {
    try {
      //d.then(i => i.addURL("https://benincosa.com", { value: 1000000000000000, from: accounts[3], gas: 4712388, gasPrice: 100000000000 }))
      //let result = await device.registerDevice.call({from: owner, value: web3.toWei(0.001, "ether")})
      let rAddr = device.address;
      let result = await registry.getItem(rAddr,{from: owner})
      console.log(result)
    } catch (e) {
      console.log('failed')
      assert.fail(null, null, `${e}`)
    }
  })

  it("should not allow non owners register the device", async () => {
    try {
      //let result = await device.registerDevice.call({from: owner, value: web3.toWei(0.001, "ether")})
      let rAddr = registry.address;
      let result = await device.registerDevice(rAddr, {from: otherAccount, value: 100000000000000000, gas: 4712388, gasPrice: 100000000000})
      assert.fail(null, null, `${e}`)
    } catch (e) {
      console.log('failed as expected')
    }
  })

  it("should add a new Url", async () => {
    try {
      //d.then(i => i.addURL("https://benincosa.com", { value: 1000000000000000, from: accounts[3], gas: 4712388, gasPrice: 100000000000 }))
      //let result = await device.registerDevice.call({from: owner, value: web3.toWei(0.001, "ether")})
      let i = "https://sanaIOT.com";
      let result = await device.addURL(i, {from: otherAccount, value: 100000000000000000, gas: 4712388, gasPrice: 100000000000})
      console.log(result)
      //console.log(result.toString())
      //assert.equal(result.toString(), owner)
    } catch (e) {
      console.log('failed')
      assert.fail(null, null, `${e}`)
    }
  })

  it("get URL count", async () => {
    try {
      // d.then(i => i.getURLCount())
      let result = await device.getURLCount({from: otherAccount})
      console.log(result)
    } catch (e) {
      console.log('failed')
      assert.fail(null, null, `${e}`)
    }
  })

  it("returning Item at specified index", async () => {
    try {
      //d.then(i => i.addURL("https://benincosa.com", { value: 1000000000000000, from: accounts[3], gas: 4712388, gasPrice: 100000000000 }))
      //let result = await device.registerDevice.call({from: owner, value: web3.toWei(0.001, "ether")})
      let i = 0;
      let result = await registry.getItem(i,{from: otherAccount})
      console.log(result)
    } catch (e) {
      console.log('failed')
      assert.fail(null, null, `${e}`)
    }
  })

  it("should remove a device", async () => {
    try {
      //d.then(i => i.addURL("https://benincosa.com", { value: 1000000000000000, from: accounts[3], gas: 4712388, gasPrice: 100000000000 }))
      //let result = await device.registerDevice.call({from: owner, value: web3.toWei(0.001, "ether")})
      let daddr = otherAccount;
      let result = await registry.removeItem(daddr,{from: otherAccount})
      console.log(result)

    } catch (e) {
      console.log('failed')
      assert.fail(null, null, `${e}`)
    }

  })

})
