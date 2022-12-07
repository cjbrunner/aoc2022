const fs = require('fs');

const parseInput = (data) => {
  const strArray = data.split('\n');
  const elfObj = { '0': 0 };
  let elfNum = 0;
  strArray.forEach(e => {
    if (e.length > 0) {
      elfObj[elfNum] += parseInt(e, 10);
    } else {
      elfNum += 1;
      elfObj[elfNum] = 0;
    }
  });
  return elfObj;
};

const readData = (inputFile, fileType = 'utf8') => {
  try {
    return fs.readFileSync(inputFile, fileType);
  } catch (err) {
    console.error(err);
    throw new Error('Error reading file');
  }
};

const findMaxElf = (input) => Math.max.apply(...Object.values(input));

const rawData = readData('input.txt');
const parsedInput = parseInput(rawData);
const maxElf = findMaxElf(parsedInput);
console.log(maxElf);
