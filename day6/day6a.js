/* eslint-disable keyword-spacing */
const { readFileSync } = require('fs');

const readData = (inputFile, fileType = 'utf8') => {
  try {
    return readFileSync(inputFile, fileType);
  } catch (err) {
    console.error(err);
    throw new Error('Error reading file');
  }
};

const findStartOfPacket = (data) => {
  let prevFour = data.slice(0, 4);
  let i = 1;
  while ([...new Set(prevFour)].length < 4) {
    console.log(prevFour);
    prevFour = data.slice(i, i + 4);
    i++;
  }
  console.log(prevFour);
  return i + 3;
};

const rawData = readData('day6/input.txt');
const startOfPacket = findStartOfPacket(rawData);
console.log(startOfPacket);
