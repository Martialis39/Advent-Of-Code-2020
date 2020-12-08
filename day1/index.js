const data = require("./data.json");

// Using the above example again, the three entries that sum to 2020 are 979,
// 366, and 675. Multiplying them together produces the answer, 241861950.

// In your expense report, what is the product of the three entries
// that sum to 2020?

const target = 2020;


const sortedData = data.input.map((e) => Number(e));

const findThreeEntries = (target, sortedData) => {
  sortedData.forEach((number) => {
    sortedData.forEach((numberTwo) => {
      sortedData.forEach((numberThree) => {
        if (number + numberTwo + numberThree === target) {
          console.log("DEBUG:: result is", number * numberTwo * numberThree);
          return;
        }
      });
    });

  });
};

findThreeEntries(target, sortedData);
