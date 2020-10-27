import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { useMgmt } from "../hooks/useMgmt";
import * as Haptics from "expo-haptics";
import { Feather } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { emojiSets } from "../utils/constants";
import SettingsMenuRow from "./SettingsMenuRow";
// import * as MailComposer from "expo-mail-composer";
import * as Linking from "expo-linking";

const colorsArray = Object.keys(emojiSets);

export default function SettingsButton() {
  const [{ mode, user, color, version }, setStorage] = useMgmt();
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
  // const [isAvailable, setIsAvailable] = useState(false);
  // const options = {
  //   recipients: ["nico@someday.im"],
  //   subject: "feedback for someday 🔮",
  //   body: "Test",
  // };
  // const [emailInput, setEmailInput] = useState(user ? user.email : "");

  // const handleFeedback = async () => {
  //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  //   await MailComposer.composeAsync(options);
  // };
  const handleTwitter = async () => {
    Linking.openURL("https://twitter.com/nicoglennon");
  };
  // useEffect(() => {
  //   const checkIfAvail = async () => {
  //     const avail = await MailComposer.isAvailableAsync();
  //     setIsAvailable(avail);
  //   };
  //   checkIfAvail();
  // }, []);
  return (
    <View>
      <TouchableOpacity onPress={handleOpenModal}>
        <View style={styles.settingsIconWrapper}>
          <Feather
            name="toggle-left"
            size={32}
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
            <View style={styles.infoFooter}>
              <View style={styles.infoFooterLeft}>
                {/* {isAvailable && (
                  <TouchableOpacity onPress={handleFeedback}>
                    <View style={styles.contactIconWrapper}>
                      <Feather
                        name="mail"
                        size={28}
                        color={mode === "light" ? "#333" : "#fff"}
                      />
                    </View>
                  </TouchableOpacity>
                )} */}
                <TouchableOpacity onPress={handleTwitter}>
                  <View style={styles.contactIconWrapper}>
                    <Feather
                      name="twitter"
                      size={26}
                      color={mode === "light" ? "#333" : "#fff"}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.infoFooterRight}>
                <Text style={styles.monoText(mode)}>{user.email}</Text>
                <Text style={styles.monoText(mode)}>someday v{version}</Text>
              </View>
            </View>
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
  contactIconWrapper: {
    opacity: 0.4,
    marginRight: 10,
    padding: 5,
  },
  modalContent: (mode) => ({
    backgroundColor: mode === "dark" ? "#14222e" : "#fff",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  }),
  topBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  settingsTitle: (mode) => ({
    fontFamily: "DMSans_700Bold",
    fontSize: 28,
    marginBottom: 10,
    color: mode === "dark" ? "#fff" : "#333",
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
  infoFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 0,
  },
  infoFooterLeft: {
    flexDirection: "row",
    paddingBottom: 0,
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  infoFooterRight: {
    alignItems: "flex-end",
    paddingTop: 5,
    paddingBottom: 0,
  },
  monoText: (mode) => ({
    marginTop: 5,
    fontFamily: "DMMono_400Regular",
    color: mode === "dark" ? "#fff" : "#333",
    fontSize: 13,
    opacity: 0.4,
  }),
});
