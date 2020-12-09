fs = require('fs')
path = require('path')

const readFile = (file, splitBy = new RegExp(/\n/)) => {
    
    return fs.readFileSync(file, 'utf8').split(splitBy);
};

exports.readFile = readFile; 