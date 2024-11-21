function getChoiceEmoji(value) {
  if (value === 0 || value === "R" || value === "r") {
    return "🪨";
  }

  if (value === 1 || value === "P" || value === "p") {
    return "📄";
  }

  if (value === 2 || value === "S" || value === "s") {
    return "✂️ ";
  }

  return "👊";
}

function getWinnerEmoji(siddiqueChoice, userChoice) {
  const hitByStone = (siddiqueChoice === "✂️ ") && (userChoice === "🪨");
  const hitByPapper = (siddiqueChoice === "🪨 ") && (userChoice === "📄");
  const hitByScissor = (siddiqueChoice === "📄") && (userChoice === "✂️ ");

  if (siddiqueChoice === userChoice || userChoice === "👊") {
    return "tie";
  }

  if (hitByStone || hitByPapper || hitByScissor) {
    return userChoice;
  }

  return siddiqueChoice;
}

function getEndCredits(siddiquePoint, userPoint) {
  if (siddiquePoint > userPoint) {
    return "Siddique Is The Champion 🐐 🐐 🏆 🏆";
  }

  if (siddiquePoint === userPoint) {
    return "No One Wins😑; Its A Draw 🤝"
  }

  return "You Are The Champion 🏆 🏆";
}

function printInstructionMessages() {
  console.log("Let's Play Stone Papper Scissor........");
  console.log("Try to defeat Siddique💪💪💪💪........\n");
  console.log("|| 🪨 --> R || 📄 --> P || ✂️ --> S || Exit --> e ||");
  console.log("Enter Your choice ⬅️");
  console.log("⚠️ ⚠️ Read Instruction Above First ☝️ ☝️ .. Don't ASK HIM ⚠️ ⚠️ ⚠️\n");
  console.log("siddique || You  || Siddique's Point || Your Point");
}

//play ground............
function playGround(siddiquePoint, userPoint, PlayingCount) {
  const userInput = prompt("            ");

  if (PlayingCount > 5 || userInput === "e") {
    return " \nYour Chance is Done\n" + getEndCredits(siddiquePoint, userPoint);
  }

  const userChoice = getChoiceEmoji(userInput);
  const siddiqueChoice = getChoiceEmoji(Math.floor(Math.random() * 3));
  const winnerChoice = getWinnerEmoji(siddiqueChoice, userChoice);

  if (winnerChoice === siddiqueChoice) {
    siddiquePoint++;
  }

  if (winnerChoice === userChoice) {
    userPoint++;
  }

  console.log("   ", siddiqueChoice, "  || ", userChoice, " ||       ", siddiquePoint, "        ||   ", userPoint);
  console.log("_________________________________________________");

  return playGround(siddiquePoint, userPoint, PlayingCount + 1);
}

//main function........
function mainFunction() {
  printInstructionMessages();
  console.log(playGround(0, 0, 0), "\n");
}

mainFunction(); 
