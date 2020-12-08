const { input } = require("./data.json");

const dummyInput = [
  "..##.......",
  "#...#...#..",
  ".#....#..#.",
  "..#.#...#.#",
  ".#...##..#.",
  "..#.##.....",
  ".#.#.#....#",
  ".#........#",
  "#.##...#...",
  "#...##....#",
  ".#..#...#.#",
];

// Part one

const traverse = (
  grid,
  currentRow = 0,
  currentCol = 0,
  treesEncountered = 0
) => {
  if (currentRow === grid.length) {
    return treesEncountered;
  }
  const col = currentCol % grid[0].length;
  const currentPosition = grid[currentRow][col];
  if (currentPosition === "#") {
    treesEncountered += 1;
  }
  return traverse(grid, currentRow + 1, currentCol + 3, treesEncountered);
};

// Part 2
const newTraverse = (
  grid,
  currentRow = 0,
  currentCol = 0,
  treesEncountered = 0,
  right,
  down
) => {
  if (currentRow >= grid.length) {
    return treesEncountered;
  }
  const col = currentCol % grid[0].length;
  const currentPosition = grid[currentRow][col];
  if (currentPosition === "#") {
    treesEncountered += 1;
  }
  return newTraverse(
    grid,
    currentRow + down,
    currentCol + right,
    treesEncountered,
    right,
    down
  );
};

// Check with dummy input

console.log(newTraverse(dummyInput, 0, 0, 0, 1, 1) === 2); // True!

const result = [
  newTraverse(input, 0, 0, 0, 1, 1),
  newTraverse(input, 0, 0, 0, 3, 1),
  newTraverse(input, 0, 0, 0, 5, 1),
  newTraverse(input, 0, 0, 0, 7, 1),
  newTraverse(input, 0, 0, 0, 1, 2),
].reduce((a, b) => a * b, 1);

console.log(":: Result is ", result, " ::");
