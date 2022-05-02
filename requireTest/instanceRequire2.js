const instance = require('./instance');

const ins2 = function() {
  console.log("Ins2")
  instance.doSomething()

  instance.printMC();
}

module.exports = {
  ins2:ins2
}