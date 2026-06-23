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

    test("When form is submitted, the onAdd function is invoked", async () => {
        const mockOnAdd = jest.fn().mockResolvedValue();

        render(<AddTodo onAdd={mockOnAdd} />);

        const input = screen.getByPlaceholderText(
            "Enter a todo..."
        );

        const button = screen.getByRole("button", {
            name: /Add Todo/i
        });

        fireEvent.change(input, {
            target: {
                value: "New Todo"
            }
        });

        fireEvent.click(button);

        await waitFor(() => {
            expect(mockOnAdd)
                .toHaveBeenCalledWith("New Todo");
        });
    });

    test("Input gets cleared after submission", async () => {
        const mockOnAdd = jest.fn().mockResolvedValue();

        render(<AddTodo onAdd={mockOnAdd} />);

        const input = screen.getByPlaceholderText(
            "Enter a todo..."
        );

        const button = screen.getByRole("button", {
            name: /Add Todo/i
        });

        fireEvent.change(input, {
            target: {
                value: "New Todo"
            }
        });

        expect(input.value).toBe("New Todo");

        fireEvent.click(button);

        await waitFor(() => {
            expect(input.value).toBe("");
        });
    });

});