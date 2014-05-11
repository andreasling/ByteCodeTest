"use strict";

var interpret = function interpret(instructions, stack) {

  var instructionSet = {
    Add: 0x00,
  };

  instructions.forEach(function(instruction, i) {

    switch(instruction) {

      case instructionSet.Add:
        stack.push(stack.pop() + stack.pop());
        break;

      default:
        throw new Error("Invalid bytecode " + instruction + " at " + i + ".");
    };
  });

};

var stack = [1,2];
var instructions = [0x00];

console.log("instructions:", instructions);
console.log("stack:", stack);

interpret(instructions, stack);

console.log("stack:", stack);
