import React, { useState } from "react";
import { View, Button, StyleSheet, TextInput } from "react-native";
import Modal from "react-native-modal";

export default function NewTodo({ open, close }) {
  const [inputText, setInputText] = useState("");
  const handleClose = () => {
    close();
    setInputText("");
  };
  return (
    <View>
      <Modal
        testID={"modal"}
        isVisible={open}
        onSwipeComplete={handleClose}
        swipeDirection={["down"]}
        style={styles.view}
        onBackdropPress={handleClose}
        avoidKeyboard
      >
        <View style={styles.content}>
          <TextInput
            value={inputText}
            style={styles.input}
            onChangeText={(text) => setInputText(text)}
            placeholder="Type something here..."
            autoFocus
          />
          {!!inputText && (
            <Button title="Add" color="black" style={styles.submitButton} />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: "flex-end",
    margin: 0,
  },
  content: {
    backgroundColor: "white",
    padding: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  input: {
    backgroundColor: "lightgray",
    padding: 15,
    paddingVertical: 20,
    flex: 1,
    fontSize: 20,
    borderRadius: 28,
    fontFamily: "DMSans_400Regular",
  },
  submitButton: {},
});
