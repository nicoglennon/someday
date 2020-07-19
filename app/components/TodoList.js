import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Todo from "./Todo";

export default function TodoList({ todos, toggleDone }) {
  if (todos.filter((todo) => !todo.done).length === 0) {
    return (
      <View style={styles.emptyTodolist}>
        <View style={styles.emptyTodolistTextWrapper}>
          <Text style={styles.emptyTodolistText}>hooray, you're done!</Text>
          <Text style={styles.emptyTodolistEmoji}>🕺</Text>
        </View>
      </View>
    );
  }
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
  },
  emptyTodolist: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTodolistTextWrapper: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTodolistText: {
    fontSize: 18,
    fontFamily: "DMSans_400Regular",
  },
  emptyTodolistEmoji: {
    fontSize: 26,
    marginLeft: 5,
    fontFamily: "DMSans_400Regular",
  },
});
