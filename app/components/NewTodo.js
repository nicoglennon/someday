import React, { useState, useRef, useEffect } from "react";
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
  const [{ lists, current }, setState] = useMgmt();

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
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const timeframeScaleAnim = useRef(new Animated.Value(1)).current;
  const submitScaleAnim = useRef(new Animated.Value(1)).current;
  const animateOnPressIn = (anim) => {
    Animated.spring(anim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  const animateOnPressOut = (anim) => {
    Animated.spring(anim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleCreateItem = () => {
    const newItem = { text: inputText, done: false, id: shortid.generate() };
    const listToUpdateId =
      prefixedList || timeframeOptions[timeframeSelected].id;
    const oldListItems = lists[listToUpdateId].items;
    const newListItems = [...oldListItems, newItem];
    setState({
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
            translateY: 200,
          },
          to: {
            translateY: 0,
          },
          easing: "ease-out-quint",
        }}
        style={styles.modal}
        onBackdropPress={handleClose}
        avoidKeyboard
      >
        <View style={styles.content}>
          <View style={styles.dragbar}></View>
          <View style={styles.textInputWrapper}>
            <TextInput
              value={inputText}
              style={styles.input}
              onChangeText={(text) => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
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
                      styles.createButton,
                      { transform: [{ scale: submitScaleAnim }] },
                    ]}
                  >
                    <Text
                      style={[
                        styles.generalButtonText,
                        styles.createButtonText,
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
                        style={[styles.generalButtonText, styles.emojiText]}
                      >
                        {timeframeOptions[timeframeSelected].emoji}{" "}
                      </Text>
                      <Text style={[styles.generalButtonText]}>
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
  content: {
    backgroundColor: "white",
    padding: 25,
    paddingTop: 15,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  dragbar: {
    width: 50,
    height: 4,
    borderRadius: 2,
    backgroundColor: "lightgray",
    marginBottom: 15,
  },
  textInputWrapper: { width: "100%" },
  input: {
    backgroundColor: "rgba(0,0,0,0.05)",
    padding: 20,
    paddingVertical: 30,
    fontSize: 20,
    borderRadius: 28,
    fontFamily: "DMSans_400Regular",
  },
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
  generalButtonText: {
    fontSize: 22,
    fontFamily: "DMSans_700Bold",
    color: "#333",
  },
  emojiText: {
    fontSize: 35,
  },
  timeframeButton: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderWidth: 3,
    paddingVertical: 8,
    borderColor: "lightgray",
  },
  createButton: {
    backgroundColor: "#333",
  },
  createButtonText: {
    color: "white",
  },
});
