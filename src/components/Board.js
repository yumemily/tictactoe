import React from 'react'
import Square from './Square'

//score logic
// click first square starts the time
//once there is a winner, calculate uration (Current-start time)
// send it to parents to send data
let startTime = 0;
let gameOver = false;

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        // create a new array with the same values as each winning combo. i.e. when i = 0 the new array of [a, b, c] is [0, 1, 2]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

export default class Board extends React.Component {
    
    onSquareClicked = (i) => {
        if (startTime == 0){
            startTime = Date.now();
        }
        console.log('the box number', i)
        let squareList = this.props.squares.slice(); // copy the whole array into square
        if (calculateWinner(this.props.squares) || this.props.squares[i]) {
            return;
        }
        squareList[i] = this.props.nextPlayer ? 'O' : 'X'
        this.props.setParentsState({ squares: squareList, nextPlayer: !this.props.nextPlayer, history: [... this.props.history, { squares: squareList, nextPlayer: !this.props.nextPlayer }] })
    }

    

    render() {
        let status = ''
        if (gameOver){
            status = 'game over'
        } else{

        const winner = calculateWinner(this.props.squares)
        console.log(winner)

        if (winner) {
            let duration = (Date.now() - startTime) /1000
            this.props.postData(duration);
            status = "Winner: " + winner;
            gameOver = true;
            // this.props.setParentsState({winner: true})
            
        }
        else {
            status = "Next player: " + (this.props.nextPlayer ? "X" : "O");
        }

        return (
            <div>
                <h2>{status}</h2>
                <div style={{ display: 'flex' }}>
                    <Square value={this.props.squares[0]} onClick={() => this.onSquareClicked(0)} />
                    <Square value={this.props.squares[1]} onClick={() => this.onSquareClicked(1)} />
                    <Square value={this.props.squares[2]} onClick={() => this.onSquareClicked(2)} />
                </div>
                <div style={{ display: 'flex' }}>
                    <Square value={this.props.squares[3]} onClick={() => this.onSquareClicked(3)} />
                    <Square value={this.props.squares[4]} onClick={() => this.onSquareClicked(4)} />
                    <Square value={this.props.squares[5]} onClick={() => this.onSquareClicked(5)} />
                </div>
                <div style={{ display: 'flex' }}>
                    <Square value={this.props.squares[6]} onClick={() => this.onSquareClicked(6)} />
                    <Square value={this.props.squares[7]} onClick={() => this.onSquareClicked(7)} />
                    <Square value={this.props.squares[8]} onClick={() => this.onSquareClicked(8)} />
                </div>
                
            </div>
        )
    }
    }
}
