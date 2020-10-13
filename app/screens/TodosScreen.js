import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Keyboard } from "react-native";
import TodoList from "../components/TodoList";
import { useMgmt } from "../hooks/useMgmt";
import { useHeaderHeight } from "@react-navigation/stack";
import AddItemBtn from "../components/AddItemBtn";
import TodoModal from "../components/TodoModal";
import { emojiSets } from "../constants/constants";

export default function TodosScreen() {
  const [{ lists, current, mode, color }, setStorage] = useMgmt();
  const [inspectedTodo, setInspectedTodo] = useState();
  const headerHeight = useHeaderHeight();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const scrollRef = useRef();

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
      lists: { ...lists, [current]: { ...lists[current], items: newTodos } },
    });
  };

  const handleCloseNewTodo = () => {
    Keyboard.dismiss();
    setModalIsOpen(false);
  };

  const clearInspectedTodo = () => {
    setInspectedTodo(null);
  };

  const scrollToBottom = () => {
    scrollRef.current.scrollToEnd({ animated: false });
  };

  return (
    <View style={[styles.safeArea(mode)]}>
      <ScrollView style={{ paddingTop: headerHeight }} ref={scrollRef}>
        <View style={styles.todosScreen}>
          <View>
            <Text style={styles.listEmoji}>{emojiSets[color][current]}</Text>
            <View style={styles.listTitleLine}>
              <Text style={styles.listTitle(mode)}>{lists[current].title}</Text>
              <Text style={styles.listTotal(mode)}>
                {lists[current].items.length}
              </Text>
            </View>
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
        clearTodo={clearInspectedTodo}
        handleNavigate={handleNavigate}
        prefixedList={current}
        todo={inspectedTodo}
        scrollToBottom={scrollToBottom}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: (mode) => ({
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: mode === "dark" ? "black" : null,
  }),
  todosScreen: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 220,
  },
  listEmoji: {
    fontSize: 60,
  },
  listTitleLine: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  listTitle: (mode) => ({
    marginTop: 0,
    fontSize: 36,
    fontFamily: "DMSans_700Bold",
    color: mode === "dark" ? "#fff" : "#333",
  }),
  listTotal: (mode) => ({
    marginTop: 0,
    fontSize: 30,
    fontFamily: "DMSans_700Bold",
    color: mode === "dark" ? "#555" : "lightgrey",
  }),
});
