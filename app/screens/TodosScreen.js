import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import TodoList from "../components/TodoList";
import { useMgmt } from "../hooks/useMgmt";
import { useHeaderHeight } from "@react-navigation/stack";
import AddItemBtn from "../components/AddItemBtn";

export default function TodosScreen() {
  const [{ lists, current, theme }, setState] = useMgmt();
  const headerHeight = useHeaderHeight();

  const handleNavigate = (listId) => {
    setState({ ...state, current: listId });
    navigation.navigate("List");
  };

  const toggleDone = ({ todoId }) => {
    const oldTodos = lists[current].items;
    const newTodos = oldTodos.map((todo) => {
      return todo.id === todoId ? { ...todo, done: !todo.done } : todo;
    });
    setState({
      theme,
      current,
      lists: { ...lists, [current]: { ...lists[current], items: newTodos } },
    });
  };

  return (
    <View style={[styles.safeArea(theme)]}>
      <ScrollView style={{ paddingTop: headerHeight }}>
        <View style={styles.todosScreen}>
          <View>
            <Text style={styles.listEmoji}>{lists[current].emoji}</Text>
            <Text style={styles.listTitle(theme)}>{lists[current].title}</Text>
          </View>
          <TodoList
            todos={lists[current] ? lists[current].items : []}
            toggleDone={toggleDone}
          />
        </View>
      </ScrollView>
      <AddItemBtn handleNavigate={handleNavigate} prefixedList={current} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: (theme) => ({
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: theme === "dark" ? "black" : null,
  }),
  todosScreen: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 220,
  },
  titleArea: {
    alignItems: "center",
    marginBottom: 5,
  },
  listEmoji: {
    fontSize: 50,
  },
  listTitle: (theme) => ({
    marginTop: 0,
    fontSize: 36,
    fontFamily: "DMSans_700Bold",
    color: theme === "dark" ? "#fff" : "#333",
  }),
});
