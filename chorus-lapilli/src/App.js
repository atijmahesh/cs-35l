import {useState} from 'react';

function Square({value, onSquareClick}) {
  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({xIsNext, squares, onPlay, xMoveCounter, oMoveCounter, setXIsNext}) {
  const [selectedSquare, setSelectedSquare] = useState(null);

  function place(i, nextSquares) {
    if(xIsNext) nextSquares[i] = 'X';
    else nextSquares[i] = 'O';
    return nextSquares;
  }

  function move(i, nextSquares) {
    if(nextSquares[i] === null) {
      if(xIsNext) nextSquares[i] = 'X';
      else nextSquares[i] = 'O';
    }
    return nextSquares;
  }

  function handleClick(i) {
    if(calculateWinner(squares)) return;
    else if(squares[i]) {
      if((xMoveCounter < 3 && xIsNext) || (oMoveCounter < 3 && !xIsNext)) return;
    }
    const nextSquares = squares.slice();
    let nextSquaresCopy = nextSquares;
    
    if(selectedSquare != null) {
      let adj = adjacent(i, selectedSquare);
      const firstCheck = !(nextSquaresCopy[i]==null && adj);

      //check for center
      let center = false;
      if(nextSquares[4] !== null) {
        if((xIsNext&& nextSquares[4] === 'X')||(!xIsNext&& nextSquares[4] === 'O')) {
          let win = nextSquaresCopy.slice();
          const afterMove = move(i, win);
          win = afterMove;
          win[selectedSquare] = null;
          if(calculateWinner(win)) center = true;
          else {
            if((xIsNext&& win[4] !== 'X')||(!xIsNext&& win[4] !== 'O')) {
              center = true;
            }
          }
        }
        else center = true;
      }
      else center = true;
      if(firstCheck) {
        setSelectedSquare(null);
      }
      else if(!center) {
        setSelectedSquare(null);
      }
      else {
        const afterMove = move(i, nextSquares);
        nextSquaresCopy = afterMove;
        nextSquaresCopy[selectedSquare] = null;
        setXIsNext(!xIsNext);
        setSelectedSquare(null);
      }
    }
    else {
      if((xMoveCounter < 3 && xIsNext) || (oMoveCounter < 3 && !xIsNext)) {
        nextSquaresCopy = place(i, nextSquares);
        setXIsNext(!xIsNext);
      }
      else {
        if((xIsNext && nextSquaresCopy[i] === 'X') || (!xIsNext && nextSquaresCopy[i] === 'O')) {
          setSelectedSquare(i);
        }
      }
    }
    onPlay(nextSquares);
  }


  const winner = calculateWinner(squares);
  let status;
  if(winner) {
    status = "Winner: " + winner;
  }
  else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  let status2;
  if(selectedSquare == null) status2 = '';
  else status2 = "Square Selected: " + (selectedSquare);
  

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
      <div className='status2'>{status2}</div>
    </>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xMoveCounter, setXMoveCounter] = useState(0);
  const [oMoveCounter, setOMoveCounter] = useState(0);

  function handlePlay(nextSquares) {
    setSquares(nextSquares);
    if(xIsNext) {
      if(xMoveCounter<3) setXMoveCounter(xMoveCounter+1);
    }
    else {
      if(oMoveCounter<3) setOMoveCounter(oMoveCounter+1);
    }
  }

  function clear() {
    setSquares(Array(9).fill(null));
    setXMoveCounter(0);
    setOMoveCounter(0);
  }
  function reset() {
    let descr = "Reset";
    return (
      <li>
        <button onClick={clear}>{descr}</button>
      </li>
    );
  }


  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={squares} onPlay={handlePlay} 
        xMoveCounter = {xMoveCounter} oMoveCounter={oMoveCounter} setXIsNext={setXIsNext}/>
      </div>
      <div className='xCount'>&nbsp;| X Move Count: {xMoveCounter}</div>
      <div className='oCount'>&nbsp;| O Move Count: {oMoveCounter}</div>
      <div className='game-info'>
        <ul>{reset()}</ul>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for(let i = 0; i<lines.length; i++) {
    const[a,b,c] = lines[i];
    if(squares[a] && squares[a]==squares[b] && squares[a]==squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function adjacent(selectedSquare, otherSquare) {
  switch (selectedSquare) {
    case 0:
      return otherSquare === 1 || otherSquare === 3 || otherSquare === 4;
    case 1:
      return otherSquare === 0 || otherSquare === 2 || otherSquare === 3 || otherSquare === 4 || otherSquare === 5;
    case 2:
      return otherSquare === 1 || otherSquare === 4 || otherSquare === 5;
    case 3:
      return otherSquare === 0 || otherSquare === 1 || otherSquare === 4 || otherSquare === 6 || otherSquare === 7;
    case 4:
      return otherSquare === 0 || otherSquare === 1 || otherSquare === 2 || otherSquare === 3 || otherSquare === 5 || otherSquare === 6 || otherSquare === 7 || otherSquare === 8;
    case 5:
      return otherSquare === 1 || otherSquare === 2 || otherSquare === 4 || otherSquare === 7 || otherSquare === 8;
    case 6:
      return otherSquare === 3 || otherSquare === 4 || otherSquare === 7;
    case 7:
      return otherSquare === 3 || otherSquare === 4 || otherSquare === 5 || otherSquare === 6 || otherSquare === 8;
    case 8:
      return otherSquare === 4 || otherSquare === 5 || otherSquare === 7;
    default:
      return false;
  }
}

