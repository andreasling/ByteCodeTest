"use strict";

var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var instructionSet = {
  Add: 0x00,
  Read: 0x01,
  Write: 0x02,
  Subtract: 0x03,
  Literal: 0x04
};

var interpret = function interpret(instructions, stack, callback) {

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
            stack.push(parseInt(input, 10));
            series(++ip);
          });
          break;

        case instructionSet.Write:
          console.log("output: %d", stack.pop());
          async(++ip, series);
          break;

        case instructionSet.Literal:
          stack.push(instructions[++ip]);
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

var compile = function compile(string) {

  var tokens = string.split(/\s+/);
  var instructions = [];

  tokens.forEach(function(token) {

    switch (token) {

      case "+":
        instructions.push(instructionSet.Add);
        break;

      case "-":
        instructions.push(instructionSet.Subtract);
        break;

      case "?":
        instructions.push(instructionSet.Read);
        break;

      case "=":
        instructions.push(instructionSet.Write);
        break;

      default:
        var value = parseInt(token, 10);
        if (!isNaN(value)) {
          instructions.push(instructionSet.Literal);
          instructions.push(value);
        } else {
          throw new Error("Invalid token: " + token);
        }
    }

  });

  return instructions;

};

var code = "1 2 + ? - =";

var stack = [];
var instructions = compile(code);

console.log("instructions:", instructions);
console.log("stack:", stack);

interpret(instructions, stack, function () {
  console.log("done executing.");
  console.log("stack:", stack); 
});

