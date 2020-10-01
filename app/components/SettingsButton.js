import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { useMgmt } from "../hooks/useMgmt";
import * as Haptics from "expo-haptics";
import { Feather } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { TextInput } from "react-native-gesture-handler";
import { emojiSets } from "../constants/constants";
import SettingsMenuRow from "./SettingsMenuRow";

const colorsArray = Object.keys(emojiSets);

export default function SettingsButton() {
  const [{ mode, user, color }, setStorage] = useMgmt();
  // const [emailInput, setEmailInput] = useState(user ? user.email : "");
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(
    colorsArray.indexOf(color),
  );
  const handleToggleMode = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await setStorage({
      mode: mode === "light" ? "dark" : "light",
    });
  };

  const handleToggleColor = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await setStorage({
      color: colorsArray[(selectedColorIndex + 1) % colorsArray.length],
    });
    setSelectedColorIndex((selectedColorIndex + 1) % colorsArray.length);
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
            color={mode === "light" ? "#333" : "#fff"}
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
        <View style={styles.modalContent(mode)}>
          <View style={styles.topBar}>
            <Text style={styles.settingsTitle(mode)}>settings</Text>
          </View>
          <View style={styles.settingsRows}>
            {/* <View style={styles.settingsRow}>
              <View style={styles.textInputWrapper}>
                <TextInput
                  value={emailInput}
                  placeholderTextColor={
                    mode === "dark" ? "darkgray" : "lightgray"
                  }
                  style={styles.input(mode)}
                  onChangeText={(text) => {
                    setEmailInput(text);
                  }}
                  placeholder={"your email..."}
                />
              </View>
            </View> */}
            <SettingsMenuRow
              label="mode"
              mode={mode}
              onClick={handleToggleMode}
            >
              <View style={styles.iconWrapper}>
                <Feather
                  name={mode === "light" ? "sun" : "moon"}
                  size={30}
                  color={mode === "light" ? "#333" : "#fff"}
                />
              </View>
            </SettingsMenuRow>
            <SettingsMenuRow
              label="color"
              mode={mode}
              onClick={handleToggleColor}
            >
              <View style={styles.iconWrapper}>
                <View style={styles.colorButton(color)}></View>
              </View>
            </SettingsMenuRow>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsIconWrapper: {
    paddingHorizontal: 15,
    borderRadius: 30,
  },
  modalContent: (mode) => ({
    backgroundColor: mode === "dark" ? "#14222e" : "#fff",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  }),
  topBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  exitButtonWrapper: (mode) => ({
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100",
    backgroundColor: mode === "dark" ? "#fff" : "#333",
  }),
  settingsTitle: (mode) => ({
    fontFamily: "DMSans_700Bold",
    fontSize: 28,
    marginBottom: 10,
    color: mode === "dark" ? "#fff" : "#333",
  }),
  textInputWrapper: { width: "100%" },
  input: (mode) => ({
    color: mode === "dark" ? "#fff" : "#333",
    backgroundColor: mode === "dark" ? "#1c3740" : "rgba(0,0,0,0.05)",
    padding: 25,
    width: "100%",
    paddingVertical: 20,
    fontSize: 22,
    borderRadius: 28,
    fontFamily: "DMSans_400Regular",
  }),
  settingsRows: { width: "100%" },
  iconWrapper: {
    padding: 0,
  },
  colorButton: (color) => ({
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: emojiSets[color].checkboxColor,
  }),
  iconText: (mode) => ({
    fontSize: 20,
    color: mode === "dark" ? "#fff" : "#333",
    fontFamily: "DMSans_400Regular",
  }),
});
