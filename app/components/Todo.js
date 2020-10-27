import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Easing } from "react-native-reanimated";
import { useMgmt } from "../hooks/useMgmt";
import PropTypes from "prop-types";
import { emojiSets } from "../utils/constants";

export default function Todo({ todo, toggleDone, setTodo, drag, isDragging }) {
  const [checked, setChecked] = useState(false);
  const [{ mode, color }] = useMgmt();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const deleteScaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleInspectItem = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTodo(todo);
  };
  const handleDragItem = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    drag();
  };

  const handleDeleteItem = () => {
    Animated.parallel(
      [
        Animated.timing(deleteScaleAnim, {
          toValue: 1.15,
          useNativeDriver: true,
          duration: 100,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          useNativeDriver: true,
          duration: 100,
        }),
      ],
      {
        easing: Easing.ease,
      },
    ).start(() => {
      LayoutAnimation.configureNext({
        duration: 500,
        create: { type: "linear", property: "opacity" },
        update: { type: "spring", springDamping: 0.7 },
        delete: { type: "linear", property: "opacity" },
      });
      toggleDone({ todoId: todo.id });
    });
  };

  const animateOnPressInList = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
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
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={handleInspectItem}
      onPressIn={animateOnPressInList}
      onPressOut={animateOnPressOutList}
      onLongPress={handleDragItem}
    >
      <Animated.View
        style={[
          styles.todo(mode),
          {
            transform: [{ scale: scaleAnim }, { scale: deleteScaleAnim }],
          },
          { opacity: isDragging ? 0.6 : fadeAnim },
        ]}
      >
        <View style={styles.todoBigChild}>
          <View style={styles.todoTextWrapper}>
            <Text style={styles.todoText(mode)}>{todo.text}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setChecked(true);
              setTimeout(handleDeleteItem, 200);
            }}
            onPressIn={animateOnPressInList}
            onPressOut={animateOnPressOutList}
          >
            <View style={styles.todoCheckbox(mode, color, checked)}>
              <Text style={styles.checkboxText}>
                {checked && <Octicons name="check" size={24} color="white" />}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  toggleDone: PropTypes.func.isRequired,
  setTodo: PropTypes.func.isRequired,
  drag: PropTypes.func.isRequired,
  isDragging: PropTypes.bool,
};

const styles = StyleSheet.create({
  todo: (mode, isDragging) => ({
    flex: 1,
    padding: 20,
    opacity: isDragging ? 0.7 : 1,
    marginTop: 10,
    marginBottom: 0,
    marginLeft: 15,
    marginRight: 15,
    textAlign: "left",
    backgroundColor: mode === "dark" ? "#14222e" : "rgba(0,0,0,0.05)",
    borderRadius: 24,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  }),
  todoTextWrapper: {
    flex: 1,
  },
  todoText: (mode) => ({
    fontSize: 19,
    fontFamily: "DMSans_400Regular",
    color: mode === "dark" ? "#fff" : "#333",
  }),
  todoBigChild: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todoCheckbox: (mode, color, checked) => ({
    backgroundColor: checked
      ? emojiSets[color].checkboxColor
      : mode === "dark"
      ? "#000"
      : "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    marginLeft: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: checked
      ? emojiSets[color].checkboxColor
      : mode === "dark"
      ? "lightgray"
      : "darkgray",
  }),
  checkboxText: {
    fontSize: 22,
    textAlign: "center",
    fontFamily: "DMSans_400Regular",
    color: "white",
  },
});
