const NO_OF_BOMBS = 15;
const CELL_COUNT = 100;
const HYPHEN = "-";
const LINE_LENGTH = 49;
const SAFE_CELLS = CELL_COUNT - NO_OF_BOMBS;

function getRandomNumbers(noOfBombs) {
  let bombPositions = "";
  let bombCount = 0;

  while (bombCount < noOfBombs) {
    const randomNumber = " " + ((Math.floor(Math.random() * 100))) + ",";

    if (bombPositions.includes(randomNumber)) {
      continue;
    }

    bombPositions += randomNumber;
    bombCount++;
  }

  return bombPositions;
}

function createGround(limit, bombPositions) {
  let ground = "";

  for (let cellCount = 1; cellCount <= limit; cellCount++) {
    if (bombPositions.includes(" " + cellCount + ",")) {
      ground += "B";
    } else {
      ground += "0";
    }
  }

  return ground;
}

function getPosToIncrement(index) {
  const isAtFirstRow = (index - 10) <= 0;
  const isAtLastRow = (index + 10) > 100;
  const isAtLeftRow = ((index - 1) % 10) === 0;
  const isAtRightRow = (index % 10) === 0;

  const upLeftCorner = !isAtFirstRow && !isAtLeftRow ? "," + (index - 11) + "," : " ";
  const leftSide = !isAtLeftRow ? ("," + (index - 1) + ",") : " ";
  const downLeftCorner = !isAtLastRow && !isAtLeftRow ? "," + (index + 9) + "," : " ";
  const upSide = !isAtFirstRow ? "," + (index - 10) + "," : " ";
  const downSide = !isAtLastRow ? "," + (index + 10) + "," : " ";
  const rightSide = !isAtRightRow ? "," + (index + 1) + "," : " ";
  const upRightCorner = !isAtFirstRow && !isAtRightRow ? "," + (index - 9) + "," : " ";
  const downRightCorner = !isAtLastRow && !isAtRightRow ? "," + (index + 11) + "," : " ";

  const firstValues = upLeftCorner + leftSide + downLeftCorner + upSide;
  const secondValues = downSide + rightSide + upRightCorner + downRightCorner;

  return firstValues + secondValues;
}

function getIncrementedString(mineMap, posToIncrement) {
  let incrementedString = "";

  for (let cell = 0; cell < mineMap.length; cell++) {
    if (posToIncrement.includes(("," + (cell + 1) + ",")) && mineMap[cell] !== "B") {
      let incrementedChar = +mineMap[cell];
      incrementedString += ++incrementedChar;
    } else {
      incrementedString += mineMap[cell];
    }
  }

  return incrementedString;
}

function setMineCount(mineMap) {
  for (let index = 0; index < mineMap.length; index++) {
    if (mineMap[index] === "B") {
      const posToIncrement = getPosToIncrement(index + 1);
      mineMap = getIncrementedString(mineMap, posToIncrement);
    }
  }

  return mineMap;
}

function getLine() {
  let line = "";

  for (let lineLength = 0; lineLength < LINE_LENGTH; lineLength++) {
    line += HYPHEN;
  }

  return line;
}

function getEmojiToPrint(cellValue) {
  switch (cellValue) {
    case "0": return " 0️⃣ ";
    case "1": return " 1️⃣ ";
    case "2": return " 2️⃣ ";
    case "3": return " 3️⃣ ";
    case "4": return " 4️⃣ ";
  }

  return " 💣";
}

function getCharToPrint(cellNo, openedCells, string, flagedCells) {
  if (flagedCells.includes((" " + cellNo + ","))) {
    return " 🚩";
  }

  if (openedCells.includes(" " + cellNo + ",")) {
    return getEmojiToPrint(string[cellNo - 1])
  }

  if (cellNo < 10) {
    return " 0" + cellNo;
  }

  if (cellNo >= 100) {
    return cellNo;
  }

  return " " + cellNo;
}

function getStyledGround(openedCells, mineMap, flagedCells) {
  const line = getLine(LINE_LENGTH);
  let mineGround = "\n " + line + "\n";

  for (let cellNo = 1; cellNo <= CELL_COUNT; cellNo++) {
    const character = getCharToPrint(cellNo, openedCells, mineMap, flagedCells);
    const cellDesign = "┃" + character + " ";

    if (cellNo % 10 === 0) {
      mineGround += cellDesign + "┃\n┃" + line + "┃\n";
    } else {
      mineGround += cellDesign;
    }
  }

  return mineGround;
}

