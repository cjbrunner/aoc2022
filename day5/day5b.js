/* eslint-disable keyword-spacing */
const { readFileSync } = require('fs');

const parseLine = (line) => {
  const lineParts = line.split(' ');
  return [parseInt(lineParts[1], 10), parseInt(lineParts[3], 10), parseInt(lineParts[5], 10)];
};

const moveCrates = (state, instructions) => {
  instructions.split('\n').slice(0, instructions.split('\n').length - 1).forEach(inst => {
    const [num, fromStackId, toStackId] = parseLine(inst);
    console.log(`${num} ${fromStackId} ${toStackId}`);
    state[toStackId - 1] = state[fromStackId - 1].slice(0, num).concat(state[toStackId - 1]);
    state[fromStackId - 1] = state[fromStackId - 1].slice(num);
    console.log(state);
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
      if (cell !== '' && cell !== undefined) setupArrays[c].push(rowArrays[r][c]);
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
// console.log(finalState);
finalState.forEach(c => console.log(c[0]));
