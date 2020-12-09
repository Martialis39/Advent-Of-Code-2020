const path = require('path')
const { readFile } = require('../utilities');

const input = readFile(path.resolve(__dirname, 'input.txt'));

const invalidNumber = 507622668;

const solve = (input, invalidNumber = 507622668) => {
    let buildTheSum = 0;
    let resultingRange = [];
    let result;
    input.forEach((_, index) => {
        
        for (let i = index; i < input.length; i++) {
            if(!result){
                const parsed = Number(input[i].trim());
                buildTheSum += parsed;
                resultingRange.push(parsed);
                // Gotta make sure there are at least 2 numbers in the range
                if(buildTheSum === invalidNumber && resultingRange.length >= 2){
                    result = Math.min(...resultingRange) + Math.max(...resultingRange)      

                } else if (buildTheSum > invalidNumber){
                    buildTheSum = 0;
                    resultingRange = [];
                }
            }
        }
    });
    return result;
}

const result = solve(input, invalidNumber);

console.log('DEBUG:: result is', result);