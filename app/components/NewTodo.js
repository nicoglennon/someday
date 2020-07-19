import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  LayoutAnimation,
} from "react-native";
import Modal from "react-native-modal";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { useMgmt } from "../hooks/useMgmt";
import shortid from "shortid";

export default function NewTodo({ item, open, close, prefixedList }) {
  const [{ lists, current, theme }, setState] = useMgmt();

  const timeframeOptions = [
    { emoji: "💅", id: "today" },
    { emoji: "☂️", id: "tomorrow" },
    { emoji: "🔮", id: "someday" },
  ];
  const [timeframeSelected, setTimeframeSelected] = useState(0);
  const [inputText, setInputText] = useState("");
  const handleClose = () => {
    close();
    setInputText("");
    setTimeframeSelected(0);
  };
  const toggleTimeframeSelected = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTimeframeSelected((timeframeSelected + 1) % 3);
    LayoutAnimation.configureNext({
      duration: 250,
      update: { type: "spring", springDamping: 0.7 },
    });
  };

  const timeframeScaleAnim = useRef(new Animated.Value(1)).current;
  const submitScaleAnim = useRef(new Animated.Value(1)).current;
  const animateOnPressIn = (anim) => {
    Animated.spring(anim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };
  const animateOnPressOut = (anim) => {
    Animated.spring(anim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const handleCreateItem = () => {
    const newItem = { text: inputText, done: false, id: shortid.generate() };
    const listToUpdateId =
      prefixedList || timeframeOptions[timeframeSelected].id;
    const oldListItems = lists[listToUpdateId].items;
    const newListItems = [...oldListItems, newItem];
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    LayoutAnimation.configureNext({
      duration: 500,
      create: { type: "spring", springDamping: 0.7, property: "scaleXY" },
    });
    setState({
      theme,
      current: listToUpdateId,
      lists: {
        ...lists,
        [listToUpdateId]: { ...lists[listToUpdateId], items: newListItems },
      },
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    handleClose();
  };
  return (
    <View>
      <Modal
        testID={"modal"}
        isVisible={open}
        onSwipeComplete={handleClose}
        swipeDirection={["down"]}
        animationInTiming={600}
        animationIn={{
          from: {
            translateY: 300,
          },
          to: {
            translateY: 0,
          },
          easing: "ease-out-expo",
        }}
        style={styles.modal}
        onBackdropPress={handleClose}
        backdropColor="#111"
        avoidKeyboard
      >
        <View style={styles.content(theme)}>
          <View style={styles.dragbar}></View>
          <View style={styles.textInputWrapper}>
            <TextInput
              value={inputText}
              placeholderTextColor={theme === "dark" ? "darkgray" : "lightgray"}
              style={styles.input(theme)}
              onChangeText={(text) => {
                LayoutAnimation.configureNext({
                  duration: 600,
                  update: { type: "spring", springDamping: 0.6 },
                });
                setInputText(text);
              }}
              placeholder="someday I will..."
              autoFocus
            />
          </View>
          {!!inputText && (
            <View style={styles.buttonsWrapper}>
              <View>
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={handleCreateItem}
                  onPressIn={() => animateOnPressIn(submitScaleAnim)}
                  onPressOut={() => animateOnPressOut(submitScaleAnim)}
                >
                  <Animated.View
                    style={[
                      styles.generalButton,
                      styles.createButton(theme),
                      { transform: [{ scale: submitScaleAnim }] },
                    ]}
                  >
                    <Text
                      style={[
                        styles.generalButtonText(theme),
                        styles.createButtonText(theme),
                      ]}
                    >
                      add
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>
              {!prefixedList && (
                <View>
                  <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={() => {
                      toggleTimeframeSelected();
                    }}
                    onPressIn={() => animateOnPressIn(timeframeScaleAnim)}
                    onPressOut={() => animateOnPressOut(timeframeScaleAnim)}
                  >
                    <Animated.View
                      style={[
                        styles.generalButton,
                        styles.timeframeButton,
                        { transform: [{ scale: timeframeScaleAnim }] },
                      ]}
                    >
                      <Text
                        style={[
                          styles.generalButtonText(theme),
                          styles.emojiText,
                        ]}
                      >
                        {timeframeOptions[timeframeSelected].emoji}{" "}
                      </Text>
                      <Text style={[styles.generalButtonText(theme)]}>
                        {timeframeOptions[timeframeSelected].id}
                      </Text>
                    </Animated.View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  content: (theme) => ({
    backgroundColor: theme === "dark" ? "black" : "white",
    padding: 25,
    paddingTop: 15,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  }),
  dragbar: {
    width: 50,
    height: 4,
    borderRadius: 2,
    backgroundColor: "lightgray",
    marginBottom: 15,
  },
  textInputWrapper: { width: "100%" },
  input: (theme) => ({
    color: theme === "dark" ? "#fff" : "#333",
    backgroundColor:
      theme === "dark" ? "rgba(120,190,255,0.15)" : "rgba(0,0,0,0.05)",
    padding: 20,
    paddingVertical: 30,
    fontSize: 20,
    borderRadius: 28,
    fontFamily: "DMSans_400Regular",
  }),
  buttonsWrapper: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    width: "100%",
  },
  generalButton: {
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: 40,
    borderColor: "#333",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  generalButtonText: (theme) => ({
    fontSize: 22,
    fontFamily: "DMSans_700Bold",
    color: theme === "dark" ? "#fff" : "#333",
  }),
  emojiText: {
    fontSize: 35,
  },
  timeframeButton: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderWidth: 3,
    paddingVertical: 8,
    borderColor: "lightgray",
  },
  createButton: (theme) => ({
    backgroundColor: theme === "dark" ? "white" : "#333",
    borderColor: theme === "dark" ? "white" : "#333",
  }),
  createButtonText: (theme) => ({
    color: theme === "dark" ? "#333" : "white",
  }),
});
