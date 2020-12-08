fs = require('fs')
fs.readFile('./input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  // Part 1

  const parsedInput = data.split(new RegExp(/\n\n/)) 
  const result = parsedInput.map(listOfAnswers => {
    const regex = /\n/gi;
    const parsed = listOfAnswers.replace(regex, '');   
    if(parsed === ''){
          return 0;
      } else {
          const answers = new Set(parsed.split(''))
          console.log(answers); 
          return answers.size
      }
  }).reduce((acc, curr) => acc + curr, 0)

  console.log(result);
});