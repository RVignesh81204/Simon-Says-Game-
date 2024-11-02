let gameSeq = [];
let userSeq = [];
let highScore = [];

let btns = ["red", "turq", "orange", "blue"];

let gameSt = false;
let level = 0;

let h4 = document.querySelector("h4");
let body = document.querySelector("body");


document.addEventListener("keypress", function () {
    if(gameSt == false){
        console.log("game has started");
        gameSt = true;      

     //now when any key is pressed ..we want a level up and a flash to appear on any button.

     levelUp();
    }
});

 //from line 11-18...the code means the game will start once only.


//when game flashes any button...there will be white background
function gameFlash (btn) {
    btn.classList.add("flash");

    //flash will display only for 1 second
    setTimeout(function() {
        btn.classList.remove("flash")
    },250);
}


//when user flashes any button means when he clicks any button...there will be green background
function userFlash (btn) {
    btn.classList.add("userflash");

    //flash will display only for 1 second
    setTimeout(function() {
        btn.classList.remove("userflash")
    },250);
}

//Note - Why we have created btnFlash function....this is because whenever in a website we have to perform
// a task on a repetitive basis...there we can make a function for it.

//Flashing a button is going to be performed on gameSeq and for userSeq also. Hence we have made a 
// common function that is 'btnFlash' which will flash a light on any random button for 0.25 seconds.

function levelUp () {
    userSeq = [];
    level++;
    h4.innerText = `Level ${level}`

    //Selecting any random button on which btnFlash will execute.

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns (idx) {

    
      //value of level = no. of items in gameSeq = no. of items in userSeq

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
          setTimeout(levelUp,600);
    } 
    } else {
        highScore.push(level-1);
        h4.innerHTML = `Game Over!! Your score was ${level - 1}. Press any key to restart the game. <br>
        HIGH SCORE: ${Math.max(...highScore)}`;
        bgchange();
        reset();
    }
}

function btnClick () {
    // console.log("button was pressed.");
    let btn = this;  //accessing which button was clicked
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".box");

for(btn of allBtns){
    btn.addEventListener("click", btnClick);

}

function bgchange () {
    body.classList.add("bgred");

    setTimeout(function () {
        body.classList.remove("bgred")
    },250);
} 

function reset () {
     gameSt = false;
     gameSeq = [];
     userSeq = [];
     level = 0;
}

