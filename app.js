"use strict";

var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var interpret = function interpret(instructions, stack, callback) {

  var instructionSet = {
    Add: 0x00,
    Read: 0x01,
    Write: 0x02,
    Subtract: 0x03
  };

  function async(arg, callback) {
    setTimeout(callback(arg), 0);
  }

  function series(ip) {

    if (ip < instructions.length) {

      var instruction = instructions[ip];

      switch(instruction) {

        case instructionSet.Add:
          stack.push(stack.pop() + stack.pop());
          async(++ip, series);
          break;

        case instructionSet.Subtract:
          stack.push(stack.pop() - stack.pop());
          async(++ip, series);
          break;

        case instructionSet.Read:
          rl.question("input: ", function(input) {
            stack.push(parseInt(input));
            series(++ip);
          });
          break;

        case instructionSet.Write:
          console.log("output: %d", stack.pop());
          async(++ip, series);
          break;

        default:
          throw new Error("Invalid bytecode " + instruction + " at " + i + ".");
      };

    } else {

      rl.close();

      callback();

    }

  }

  series(0);

};

var stack = [];
var instructions = [0x01, 0x01, 0x00, 0x02];

console.log("instructions:", instructions);
console.log("stack:", stack);

interpret(instructions, stack, function () {
  console.log("done executing.");
  console.log("stack:", stack); 
});

