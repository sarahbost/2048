import Game from "./engine/game.js";

let g = new Game(4);
loadGame(g); 
let element = document.getElementById("reset"); 
element.addEventListener("click", function(){ 
    g = new Game(4); 
    loadGame(g); 
    loadHandlers(g);

    document.getElementById("win").textContent = ""; 
    document.getElementById("win").style.backgroundColor = "black";
    document.getElementById("lose").textContent = ""; 
    document.getElementById("lose").style.backgroundColor = "black";
 });

loadHandlers(g);




function loadHandlers(game) {

    document.onkeydown = checkKey;
    function checkKey(e) {
    
        e = e || window.event;
    
        if (e.keyCode == '38') {
            game.move("up"); 
            loadGame(game);
         }
        else if (e.keyCode == '40') {
            game.move("down");
            loadGame(game);      }
        else if (e.keyCode == '37') {
            game.move("left");
            loadGame(game);        }
        else if (e.keyCode == '39') {
            game.move("right");
            loadGame(game);        }
    
    }
    
}



function loadGame(game) {
if(g.board[0] != 0) {
   document.getElementById("one").textContent = g.board[0];
} else {
    document.getElementById("one").textContent = ""; 
}
if(g.board[1] != 0) {
    document.getElementById("two").textContent = g.board[1];
} else {
    document.getElementById("two").textContent = ""; 
}
if(g.board[2] != 0) {
    document.getElementById("three").textContent = g.board[2];
}else {
    document.getElementById("three").textContent = ""; 
}
if(g.board[3] != 0) {

    document.getElementById("four").textContent = g.board[3];
} else {
    document.getElementById("four").textContent = ""; 
}

if(g.board[4] != 0) {

    document.getElementById("five").textContent = g.board[4];
} else {
    document.getElementById("five").textContent = ""; 
}
if(g.board[5] != 0) {

    document.getElementById("six").textContent = g.board[5];
} else {
    document.getElementById("six").textContent = ""; 
}

if(g.board[6] != 0) {

    document.getElementById("seven").textContent = g.board[6];
} else {
    document.getElementById("seven").textContent = ""; 
}

if(g.board[7] != 0) {

    document.getElementById("eight").textContent = g.board[7];
} else {
    document.getElementById("eight").textContent = ""; 
}

if(g.board[8] != 0) {

    document.getElementById("nine").textContent = g.board[8];
}else {
    document.getElementById("nine").textContent = ""; 
}

if(g.board[9] != 0) {

    document.getElementById("ten").textContent = g.board[9];
} else {
    document.getElementById("ten").textContent = ""; 
}

if(g.board[10] != 0) {

    document.getElementById("eleven").textContent = g.board[10];
} else {
    document.getElementById("eleven").textContent = ""; 
}

if(g.board[11] != 0) {

    document.getElementById("twelve").textContent = g.board[11];
}else {
    document.getElementById("twelve").textContent = ""; 
}

if(g.board[12] != 0) {

    document.getElementById("thirteen").textContent = g.board[12];
} else {
    document.getElementById("thirteen").textContent = ""; 
}
if(g.board[13] != 0) {

    document.getElementById("fourteen").textContent = g.board[13];
} else {
    document.getElementById("fourteen").textContent = ""; 
}

if(g.board[14] != 0) {
    document.getElementById("fifteen").textContent = g.board[14];
} else {
    document.getElementById("fifteen").textContent = ""; 
}

if(g.board[15] != 0) {
    document.getElementById("sixteen").textContent = g.board[15];
} else {
    document.getElementById("sixteen").textContent = ""; 
}


document.getElementById("score").textContent = "Score: " + g.score; 

if(g.won) {
    document.getElementById("win").textContent = "YOU WON"; 
    document.getElementById("win").style.backgroundColor = "green"; 
}
if(g.over) {
    document.getElementById("lose").textContent = "YOU LOST"; 
    document.getElementById("lose").style.backgroundColor = "red"; 

}

}

