const HYPHEN = "-";
const DOUBLE_LINE = "═";
const NO_OF_CHANCES = 5;

function isInRow(index, numberToCheck, sudokuMap) {
  const startCell = index - (index % 9);

  for (let cell = startCell; cell < startCell + 9; cell++) {
    if (+sudokuMap[cell] === numberToCheck) {
      return true;
    }
  }

  return false;
}

function isInColumn(index, numberToCheck, sudokuMap) {
  const columnStart = index % 9;

  for (let cell = columnStart; cell < 81; cell += 9) {
    if (+sudokuMap[cell] === numberToCheck) {
      return true;
    }
  }

  return false;
}

function isInBox(index, numberToCheck, sudokuMap) {
  const rowOfIndex = Math.floor(index / 9);
  const colOfIndex = index % 9;
  const boxStartRow = Math.floor(rowOfIndex / 3) * 3;
  const boxStartCol = Math.floor(colOfIndex / 3) * 3;

  for (let row = boxStartRow; row < boxStartRow + 3; row++) {
    for (let column = boxStartCol; column < boxStartCol + 3; column++) {
      const cellIndex = row * 9 + column;

      if (+sudokuMap[cellIndex] === numberToCheck) {
        return true;
      }
    }
  }

  return false;
}

function getRandomNotAdded(addedNumbers) {
  const randomNumber = 1 + Math.floor(Math.random() * 9);
  if (addedNumbers.includes("" + randomNumber)) {
    return getRandomNotAdded(addedNumbers);
  }

  return randomNumber;
}

function getMapStructure() {
  let structure = "";
  for (let index = 1; index < 82; index++) {
    structure += 0;
  }

  return structure;
}

function getModifiedMap(sudokuMap, indexToAdd, number) {
  let addedMap = "";

  for (let index = 0; index < sudokuMap.length; index++) {
    if (index === indexToAdd) {
      addedMap += number;
    } else {
      addedMap += sudokuMap[index];
    }
  }

  return addedMap;
}

function getPuzzle(sudokuMap, indexToAdd, addedNumbers) {
  const number = getRandomNotAdded(addedNumbers);
  const isNotInBox = !isInBox(indexToAdd, number, sudokuMap);
  const isNotInRow = !isInRow(indexToAdd, number, sudokuMap);
  const isNotInColumn = !isInColumn(indexToAdd, number, sudokuMap);

  addedNumbers += number;
  if (addedNumbers.length === 9) {
    return "";
  }


  if (!(isNotInBox && isNotInColumn && isNotInRow)) {
    return getPuzzle(sudokuMap, indexToAdd, addedNumbers);
  }

  if (indexToAdd === 80) {
    return "" + number;
  }

  const addedMap = getModifiedMap(sudokuMap, indexToAdd, number);
  const nextCell = getPuzzle(addedMap, indexToAdd + 1, "");

  if (nextCell === "") {
    return getPuzzle(sudokuMap, indexToAdd, addedNumbers);
  }

  return number + nextCell;
}


function getOuterLine(lineType, length) {
  let line = "";

  for (let lineLength = 0; lineLength < length; lineLength++) {
    line = line + lineType;
  }

  return line;
}

function getRandomCells(noOfCells, openedCells) {
  if (noOfCells < 1) {
    return openedCells;
  }

  const randomNumber = Math.floor(Math.random() * 81);

  if (openedCells.includes("," + randomNumber + ",")) {
    return getRandomCells(noOfCells, openedCells);
  }

  return getRandomCells(noOfCells - 1, openedCells + "," + randomNumber + ",");
}

function openRandomCells(sudokuMap) {
  let openedCells = getRandomCells(30, "");
  let openedMap = "";

  for (let index = 0; index < sudokuMap.length; index++) {
    if (openedCells.includes("," + index + ",")) {
      openedMap += "⬜";
    } else {
      openedMap += sudokuMap[index];
    }
  }

  return openedMap;
}

function getNumberToPrint(index, openedMap, cursorPos) {
  if (index === cursorPos) {
    if (openedMap[cursorPos - 1] == "⬜") {
      return " 🟩 ";
    }

    return " 🟥 ";
  }

  if (openedMap[index - 1] == "⬜") {
    return " " + openedMap[index - 1] + " ";
  }

  return " " + openedMap[index - 1] + "  ";
}

function getStyledGround(openedMap, cursorPos) {
  const hyphenLine = getOuterLine(HYPHEN, 44);
  const doubleLine = getOuterLine(DOUBLE_LINE, 44);
  let board = "\n┃" + hyphenLine + "┃\n┃";

  for (let cellNo = 1; cellNo < 82; cellNo++) {
    const isBigCell = !(cellNo % 9 === 0) && (cellNo % 3 === 0);
    const isThirdRow = cellNo % 27 === 0 && cellNo < 60;
    const borderLine = isBigCell ? "║" : "┃";
    const bottomLine = isThirdRow ? doubleLine : hyphenLine;

    board += getNumberToPrint(cellNo, openedMap, cursorPos) + borderLine;

    if (cellNo % 9 === 0) {
      board += "\n┃" + bottomLine + "┃\n┃";
    }
  }

  return board;
}

function openInputCell(openedCells, inputIndex, input) {
  let openedMap = "";

  for (let index = 0; index < openedCells.length; index++) {
    if (index === inputIndex) {
      openedMap += input;
    } else {
      openedMap += openedCells[index]
    }
  }

  return openedMap;
}

function getCursorPos(currentPos, input) {
  switch (input) {
    case "a": return currentPos > 1 ? currentPos - 1 : currentPos;
    case "d": return currentPos < 81 ? currentPos + 1 : currentPos;
    case "w": return currentPos > 9 ? currentPos - 9 : currentPos;
    case "s": return currentPos < 73 ? currentPos + 9 : currentPos;
  }
}

function getInput() {
  const input = prompt("Enter Left --> A | Up --> W | down --> S | Right --> D| Exit --> E | AddValue --> Q");
  let inputsString = "awsdeq";
  if (!inputsString.includes("" + input) || input === "") {
    console.log("Enter Valid Input Buddy ❌ ❌");
    return getInput();
  }

  return input;
}

function printBoard(openedMap, cursorPos, noOfChances) {
  console.clear();
  console.log("\n      🔢  Sudoku 🔢")
  console.log(getStyledGround(openedMap, cursorPos));
  console.log("NO OF CHANCES REMAINING : ", noOfChances, "\n");
}

function playSudoku(sudokuMap, openedMap, cursorPos, noOfChances) {
  if (noOfChances < 1) {
    return "Your chances are done..";
  }

  printBoard(openedMap, cursorPos, noOfChances);
  if (sudokuMap === openedMap) {
    return "you Won the game...🏆🏆\n";
  }

  const input = getInput();

  if (input === "e") {
    return "This is not good...";
  }

  if (input === "q") {
    const inputCellValue = prompt("Enter value to input in  : ");

    if (sudokuMap[cursorPos - 1] === inputCellValue) {
      return playSudoku(sudokuMap, openInputCell(openedMap, cursorPos - 1, inputCellValue), cursorPos, noOfChances)
    }

    return playSudoku(sudokuMap, openedMap, cursorPos, noOfChances - 1);
  }

  return playSudoku(sudokuMap, openedMap, getCursorPos(cursorPos, input), noOfChances);
}

const sudokuMap = getPuzzle(getMapStructure(), 0, "");
let openedMap = openRandomCells(sudokuMap);
console.log(playSudoku(sudokuMap, openedMap, 1, NO_OF_CHANCES));

// sai venkat top scorer
// Karthikeya
//rohini
