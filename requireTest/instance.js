const MyClass = require('./myClass');

const mc = new MyClass();

const doSomething = function() {
  mc.myVar1 ++;
  mc.myVar2 --;
}

const printMC =function() {
  console.log(mc.myVar1, mc.myVar2);
}

module.exports = {
  doSomething: doSomething,
  printMC: printMC
}