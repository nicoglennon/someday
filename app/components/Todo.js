import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Easing } from "react-native-reanimated";
import { useMgmt } from "../hooks/useMgmt";

export default function Todo({ todo, toggleDone }) {
  const [{ theme }] = useMgmt();
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
      onPress={handleDeleteItem}
      onPressIn={animateOnPressInList}
      onPressOut={animateOnPressOutList}
    >
      <Animated.View
        style={[
          styles.todo(theme),
          { transform: [{ scale: scaleAnim }, { scale: deleteScaleAnim }] },
          { opacity: fadeAnim },
        ]}
      >
        <View style={styles.todoBigChild}>
          <Text style={styles.todoText(theme)}>{todo.text}</Text>
        </View>
        {/* {checkedOff && ( */}
        {/* <View style={[styles.todoChild, styles.moreButton(theme)]}>
          <Text style={[styles.todoText, styles.moreButtonText(theme)]}>⋯</Text>
        </View> */}
        {/* )} */}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  todo: (theme) => ({
    flex: 1,
    padding: 20,
    marginTop: 10,
    marginBottom: 0,
    textAlign: "left",
    backgroundColor:
      theme === "dark" ? "rgba(120,190,255,0.15)" : "rgba(0,0,0,0.05)",
    borderRadius: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  }),
  todoText: (theme) => ({
    fontSize: 19,
    fontFamily: "DMSans_400Regular",
    color: theme === "dark" ? "#fff" : "#333",
  }),
  todoBigChild: {
    flex: 1,
  },
  // moreButton: (theme) => ({
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 30,
  // }),
  // moreButtonText: (theme) => ({
  //   color: theme === "dark" ? "darkgray" : "lightgray",
  //   fontSize: 24,
  // }),
});
