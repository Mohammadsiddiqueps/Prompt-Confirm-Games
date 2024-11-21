function getRandomNumbers(times, string) {
  const randomNumber = " " + (Math.floor(Math.random() * 100)) + ",";
  if (times < 1) {
    return string;
  }

  if (string.includes(randomNumber)) {
    return getRandomNumbers(times, string);
  }

  return getRandomNumbers(times - 1, string + randomNumber);
}

function createGround(limit, bombPositions) {
  let ground = "";

  for (let createdCells = 1; createdCells <= limit; createdCells++) {
    if (bombPositions.includes(" " + createdCells + ",")) {
      ground = ground + "B";
    } else {
      ground = ground + "0";
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

function getIncrementedString(string, posToIncrement) {
  let incrementedString = "";

  for (let cell = 0; cell < string.length; cell++) {
    if (posToIncrement.includes(("," + (cell + 1) + ",")) && string[cell] !== "B") {
      let incrementedChar = +string[cell];
      incrementedString = incrementedString + ++incrementedChar;
    } else {
      incrementedString = incrementedString + string[cell];
    }
  }

  return incrementedString;
}

function setMineCount(string) {
  for (let index = 0; index < string.length; index++) {
    if (string[index] === "B") {
      const posToIncrement = getPosToIncrement(index + 1);
      string = getIncrementedString(string, posToIncrement);
    }
  }

  return string;
}

function getOuterLine() {
  const hyphen = "-";
  let line = "";

  for (let lineLength = 0; lineLength < 49; lineLength++) {
    line = line + hyphen;
  }

  return line;
}

function getNumberToPrint(cellNo, openedCells, string, flagedCells) {
  if (openedCells.includes(" " + cellNo + ",")) {
    if (string[cellNo - 1] === "0") {
      return " 0️⃣ ";
    }

    if (string[cellNo - 1] === "1") {
      return " 1️⃣ ";
    }

    if (string[cellNo - 1] === "2") {
      return " 2️⃣ ";
    }

    if (string[cellNo - 1] === "3") {
      return " 3️⃣ ";
    }

    if (string[cellNo - 1] === "4") {
      return " 4️⃣ ";
    }

    return " 💣";
  }

  if (flagedCells.includes((" " + (cellNo) + ","))) {
    return " 🚩";
  }

  if (cellNo < 10) {
    return " 0" + cellNo;
  }

  if (cellNo === 100) {
    return cellNo;
  }

  return " " + cellNo;
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

function getStyledGround(openedCells, mineMap, flagedCells) {
  const horizontalOuterLine = getOuterLine();
  let mineGround = "\n " + horizontalOuterLine + "\n";

  for (let cellNo = 1; cellNo <= 100; cellNo++) {
    const character = getNumberToPrint(cellNo, openedCells, mineMap, flagedCells);

    if (cellNo === 100) {
      mineGround = mineGround + "┃" + character + " ";
    }

    if (cellNo >= 10 && cellNo < 100) {

      mineGround = mineGround + "┃" + character + " ";
    }

    if (cellNo < 10) {
      mineGround = mineGround + "┃" + character + " ";
    }

    if (cellNo % 10 === 0) {
      mineGround = mineGround + "┃\n┃" + horizontalOuterLine + "┃\n";
    }
  }

  return mineGround;
}

const bombPositions = getRandomNumbers(15, "");
const ground = createGround(100, bombPositions);
const mineMap = setMineCount(ground);
let openedCells = " ";
let flagedCells = "";

console.log("let's see your tactics 🤘 🤘");
console.log("\n💣 💣 💥 💥💣 𝐌 𝑰𝐍 𝑬 𝐒Ꮤ 𝑬 𝑬 𝐏 𝑬 Ʀ 💣 💣 💥 💥 💣");
console.log(getStyledGround(openedCells + "\n", mineMap, flagedCells));
let isGameDone = false;

while (!isGameDone) {
  const inputCellNumber = prompt("Enter Cell No to continue || Enter e to exit || Enter f to flag");
  const isInputInRange = inputCellNumber < 101 && inputCellNumber > 0;

  if (inputCellNumber === "f") {
    const inputToFlag = prompt("Enter the CellNo to flag: ");
    flagedCells = flagedCells + (" " + inputToFlag + ",")
    console.clear();
    console.log("\n💣 💣 💥 💥💣 𝐌 𝑰𝐍 𝑬 𝐒Ꮤ 𝑬 𝑬 𝐏 𝑬 Ʀ 💣 💣 💥 💥 💣");
    console.log(getStyledGround(openedCells, mineMap, flagedCells));
    continue;
  }

  if (flagedCells.includes(" " + inputCellNumber + ",")) {
    console.log("\n🚫 🚫You can't open flagged cell 🚫 🚫");
    continue;
  }

  if (!openedCells.includes(" " + inputCellNumber + ",") && isInputInRange) {
    openedCells = openedCells + inputCellNumber + ", ";

    if (mineMap[inputCellNumber - 1] === "0") {
      openedCells = openNearCells(openedCells, +inputCellNumber, mineMap);
    }
  }

  console.clear();

  if (mineMap[inputCellNumber - 1] === "B") {
    flagedCells = "";
    console.log("Bomb Blasted 💥 💥 💥, You are a loser......");
    openedCells = openedCells + bombPositions;
    isGameDone = true;
  }

  if (inputCellNumber === "e") {
    flagedCells = "";
    console.log("Why are you so cruel; anyWay bie see you again;");
    isGameDone = true;
  }

  if (openedCells.split(",").length - 1 > 84) {
    flagedCells = "";
    openedCells = openedCells + bombPositions;
    console.log("Nice tactics, you got it 🏅 🏆");
    console.log("You are a Genius. You are Selected>>>>👑 👑");
    isGameDone = true
  }

  console.log("\n💣 💣 💥 💥💣 𝐌 𝑰𝐍 𝑬 𝐒Ꮤ 𝑬 𝑬 𝐏 𝑬 Ʀ 💣 💣 💥 💥 💣");
  console.log(getStyledGround(openedCells, mineMap, flagedCells));
  
}

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

// feedback 
// very good game good siddique you are cool
