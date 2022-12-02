const fs = require('fs');

const parseInput = (data) => {
  strArray = data.split('\n');
  elfObj = {'0': 0}
  elfNum = 0
  strArray.forEach(e => {
    if (e.length > 0) {
      elfObj[elfNum] = elfObj[elfNum] + parseInt(e);
    } else {
      elfNum = elfNum+1;
      elfObj[elfNum] = 0;
    }
  })
  return elfObj;
};

const readData = (inputFile, fileType='utf8') => {
  try {
    return fs.readFileSync(inputFile, fileType);
  } catch (err) {
    console.error(err);
    throw new Error("Error reading file");
  }
}

const findMaxElf = (input) => {
  return Math.max.apply(Math, Object.values(input))
}

const rawData = readData('input.txt')
const parsedInput = parseInput(rawData)
const maxElf = findMaxElf(parsedInput)
console.log(maxElf)
