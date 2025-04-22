
let currentPlayer = -1;
let names = [];
const input = document.getElementById("result");
const playerName = document.getElementById("name");
const titlePlayer = document.getElementById("name-select-h3");
const nameSelection = document.getElementById("name-select");
const startGameButton = document.getElementById("start-btn");
const playersNames = document.getElementById("playersNames");
const button = document.getElementById("start-btn");
const gameContainer = document.getElementById("game-container");


const colors = ["Green", "Yellow", "Blue", "Red"];
const part = ["Left arm", "Right arm", "Left leg", "Right leg"];

let currentColor = -1;
let currentPart = -1;

let gameInterval = null;


class Player{
    static playerCount = 0;

    constructor(name){
        this.state = {
            leftArm: "-",
            rightArm: "-",
            leftLeg: "-",
            rightLeg: "-"
        };
        this.name = name;
        Player.playerCount++;
    }

    setPart(part, color){
        if (this.data.hasOwnProperty(part)) {
            this.data[part] = color;
        } else {
            console.warn(`Part ${part} does not exist.`);
        }
    }
}






function startGame(){
    input.textContent = "Game starts now!";
    currentPlayer = Math.floor(Math.random() * 2);
    runGame();
}



function runGame(){
    gameInterval =  setInterval(() => {
        currentColor = Math.floor(Math.random() * 4);
        currentPart = Math.floor(Math.random() * 4);
        input.textContent = `${names[currentPlayer]} \n ${part[currentPart]} \n ${colors[currentColor]}`;
        if(currentColor == 0){
            document.body.style.backgroundColor = "hsl(129, 65%, 80%)";
        }
        else if(currentColor == 1){
            document.body.style.backgroundColor = "hsl(73, 91.00%, 82.50%)";
        }
        else if(currentColor == 2){
            document.body.style.backgroundColor = "hsl(224, 64.70%, 80.00%)";
        }
        else if(currentColor == 3){
            document.body.style.backgroundColor = "hsl(0, 64.70%, 80.00%)";
        }
        if(currentPlayer == 1){
            currentPlayer = 0;
        }
        else{
            currentPlayer++;
        }
    }, 3000);
}


function stopGame(){
    clearInterval()
}

function submitName(){
    if(names.length == 0){
        if(playerName.value === ""){
            names.push("Player 1");
            const player1 = new Player("Player 1");
        }
        else{

            
            names.push(playerName.value);
            const player1 = new Player(playerName.value);
        }
        playerName.value = "";
        console.log(names);
        titlePlayer.textContent = "Player 2:";
    }
    else if(names.length == 1){
        if(playerName.value === ""){
            names.push("Player 2");
            const player2 = new Player("Player 2");
        }
        else{
            names.push(playerName.value);
            const player2 = new Player(playerName.value);
        }
        console.log(names);
        nameSelection.style.display = "none";
        startGameButton.style.display = "flex";
    }
}

button.addEventListener('click', () => {
    button.classList.add('slide-out');
    gameContainer.style.width = "80vh";
    gameContainer.style.height = "80vh";
    setTimeout(() => {
        button.style.display = 'none';
    }, 450);
});
