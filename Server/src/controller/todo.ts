import { getRepository } from "typeorm";
import { Todo } from "../entity/Todo";

const getAll = async (req, res) => {
  const getAll = await getRepository(Todo).find();
  res.header("Access-Control-Allow-Origin", "*");
  res.send(getAll);
};
interface TodoIntf {
  Description: string;
}
const newTodo = async (req, res) => {
  const { Description } = req.body;

  let newTodo: TodoIntf = new Todo();
  newTodo = {
    Description,
  };
  try {
    const response = await getRepository(Todo).save(newTodo);
    res.send(response);
    console.log(response);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await getRepository(Todo).delete({ id });

    res.header("Access-Control-Allow-Origin", "*");
    res.send(todo);
    console.log(todo);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

module.exports = { getAll, newTodo, deleteTodo };
