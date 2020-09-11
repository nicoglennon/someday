import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Todo from "./Todo";
import { useMgmt } from "../hooks/useMgmt";

export default function TodoList({ todos, toggleDone }) {
  const [{ theme }] = useMgmt();
  if (todos.filter((todo) => !todo.done).length === 0) {
    return (
      <View style={styles.emptyTodolist}>
        <View style={styles.emptyTodolistTextWrapper(theme)}>
          <Text style={styles.emptyTodolistText(theme)}>
            hooray, you're done!
          </Text>
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
      <Text style={styles.doneTitle}>
        {todos.filter((todo) => todo.done).length} done
      </Text>
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
  emptyTodolistTextWrapper: (theme) => ({
    flexDirection: "row",
    padding: 15,
    borderRadius: 20,
    backgroundColor:
      theme === "dark" ? "rgba(120,190,255,0.15)" : "rgba(0,0,0,0.05)",
    alignItems: "center",
    justifyContent: "center",
  }),
  emptyTodolistText: (theme) => ({
    fontSize: 18,
    color: theme === "dark" ? "#fff" : "#333",
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
