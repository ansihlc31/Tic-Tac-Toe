
let turn ="X";
let cells = document.querySelectorAll('[data-cell]');
let message = document.querySelector('#message');
let restart = document.querySelector('#restart');
let steps = {
    X:[],
    O:[]
}
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell =>{
    cell.addEventListener('click',()=> move(cell))
})

function move(cell){
    cell.innerHTML=turn;
    cell.style.pointerEvents = 'none'; // making that cell not clickable so it can't be changed
    let cellIndex = parseInt(cell.getAttribute("data-cell"));

if(turn==='X'){
    steps.X.push(cellIndex)
}else{
    steps.O.push(cellIndex)

}
changeTurn();

}
function changeTurn(){
    let winner=validateWin();
    if(winner){
        stopGame(`${winner}'s win!`);

    }
    else if(!winner && steps.X.length + steps.O.length === 9) 
    
       { stopGame('Draw!');}
    else {
        
        if (turn === 'X') {
            turn = 'O';
        } else {
            turn = 'X';
        }
        
        message.innerHTML = `${turn}'s turn`;
    }
}

function stopGame(msg){
    message.innerHTML=msg;
    cells.forEach(cell => {
        cell.style.pointerEvents = 'none';
    });

}

function validateWin() {
    let win = null;
    let winner = null;
    if (turn === 'X') {
        win = winConditions.some(winCondition => {
            return winCondition.every(condition => steps.X.includes(condition));
        });
        if (win) winner = 'X';
    } else if (turn === 'O') {
        win = winConditions.some(winCondition => {
            return winCondition.every(condition => steps.O.includes(condition));
        });
        if (win) winner = 'O';
    }
    return winner;
}
