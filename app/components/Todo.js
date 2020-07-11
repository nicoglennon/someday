import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

export default function Todo({ todo, toggleDone }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleToggleDone = () => {
    toggleDone({ todoId: todo.id });
  };
  const animateOnPressInList = () => {
    Animated.spring(fadeAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  const animateOnPressOutList = () => {
    Animated.spring(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={handleToggleDone}
      onPressIn={animateOnPressInList}
      onPressOut={animateOnPressOutList}
    >
      <Animated.View
        style={[
          styles.todo,
          ...[todo.done ? styles.completed : []],
          { transform: [{ scale: fadeAnim }] },
        ]}
      >
        <View style={styles.todoChild}>
          <Text style={styles.todoText}>{todo.text}</Text>
        </View>
        <View style={styles.todoChild}>
          <Text style={styles.todoText}>{todo.done ? "🟪" : "⬜️"}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  todo: {
    flex: 1,
    padding: 18,
    marginTop: 10,
    marginBottom: 0,
    textAlign: "left",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  completed: {
    backgroundColor: "#e1c0ff",
  },
  todoText: {
    fontSize: 20,
    fontFamily: "DMSans_400Regular",
    color: "#333333",
  },
  todoChild: {},
});
