const {value1 :a, value2: b} = require("./file1.js");

const add = require("./utils.js/add.js")

console.log(a, b);

console.log("Addition result: ",add(a, b));