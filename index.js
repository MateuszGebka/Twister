
let currentPlayer = -1;
let names = [];
let players = [];
const input = document.getElementById("result");
const playerName = document.getElementById("name");
const titlePlayer = document.getElementById("name-select-h3");
const nameSelection = document.getElementById("name-select");
const startGameButton = document.getElementById("start-btn");
const playersNames = document.getElementById("playersNames");
const button = document.getElementById("start-btn");
const gameContainer = document.getElementById("game-container");
const playerName1 = document.getElementById("playerName1");
const playerName2 = document.getElementById("playerName2");
const player1LeftArm = document.getElementById("leftArm1");
const player1RighttArm = document.getElementById("rightArm1");
const player1LeftLeg = document.getElementById("leftLeg1");
const player1RightLeg = document.getElementById("rightLeg1");
const player2LeftArm = document.getElementById("leftArm2");
const player2RighttArm = document.getElementById("rightArm2");
const player2LeftLeg = document.getElementById("leftLeg2");
const player2RightLeg = document.getElementById("rightLeg2");

const colors = ["Green", "Yellow", "Blue", "Red"];
const part = ["Left arm", "Right arm", "Left leg", "Right leg"];

let currentColor = -1;
let currentPart = -1;

let gameInterval = null;

class Player{
    static playerCount = 0;

    constructor(name){
        this.state = {
            "Left arm": "-",
            "Right arm": "-",
            "Left leg": "-",
            "Right leg": "-"
        };
        this.name = name;
        Player.playerCount++;
    }


    introduce() {
        console.log(`I am ${this.name}`);
    }


    sayParts() {
        for(const [part, color] of Object.entries(this.state)){
            console.log(`Part: ${part}, Color: ${color}`);
        }
    }

    setPart(part, color){
        console.log(`seting part: ${part}, setting color: ${color}`);
        this.state[part] = color;
        
    }
}


function startGame(){
    for (let i = 0; i < players.length; i++){
        players[i].introduce();
    }
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
            players[currentPlayer].setPart(part[currentPart], colors[currentColor]);
        }
        else if(currentColor == 1){
            document.body.style.backgroundColor = "hsl(73, 91.00%, 82.50%)";
            players[currentPlayer].setPart(part[currentPart], colors[currentColor]);
        }
        else if(currentColor == 2){
            document.body.style.backgroundColor = "hsl(224, 64.70%, 80.00%)";
            players[currentPlayer].setPart(part[currentPart], colors[currentColor]);
        }
        else if(currentColor == 3){
            document.body.style.backgroundColor = "hsl(0, 64.70%, 80.00%)";
            players[currentPlayer].setPart(part[currentPart], colors[currentColor]);
        }

        players[currentPlayer].sayParts();

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
            players.push(new Player(`Player 1`));
            playerName1.textContent = "Player 1";
        }
        else{
            names.push(playerName.value);
            players.push(new Player(`${playerName.value}`));
            playerName1.textContent = playerName.value;
        }
        playerName.value = "";
        console.log(names);
        titlePlayer.textContent = "Player 2:";
    }
    else if(names.length == 1){
        if(playerName.value === ""){
            names.push("Player 2");
            players.push(new Player(`Player 2`));
            playerName2.textContent = "Player 2";
        }
        else{
            names.push(playerName.value);
            players.push(new Player(`${playerName.value}`));
            playerName2.textContent = playerName.value;
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
