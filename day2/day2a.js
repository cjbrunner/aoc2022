const fs = require('fs');

const sumLine = (total, line) => {
  // A/X = Rock
  // B/Y = Paper
  // C/Z = Scissors
  [e, h] = line.split(' ');
  if (h == 'Z') total += 3
  if (h == 'Y') total += 2
  if (h == 'X') total += 1
  if (h == 'Z' && e == 'B') total += 6
  if (h == 'Z' && e == 'C') total += 3
  if (h == 'Y' && e == 'B') total += 3
  if (h == 'Y' && e == 'A') total += 6
  if (h == 'X' && e == 'A') total += 3
  if (h == 'X' && e == 'C') total += 6
  return total
}
const parseInput = (data) => {
  const strArray = data.split('\n');
  const sumWithInitial = strArray.reduce(sumLine, 0);
  return sumWithInitial;
};

const readData = (inputFile, fileType='utf8') => {
  try {
    return fs.readFileSync(inputFile, fileType);
  } catch (err) {
    console.error(err);
    throw new Error("Error reading file");
  }
}

const rawData = readData('day2/input.txt')
const parsedInput = parseInput(rawData)
console.log(parsedInput)
