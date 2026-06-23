import React, { useState } from "react";

const AddTodo = ({ onAdd }) => {
    const [todo, setTodo] = useState("");
    const [added, setAdded] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!todo.trim()) return;

        try {
            await onAdd(todo);

            setAdded(true);
            setTodo("");

            setTimeout(() => {
                setAdded(false);
            }, 2000);

        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={todo}
                    placeholder="Enter a todo..."
                    onChange={(e) => setTodo(e.target.value)}
                    required
                />

                <button type="submit">
                    {added ? "✓ Added" : "Add Todo"}
                </button>
            </form>

            {added && (
                <p className="success-msg">
                    ✓ Todo added successfully
                </p>
            )}
        </>
    );
};

export default AddTodo;