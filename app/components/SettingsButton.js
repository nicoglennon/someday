import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { useMgmt } from "../hooks/useMgmt";
import * as Haptics from "expo-haptics";
import { Feather } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { TextInput } from "react-native-gesture-handler";
import { emojiSets } from "../constants/constants";

export default function SettingsButton() {
  const [state, setStorage] = useMgmt();
  const [emailInput, setEmailInput] = useState(
    state.user ? state.user.email : "",
  );
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const handleToggleTheme = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await setStorage({
      theme: state.theme === "light" ? "dark" : "light",
    });
  };

  const handleToggleColor = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await setStorage({
      color: state.color === "purple" ? "red" : "purple",
    });
  };

  const handleOpenModal = () => {
    setSettingsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSettingsModalOpen(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleOpenModal}>
        <View style={styles.settingsIconWrapper}>
          <Feather
            name="settings"
            size={28}
            color={state.theme === "light" ? "#333" : "#fff"}
          />
        </View>
      </TouchableOpacity>
      <Modal
        testID={"modal"}
        isVisible={settingsModalOpen}
        onSwipeComplete={handleCloseModal}
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
        onBackdropPress={handleCloseModal}
        backdropColor="#000"
        avoidKeyboard
        backdropOpacity={0.85}
      >
        <View style={styles.modalContent(state.theme)}>
          <View style={styles.topBar}>
            <Text style={styles.settingsTitle(state.theme)}>settings</Text>
          </View>
          <View style={styles.settingsRows}>
            <View style={styles.settingsRow}>
              <View style={styles.textInputWrapper}>
                <TextInput
                  value={emailInput}
                  placeholderTextColor={
                    state.theme === "dark" ? "darkgray" : "lightgray"
                  }
                  style={styles.input(state.theme)}
                  onChangeText={(text) => {
                    setEmailInput(text);
                  }}
                  placeholder={"your email..."}
                />
              </View>
            </View>
            <View style={styles.settingsRow}>
              <Text style={styles.settingsLabel(state.theme)}>theme:</Text>
              <TouchableOpacity onPress={handleToggleTheme}>
                <View style={styles.iconWrapper}>
                  <Feather
                    name={state.theme === "light" ? "sun" : "moon"}
                    size={24}
                    color={state.theme === "light" ? "black" : "white"}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.settingsRow}>
              <Text style={styles.settingsLabel(state.theme)}>color:</Text>
              <TouchableOpacity onPress={handleToggleColor}>
                <View style={styles.iconWrapper}>
                  <View style={styles.colorButton(state.color)}></View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: (theme) => ({
    backgroundColor: theme === "dark" ? "#14222e" : "#fff",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  }),
  settingsIconWrapper: {
    paddingHorizontal: 15,
    borderRadius: 30,
  },
  topBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  exitButtonWrapper: (theme) => ({
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100",
    backgroundColor: theme === "dark" ? "#fff" : "#333",
  }),
  settingsTitle: (theme) => ({
    fontFamily: "DMSans_700Bold",
    fontSize: 28,
    marginBottom: 20,
    color: theme === "dark" ? "#fff" : "#333",
  }),
  settingsLabel: (theme) => ({
    fontFamily: "DMSans_400Regular",
    fontSize: 20,
    color: theme === "dark" ? "#fff" : "#333",
  }),
  textInputWrapper: { width: "100%" },
  input: (theme) => ({
    color: theme === "dark" ? "#fff" : "#333",
    backgroundColor: theme === "dark" ? "#1c3740" : "rgba(0,0,0,0.05)",
    padding: 25,
    width: "100%",
    paddingVertical: 20,
    fontSize: 22,
    borderRadius: 28,
    fontFamily: "DMSans_400Regular",
  }),
  settingsRows: {},
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  iconWrapper: {
    paddingHorizontal: 15,
    borderRadius: 30,
  },
  colorButton: (color) => ({
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: emojiSets[color].checkboxColor,
  }),
  iconText: (theme) => ({
    fontSize: 20,
    color: theme === "dark" ? "#fff" : "#333",
    fontFamily: "DMSans_400Regular",
  }),
});
