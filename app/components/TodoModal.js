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

const timeframeOptions = [
  { emoji: "💅", id: "today" },
  { emoji: "☂️", id: "tomorrow" },
  { emoji: "🔮", id: "someday" },
];

const listToTimeframe = {
  today: 0,
  tomorrow: 1,
  someday: 2,
};
export default function TodoModal({ todo, open, close, prefixedList }) {
  console.log({ todo, prefixedList });
  const [inputText, setInputText] = useState("");
  const [{ lists, theme }, setStorage] = useMgmt();
  const [timeframeSelected, setTimeframeSelected] = useState(
    prefixedList ? listToTimeframe[prefixedList] : 0,
  );
  console.log("timeframeSelected: ", timeframeSelected);
  const handleClose = () => {
    close();
    setInputText("");
    setTimeframeSelected(prefixedList ? listToTimeframe[prefixedList] : 0);
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
    const listToUpdateId =
      prefixedList || timeframeOptions[timeframeSelected].id;
    const oldListItems = lists[listToUpdateId].items;
    const newListItems = [...oldListItems, newItem];
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    LayoutAnimation.configureNext({
      duration: 500,
      create: { type: "spring", springDamping: 0.7, property: "scaleXY" },
    });
    await setStorage({
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

  const handleUpdateItem = async () => {
    console.log("saving", { todo, prefixedList });
    const newListId = timeframeOptions[timeframeSelected].id;
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
        theme,
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
        theme,
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
                  onPress={todo ? handleUpdateItem : handleCreateItem}
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

TodoModal.propTypes = {
  todo: PropTypes.object,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  prefixedList: PropTypes.string,
};

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
  generalButtonText: (theme) => ({
    fontSize: 24,
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
