const express = require("express");
const router = express.Router();

const todosController = require("../controller/todo");

router.get("/todos", todosController.getAll);
router.post("/todos", todosController.newTodo);
router.delete("/todos/:id", todosController.deleteTodo);
router.put("/todos/:id", todosController.editTodo);

module.exports = router;
