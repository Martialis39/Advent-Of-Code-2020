
const parseInstruction = instruction => {
  const [operation, argument] = instruction.split(' ');
  return { operation, argument: Number(argument)}
}

const runProgram = (instructions, instructionIndex, encounteredInstructions = [], acc = 0) => {
  // Base case is if nextInstruction has already been ran
  if(encounteredInstructions.indexOf(instructionIndex) > -1){
    return acc;
  }
  usedInstructions.push(instructions[instructionIndex])
  const {operation, argument} = parseInstruction(instructions[instructionIndex]);
  encounteredInstructions.push(instructionIndex);
  switch (operation) {
    case 'nop':
        return runProgram(instructions, instructionIndex + 1, encounteredInstructions, acc)
    case 'acc':
        return runProgram(instructions, instructionIndex + 1, encounteredInstructions, acc + argument)
    case 'jmp':
      let nextInstruction = instructionIndex + argument
      
      if(nextInstruction < 0){
        nextInstruction = instructions.length - nextInstruction;
      }
      if(nextInstruction >= instructions.length){
        nextInstruction = nextInstruction - instructions.length;
      }
      return runProgram(instructions, nextInstruction, encounteredInstructions, acc)
  }
}


// Part 2 

const runProgramPartTwo = (instructions, instructionIndex, encounteredInstructions = [], acc = 0) => {
  // Base case is if we are at the end
  if(instructionIndex === instructions.length - 1){
    return {result: true, acc};
  }
  // Base case is if nextInstruction has already been ran
  if(encounteredInstructions.indexOf(instructionIndex) > -1){
    return false
  }
  usedInstructions.push(instructions[instructionIndex])
  const {operation, argument} = parseInstruction(instructions[instructionIndex]);
  encounteredInstructions.push(instructionIndex);
  switch (operation) {
    case 'nop':
        return runProgramPartTwo(instructions, instructionIndex + 1, encounteredInstructions, acc)
    case 'acc':
        return runProgramPartTwo(instructions, instructionIndex + 1, encounteredInstructions, acc + argument)
    case 'jmp':
      let nextInstruction = instructionIndex + argument
      
      if(nextInstruction < 0){
        nextInstruction = instructions.length - nextInstruction;
      }
      if(nextInstruction >= instructions.length){
        nextInstruction = nextInstruction - instructions.length;
      }
      return runProgramPartTwo(instructions, nextInstruction, encounteredInstructions, acc)
  }
}

const checkAllPermutations = (instructions) => {
  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    const copyOfInstructions = instructions.slice();
    const {operation, argument} = parseInstruction(instruction);
    if(operation === 'nop'){
      // Check if changing this to jmp fixes the program.
      copyOfInstructions[i] = `jmp ${argument}`;
      const result = runProgramPartTwo(copyOfInstructions, 0);
      if(result){
        return result;
      }
    } else if (operation === 'jmp'){
      // Check if changing this to nop fixes the program.
      copyOfInstructions[i] = `nop ${argument}`;
      const result = runProgramPartTwo(copyOfInstructions, 0)
      if(result){
        return result;
      }
    }

  }
}



fs = require('fs')
fs.readFile('./day8/input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  const parsedInput = data.split(new RegExp(/\n/)) 
  
  console.log('DEBUG:: check  is', checkAllPermutations(parsedInput));
});
