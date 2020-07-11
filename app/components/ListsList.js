import React from "react";
import { View, StyleSheet } from "react-native";
import List from "./List";

export default function ListsList({ lists, current, handleNavigate }) {
  return (
    <View style={styles.listsList}>
      {["today", "tomorrow", "someday"].map((listKey) => (
        <List
          key={lists[listKey].id}
          list={lists[listKey]}
          isToday={listKey === "today"}
          handleNavigate={handleNavigate}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listsList: {
    width: "100%",
    paddingBottom: 20,
  },
});
