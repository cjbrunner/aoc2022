const fs = require('fs');

const sumLine = (total, line) => {
  // A = Rock
  // B = Paper
  // C = Scissors
  // X = Lose
  // Y = Draw
  // Z = Win
  [e, g] = line.split(' ');
  if (e == 'A' && g == 'X') total += 3
  if (e == 'A' && g == 'Y') total += 4
  if (e == 'A' && g == 'Z') total += 8
  if (e == 'B' && g == 'X') total += 1
  if (e == 'B' && g == 'Y') total += 5
  if (e == 'B' && g == 'Z') total += 9
  if (e == 'C' && g == 'X') total += 2
  if (e == 'C' && g == 'Y') total += 6
  if (e == 'C' && g == 'Z') total += 7
  return total
  throw new Error("Should have exited by now");
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
