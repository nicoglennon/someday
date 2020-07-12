import React, { useRef, useState } from "react";
import { Text, View, StyleSheet, Animated, Keyboard } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import NewTodo from "./NewTodo";
import * as Haptics from "expo-haptics";

export default function AddItemBtn({ handleNavigate, prefixedList }) {
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
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setNewTodoOpen(true);
        }}
        activeOpacity={0.75}
      >
        <Animated.View
          style={[styles.addItem, { transform: [{ scale: scaleAnim }] }]}
        >
          <Text style={styles.addItemText}>✏️</Text>
        </Animated.View>
        <NewTodo
          open={newTodoOpen}
          close={handleCloseNewTodo}
          handleNavigate={handleNavigate}
          prefixedList={prefixedList}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    position: "absolute",
    alignSelf: "center",
    bottom: 40,
  },
  addItem: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 70,
    width: 70,
    backgroundColor: "lightgrey",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  addItemText: {
    fontSize: 30,
    fontFamily: "DMSans_700Bold",
  },
});
