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

const timeframeOptions = [
  { emoji: "💅", id: "today" },
  { emoji: "☂️", id: "tomorrow" },
  { emoji: "🔮", id: "someday" },
];

export default function Todo({ todo, toggleDone }) {
  const [checked, setChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [{ theme, current }] = useMgmt();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const deleteScaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleInspectItem = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    LayoutAnimation.configureNext({
      duration: 500,
      // create: { type: "spring", springDamping: 0.7, property: "scaleY" },
      update: { type: "spring", springDamping: 0.7 },
    });
    setIsOpen(!isOpen);
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
      onPress={handleInspectItem}
      // onPressIn={animateOnPressInList}
      // onPressOut={animateOnPressOutList}
    >
      <Animated.View
        style={[
          styles.todo(theme),
          { transform: [{ scale: scaleAnim }, { scale: deleteScaleAnim }] },
          { opacity: fadeAnim },
        ]}
      >
        <View style={styles.todoBigChild}>
          <View style={styles.todoTextWrapper}>
            <Text style={styles.todoText(theme)}>{todo.text}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setChecked(true);
              setTimeout(handleDeleteItem, 600);
            }}
            onPressIn={animateOnPressInList}
            onPressOut={animateOnPressOutList}
          >
            <View style={styles.todoCheckbox(theme, checked)}>
              <Text style={styles.checkboxText(theme)}>
                {checked && <Octicons name="check" size={24} color="white" />}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {isOpen && (
          <View style={styles.inspectWrapper}>
            <Text style={styles.inspectLabel}>MOVE TO:</Text>
            <View style={styles.inspectContainer}>
              {timeframeOptions
                .filter((option) => option.id !== current)
                .map((option) => (
                  <View style={[styles.inspectButton(theme)]} key={option.id}>
                    <Text style={styles.doneButtonEmojiText}>
                      {option.emoji}
                    </Text>
                    <Text style={styles.doneButtonText(theme)}>
                      {option.id}
                    </Text>
                  </View>
                ))}
              {/* <View style={[styles.inspectButton(theme)]}>
              <Text style={styles.doneButtonText(theme)}>done</Text>
            </View>
            <View style={styles.inspectSpacing} />
            <View style={[styles.inspectButton(theme)]}>
              <Text style={styles.doneButtonText(theme)}>move</Text>
            </View> */}
            </View>
          </View>
        )}
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
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  }),
  todoTextWrapper: {
    flex: 1,
  },
  todoText: (theme) => ({
    fontSize: 19,
    fontFamily: "DMSans_400Regular",
    color: theme === "dark" ? "#fff" : "#333",
  }),
  todoBigChild: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todoCheckbox: (theme, checked) => ({
    backgroundColor: checked ? "orchid" : theme === "dark" ? "#000" : "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    marginLeft: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: checked
      ? "orchid"
      : theme === "dark"
      ? "lightgray"
      : "darkgray",
  }),
  checkboxText: (theme) => ({
    fontSize: 22,
    textAlign: "center",
    fontFamily: "DMSans_400Regular",
    color: "white",
  }),
  inspectContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
    width: "100%",
  },
  inspectSpacing: {
    width: 10,
  },
  inspectWrapper: {
    marginTop: 6,
    // backgroundColor: "red",
    // borderLeftWidth: 2,
    // borderLeftColor: "transparent",
    // paddingLeft: 10,
  },
  inspectLabel: {
    fontSize: 12,
    color: "gray",
    marginBottom: 4,
    fontFamily: "DMSans_700Bold",
  },
  inspectButton: (theme) => ({
    marginRight: 10,
    padding: 10,
    paddingVertical: 6,
    borderRadius: 50,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor:
      theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.5)",
    borderWidth: 2,
    borderColor: theme === "dark" ? "lightgray" : "darkgray",
  }),
  doneButtonEmojiText: {
    fontSize: 20,
    marginRight: 4,
  },
  doneButtonText: (theme) => ({
    color: theme === "dark" ? "#fff" : "#333",
    fontFamily: "DMSans_700Bold",
    fontSize: 16,
  }),
});
