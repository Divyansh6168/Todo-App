import React from "react";

import {render,fireEvent,screen,cleanup,waitFor } from "@testing-library/react";

import TodoItem from "../../components/TodoItem";

afterEach(() => {
    cleanup();
    jest.resetAllMocks();
});

describe("Testing the Todo Item component", () => {

    const mockTodo = {
        _id: "1",
        title: "New Todo",
        completed: false
    };

    test("check if the todo title gets rendered", () => {
        render(
            <TodoItem
                todo={mockTodo}
                onDelete={() => {}}
            />
        );

        expect(
            screen.getByText("New Todo")
        ).toBeInTheDocument();
    });

    test("check if the delete button gets rendered", () => {
        render(
            <TodoItem
                todo={mockTodo}
                onDelete={() => {}}
            />
        );

        expect(
            screen.getByRole("button", {
                name: /Delete/i
            })
        ).toBeInTheDocument();
    });

    test("check if the onDelete method is invoked when delete button is clicked", () => {
        const mockOnDelete = jest.fn();

        render(
            <TodoItem
                todo={mockTodo}
                onDelete={mockOnDelete}
            />
        );

        const deleteButton = screen.getByRole("button", {
            name: /Delete/i
        });

        fireEvent.click(deleteButton);

        expect(mockOnDelete)
            .toHaveBeenCalledWith("1");
    });

});