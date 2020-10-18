import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Todo from "./Todo";
import { useMgmt } from "../hooks/useMgmt";
import PropTypes from "prop-types";
import { emojiSets } from "../constants/constants";
import DraggableFlatList from "react-native-draggable-flatlist";
import * as Haptics from "expo-haptics";

export default function TodoList({ todos, toggleDone, setTodo }) {
  const [{ mode, lists, current, color }, setState] = useMgmt();

  const reorderItems = ({ data }) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setState({
      lists: {
        ...lists,
        [current]: {
          ...lists[current],
          items: data,
        },
      },
    });
  };

  const renderTodo = ({ item, drag, isActive }) => {
    return (
      <Todo
        key={item.id}
        todo={item}
        toggleDone={toggleDone}
        setTodo={setTodo}
        drag={drag}
        isDragging={isActive}
      />
    );
  };
  if (todos.length === 0) {
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
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        contentContainerStyle={{ paddingBottom: 120 }}
        ListHeaderComponentStyle={{ marginLeft: 15, marginRight: 15 }}
        data={todos}
        renderItem={renderTodo}
        keyExtractor={(item) => `draggable-item-${item.id}`}
        onDragEnd={reorderItems}
      />
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
    flex: 1,
    alignItems: "center",
    marginTop: 100,
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
  listEmoji: {
    fontSize: 60,
  },
  listTitleLine: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
});
