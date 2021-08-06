export const todoSelector = (state) => {
  const result = state.todoList;
  console.log(state.todoList, "state");
  return result;
};
