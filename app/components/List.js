import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useMgmt } from "../hooks/useMgmt";
import * as Haptics from "expo-haptics";
import PropTypes from "prop-types";
import { emojiSets } from "../utils/constants";

export default function List({ list, handleNavigate }) {
  const [{ mode, color }] = useMgmt();

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const animateOnPressInList = () => {
    Animated.spring(fadeAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };
  const animateOnPressOutList = () => {
    Animated.spring(fadeAnim, {
      toValue: 1,
      speed: 20,
      useNativeDriver: true,
    }).start();
  };
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        handleNavigate(list.id);
      }}
      onPressIn={animateOnPressInList}
      onPressOut={animateOnPressOutList}
    >
      <Animated.View
        style={[styles.list(mode), { transform: [{ scale: fadeAnim }] }]}
      >
        <View style={styles.listChild}>
          <Text style={styles.listEmoji}>{emojiSets[color][list.id]}</Text>
          <Text style={styles.listText(mode)}>{list.title}</Text>
        </View>
        <View style={styles.listChild}>
          <View style={styles.listBadge}>
            <Text style={[styles.listText(mode), styles.badgeText]}>
              {list.items.filter((item) => !item.done).length}
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

List.propTypes = {
  list: PropTypes.object,
  handleNavigate: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  list: (mode) => ({
    flex: 1,
    padding: 24,
    paddingTop: "10%",
    marginBottom: 12,
    textAlign: "left",
    backgroundColor: mode === "dark" ? "#14222e" : "rgba(0,0,0,0.05)",
    borderRadius: 35,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  }),
  listText: (mode) => ({
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "DMSans_700Bold",
    color: mode === "dark" ? "#fff" : "#333",
  }),
  listChild: {},
  listEmoji: {
    fontSize: 50,
  },
  listBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#333",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 18,
    marginLeft: 1,
    color: "white",
  },
});
