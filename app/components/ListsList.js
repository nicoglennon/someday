import React from "react";
import { View, StyleSheet } from "react-native";
import List from "./List";
import PropTypes from "prop-types";

export default function ListsList({ lists, handleNavigate }) {
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

ListsList.propTypes = {
  lists: PropTypes.object,
  handleNavigate: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  listsList: {
    width: "100%",
    paddingBottom: 20,
  },
});
