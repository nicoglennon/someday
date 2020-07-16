import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { useMgmt } from "../hooks/useMgmt";
import * as Haptics from "expo-haptics";

export default function ToggleThemeButton() {
  const [state, setState] = useMgmt();
  const handleToggleTheme = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setState({
      ...state,
      theme: state.theme === "light" ? "dark" : "light",
    });
  };
  return (
    <TouchableOpacity onPress={handleToggleTheme}>
      <View style={styles.iconWrapper}>
        <Text style={styles.iconText(state.theme)}>{state.theme}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    paddingHorizontal: 15,
  },
  iconText: (theme) => ({
    fontSize: 20,
    color: theme === "dark" ? "#fff" : "#333",
    fontFamily: "DMSans_400Regular",
  }),
});
