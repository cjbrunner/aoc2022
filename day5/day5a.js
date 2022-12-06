/* eslint-disable keyword-spacing */
const { readFileSync } = require('fs');

const parseLine = (line) => {
  const lineParts = line.split(' ');
  return [lineParts[1], lineParts[3], lineParts[5]];
};

const moveCrates = (state, instructions) => {
  instructions.split('\n').slice(0, instructions.split('\n').length - 1).forEach(inst => {
    const [num, fromStack, toStack] = parseLine(inst);
    console.log(`${num} ${fromStack} ${toStack}`);
    for (let i = num; i > 0; i--) {
      state[toStack - 1].unshift(state[fromStack - 1][0]);
      state[fromStack - 1].shift();
    }
  });
  return state;
};

const parseInitialState = (data) => {
  const [setupData, instData] = data.split('\n\n');
  const rowArrays = [];
  const setupArrays = [[], [], [], [], [], [], [], [], []];
  const rows = setupData.split('\n');
  rows.slice(0, rows.length - 1).forEach(rowStr => {
    const rowArr = rowStr.match(/.{1,4}/g).map(i => i.replace(/[[\] ]+/g, ''));
    rowArrays.push(rowArr);
  });
  for(let c = 0; c < 9; c++) {
    for (let r = 0 ; r < 8; r++) {
      const cell = rowArrays[r][c];
      if (cell !== '') setupArrays[c].push(rowArrays[r][c]);
    }
  }
  return [setupArrays, instData];
};

const readData = (inputFile, fileType = 'utf8') => {
  try {
    return readFileSync(inputFile, fileType);
  } catch (err) {
    console.error(err);
    throw new Error('Error reading file');
  }
};

const rawData = readData('day5/input.txt');
const parsedInput = parseInitialState(rawData);
const finalState = moveCrates(parsedInput[0], parsedInput[1]);
console.log(finalState);
finalState.forEach(c => console.log(c[0]));
