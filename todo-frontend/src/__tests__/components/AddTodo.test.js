import React from "react";

import {render,fireEvent,screen,cleanup,waitFor } from "@testing-library/react";

import AddTodo from "../../components/AddTodo";

afterEach(() => {
    cleanup();
    jest.resetAllMocks();
});

describe("Testing the Add Todo component", () => {

    test("Render the input field and add button", () => {
        render(<AddTodo onAdd={() => {}} />);

        expect(
            screen.getByPlaceholderText("Enter a todo...")
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /Add Todo/i
            })
        ).toBeInTheDocument();
    });



});