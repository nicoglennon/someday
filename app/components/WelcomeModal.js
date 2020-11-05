import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  Keyboard,
  ActivityIndicator,
  // Button,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { useMgmt } from "../hooks/useMgmt";
import PropTypes from "prop-types";
import Constants from "expo-constants";
import { encode as btoa } from "base-64";
import { isEmail } from "../utils/helpers";
import { Feather } from "@expo/vector-icons";
import CrystalBall from "../assets/someday.png";

const apiKey = Constants.manifest.extra.MAILCHIMP_API_KEY;
const listId = Constants.manifest.extra.MAILCHIMP_LIST_ID;
const server = Constants.manifest.extra.MAILCHIMP_SERVER_PREFIX;

const registerEmail = (email) => {
  const url =
    "https://" + server + ".api.mailchimp.com/3.0/lists/" + listId + "/members";
  const method = "POST";
  const headers = {
    authorization: "Basic " + btoa("randomstring:" + apiKey),
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    email_address: email,
    status: "subscribed",
  });

  return fetch(url, {
    method,
    headers,
    body,
  });
};

export default function WelcomeModal({ newUser }) {
  const [inputText, setInputText] = useState("");
  const [{ user = {}, mode }, setState] = useMgmt();
  const [showIcons, setShowIcons] = useState(false);
  const [processing, setProcessing] = useState(true);
  const [emailValidated, setEmailValidated] = useState(false);

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

  // const TEST_skip = () => {
  //   setState({
  //     user: { ...user, registered: true, email: "example@test.com" },
  //   });
  //   setOpen(false);
  // };
  const handleClose = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Keyboard.dismiss();
    setShowIcons(true);
    setTimeout(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setProcessing(false);
    }, 2000);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
    try {
      await registerEmail(inputText.toLowerCase());
    } catch (err) {
      // ignore err
    }
  };

  const handleRegisterUser = () => {
    setState({
      user: { ...user, registered: true, email: inputText.toLowerCase() },
    });
  };

  const checkIfEmail = (email) => {
    setEmailValidated(isEmail(email));
  };
  return (
    <View>
      <Modal
        testID={"welcomeModal"}
        isVisible={open}
        onSwipeComplete={handleClose}
        animationInTiming={1000}
        animationIn="bounceIn"
        animationOut="fadeOut"
        animationOutTiming={1000}
        backdropTransitionInTiming={1}
        backdropTransitionOutTiming={0}
        style={styles.modal}
        backdropColor="white"
        backdropOpacity={1}
        avoidKeyboard
        onModalHide={handleRegisterUser}
      >
        <View style={styles.content}>
          <View style={styles.topBanner}>
            <View style={{ alignItems: "center" }}>
              <Image
                source={CrystalBall}
                height={80}
                width={80}
                style={{ width: 70, height: 70, borderRadius: 20 }}
              />
            </View>
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
                  checkIfEmail(text);
                }}
                placeholder="your@email.com"
              />
            </View>
            <TouchableOpacity
              onPress={handleClose}
              onPressIn={() => animateOnPressIn(submitScaleAnim)}
              onPressOut={() => animateOnPressOut(submitScaleAnim)}
              disabled={showIcons || !emailValidated}
            >
              <Animated.View
                style={[
                  styles.generalButton,
                  styles.createButton(mode, emailValidated),
                  { transform: [{ scale: submitScaleAnim }] },
                ]}
              >
                <Text
                  style={[
                    styles.generalButtonText(mode),
                    styles.createButtonText(mode),
                  ]}
                >
                  let&apos;s go!
                </Text>
                {showIcons && (
                  <View style={styles.spinnerWrapper}>
                    {processing ? (
                      <ActivityIndicator size="large" />
                    ) : (
                      <Feather name="check" size={28} color="#fff" />
                    )}
                  </View>
                )}
              </Animated.View>
            </TouchableOpacity>
            {/* <Button title="Skip" onPress={TEST_skip} /> */}
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
  content: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 25,
    paddingTop: 15,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 38,
    textAlign: "center",
    marginBottom: 24,
  },
  textInputWrapper: { flexDirection: "row", marginBottom: 20 },
  input: (mode) => ({
    width: "100%",
    color: mode === "dark" ? "#fff" : "#333",
    backgroundColor: mode === "dark" ? "#14222e" : "rgba(0,0,0,0.05)",
    padding: 25,
    paddingVertical: 30,
    fontSize: 20,
    borderRadius: 28,
    fontFamily: "DMMono_400Regular",
    textAlign: "center",
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
  createButton: (mode, emailValidated) => ({
    backgroundColor: mode === "dark" ? "white" : "#333",
    borderColor: mode === "dark" ? "white" : "#333",
    opacity: emailValidated ? 1 : 0.7,
  }),
  createButtonText: (mode) => ({
    color: mode === "dark" ? "#333" : "white",
  }),
  spinnerWrapper: {
    position: "absolute",
    right: 20,
  },
});
