import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Cell ({ flipCellsAroundMe, isLit }) {
	const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
	return (
		<td className={classes} onClick={flipCellsAroundMe} role="button">
			{isLit && (
				<img
					className="Cell-img"
					src="https://lh3.googleusercontent.com/proxy/RgoMpRZgtnNWhvmvnRjUhv57j_xBJLMV6iNSsneS5Gp0EzeVXmwbPlLxWnzto2aztG-3mB2KSqh57Ynfc1qrUphyQ2TR-d6l8q6lSbxq3QXGMqh_NA"
					alt="lightbulb"
				/>
			)}
			{!isLit && (
				<img
					className="Cell-img-bw"
					src="https://lh3.googleusercontent.com/proxy/RgoMpRZgtnNWhvmvnRjUhv57j_xBJLMV6iNSsneS5Gp0EzeVXmwbPlLxWnzto2aztG-3mB2KSqh57Ynfc1qrUphyQ2TR-d6l8q6lSbxq3QXGMqh_NA"
					alt="lightbulb"
				/>
			)}
		</td>
	);
}

export default Cell;
