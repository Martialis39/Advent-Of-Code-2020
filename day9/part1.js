const path = require('path')
const { readFile } = require('../utilities');

const input = readFile(path.resolve(__dirname, 'input.txt'));

const getValidSums = (data, preambleLength, offset = 0) => {
    const validSums = data.slice(0 + offset, preambleLength + offset).reduce((acc, curr) => {
        // Loop over data again,
        // sum all parts of preamble with curr
        const sumsForCurrentNumber = data.slice(0 + offset, preambleLength + offset).reduce((a, c) => {
            // only odd pairs should make the sums
            if(+c !== +curr){
                a.push(+c + +curr)
            };
            return a;
        }, [])
        return acc.concat(sumsForCurrentNumber);
        
    }, [])

    return validSums
}

const solve = (input, preambleLength) => {
    const inputWithoutPreamble = input.slice(preambleLength);
    for (let offset = 0; offset < inputWithoutPreamble.length; offset++) {
        
        const validSums = getValidSums(input, preambleLength, offset);
        const parsedInput = Number(inputWithoutPreamble[offset].trim());
        if(validSums.indexOf(parsedInput) < 0){
            return parsedInput
        }
    }
}

const result = solve(input, 25);
console.log('DEBUG:: result is', result);