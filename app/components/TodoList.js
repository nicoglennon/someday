import React from "react";
import { View, StyleSheet } from "react-native";
import Todo from "./Todo";

export default function TodoList({ todos, toggleDone }) {
  return (
    <View style={styles.todolist}>
      {todos
        .filter((todo) => !todo.done)
        .map((todo) => (
          <Todo key={todo.id} todo={todo} toggleDone={toggleDone} />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  todoList: {
    width: "100%",
    backgroundColor: "red",
  },
});