function openNearCells(openedCells, index) {
  const isAtFirstRow = (index - 10) <= 0;
  const isAtLastRow = (index + 10) > 100;
  const isAtLeftRow = ((index - 1) % 10) === 0;
  const isAtRightRow = (index % 10) === 0;

  const upLeftCorner = (openedCells.includes(index - 11) || isAtFirstRow || isAtLeftRow) ? "" : (" " + (index - 11) + ",");
  const leftSide = (openedCells.includes(index - 1) || isAtLeftRow) ? "" : (" " + (index - 1) + ",");
  const downLeftCorner = (openedCells.includes(index + 9) || isAtLastRow || isAtLeftRow) ? "" : (" " + (index + 9) + ",");
  const upSide = (openedCells.includes(index - 10) || isAtFirstRow) ? "" : (" " + (index - 10) + ",");
  const downSide = (openedCells.includes(index + 10) || isAtLastRow) ? "" : (" " + (index + 10) + ",");
  const rightSide = (openedCells.includes(index + 1) || isAtRightRow) ? "" : (" " + (index + 1) + ",");
  const upRightCorner = (openedCells.includes(index - 9) || isAtRightRow || isAtFirstRow) ? "" : (" " + (index - 9) + ",");
  const downRightCorner = (openedCells.includes(index + 11) || isAtRightRow || isAtLastRow) ? "" : (" " + (index + 11) + ",");

  const firstValues = upLeftCorner + leftSide + downLeftCorner + upSide;
  const secondValues = downSide + rightSide + upRightCorner + downRightCorner;

  return openedCells + firstValues + secondValues + ' ';
}

function getBorderedMessage(message) {
  const line = getLine(LINE_LENGTH);

  return line + "\n        " + message + "            \n" + line;
}

function printBoardAndMessage(message) {
  console.clear();
  console.log(getBorderedMessage(message));
  console.log("\n💣 💣 💥 💥💣 𝐌 𝑰𝐍 𝑬 𝐒Ꮤ 𝑬 𝑬 𝐏 𝑬 Ʀ 💣 💣 💥 💥 💣");
  console.log(getStyledGround(openedCells, mineMap, flagedCells));
}

function getUserInput() {
  const input = prompt("Enter Cell No to continue || Enter e to exit || Enter f to flag");
  const isInputInRange = input <= CELL_COUNT && input > 0;
  const isValidInput = (input === "f" || input === "e");
  const isFlaged = flagedCells.includes(" " + input + ",");
  const isOpened = openedCells.includes(" " + input + ",");

  if (!(isInputInRange || isValidInput) || isFlaged || isOpened) {
    console.log("Don't Enter flaged || opened cells || invalid values");
    return getUserInput();
  }

  return input;
}

function processInput(input, flagedCells, openedCells, mineMap) {
  if (mineMap[input - 1] === "B") {
    printBoardAndMessage("Bomb Blasted 💥 💥 💥, You have losed......");
  }

  if (openedCells.split(",").length > SAFE_CELLS) {
    printBoardAndMessage("Nice tactics, you got it 🏅 🏆\nYou are a Genius. You are Selected>>>>👑 👑");
  }
}

const bombPositions = getRandomNumbers(NO_OF_BOMBS);
const mineGround = createGround(CELL_COUNT, bombPositions);
const mineMap = setMineCount(mineGround);
let openedCells = " ";
let flagedCells = " ";
let isGameDone = false;

printBoardAndMessage("let's see your tactics 🤘 🤘");

while (!isGameDone) {
  const input = getUserInput();

  //flag case...........
  if (input === "f") {
    const inputToFlag = prompt("Enter the CellNo to flag: ");
    flagedCells = flagedCells + (" " + inputToFlag + ",")
    printBoardAndMessage("NIce You Have flaged Successfully");
    continue;
  }

  //exit case.....
  if (input === "e") {
    console.log("Why are you so cruel; anyWay bie see you again;");
    isGameDone = true;
  }

  //cell open case..
  if (!openedCells.includes(" " + input + ",")) {
    openedCells = openedCells + +input + ", ";

    if (mineMap[input - 1] === "0") {
      openedCells = openNearCells(openedCells, +input, mineMap);
    }

    printBoardAndMessage("NIce MOve");
  }

  // game finish case....
  if (openedCells.split(",").length > SAFE_CELLS || mineMap[input - 1] === "B") {
    flagedCells = "";
    openedCells = openedCells + bombPositions;
    isGameDone = true;
    processInput(input, flagedCells, openedCells, mineMap);
  }

  
}

// console.log(bombPositions);
// console.log(openedCells.split(",").length - 1);
//winners List.....
//Praveen
//likitha g, akash, sushanth
//dhanoj
//aman shabbas , shrutika
//Hima Sai

//sujoy --> 2
//shrutika
//sameera bhanu
// mounika
//siddique
//devadatta, anagh, rohini
//rohini, krishnanand
//Dhanoj
//sameera , sai ram

// feedback 
// very good game good siddique you are cool
