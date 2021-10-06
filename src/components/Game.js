import React, {useState} from 'react';

import Board from './Board';
import { calculateWinner } from '../helper';

const Game = () =>{
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [setpNumber, setStepNumber] = useState(0);
    const [xIsNext, setXisNext]= useState(true);
    const winner = calculateWinner(history[setpNumber])
    const xO = xIsNext? "x": 'o';

    const handleClick= (i) =>{
        const historyPoint = history.slice(0, setpNumber +1);
        const current = historyPoint[setpNumber];
        const squares=[...current];
        //return if won or occupied
        if(winner || squares[i]) return;
        // select square
        squares[i] =xO;
        setHistory([...historyPoint,squares]);
        setStepNumber(historyPoint.length)
        setXisNext(!xIsNext); 
    }
    const jumpTo= (step) =>{
        setStepNumber(step);
        setXisNext(step%2 ===0);
    }

    const renderMoves = () => history.map((_step,move)=>{
        const destination = move? `Go to move #${move}`: `Go to start`;
        return (
            <li key={move}>
                <button onClick= {()=> jumpTo(move)}>{destination}</button>
            </li>
        )
    })

    return(
        <>
            <h1>
                React Tic Tac Toe
            </h1>
            <Board squares= {history[setpNumber]} onClick={handleClick} />
            <div className='info-wrapper'>
                <div>
                <h3>History</h3>
                {renderMoves()}

                </div>
            <h3> {winner? "Winner " +winner : 'Next Player ' +xO }</h3>
            </div>
        </>
    )
}

export default Game