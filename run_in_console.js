import keypress from 'keypress';
import Game from "./engine/game";

keypress(process.stdin);


/**
 * The code in this file is used to run your game in the console. Use it
 * to help develop your game engine.
 *
 */

let game = new Game(4);
// let b = [2,  8,  2,  2, 64,  2,  4,  2,
//     8, 32,  16,  8,
//     4,  2,  8,  4];
//let b = [ 16, 4, 2, 16, 2, 256, 8, 32 ,0, 4, 16, 2, 8, 2, 32, 2]; 
//let b = [1024,1024, 2, 4, 0, 2, 8, 8, 2, 0, 0, 2, 0 , 0, 0, 4]; 
//let b = [32, 0, 2, 32, 16, 2, 256, 8, 8, 4, 2, 4, 2, 64, 16, 256]; 
//let b = [2, 4, 2, 16, 16, 64, 16, 2, 4, 8, 32, 4, 2, 2, 8, 2]
//let b = [16, 2, 2, 0, 0, 1024, 2, 8, 8, 1024, 8, 4, 0, 0 , 0, 4]
//let b = [2, 16, 4, 256, 32, 2, 8, 4, 128, 16, 8, 128, 2, 128, 8 , 2]; 
//let b = [4, 8, 2, 2, 16, 32, 8, 8, 2, 8, 64, 4, 4, 64, 2, 2];
//let b = [0, 16, 0, 8, 0, 0, 4, 4, 0, 0, 0, 4, 8, 0, 16, 8]; 
//let b = [0,2,0,0,0,2,0,0,0,4,8,0,0,0,0,8];
//let b = [0,2,0,0,0,2,0,0,0,4,8,0,0,0,0,8];
//let b = [4, 8, 16, 0, 2, 1024, 1024, 8, 8, 8, 0, 0, 0 , 0, 16, 2]; 
let b = [0, 8, 2, 16, 2, 32, 8, 2, 2, 8, 64, 4, 8, 4, 16, 2]
let gs = {board: b, score: 0, won: false, over: false}

game.loadGame(gs); 
console.log(game.toString());

game.onMove(gameState => {
   console.log(game.toString());
   console.log(game.gameState);
});

game.onWin(gameState => {
    console.log('You won with a gameState of...', gameState)
});

game.onLose(gameState => {
    console.log('You lost! :(', gameState)
    console.log(`Your score was ${gameState.score}`);
});

process.stdin.on('keypress', function (ch, key) {
    switch (key.name) {
        case 'right':
            game.move('right');
            break;
        case 'left':
            game.move('left');

            break;
        case 'down':
            game.move('down');

            break;
        case 'up':
            game.move('up');
            break;
    }
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }
});

process.stdin.setRawMode(true);
process.stdin.resume();

