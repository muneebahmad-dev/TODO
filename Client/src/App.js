import React, { useState, useEffect, useCallback } from "react";
import {
  FormControl,
  Input,
  InputLabel,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@material-ui/core";
import "./todo_app.css";
const Todo = () => {
  const [data, setData] = useState("");
  const [list, setList] = useState([]);
  const textInput = React.useRef();

  useEffect(async () => {
    getAll();
  }, []);

  const clearInput = () => (textInput.current.value = "");

  const getAll = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "GET",
      });
      const res = await response.json();
      setList(res);
    } catch (err) {
      console.log(err);
    }
  };

  const addTodo = async () => {
    const Description = data;
    try {
      const body = { Description };
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const res = await response.json();
      console.log("added", res);
      getAll();
      setData(" ");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
      });
      getAll();
    } catch (err) {
      console.log(err);
    }
  };

  const editTodo = async (id) => {
    const Description = data;
    try {
      const body = { Description };
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const res = response.json();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setData(e.target.value);
  };

  return (
    <div className="Todo">
      <h4>ENTER YOUR TODO</h4>
      <Input onChange={handleChange} value={data} />
      <Button
        disabled={!data}
        style={{ margin: "10px" }}
        variant="contained"
        color="primary"
        onClick={() => addTodo()}
      >
        ADD
      </Button>
      <List>
        {list.map((data) => (
          <ListItem key={data.id}>
            <ListItemText primary={data.Description} />
            <Box m={3}>
              {" "}
              <Button
                variant="contained"
                color="primary"
                mt={10}
                onClick={() => editTodo()}
              >
                EDIT
              </Button>
            </Box>
            {"  "}{" "}
            <Button
              onClick={() => deleteTodo(data.id)}
              variant="contained"
              color="secondary"
              mt={10}
            >
              DELETE
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
export default Todo;
