import React, { Component } from "react";
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
class App extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      data: "",
    };
  }
  add = async (e) => {
    const Description = this.state.data;
    e.preventDefault();
    try {
      const body = { Description };
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const list = this.state.list;
      list.push(body);
    } catch (err) {
      console.error(err.message);
    }
    this.setState({
      data: "",
    });
    const dis = this.state.list;
    console.log(dis);
  };
  change = (e) => {
    this.setState({ data: e.target.value });
  };
  deleteTodo = async (id) => {
    try {
      const del = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
      });
      console.log(del);
    } catch (err) {
      console.error(err.message);
    }
  };
  componentDidMount = async () => {
    try {
      const ap = await fetch("http://localhost:5000/api/todos");
      const res = await ap.json();
      console.log(".....", res);
      this.setState({ list: res });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <div className="Todo">
        <h1>Enter your TODO list </h1>
        <FormControl>
          <InputLabel>Enter TODO</InputLabel>
          <Input
            id="input"
            label="Standard"
            value={this.state.data}
            onChange={this.change}
            autoComplete="off"
          />
        </FormControl>{" "}
        <Button
          onClick={this.add}
          disabled={!this.state.data}
          variant="contained"
          color="secondary"
        >
          ADD
        </Button>
        <List>
          {this.state.list.map((data) => (
            <ListItem value={data.id}>
              <ListItemText primary={data.Description} />
              <Box m={3}>
                {" "}
                <Button variant="contained" color="primary" mt={10}>
                  EDIT
                </Button>
              </Box>
              {"  "}{" "}
              <Button
                onClick={this.deleteTodo(data.id)}
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
  }
}

export default App;
