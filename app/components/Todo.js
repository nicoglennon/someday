import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
  LayoutAnimation,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Easing } from "react-native-reanimated";

export default function Todo({ todo, toggleDone }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const deleteScaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [checkedOff, setCheckedOff] = useState(false);

  const handleDeleteItem = () => {
    setCheckedOff(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
      }
    ).start(() => {
      LayoutAnimation.configureNext({
        duration: 500,
        create: { type: "linear", property: "opacity" },
        update: { type: "spring", springDamping: 0.8 },
        delete: { type: "linear", property: "opacity" },
      });
      toggleDone({ todoId: todo.id });
    });
  };

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
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={handleDeleteItem}
      onPressIn={animateOnPressInList}
      onPressOut={animateOnPressOutList}
    >
      <Animated.View
        style={[
          styles.todo,
          ...[todo.done ? styles.completed : []],
          { transform: [{ scale: scaleAnim }, { scale: deleteScaleAnim }] },
          { opacity: fadeAnim },
        ]}
      >
        <View style={styles.todoChild}>
          <Text style={styles.todoText}>{todo.text}</Text>
        </View>
        {checkedOff && (
          <View style={styles.todoChild}>
            {/* <Text style={styles.todoText}>X</Text> */}
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  todo: {
    flex: 1,
    padding: 20,
    marginTop: 10,
    marginBottom: 0,
    textAlign: "left",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 30,
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
