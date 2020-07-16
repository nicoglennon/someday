import React, { useRef, useState } from "react";
import { Text, View, StyleSheet, Animated, Keyboard } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import NewTodo from "./NewTodo";
import * as Haptics from "expo-haptics";
import { useMgmt } from "../hooks/useMgmt";

export default function AddItemBtn({ handleNavigate, prefixedList }) {
  const [{ theme }] = useMgmt();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [newTodoOpen, setNewTodoOpen] = useState(false);

  const animateOnPressInList = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };
  const animateOnPressOutList = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
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
          style={[styles.addItem(theme), { transform: [{ scale: scaleAnim }] }]}
        >
          <Text style={styles.addItemText}>✍️</Text>
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
    bottom: 30,
    right: 30,
  },
  addItem: (theme) => ({
    height: 60,
    width: 60,
    backgroundColor: theme === "dark" ? "slategray" : "lightgrey",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  }),
  addItemText: {
    fontSize: 38,
    fontFamily: "DMSans_700Bold",
  },
});
