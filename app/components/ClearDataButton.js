import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { useMgmt } from "../hooks/useMgmt";
import * as Haptics from "expo-haptics";
import { initialState } from "../../App";

export default function ToggleThemeButton() {
  const [state, setStorage] = useMgmt();

  const handleClearData = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await setStorage(initialState);
  };
  return (
    <TouchableOpacity onPress={handleClearData}>
      <View style={styles.iconWrapper}>
        <Text style={styles.iconText(state.theme)}>clear</Text>
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
