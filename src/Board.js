import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board ({ nrows = 5, ncols = 5, chanceLightStartsOn = 1 }) {
	const [ board, setBoard ] = useState(createBoard());
	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
	function createBoard () {
		let initialBoard = [];
		// create array-of-arrays of true/false values

		for (let y = 0; y < nrows; y++) {
			let row = [];
			for (let x = 0; x < ncols; x++) {
				row.push(Math.random() < chanceLightStartsOn); // 100% of lights start on for winnable board assuming it's symmetric (source: https://www.jaapsch.net/puzzles/lomath.htm#all)
				// row.push(Math.random() < 0.3); // for random true/false values of cells, uncomment this. 0.3 = 30% of cell being True
			}
			initialBoard.push(row);
		}
		return initialBoard; // returns a nested array 5x5
	}

	function hasWon () {
		// TODO: check the board in state to determine whether the player has won.
		return board.every((row) => row.every((cell) => !cell));
	}

	function flipCellsAround (coord) {
		setBoard((oldBoard) => {
			const [ y, x ] = coord.split("-").map(Number); // map(Number) converts string values to nums in the array

			const flipCell = (y, x, boardCopy) => {
				// if this coord is actually on board, flip it

				if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
					boardCopy[y][x] = !boardCopy[y][x];
				}
			};

			// Make a (deep) copy of the oldBoard
			let copyOldBoard = oldBoard.map((row) => [ ...row ]);

			// in the copy, flip this cell and the cells around it
			flipCell(y, x, copyOldBoard); // flip original cell
			flipCell(y, x - 1, copyOldBoard); // flip left col cell
			flipCell(y, x + 1, copyOldBoard); // flip right col cell
			flipCell(y - 1, x, copyOldBoard); // flip top row cell
			flipCell(y + 1, x, copyOldBoard); // flip top bottom cell
			return copyOldBoard;
		});
	}

	// if the game is won, just show a winning msg & render nothing else
	if (hasWon()) {
		return <div>You Won!</div>;
	}
	// make table board
	let tableBoard = [];
	for (let y = 0; y < nrows; y++) {
		let row = [];
		for (let x = 0; x < ncols; x++) {
			let coord = `${y}-${x}`;
			row.push(
				<Cell
					key={coord}
					isLit={board[y][x]}
					flipCellsAroundMe={() => flipCellsAround(coord)}
				/>
			);
		}
		tableBoard.push(<tr key={y}>{row}</tr>);
	}
	return (
		<div>
			<table>
				<tbody>{tableBoard}</tbody>
			</table>
		</div>
	);
}

export default Board;
