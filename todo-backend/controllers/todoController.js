const Todo = require("../models/todoModel");
const logger = require("../utils/logger");

exports.getTodos = async (req, res) => {
    try {
        logger.info("Fetching todos from DB");

        const todos = await Todo.find();

        logger.info(`Fetched ${todos.length} todos`);

        res.status(200).json(todos);

    } catch (error) {
        logger.error("Error while fetching todos:", error);

        res.status(500).json({
            message: "Something went wrong while fetching todos"
        });
    }
};

exports.addTodo = async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const title = req.body.title;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                message: "Todo title is required"
            });
        }

        const newTodo = new Todo({
            title
        });

        const savedTodo = await newTodo.save();

        res.status(201).json(savedTodo);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Todo deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};