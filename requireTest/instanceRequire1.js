const instance = require('./instance');

const ins1 =function() {
  console.log("Ins1")
  instance.doSomething()

  instance.printMC();
}

module.exports = {
  ins1: ins1
}