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
import { Modal } from "antd";
import "antd/dist/antd.css";
import "./todo_app.css";
import { useSelector, useDispatch } from "react-redux";
import { add_todo, get_todo, delete_todo, edit_todo } from "./redux/TodoSlice";
import { todoSelector } from "./redux/selectors";
const Todo = () => {
  const [data, setData] = useState("");
  const [updateData, setUpdateData] = useState({
    id: "",
    Description: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    editTodo();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dispatch = useDispatch();
  const todoState = useSelector(todoSelector);

  useEffect(async () => {
    getAll();
    console.log(updateData);
  }, [updateData]);

  const getAll = async () => {
    dispatch(get_todo());
  };

  const addTodo = async () => {
    const Description = data;
    const body = { Description };
    dispatch(add_todo(body));
    setData("");
  };

  const deleteTodo = async (id) => {
    dispatch(delete_todo(id));
    getAll();
  };

  const editTodo = async () => {
    dispatch(edit_todo(updateData));
    getAll();
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
        {todoState &&
          todoState?.map((data) => (
            <ListItem key={data.id}>
              <ListItemText primary={data.Description} />
              <Box m={3}>
                {" "}
                <Button
                  variant="contained"
                  color="primary"
                  mt={10}
                  onClick={() => {
                    showModal();
                    setUpdateData({
                      id: data.id,
                      Description: data.Description,
                    });
                  }}
                >
                  EDIT
                </Button>
              </Box>
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
      <Modal
        title="Edit Todo"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <input
          type="text"
          value={updateData.Description}
          onChange={(e) => {
            setUpdateData((prevState) => ({
              ...prevState,
              Description: e.target.value,
            }));
          }}
        />
      </Modal>
    </div>
  );
};
export default Todo;
