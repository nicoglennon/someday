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
import PropTypes from "prop-types";
import { emojiSets } from "../constants/constants";

const timeframeOptions = ["today", "tomorrow", "someday"];

const listToTimeframe = {
  today: 0,
  tomorrow: 1,
  someday: 2,
};
export default function TodoModal({
  todo,
  open,
  close,
  clearTodo = () => {},
  prefixedList,
}) {
  console.log({ todo, prefixedList });
  const [inputText, setInputText] = useState("");
  const [{ lists, mode, color }, setStorage] = useMgmt();
  const [timeframeSelected, setTimeframeSelected] = useState(
    prefixedList ? listToTimeframe[prefixedList] : 0,
  );
  console.log("timeframeSelected: ", timeframeSelected);
  const handleClose = () => {
    close();
  };

  const handleModalHidden = () => {
    setInputText(todo ? todo.text : "");
    setTimeframeSelected(prefixedList ? listToTimeframe[prefixedList] : 0);
    clearTodo();
  };
  const toggleTimeframeSelected = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTimeframeSelected((timeframeSelected + 1) % 3);
    LayoutAnimation.configureNext({
      duration: 60,
      update: { type: "spring", springDamping: 0.7 },
    });
  };
  useEffect(() => {
    setInputText(todo ? todo.text : "");
  }, [todo]);

  useEffect(() => {
    setTimeframeSelected(prefixedList ? listToTimeframe[prefixedList] : 0);
  }, [prefixedList]);

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

  const handleCreateItem = async () => {
    const newItem = { text: inputText, done: false, id: shortid.generate() };
    const listToUpdateId = prefixedList || timeframeOptions[timeframeSelected];
    const oldListItems = lists[listToUpdateId].items;
    const newListItems = [...oldListItems, newItem];
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    LayoutAnimation.configureNext({
      duration: 500,
      create: { type: "spring", springDamping: 0.7, property: "scaleXY" },
    });
    await setStorage({
      current: listToUpdateId,
      lists: {
        ...lists,
        [listToUpdateId]: { ...lists[listToUpdateId], items: newListItems },
      },
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    handleClose();
  };

  const handleUpdateItem = async () => {
    console.log("saving", { todo, prefixedList });
    const newListId = timeframeOptions[timeframeSelected];
    const oldListId = prefixedList;

    // if we don't have to move the todo to another list
    if (newListId === oldListId) {
      const newTodo = { text: inputText, done: false, id: todo.id };
      const oldListItems = lists[oldListId].items;

      const newListItems = oldListItems.map((oldItem) => {
        return oldItem.id === todo.id ? newTodo : oldItem;
      });
      LayoutAnimation.configureNext({
        duration: 500,
        create: { type: "spring", springDamping: 0.7, property: "scaleXY" },
      });
      await setStorage({
        current: newListId,
        lists: {
          ...lists,
          [newListId]: { ...lists[newListId], items: newListItems },
        },
      });
    } else {
      const newTodo = { text: inputText, done: false, id: todo.id };
      const oldListItems = lists[oldListId].items;

      const oldListNewItems = oldListItems.filter((oldItem) => {
        return oldItem.id !== todo.id;
      });

      const newListItems = lists[newListId].items;
      const newListNewItems = [...newListItems, newTodo];
      LayoutAnimation.configureNext({
        duration: 500,
        create: { type: "linear", property: "opacity" },
        update: { type: "spring", springDamping: 0.7 },
        // delete: { type: "linear", property: "opacity" },
      });
      await setStorage({
        current: oldListId,
        lists: {
          ...lists,
          [newListId]: { ...lists[newListId], items: newListNewItems },
          [oldListId]: { ...lists[oldListId], items: oldListNewItems },
        },
      });
    }
    // after changes
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
        animationInTiming={500}
        backdropTransitionOutTiming={0}
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
        backdropColor="#000"
        avoidKeyboard
        // useNativeDriver
        // hideModalContentWhileAnimating
        onModalHide={handleModalHidden}
        backdropOpacity={0.85}
      >
        <View style={styles.content(mode)}>
          <View style={styles.dragbar}></View>
          <View style={styles.textInputWrapper}>
            <TextInput
              value={inputText}
              placeholderTextColor={mode === "dark" ? "darkgray" : "lightgray"}
              style={styles.input(mode)}
              onChangeText={(text) => {
                LayoutAnimation.configureNext({
                  duration: 400,
                  update: { type: "spring", springDamping: 0.7 },
                });
                setInputText(text);
              }}
              placeholder={`${
                prefixedList ? prefixedList : "someday"
              } I will...`}
              autoFocus={!todo}
            />
          </View>
          {!!inputText && (
            <View style={styles.buttonsWrapper}>
              <View>
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={todo ? handleUpdateItem : handleCreateItem}
                  onPressIn={() => animateOnPressIn(submitScaleAnim)}
                  onPressOut={() => animateOnPressOut(submitScaleAnim)}
                >
                  <Animated.View
                    style={[
                      styles.generalButton,
                      styles.createButton(mode),
                      { transform: [{ scale: submitScaleAnim }] },
                    ]}
                  >
                    <Text
                      style={[
                        styles.generalButtonText(mode),
                        styles.createButtonText(mode),
                      ]}
                    >
                      {todo ? "save" : "add"}
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>
              {(!prefixedList || todo) && (
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
                        styles.timeframeButton(mode),
                        { transform: [{ scale: timeframeScaleAnim }] },
                      ]}
                    >
                      <Text
                        style={[
                          styles.generalButtonText(mode),
                          styles.emojiText,
                        ]}
                      >
                        {emojiSets[color][timeframeOptions[timeframeSelected]]}{" "}
                      </Text>
                      <Text style={[styles.generalButtonText(mode)]}>
                        {timeframeOptions[timeframeSelected]}
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

TodoModal.propTypes = {
  todo: PropTypes.object,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  clearTodo: PropTypes.func,
  prefixedList: PropTypes.string,
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  content: (mode) => ({
    backgroundColor: mode === "dark" ? "black" : "white",
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
  input: (mode) => ({
    color: mode === "dark" ? "#fff" : "#333",
    backgroundColor: mode === "dark" ? "#14222e" : "rgba(0,0,0,0.05)",
    padding: 20,
    paddingVertical: 30,
    fontSize: 22,
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
  generalButtonText: (mode) => ({
    fontSize: 24,
    fontFamily: "DMSans_700Bold",
    color: mode === "dark" ? "#fff" : "#333",
  }),
  emojiText: {
    fontSize: 35,
  },
  timeframeButton: (mode) => ({
    backgroundColor: mode === "dark" ? "#101a23" : "rgba(0,0,0,0.05)",
    borderWidth: 3,
    paddingVertical: 8,
    borderColor: "lightgray",
  }),
  createButton: (mode) => ({
    backgroundColor: mode === "dark" ? "white" : "#333",
    borderColor: mode === "dark" ? "white" : "#333",
  }),
  createButtonText: (mode) => ({
    color: mode === "dark" ? "#333" : "white",
  }),
});