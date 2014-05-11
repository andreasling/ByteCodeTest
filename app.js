"use strict";

var interpret = function interpret(instructions, stack, callback) {

  var instructionSet = {
    Add: 0x00
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

        default:
          throw new Error("Invalid bytecode " + instruction + " at " + i + ".");
      };

    } else {

      callback();

    }

  }

  series(0);
  
};

var stack = [1,2];
var instructions = [0x00];

console.log("instructions:", instructions);
console.log("stack:", stack);

interpret(instructions, stack, function () {
  console.log("stack:", stack); 
});

