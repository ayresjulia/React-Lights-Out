import { render, fireEvent } from "@testing-library/react";
import React from "react";
import Board from "./Board";

describe("smoke test", () => {
	it("renders without crashing", () => {
		render(<Board />);
	});
});

describe("snapshot test", () => {
	it("matches snapshot", () => {
		const { asFragment } = render(<Board />);
		expect(asFragment()).toMatchSnapshot();
	});
});

describe("checking for winning message", () => {
	it("should not show winning msg if all lights are on", () => {
		const { queryByText } = render(<Board nrows={1} ncols={2} chanceLightStartsOn={1} />);
		expect(queryByText("You Won!")).not.toBeInTheDocument();
	});
	it("should show winning msg if all lights are out", () => {
		const { queryByText } = render(<Board nrows={1} ncols={2} chanceLightStartsOn={0} />);
		expect(queryByText("You Won!")).toBeInTheDocument();
	});
});

describe("checking for fireEvent on Cells", () => {
	it("should be able to click on a cell and turn off the lights", () => {
		// make two lit clickable cells
		const { getAllByRole } = render(<Board nrows={1} ncols={2} chanceLightStartsOn={1} />);
		const cells = getAllByRole("button");
		// each cell will be lit at game start
		for (let cell of cells) {
			expect(cell).toHaveClass("Cell Cell-lit");
		}
		// assuming the board has two lit cells, on click -> lights out for both
		fireEvent.click(cells[0]);
		for (let c of cells) {
			expect(c).toHaveClass("Cell");
		}
	});
});
