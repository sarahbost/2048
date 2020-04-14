
/*
Add your code for Game here
 */

export default class Game {

    constructor(size) {
        this.size = size; 
        this.score = 0; 
        this.won = false; 
        this.over = false; 
        this.board = new Array(size * size); 
        for(let i = 0; i < this.board.length; i++){
                this.board[i]= 0; 
        }
        this.gameState = {board: this.board, score: this.score, won: this.won, over: this.over}; 
        this.addTile();
        this.addTile();
        this.winArray = [];
        this.loseArray = [];
        this.moveArray = [];  

    }
}

Game.prototype.addTile = function() { 
        let placed = false; 
        let i = Math.random(); 
        let tileValue = 0; 
        if(i < .9) {
            tileValue = 2; 
        } else {
            tileValue = 4; 
        } 
        let count = 0; 
        while(!placed) {
        
            let x = Math.floor(Math.random() * this.board.length);
            if( this.board[x] == 0) {
            this.board[x] = tileValue; 
            placed = true; 
            break;
            }
            count++; 
            if(count==300) {
                break; 
            }
       
        }

        
        
    }


  Game.prototype.toString = function() {
            let res = ""; 
            let i = 0; 
            let row = []; 
            let rowCount = 0; 
            while(i < this.board.length) {
                
                row[rowCount] = this.board[i]; 
                rowCount++; 
                i++; 
                if(row.length == this.size) {
                    let s = "";
                    for(let j = 0; j < row.length; j++) {
                        if(row[j] == 0) {
                            s = s + "[ " + "] "; 
                        } else {
                        s = s + "[" + row[j] + "] "; 
                        }
                    }
                    res = res + s + "\n";
                    row = []; 
                    rowCount = 0; 
                }
                
            }
            return res; 

    }; 

    Game.prototype.setupNewGame = function() {
        this.score = 0; 
        this.won = false; 
        this.over = false; 
        for(let i = 0; i < this.board.length; i++){
                this.board[i]= 0; 
        }
        this.addTile();
        this.addTile(); 
    }; 

    Game.prototype.loadGame = function(gameState) {
       // this.size = Math.SQRT1_2(this.board.length); 
        this.score = gameState.score; 
        this.won = gameState.won; 
        this.over = gameState.over; 
        this.board = gameState.board;  
    }; 

    Game.prototype.getGameState = function() {
        return {board: this.board, score: this.score, won: this.won, over: this.over}; 
    }

   
    Game.prototype.move = function(direction) {
       
        let b =[]; 
        let legal = false; 
        let won = false; 
        if(direction == "right") {

             for(let index = 0; index < this.board.length; index++) {

                            let row = []; 
                            let rowIndex = 0; 
                            let original = []; 
                            let moved = []; 

       
               for(let i = 0; i < this.size; i++) {
                
                                if(this.board[index] != 0) {
                                row[rowIndex] = this.board[index];
                                rowIndex++; 
                                } 
                
                                original.push(this.board[index]); 
                
                                index++
                    }
                
                            index--; 
                            
                            let mergedRow = []; 


                  if(row.length > 0) {

                      if(row.length == 1) {
                                            mergedRow.unshift(row[0]); 
                        
                                        //if there are 2  -- combine if equal 
                                        } else if (row.length == 2) {
                        
                                            if(row[0] == row[1]) {
                                                mergedRow.unshift(row[0] * 2); 
                                                if(row[0] == 1024) {
                                                    this.won = true; 
                                                    this.gameState = {board: this.board, score: this.score, won: true, over: this.over}; 
                                                    won = true; 
                                                    }
                                                this.score = this.score + row[0] +row[0]; 
                                            } else {
                                                mergedRow = row; 
                                            }
                        
                                        //if there are more than 3 nums go through the row 
                                        } else {
                            for(let x = row.length -1; x >=0; x--) {

                                                        //if 2 tiles next to each other are equal, then collapse and add to score 
                                                        if(row[x] == row[x-1]) {
                                                            mergedRow.unshift(row[x]*2);
                                
                                                            //if combining two 1024 to get 2048
                                                            if(row[x] == 1024) {
                                                                this.won = true; 
                                                                this.gameState = {board: this.board, score: this.score, won: true, over: this.over}; 
                                                               
                                                            }
                                                          
                                                            this.score = this.score + row[x] +row[x]; 
                                                            x--; 
                                                            //if not collapsing then add it anyway 
                                                        } else {
                                                            mergedRow.unshift(row[x]); 
                                                        }
                                                    }
                                
                        }
                    }

                         let offset = 1; 

                //let y = wherever you started and go back to the first row 
                for(let y = index; y> index - this.size; y--) {

                    //store the emrged row if its greater than 0 and store 0 if not 
                    if(mergedRow[mergedRow.length-offset] > 0) {
                        b[y] = mergedRow[mergedRow.length-offset];
                    } else {
                        b[y] =0; 
                    }
                    moved.push(mergedRow[mergedRow.length-offset]);
                    offset++; 
                }

                moved.reverse(); 
                for(let k = 0; k < original.length; k++) {
                    if(original[k] != 0 && original[k] != moved[k]) {
                        legal = true; 
                    }
                }


                


        
            }


               if(legal) {
                    this.board = b;
             }

     }  else if(direction == "left") {
        for(let index = 0; index < this.board.length; index++) {

            let row = []; 
            let rowIndex = 0; 
            let moved = []
            let original = []
        
            for(let i = 0; i < this.size; i++) {
                
                if(this.board[index] != 0) {
                row[rowIndex] = this.board[index];
                rowIndex++; 
                }
                original.push(this.board[index]); 

                index++
            }
            index--; 

            let mergedRow = []; 
            if(row.length > 0) {

                if(row.length == 1) {
                    mergedRow.push(row[0]); 
                } else if (row.length == 2) {

                    if(row[0] == row[1]) {
                        mergedRow.push(row[0] * 2); 
                        if(row[0] == 1024) {
                            this.won = true; 
                            this.gameState = {board: this.board, score: this.score, won: true, over: this.over}; 
                            won = true; 
                        }
                      
                        this.score = this.score + row[0] +row[0]; 
                    } else {
                        mergedRow = row; 
                    }
                } else {
             
                    for(let x = 0; x < row.length; x++) {
                        if(row[x] == row[x+1]) {
                            mergedRow.push(row[x]*2);
                            x++; 
                            if(row[x] == 1024) {
                                this.won = true; 
                                this.gameState = {board: this.board, score: this.score, won: true, over: this.over};
                                won = true; 
                            }
                            this.score = this.score + row[x] +row[x]; 
                        } else {
                            mergedRow.push(row[x]); 
                        }
                    }
                }
    
                //put it into board; 
                
            }
            
                let offset = 0; 
                for(let y = index - this.size + 1; y <  index + 1; y++) {
                    if(mergedRow[offset] > 0) {
                        b[y] = mergedRow[offset];
                    } else {
                        b[y] =0; 
                    }
                    moved.push(mergedRow[offset]); 
                    offset++; 
                }
                
                for(let k = 0; k < original.length; k++) {
                    if(original[k] != 0 && original[k] != moved[k]) {
                        legal = true; 
                    }
                }
               
            
        }
            if(legal) {
            this.board = b;
            }



    } else if(direction == "down") {  
      
        for(let index = 0; index < this.size; index++) {
            let row = []; 
            let rowIndex = 0;       
            let r = index; 
            let original = [];
            let moved = []; 

            while(r < this.board.length) {
                if(this.board[r] != 0) {
                    row.unshift(this.board[r])
                }
                original.push(this.board[r]); 
                r= r + this.size; 
            }


            let mergedRow = []; 
            if(row.length > 0) {

                if(row.length == 1) {
                    mergedRow.unshift(row[0]); 
                } else if (row.length == 2) {

                    if(row[0] == row[1]) {
                        mergedRow.unshift(row[0] * 2); 
                        if(row[0] == 1024) {
                            this.won = true; 
                            this.gameState = {board: this.board, score: this.score, won: true, over: this.over}; 
                            won = true; 
                        }
                        this.score = this.score + row[0] +row[0]; 
                    } else {
                        mergedRow = row.reverse(); 
                    }
                } else {
             
                    for(let x = 0; x < row.length; x++) {
                        if(row[x] == row[x+1]) {
                            mergedRow.unshift(row[x]*2);
                            x++; 
                            if(row[x] == 1024) {
                                this.won = true; 
                                this.gameState = {board: this.board, score: this.score, won: true, over: this.over}; 
                                won = true; 
                            }
                            this.score = this.score + row[x] +row[x]; 
                        } else {

                            mergedRow.unshift(row[x]); 
                        }
                    }
                }
                        
            }


          let offset = mergedRow.length-1; 
             for(let k = this.board.length - (this.size - index); k>= 0; k= k - this.size) {
                moved.push(mergedRow[offset]); 
                 if(mergedRow[offset] > 0) {
                 b[k] = mergedRow[offset];
                 offset--; 
                 } else {
                    b[k] = 0; 
                }
             }

             moved.reverse(); 
             for(let k = 0; k < original.length; k++) {
                 if(original[k] != 0 && original[k] != moved[k]) {
                     legal = true; 
                 }
             
                }
                
         }
            if(legal) {
            this.board = b;
            }

       } else if(direction = "up") {
        for(let index = 0; index < this.size; index++) {
            let row = []; 
            let rowIndex = 0;       
            let r = index; 
            let original = [];
            let moved = []; 

            while(r < this.board.length) {
                if(this.board[r] != 0) {
                    row.push(this.board[r])
                }
                r= r + this.size; 
                original.push(this.board[r]);
                
            }
 

            let mergedRow = []; 
            if(row.length > 0) {

                if(row.length == 1) {
                    mergedRow.push(row[0]); 
                } else if (row.length == 2) {

                    if(row[0] == row[1]) {
                        mergedRow.push(row[0] * 2); 
                        if(row[0] == 1024) {
                            this.won = true; 
                            this.gameState = {board: this.board, score: this.score, won: true, over: this.over}; 
                            won = true; 
                        }
                        this.score = this.score + row[0] + row[0]; 
                    } else {
                        mergedRow = row; 
                    }

                } else {
                    for(let x = 0; x < row.length; x++) {
                        if(row[x] == row[x+1]) {
                           mergedRow.push(row[x]*2);
                            if(row[x] == 1024) {
                                this.won = true;
                                this.gameState = {board: this.board, score: this.score, won: true, over: this.over}; 

                                won = true; 
                            }
                            this.score = this.score + row[x] +row[x]; 
                            x++; 

                        } else {
                            mergedRow.push(row[x]); 
                        }
                    }
                }
            }

        

                             let offset = 0; 
                             for(let y = index; y <  this.board.length; y=y+this.size) {

                                 if(mergedRow[offset] > 0) {
                                     b[y] = mergedRow[offset];
                                 } else {
                                     b[y] =0; 
                                }
                                offset++; 
                                moved.push[mergedRow[offset]]; 
                           
                            }

                            moved.reverse(); 
                            for(let k = 0; k < original.length; k++) {
                                if(original[k] != 0 && original[k] != moved[k]) {
                                    legal = true; 
                                }
                            }
            
            
            
        }
            if(legal) {
            this.board = b;
            }
        
    }
        //this.gameState = this.getGameState(); 
        if(legal) {
        this.addTile(); 

        let moreMoves = false; 
        //check if game is over 
        for(let y = 0; y < this.board.length; y++) {
            if(this.board[y] == this.board[y+this.size]) {
                moreMoves = true; 
            }

            if(this.board[y] == 0) {
                moreMoves = true; 
            } else {
                if(this.board[y] == this.board[y+1] || this.board[y] == this.board[y-1]) {
                    if(y % this.size == this.size-1 || y % this.size == 0) {
                        
                    } else {
                        moreMoves = true; 
                       
                    }
                   
                    
                } else if(this.board[y+this.size] == this.board[y] || this.board[y-this.size] == this.board[y]) {
            


                    moreMoves = true; 
                }
            }
        }

        if(moreMoves == false) {
            this.over = true; 
            this.gameState = {board: this.board, score: this.score, won: false, over: true}; 
            for(let x = 0; x < this.loseArray.length; x++) {
                let callback = this.loseArray[x];
                if(isFunction(callback)) {
                callback(this.getGameState());     

            }
          
        }
    }

        }   
        if(this.won) {
            for(let win = 0; win < this.winArray.length; win++) {
                let callback = this.winArray[win]; 
                if(isFunction(callback)) {
                    callback(this.getGameState());
                }
            }
         }
       if(this.moveArray.length >0) {
        for(let move =0; move< this.moveArray.length; move++) {
            let callbacks = this.moveArray[move]; 
            if(isFunction(callbacks)) {
            callbacks(this.gameState)
            }
        }
        
}
    }
    function isFunction(fun) {
        return fun && {}.toString.call(fun) === '[object Function]';
    }


    Game.prototype.onMove = function(callback) {
       this.moveArray.push(callback); 
    }

    Game.prototype.onLose = function(callback) {
        this.loseArray.push(callback); 

    }

    Game.prototype.onWin = function(callback) {
        this.winArray.push(callback); 
    }


 
