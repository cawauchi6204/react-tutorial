import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     render() {
//         return (
//             <button
//                 className="square"
//                 onClick={() => this.props.onClick()}>
//                 {this.props.value}
//             </button>
//         );
//     }
// }

// classコンポーネントから関数コンポーネントへの書き換え
//stateを持たない場合関数コンポーネントで作った方が楽
//関数方コンポーネントはクラスコンポーネントと同じくパスカルケースでかく
function Square(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}>
            {props.value}
        </button>
        //Square を関数コンポーネントに変えた際、onClick={() => this.props.onClick()} をより短い onClick={props.onClick} に書き換えました（両側でカッコが消えています）。
    )
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        }
    }
    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }
    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />;
    }

    render() {
        const winner =
            calculateWinner(this.state.squares);
            //winnerにはsquares[a]が入ってくる。つまり'X' or 'O'が入ってくる
        let status;
        if (winner) {
            status = 'Winner:' + winner;
            //'X' or 'O'を表示する
        } else {
            status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    //勝利条件
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 6, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        //lines(二次元配列)の数だけfor文を回して[a,b,c]に代入している

        const [a, b, c] = lines[i];
        //分割代入 (Destructuring assignment) 構文は、配列から値を取り出して、あるいはオブジェクトからプロパティを取り出して別個の変数に代入することを可能にする JavaScriptの式

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            //squaresが完全に揃っている場合、squares[a]を返す
            return squares[a];
            //なぜcalculateWinner関数にsquares[a]を返すのかわからない
        }
        //このロジックの理解が浅い
    }

    return null;
    //9つのsquareの配列が与えられると、この関数は勝者がいるか適切に確認し、'X' か 'O'、あるいは null を返します。
    //->値が格納されれば勝者が誰かわかる＆まだわからない場合はnullを返すということ
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

