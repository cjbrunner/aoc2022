const { readFileSync } = require('fs');

const convertChar = (char) => {
  const val = char.charCodeAt(0);
  if (val > 64 && val < 91) return val - 38;
  if (val > 96 && val < 123) return val - 96;
  console.log(val, char);
  throw new Error('invalid input');
};

const findBadgeValue = (total, group) => {
  const badge = Array.from(group[0]).filter(item => group[1].includes(item)).filter(item2 => group[2].includes(item2));
  total += convertChar(badge[0]);
  return total;
};

const groupElves = (input) => {
  const output = [];
  for (let i = 0; i < (input.length / 3) - 1; i++) {
    output.push(input.slice(i * 3, (i * 3) + 3));
  }
  return output;
};

const parseInput = (data) => {
  const strArray = data.split('\n');
  const groupsOfThree = groupElves(strArray);
  const sumWithInitial = groupsOfThree.reduce(findBadgeValue, 0);
  return sumWithInitial;
};

const readData = (inputFile, fileType = 'utf8') => {
  try {
    return readFileSync(inputFile, fileType);
  } catch (err) {
    console.error(err);
    throw new Error('Error reading file');
  }
};

const rawData = readData('day3/input.txt');
const parsedInput = parseInput(rawData);
console.log(parsedInput);
