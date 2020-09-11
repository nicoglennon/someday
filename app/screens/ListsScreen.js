import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import ListsList from "../components/ListsList";
import AddItemBtn from "../components/AddItemBtn";
import { useMgmt } from "../hooks/useMgmt";
import { useHeaderHeight } from "@react-navigation/stack";

export default function ListsScreen({ navigation }) {
  const [state, setStorage] = useMgmt();

  const handleNavigate = async (listId) => {
    await setStorage({ ...state, current: listId });
    navigation.navigate("List");
  };

  const headerHeight = useHeaderHeight();

  return (
    <View style={[styles.safeArea(state.theme)]}>
      <ScrollView style={{ paddingTop: headerHeight }}>
        <View style={styles.listsScreen}>
          <Text style={styles.versionText}>1.0</Text>
          <ListsList
            current={state.current}
            lists={state.lists}
            handleNavigate={handleNavigate}
          />
        </View>
      </ScrollView>
      <AddItemBtn handleNavigate={handleNavigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: (theme) => ({
    flex: 1,
    // justifyContent: "flex-start",
    width: "100%",
    backgroundColor: theme === "dark" ? "black" : null,
  }),
  listsScreen: {
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "center",
  },
  versionText: {
    color: "lightgrey",
    fontFamily: "DMSans_700Bold",
    marginBottom: 10,
  },
});
