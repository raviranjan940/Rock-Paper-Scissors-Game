let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(`.choice`);
const msg = document.querySelector(`#msg`);
const userScoreCnt = document.querySelector(`#user-score`);
const compScoreCnt = document.querySelector(`#comp-score`);

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  //rock, paper, scissors
  const randIndex = Math.floor(Math.random()*3);
  return options[randIndex];
};

const drawGame = () => {
  msg.innerText = "Game was a draw, Play again!"
  msg.style.backgroundColor = "rgb(3, 3, 73)";
};

const showResult = (userWin,userChoice,compChoice) => {
  if(userWin){
    userScore++;
    userScoreCnt.innerText = userScore;
    msg.innerText = `You Won! Your ${userChoice} beats Computer's ${compChoice}`;
    msg.style.backgroundColor = "green";
  }else{
    compScore++;
    compScoreCnt.innerText = compScore;
    msg.innerText = `You Lost! Computer's ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const playGame = (userChoice) => {
  //now will generate computer choice
  const compChoice = genCompChoice(); 

  if(userChoice === compChoice){
    drawGame();
  }else{
    let userWin = true;
    if(userChoice === "rock"){
      //paper, scissors
      userWin = compChoice === "paper" ? false : true;
    }else if(userChoice === "paper"){
      //rock, scissors
      userWin = compChoice === "scissors" ? false : true;
    }else{
      userWin = compChoice === "rock" ? false : true;
    }
    showResult(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  console.log(choice);
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});