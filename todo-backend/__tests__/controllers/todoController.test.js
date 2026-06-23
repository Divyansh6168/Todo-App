const todoController = require("../../controllers/todoController");

jest.mock("../../models/todoModel.js");

const mockFind = jest.fn();
const mockSave = jest.fn();

const Todo = require("../../models/todoModel.js");

Todo.find = mockFind
Todo.mockImplementation(()=>({
    save: mockSave
}))

describe("When Todo Controller is invoked", () => {

    let req, res;

    beforeEach(() => {

        req = {
            body: {},
            params: {}
        };

        res = {
            json: jest.fn(() => res),
            status: jest.fn(() => res),
        };

    });

    describe("For getTodos function", () => {

        it("should return all todos", async () => {

            const mockTodos = [
                { _id: 0, title: "Todo1", completed: false },
                { _id: 1, title: "Todo2", completed: false },
                { _id: 2, title: "Todo3", completed: false }
            ];

            mockFind.mockResolvedValue(mockTodos);

            await todoController.getTodos(req, res);

            expect(mockFind).toHaveBeenCalled();

            expect(res.status).toHaveBeenCalledWith(200);

            expect(res.json).toHaveBeenCalledWith(mockTodos);

        });

        it("should handle the errors occured", async () => {

            const errorMessage = "Something went wrong, please try later";

            mockFind.mockRejectedValue(new Error(errorMessage))

            await todoController.getTodos(req, res);

            expect(mockFind).toHaveBeenCalled();

            expect(res.status).toHaveBeenCalledWith(500);

            expect(res.json).toHaveBeenCalledWith({message: errorMessage});

        });

    });

    describe("For addTodos function", () => {
        it("Should add the Todos" , async () => {
            const newTodo = {_id: "1", title: "New Todo"}
            req.body = {title: "New Todo"}
            mockSave.mockResolvedValue(newTodo)

            await todoController.addTodo(req,res)

            expect(mockSave).toHaveBeenCalled();

            expect(res.status).toHaveBeenCalledWith(200);

            expect(res.json).toHaveBeenCalledWith(newTodo);


        });

        it("should handle the errors occured", async () => {

            const errorMessage = "Something went wrong, please try later";

            mockSave.mockRejectedValue(new Error(errorMessage))

            await todoController.addTodo(req, res);

            expect(mockSave).toHaveBeenCalled();

            expect(res.status).toHaveBeenCalledWith(500);

            expect(res.json).toHaveBeenCalledWith({message: errorMessage});

        });

    });

});