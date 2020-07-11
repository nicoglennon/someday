import React, { useRef, useState } from "react";
import { Text, View, StyleSheet, Animated, Keyboard } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import NewTodo from "./NewTodo";

export default function AddItemBtn() {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [newTodoOpen, setNewTodoOpen] = useState(false);

  const animateOnPressInList = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  const animateOnPressOutList = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const expandButton = () => {};
  const handleCloseNewTodo = () => {
    Keyboard.dismiss();
    setNewTodoOpen(false);
  };
  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity
        onPressIn={animateOnPressInList}
        onPressOut={animateOnPressOutList}
        onPress={() => {
          setNewTodoOpen(true);
        }}
        activeOpacity={0.75}
      >
        <Animated.View
          style={[styles.addItem, { transform: [{ scale: scaleAnim }] }]}
        >
          <Text style={styles.addItemText}>✏️</Text>
        </Animated.View>
        <NewTodo open={newTodoOpen} close={handleCloseNewTodo} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  addItem: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 80,
    width: 80,
    backgroundColor: "lightgrey",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  addItemText: {
    fontSize: 35,
    fontFamily: "DMSans_700Bold",
  },
});
