
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
const player1RightArm = document.getElementById("rightArm1");
const player1LeftLeg = document.getElementById("leftLeg1");
const player1RightLeg = document.getElementById("rightLeg1");
const player2LeftArm = document.getElementById("leftArm2");
const player2RightArm = document.getElementById("rightArm2");
const player2LeftLeg = document.getElementById("leftLeg2");
const player2RightLeg = document.getElementById("rightLeg2");

const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");

const timer = document.getElementById("timer");

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
        if(currentPlayer == 0){
            if(currentPart == 0){
                player1LeftArm.textContent = `Left arm: ${color}`;
            }
            else if(currentPart == 1){
                player1RightArm.textContent = `Right arm: ${color}`;
            }
            else if(currentPart == 2){
                player1LeftLeg.textContent = `Left leg: ${color}`;
            }
            else if(currentPart == 3){
                player1RightLeg.textContent = `Right leg: ${color}`;
            }
        }
        else if(currentPlayer == 1){
            if(currentPart == 0){
                player2LeftArm.textContent = `Left arm: ${color}`;
            }
            else if(currentPart == 1){
                player2RightArm.textContent = `Right arm: ${color}`;
            }
            else if(currentPart == 2){
                player2LeftLeg.textContent = `Left leg: ${color}`;
            }
            else if(currentPart == 3){
                player2RightLeg.textContent = `Right leg: ${color}`;
            }
        }
    }
}


function startGame(){
    for (let i = 0; i < players.length; i++){
        players[i].introduce();
    }
    input.textContent = "Game starts now!";
    currentPlayer = Math.floor(Math.random() * 2);
    runGame();
    timerCountdown();
}


function runGame(){
    gameInterval = new IntervalTimer(() => {
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

        // players[currentPlayer].sayParts();

        if(currentPlayer == 1){
            currentPlayer = 0;
        }
        else{
            currentPlayer++;
        }
        
    }, 3000);
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

function timerCountdown(){
    let seconds = 3;
    setTimeout(3000);
    countdown = new IntervalTimer(() => {
        timer.textContent = `${seconds}s`;
        seconds--;
        if(seconds == -1){
            seconds = 3;
        }
    }, 1000);

}


function IntervalTimer(callback, interval) {
    var timerId, startTime, remaining = 0;
    var state = 0; //  0 = idle, 1 = running, 2 = paused, 3= resumed
    this.pause = function () {
        if (state != 1) return;

        remaining = interval - (new Date() - startTime);
        window.clearInterval(timerId);
        state = 2;
    };

    this.resume = function () {
        if (state != 2) return;

        state = 3;
        window.setTimeout(this.timeoutCallback, remaining);
    };

    this.timeoutCallback = function () {
        if (state != 3) return;

        callback();

        startTime = new Date();
        timerId = window.setInterval(callback, interval);
        state = 1;
    };

    startTime = new Date();
    timerId = window.setInterval(callback, interval);
    state = 1;
}

let isPaused = false;

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        event.preventDefault();
        isPaused = !isPaused;
        
        if(isPaused){
            console.log("Paused");
            gameInterval.pause();
        } else {
            console.log("Resumed");
            gameInterval.resume();
        }

    }
  });


button.addEventListener('click', () => {
    button.classList.add('slide-out');
    gameContainer.style.width = "80vh";
    gameContainer.style.height = "80vh";
    setTimeout(() => {
        button.style.display = 'none';
        player1.style.display = 'flex';
        player2.style.display = 'flex';
    }, 450);
});
