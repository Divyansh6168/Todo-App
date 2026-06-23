import React from "react";

const TodoItem = ({ todo, onDelete }) => {
    return (
        <li>
            <span className="todo-text">
                {todo.title}
            </span>

            <button
                className="delete-btn"
                onClick={() => onDelete(todo._id)}
            >
                Delete
            </button>
        </li>
    );
};

export default TodoItem;