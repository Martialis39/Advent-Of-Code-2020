const { input } = require("./data.json");

const fields = [
  { label: "byr", required: true },
  { label: "iyr", required: true },
  { label: "eyr", required: true },
  { label: "hgt", required: true },
  { label: "hcl", required: true },
  { label: "ecl", required: true },
  { label: "pid", required: true },
  { label: "cid", required: false },
];

const validityConstraints = (input) => {
  const label = Object.keys(input)[0];
  const value = input[label];

  switch (label) {
    case "byr":
      // byr (Birth Year) - four digits; at least 1920 and at most 2002.
      return value.length === 4 && 1920 <= Number(value) <= 2002;
    case "iyr":
      // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
      return value.length === 4 && 2010 <= Number(value) <= 2020;
    case "eyr":
      // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
      return value.length === 4 && 2020 <= Number(value) <= 2030;
    case "hgt":
      // hgt (Height) - a number followed by either cm or in:
      //  - If cm, the number must be at least 150 and at most 193.
      //  - If in, the number must be at least 59 and at most 76.
      let val, unit
      if (value.length === 5){
        [val, unit] = [value.slice(0, 3), value.slice(3)];
      } else if(value.length === 4) {
        [val, unit] = [value.slice(0, 2), value.slice(2)];
      } else {
        return false;
      }
      if (unit !== "cm" && unit !== "in") {
        return false;
      }
      if (unit === "cm") {
        return 150 <= Number(val) <= 193;
      } else {
        return 59 <= Number(val) <= 76;
      }
    case "hcl":
      // Hair Color) - a # followed by exactly six characters 0-9 or a-f.

      const check = value.length === 7 && value.match(/#[0-9A-Fa-f]{6}/gm)
      return check ? true : false;
    case "ecl":
      console.log(value)
      const chec = (
        ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].indexOf(value) > -1
      )

      return chec;
    // Eye Color) - exactly one of: amb blu brn gry grn hzl oth.

    case "pid":
      
      const pid = value.length === 9 && value.match(/([0-9]{9})/gm)
      return pid ? true : false;
    // Passport ID) - a nine-digit number, including leading zeroes.
    case "cid":
      return true;

    default:
      break;
  }
};

const getFieldsFromPassport = (passport) => {
  return passport.split(" ").map((passportField) => {
    const [field, value] = passportField.split(":");
    return {[field]: value};
  });
};

const validPassport = (fields) => (passportFields) => {
  return fields
    .map((field) => {
      if (field.required === false) {
        return true;
      } else {
        const keys = passportFields.flatMap(passportField => Object.keys(passportField)); 
        if (keys.indexOf(field.label) > -1) {
          return 0true;
        } else {
          return false;
        }
      }
    })
    .every(Boolean);
};

const result = input.map(getFieldsFromPassport).filter((passportFields) => {
  //  0:{byr: '1971'}
  //  1:{eyr: '2021'}
  //  2:{iyr: '2015'}
  //  3:{pid: '158388040'}
  //  4:{hcl: '#18171d'}
  //  5:{ecl: 'brn'}
  //  6:{hgt: '179cm'}
  const t = passportFields.map(validityConstraints);
  if(t.every(Boolean)){
    return true;
  } else {

    console.log(t, passportFields)
  }
});

console.log(":: Result", result.length);
