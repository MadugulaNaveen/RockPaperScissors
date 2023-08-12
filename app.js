let val;

var playerScoreCard = document.querySelector('.playerScore')
var computerScoreCard = document.querySelector('.computerScore')
var playerPlaying = document.querySelector('.playerContainer')
var computerPlaying = document.querySelector('.computerContainer')
const options = document.querySelectorAll(".options");

async function game(){
  let playerScore = 0;
  let computerScore = 0;
  var finalScore = document.querySelector('.resultContainer');

  for(let i = 0; i < 5; i++){
    // computerPlaying.textContent =""
    const playerSelection = await getPlayerChoice();
    const computerSelection = await getComputerChoice();
    computerPlaying.textContent ="Computer chose : "+ computerSelection
    playerPlaying.textContent =""

    const result = playRound(playerSelection, computerSelection);
    if(result == 1){
      playerScore++;
    }else if(result == -1){
      computerScore++;
    }
    playerScoreCard.textContent = playerScore
    computerScoreCard.textContent = computerScore

    options.forEach((option) => {
      option.classList.remove('selected')
    })
  }

  playerPlaying.textContent = "";
  computerPlaying.textContent = "";
  finalScore.classList.add('padding')
  if(playerScore > computerScore){
    finalScore.textContent = "You win baby!";
  }else if(playerScore < computerScore){
    finalScore.textContent = "Computer won";
  }else{
    finalScore.textContent = "Draw..."
  }
}

// function to retrieve the player selected option
function getPlayerChoice(){
  playerPlaying.textContent = "Select your weapon: "
  return new Promise((resolve) => {
    const handleButtonClick = (event) => {
      const clickedDiv = event.target;
      val = clickedDiv.id;
      resolve(val);
    };


    options.forEach((option) => {
      option.addEventListener("click", handleButtonClick, { once: true });
    });
  });
}


var n = 0;
async function getComputerChoice(){
  computerPlaying.textContent = "Computer Choosing " 
  return new Promise(resolve => {
    setTimeout(() => {
      n = Math.floor(Math.random() * 3);
      if (n === 0) {
        options[0].classList.toggle('selected');
        resolve("rock");
      } else if (n === 1) {
        options[1].classList.toggle('selected');
        resolve("paper");
      } else if (n === 2) {
        options[2].classList.toggle('selected');
        resolve("scissors");
      }
    }, 1000); 
  });
}


function playRound(playerSelection, computerSelection){
  if(playerSelection == computerSelection){
    return 0;
  }else if(playerSelection == "rock"){
    if(computerSelection == "paper"){
      return -1;
    }else if(computerSelection == "scissors"){
      return 1
    }
  }else if(playerSelection == "paper"){
    if(computerSelection == "rock"){
      return 1
    }else if(computerSelection == "scissors"){
      return -1
    }
  }else if(playerSelection == "scissors"){
    if(computerSelection == "rock"){
      return -1
    }else if(computerSelection == "paper"){
      return 1
    }
  }
}

const playButton = document.querySelector('.playButton')
playButton.addEventListener('click',()=>{
  game()
  playButton.classList.toggle('hide')
})

const resetButton = document.querySelector('.resetButton')
resetButton.addEventListener('click',()=>{
  location.reload()
})

