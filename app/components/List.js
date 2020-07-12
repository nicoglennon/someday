import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

export default function List({ list, handleNavigate }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const animateOnPressInList = () => {
    Animated.spring(fadeAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  const animateOnPressOutList = () => {
    Animated.spring(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => {
        handleNavigate(list.id);
      }}
      onPressIn={animateOnPressInList}
      onPressOut={animateOnPressOutList}
    >
      <Animated.View
        style={[styles.list, { transform: [{ scale: fadeAnim }] }]}
      >
        <View style={styles.listChild}>
          <Text style={styles.listEmoji}>{list.emoji}</Text>
          <Text style={styles.listText}>{list.title}</Text>
        </View>
        {list.id !== "someday" && (
          <View style={styles.listChild}>
            <View style={styles.listBadge}>
              <Text style={[styles.listText, styles.badgeText]}>
                {list.items.filter((item) => !item.done).length}
              </Text>
            </View>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 24,
    paddingTop: "10%",
    marginBottom: 12,
    textAlign: "left",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  listText: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "DMSans_700Bold",
    color: "#333333",
  },
  listChild: {},
  listEmoji: {
    fontSize: 50,
  },
  listBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#333333",
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
