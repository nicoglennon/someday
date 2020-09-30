import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Todo from "./Todo";
import { useMgmt } from "../hooks/useMgmt";
import PropTypes from "prop-types";
import { emojiSets } from "../constants/constants";

export default function TodoList({ todos, toggleDone, setTodo }) {
  const [{ mode, current, color }] = useMgmt();
  if (todos.filter((todo) => !todo.done).length === 0) {
    return (
      <View style={styles.emptyTodolist}>
        <View style={styles.emptyTodolistTextWrapper(mode)}>
          <Text style={styles.emptyTodolistText(mode)}>
            {`hooray, you're free ${current}!`}
          </Text>
          <Text style={styles.emptyTodolistEmoji}>{emojiSets[color].done}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.todolist}>
      {todos
        .filter((todo) => !todo.done)
        .map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleDone={toggleDone}
            setTodo={setTodo}
          />
        ))}
    </View>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array,
  toggleDone: PropTypes.func.isRequired,
  setTodo: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  todoList: {
    width: "100%",
  },
  emptyTodolist: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTodolistTextWrapper: (mode) => ({
    flexDirection: "row",
    padding: 15,
    borderRadius: 20,
    backgroundColor: mode === "dark" ? "#14222e" : "rgba(0,0,0,0.05)",
    alignItems: "center",
    justifyContent: "center",
  }),
  emptyTodolistText: (mode) => ({
    fontSize: 18,
    color: mode === "dark" ? "#fff" : "#333",
    fontFamily: "DMSans_400Regular",
  }),
  emptyTodolistEmoji: {
    fontSize: 26,
    marginLeft: 5,
    fontFamily: "DMSans_400Regular",
  },
  doneTitle: {
    fontFamily: "DMSans_400Regular",
    textAlign: "right",
    margin: 10,
    color: "gray",
    fontSize: 19,
  },
});
