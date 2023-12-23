// let userScore = 0;
// let compScore = 0;

// const choices = document.querySelectorAll(`.choice`);
// const msg = document.querySelector(`#msg`);
// const userScoreCnt = document.querySelector(`#user-score`);
// const compScoreCnt = document.querySelector(`#comp-score`);

// const genCompChoice = () => {
//   const options = ["rock", "paper", "scissors"];
//   //rock, paper, scissors
//   const randIndex = Math.floor(Math.random()*3);
//   return options[randIndex];
// };

// const drawGame = () => {
//   msg.innerText = "Game was a draw, Play again!"
//   msg.style.backgroundColor = "rgb(3, 3, 73)";
// };

// const showResult = (userWin,userChoice,compChoice) => {
//   if(userWin){
//     userScore++;
//     userScoreCnt.innerText = userScore;
//     msg.innerText = `You Won! Your ${userChoice} beats Computer's ${compChoice}`;
//     msg.style.backgroundColor = "green";
//   }else{
//     compScore++;
//     compScoreCnt.innerText = compScore;
//     msg.innerText = `You Lost! Computer's ${compChoice} beats your ${userChoice}`;
//     msg.style.backgroundColor = "red";
//   }
// };

// const playGame = (userChoice) => {
//   //now will generate computer choice
//   const compChoice = genCompChoice(); 

//   if(userChoice === compChoice){
//     drawGame();
//   }else{
//     let userWin = true;
//     if(userChoice === "rock"){
//       //paper, scissors
//       userWin = compChoice === "paper" ? false : true;
//     }else if(userChoice === "paper"){
//       //rock, scissors
//       userWin = compChoice === "scissors" ? false : true;
//     }else{
//       userWin = compChoice === "rock" ? false : true;
//     }
//     showResult(userWin, userChoice, compChoice);
//   }
// };

// choices.forEach((choice) => {
//   console.log(choice);
//   choice.addEventListener("click", () => {
//     const userChoice = choice.getAttribute("id");
//     playGame(userChoice);
//   });
// });


//**2
let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll('.choice');
const msg = document.querySelector('#msg');
const userScoreCnt = document.querySelector('#user-score');
const compScoreCnt = document.querySelector('#comp-score');

const genCompChoice = async () => {
  const options = ['rock', 'paper', 'scissors'];

  const shuffleColors = async () => {
    const shuffleSound = new Audio('./assets/shuffle-sound.mp3');
    for (const choice of choices) {
      shuffleSound.play();
      choice.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
      await new Promise(resolve => setTimeout(resolve, 1500)); 
    }
  };

  await shuffleColors();

  const randIndex = Math.floor(Math.random() * 3);
  const compChoice = options[randIndex];

  setTimeout( () => {
    clearInterval(shuffleColors);
    const compChoiceOption = document.getElementById(compChoice);
    compChoiceOption.style.backgroundColor = 'green';
  }, 1200);
  choices.forEach(choice => {
    choice.style.backgroundColor = '';
  });

  return compChoice;
};

const drawGame = () => {
  msg.innerText = 'Game was a draw, Play again!';
  msg.style.backgroundColor = 'rgb(3, 3, 73)';
};

const showResult = (userWin, userChoice, compChoice) => {
  const winSound = new Audio('./assets/win-sound.mp3'); 
  const loseSound = new Audio('./assets/lose-sound.mp3'); 

  if (userWin) {
    userScore++;
    userScoreCnt.innerText = `User Score: ${userScore}`;
    msg.innerText = `You Won! Your ${userChoice} beats Computer's ${compChoice}`;
    msg.style.backgroundColor = 'green';
    winSound.play();
  } else {
    compScore++;
    compScoreCnt.innerText = `Computer Score: ${compScore}`;
    msg.innerText = `You Lost! Computer's ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = 'red';
    loseSound.play();
  }
};

const playGame = async (userChoice) => {
  const compChoice = await genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === 'rock') {
      userWin = compChoice === 'paper' ? false : true;
    } else if (userChoice === 'paper') {
      userWin = compChoice === 'scissors' ? false : true;
    } else {
      userWin = compChoice === 'rock' ? false : true;
    }
    showResult(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener('mouseenter', () => {
    const hoverSound = new Audio('./assets/mouse-hover-sound.mp3');
    hoverSound.play();
    choice.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
  });

  choice.addEventListener('mouseleave', () => {
    choice.style.backgroundColor = '';
  });

  choice.addEventListener('click', () => {
    const userChoice = choice.getAttribute('id');
    playGame(userChoice);
  });
});

