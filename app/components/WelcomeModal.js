import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { useMgmt } from "../hooks/useMgmt";
import PropTypes from "prop-types";

export default function WelcomeModal({ newUser }) {
  const [inputText, setInputText] = useState("");
  const [{ user = {}, mode }, setState] = useMgmt();
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(newUser);

  // const timeframeScaleAnim = useRef(new Animated.Value(1)).current;
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

  const handleClose = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Keyboard.dismiss();
    setLoading(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const handleRegisterUser = () => {
    setState({ user: { ...user, registered: true } });
  };
  return (
    <View>
      <Modal
        testID={"welcomeModal"}
        isVisible={open}
        onSwipeComplete={handleClose}
        animationInTiming={1}
        animationOutTiming={1000}
        backdropTransitionOutTiming={0}
        style={styles.modal}
        backdropColor="#fff"
        avoidKeyboard
        onModalHide={handleRegisterUser}
        backdropOpacity={0.95}
      >
        <View style={styles.content(mode)}>
          <View style={styles.topBanner}>
            <Text style={styles.welcomeTextSmall}>🔮</Text>
            <Text style={styles.welcomeText}>someday</Text>
            <View style={styles.textInputWrapper}>
              <TextInput
                value={inputText}
                placeholderTextColor={
                  mode === "dark" ? "darkgray" : "lightgray"
                }
                style={styles.input(mode)}
                onChangeText={(text) => {
                  setInputText(text);
                }}
                placeholder="your email..."
              />
            </View>
            <TouchableOpacity
              onPress={handleClose}
              onPressIn={() => animateOnPressIn(submitScaleAnim)}
              onPressOut={() => animateOnPressOut(submitScaleAnim)}
              disabled={loading}
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
                  let&apos;s go
                </Text>
                {loading && (
                  <View style={styles.spinnerWrapper}>
                    <ActivityIndicator size="large" />
                  </View>
                )}
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

WelcomeModal.propTypes = {
  newUser: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
    height: "100%",
  },
  topBanner: {
    alignItems: "stretch",
    justifyContent: "center",
    textAlign: "center",
  },
  content: (mode) => ({
    flexDirection: "row",
    backgroundColor: mode === "dark" ? "black" : "white",
    padding: 25,
    paddingTop: 15,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  }),
  welcomeTextSmall: {
    fontFamily: "DMSans_400Regular",
    fontSize: 50,
    textAlign: "center",
  },
  welcomeText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 32,
    textAlign: "center",
    marginBottom: 22,
  },
  textInputWrapper: { flexDirection: "row", marginBottom: 20 },
  input: (mode) => ({
    width: "100%",
    color: mode === "dark" ? "#fff" : "#333",
    backgroundColor: mode === "dark" ? "#14222e" : "rgba(0,0,0,0.05)",
    padding: 25,
    paddingVertical: 30,
    fontSize: 22,
    borderRadius: 28,
    fontFamily: "DMSans_400Regular",
  }),
  generalButton: {
    padding: 20,
    paddingVertical: 20,
    borderRadius: 28,
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
  createButton: (mode) => ({
    backgroundColor: mode === "dark" ? "white" : "#333",
    borderColor: mode === "dark" ? "white" : "#333",
  }),
  createButtonText: (mode) => ({
    color: mode === "dark" ? "#333" : "white",
  }),
  spinnerWrapper: {
    position: "absolute",
    right: 20,
  },
});
