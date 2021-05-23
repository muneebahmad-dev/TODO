import React, { useState, useEffect } from "react";
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

  useEffect(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/todos");
      const res = await response.json();
      setList(res);
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <div className="Todo">
      <h4>ENTER YOUR TODO</h4>
      <Input onChange={(e) => setData(e.target.value)} />
      <Button
        style={{ margin: "10px" }}
        variant="contained"
        color="primary"
        onClick={() => console.log(data)}
      >
        ADD
      </Button>

      <List>
        {list.map((data) => (
          <ListItem key={data.id}>
            <ListItemText primary={data.Description} />
            <Box m={3}>
              {" "}
              <Button variant="contained" color="primary" mt={10}>
                EDIT
              </Button>
            </Box>
            {"  "}{" "}
            <Button
              //onClick={this.deleteTodo(data.id)}
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
