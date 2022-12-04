const { readFileSync } = require('fs');

const range = (min, max) => [...Array(max - min + 1).keys()].map(i => i + min);

const parseInput = (data) => {
  const strArray = data.split('\n');
  const mappedPairs = strArray.map(line => line.split(','));
  const ranges = mappedPairs.map(pair => {
    const range1 = range(parseInt(pair[0].split('-')[0], 10), parseInt(pair[0].split('-')[1], 10));
    const range2 = range(parseInt(pair[1].split('-')[0], 10), parseInt(pair[1].split('-')[1], 10));
    return [range1, range2];
  });
  return ranges;
};

const compareRanges = (ranges) => {
  let runningTotal = 0;
  ranges.forEach(r => {
    const intersection = r[1].filter(x => r[0].includes(x));
    if (intersection.length > 0) {
      runningTotal++;
    }
  });
  return runningTotal;
};

const readData = (inputFile, fileType = 'utf8') => {
  try {
    return readFileSync(inputFile, fileType);
  } catch (err) {
    console.error(err);
    throw new Error('Error reading file');
  }
};

const rawData = readData('day4/input.txt');
const parsedInput = parseInput(rawData);
const total = compareRanges(parsedInput);
console.log(total);
