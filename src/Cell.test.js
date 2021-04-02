import { render } from "@testing-library/react";
import React from "react";
import Cell from "./Cell";

describe("smoke test", () => {
	it("renders without crashing", () => {
		render(<Cell />);
	});
});

describe("snapshot test", () => {
	it("matches snapshot", function () {
		const { asFragment } = render(<Cell />);
		expect(asFragment()).toMatchSnapshot();
	});
});
