import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Keyboard } from "react-native";
import TodoList from "../components/TodoList";
import { useMgmt } from "../hooks/useMgmt";
import { useHeaderHeight } from "@react-navigation/stack";
import AddItemBtn from "../components/AddItemBtn";
import TodoModal from "../components/TodoModal";

export default function TodosScreen() {
  const [{ lists, current, theme }, setStorage] = useMgmt();
  const [inspectedTodo, setInspectedTodo] = useState();
  const headerHeight = useHeaderHeight();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleNavigate = async (listId) => {
    console.log(listId);
  };

  const setTodo = (todo) => {
    setInspectedTodo(todo);
    setModalIsOpen(true);
  };

  const toggleDone = async ({ todoId }) => {
    const oldTodos = lists[current].items;
    const newTodos = oldTodos.filter((todo) => {
      return todo.id !== todoId;
    });
    await setStorage({
      theme,
      current,
      lists: { ...lists, [current]: { ...lists[current], items: newTodos } },
    });
  };

  const handleCloseNewTodo = () => {
    Keyboard.dismiss();
    setModalIsOpen(false);
    setInspectedTodo(null);
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
            setTodo={setTodo}
          />
        </View>
      </ScrollView>
      <AddItemBtn setModalIsOpen={setModalIsOpen} />
      <TodoModal
        open={modalIsOpen}
        close={handleCloseNewTodo}
        handleNavigate={handleNavigate}
        prefixedList={current}
        todo={inspectedTodo}
      />
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
