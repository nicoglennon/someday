import React, { useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import PropTypes from "prop-types";

export default function SettingsMenuRow({ label, onClick, mode, children }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateOnPressInList = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const animateOnPressOutList = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };
  return (
    <TouchableOpacity
      onPress={onClick}
      onPressIn={animateOnPressInList}
      onPressOut={animateOnPressOutList}
    >
      <Animated.View
        style={[
          styles.settingsRow(mode),
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.settingsLabel(mode)}>{label}</Text>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}
SettingsMenuRow.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  children: PropTypes.node,
};

const styles = StyleSheet.create({
  settingsLabel: (mode) => ({
    fontFamily: "DMSans_400Regular",
    fontSize: 24,
    color: mode === "dark" ? "#fff" : "#333",
  }),
  settingsRow: (mode) => ({
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 6,
    padding: 24,
    borderRadius: 30,
    backgroundColor:
      mode === "dark" ? "rgba(256,256,256, 0.06)" : "rgba(0,0,0, 0.06)",
  }),
});
