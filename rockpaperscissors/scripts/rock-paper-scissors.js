let score = JSON.parse(localStorage.getItem('score')) || { wins: 0,
    losses: 0,
    ties: 0 };


updateScoreElement();     

let isAutoPlaying = false;
let intervalId;

function autoplay() {
    if (!isAutoPlaying) {
      intervalId = setInterval(() => {
            const playerMove = pickComuterMode()
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;   
    }else {
         clearInterval(intervalId);
         isAutoPlaying = false;
    }

   
}


document.querySelector('.js-rock-button').addEventListener('click', ()=>{
    playGame('rock')
} )

document.querySelector('.js-paper-button').addEventListener('click', ()=>{
    playGame('paper')
} )

document.querySelector('.js-scissors-button').addEventListener('click', ()=>{
    playGame('scissors')
} )


 document.body.addEventListener('keydown', (event)=>{
    if(event.key === 'r'){
        playGame('rock');
    } else if (event.key === 'p'){
        playGame('paper');
    } else if (event.key === 's'){
        playGame('scissors')
    }
})

function playGame(playerMove) {
const computerMove = pickComuterMode();

let result = "";

if (playerMove === "scissors") {
if (computerMove === "rock") {
result = "you lose";
} else if (computerMove === "paper") {
result = "you win";
} else if (computerMove === "scissors") {
result = "Tie.";
}


} else if (playerMove === "paper") {
if (computerMove === "rock") {
result = "you win.";
} else if (computerMove === "paper") {
result = "Tie.";
} else if (computerMove === "scissors") {
result = "you lose";
}


} else if (playerMove === "rock") {
if (computerMove === "rock") {
result = "Tie.";
} else if (computerMove === "paper") {
result = "you lose";
} else if (computerMove === "scissors") {
result = "you win";
}
}


if (result ==='you win') {
score.wins += 1
} else if (result === 'you lose'){
score.losses += 1
}else if (result === 'Tie.'){
score.ties += 1
}

localStorage.setItem('score', JSON.stringify(score))

updateScoreElement();

document.querySelector('.js-result').innerHTML = result;

document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon" >
<img src="images/${computerMove}-emoji.png" class="move-icon" > Computer`;



}


function updateScoreElement () {
document.querySelector('.js-score').innerHTML =  `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}` 
}

function pickComuterMode() {
const randomNr = Math.random();

let computerMove = "";

if (randomNr >= 0 && randomNr < 1 / 3) {
computerMove = "rock";
} else if (randomNr >= 1 / 3 && randomNr <= 2 / 3) {
computerMove = "paper";
} else if (randomNr >= 2 / 3 && randomNr < 1) {
computerMove = "scissors";
}

return computerMove;
}