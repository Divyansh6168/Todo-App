import React, {useState, useEffect} from "react"

import AddTodo from "./AddTodo"
import TodoItem from "./TodoItem"
import BACKEND_URL from "../config/config"

const TodoList = () =>{
    const [todos, setTodos] = useState([]);

    useEffect(()=>{
        fetchTodos();
    }, [])

    const fetchTodos = async () =>{
        try {
            const response = await fetch(`${BACKEND_URL}/get-todos`)
            const data = await response.json()
            setTodos(data)
        } catch (error) {
            console.error("Error fetching the data", error)
        }
    }

    const addTodo = async (title) => {
    try {
        const response = await fetch(`${BACKEND_URL}/add-todo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title })
        });

        if (!response.ok) {
            throw new Error("Failed to add todo");
        }

        const newTodo = await response.json();

        setTodos((prev) => [...prev, newTodo]);

        return newTodo;

    } catch (error) {
        console.error("Error while creating the todo", error);
        throw error;
    }
};

    const deleteTodo = async (id) => {
    try {
        await fetch(`${BACKEND_URL}/delete-todo/${id}`, {
            method: "DELETE"
        });

        setTodos((prev) =>
            prev.filter(todo => todo._id !== id)
        );

    } catch (error) {
        console.error("Error deleting todo:", error);
    }
};

    return (
    <div className="todo-container">
        <h1>Todo List</h1>

        <AddTodo onAdd={addTodo} />

        <ul>
            {todos.map((todo) => (
                <TodoItem
                    key={todo._id}
                    todo={todo}
                    onDelete={deleteTodo}
                />
            ))}
        </ul>
    </div>
);

}

export default TodoList