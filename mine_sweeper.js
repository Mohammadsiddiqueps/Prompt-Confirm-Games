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

function getNumberToPrint(cellNo, openedCells, string) {
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

  if (cellNo < 10) {
    return " 0" + cellNo;
  }

  if (cellNo === 100) {
    return cellNo;
  }
  return " " + cellNo;
}

function getStyledGround(openedCells, mineMap) {
  const horizontalOuterLine = getOuterLine();
  let mineGround = "\n " + horizontalOuterLine + "\n";

  for (let cellNo = 1; cellNo <= 100; cellNo++) {
    if (cellNo === 100) {
      mineGround = mineGround + "┃" + getNumberToPrint(cellNo, openedCells, mineMap) + " ";
    }

    if (cellNo >= 10 && cellNo < 100) {

      mineGround = mineGround + "┃" + ("" + getNumberToPrint(cellNo, openedCells, mineMap)) + " ";
    }

    if (cellNo < 10) {
      mineGround = mineGround + "┃" + ("" + getNumberToPrint(cellNo, openedCells, mineMap)) + " ";
    }

    if (cellNo % 10 === 0) {
      mineGround = mineGround + "┃\n┃" + horizontalOuterLine + "┃\n";
    }
  }

  return mineGround;
}

const bombPositions = getRandomNumbers(10, "");
const ground = createGround(100, bombPositions);
const mineMap = setMineCount(ground);
let openedCells = " ";

console.log("let's see your tactics");
console.log("  💥💣 𝐌 𝑰𝐍 𝑬 𝐒Ꮤ 𝑬 𝑬 𝐏 𝑬 Ʀ 💣💣 💥💥💣");
console.log(getStyledGround(openedCells + "\n", mineMap));
let isGameDone = false;

while (!isGameDone) {
  const inputCellNumber = prompt("Enter Cell No to continue || Enter e to exit");
  const isInputInRange = inputCellNumber < 101 && inputCellNumber > 0;

  if (!openedCells.includes(" " + inputCellNumber + ",") && isInputInRange) {
    openedCells = openedCells + inputCellNumber + ", ";
  }

  console.clear();

  if (mineMap[inputCellNumber - 1] === "B") {
    console.log("Bomb Blasted 💥 💥 💥, You are a loser......");
    openedCells = openedCells + bombPositions;
    isGameDone = true;
  }

  if (inputCellNumber === "e") {
    console.log("Why are you so cruel; anyWay bie see you again;");
    isGameDone = true;
  }

  if (openedCells.split(",").length - 1 === 91) {
    openedCells = openedCells + bombPositions;
    console.log("Nice tactics, you got it 🏅 🏆");
    console.log("You are a Genius. You are Selected>>>>👑 👑");
    isGameDone = true
  }

  console.log("  💥💣 𝐌 𝑰𝐍 𝑬 𝐒Ꮤ 𝑬 𝑬 𝐏 𝑬 Ʀ 💣💣 💥💥💣");
  console.log(getStyledGround(openedCells, mineMap));
}
