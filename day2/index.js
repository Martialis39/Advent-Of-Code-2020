const data = require("./data.json");

const parseString = (str) => {
  const [limits, char, password] = str.split(/:? /gm);
  const [min, max] = limits.split("-");
  return {
    min,
    max,
    char,
    password,
  };
};

// Part 1
const filterValidPasswords = ({ min, max, char, password }) => {
  const occurrences = (password.match(new RegExp(char, "g")) || []).length;
  return occurrences <= Number(max) && occurrences >= Number(min);
};

// Part 2

const newFilterValidPasswords = ({ min, max, char, password }) => {
  // Account for 1-index!
  const charAtMin = password[Number(min - 1)] === char;
  const charAtMax = password[Number(max - 1)] === char;
  const shouldReturn = !(
    (charAtMin && charAtMax) ||
    (!charAtMin && !charAtMax)
  );
  return shouldReturn;
};

var partOne = data.input.map(parseString).filter(filterValidPasswords);

var result = data.input.map(parseString).filter(newFilterValidPasswords);
console.log('DEBUG:: partOne is', partOne);
console.log(result.length);
