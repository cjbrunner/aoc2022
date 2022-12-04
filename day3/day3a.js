const { readFileSync } = require('fs');

const convertChar = (char) => {
  const val = char.charCodeAt(0);
  if (val > 64 && val < 91) return val - 38;
  if (val > 96 && val < 123) return val - 96;
  console.log(val, char);
  throw new Error('invalid input');
};

const findDupe = (total, line) => {
  const priorityMap = Array.from(line).map(char => convertChar(char));
  const len = priorityMap.length;
  const part1 = priorityMap.slice(0, len / 2);
  const part2 = priorityMap.slice(len / 2);
  const intersection = part1.filter(item => part2.includes(item));
  if (intersection.length > 0) total += intersection[0];
  return total;
};

const parseInput = (data) => {
  const strArray = data.split('\n');
  const sumWithInitial = strArray.reduce(findDupe, 0);
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
