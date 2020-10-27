import React, { useState } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import TodoList from "../components/TodoList";
import { useMgmt } from "../hooks/useMgmt";
import AddItemBtn from "../components/AddItemBtn";
import TodoModal from "../components/TodoModal";
import { emojiSets } from "../utils/constants";
import { useHeaderHeight } from "@react-navigation/stack";

export default function TodosScreen() {
  const [{ lists, current, mode, color }, setStorage] = useMgmt();
  const [inspectedTodo, setInspectedTodo] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const headerHeight = useHeaderHeight();

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
    // scrollRef.current.scrollToEnd({ animated: false });
  };

  return (
    <View style={[styles.safeArea(mode)]}>
      <View style={{ height: "100%" }}>
        <View
          style={{
            paddingTop: headerHeight,
            paddingHorizontal: 15,
            paddingBottom: 12,
          }}
        >
          <Text style={styles.listEmoji}>{emojiSets[color][current]}</Text>
          <View style={styles.listTitleLine}>
            <Text style={styles.listTitle(mode)}>{lists[current].title}</Text>
            <Text style={styles.listTotal(mode)}>
              {lists[current].items.length}
            </Text>
          </View>
        </View>
        <TodoList
          todos={lists[current].items}
          toggleDone={toggleDone}
          setTodo={setTodo}
        />
      </View>
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
  listEmoji: {
    fontSize: 60,
  },
  listTitleLine: {
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
