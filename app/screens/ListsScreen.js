import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";
import ListsList from "../components/ListsList";
import AddItemBtn from "../components/AddItemBtn";
import { useMgmt } from "../hooks/useMgmt";
import { useHeaderHeight } from "@react-navigation/stack";

export default function ListsScreen({ navigation }) {
  const [state, setState] = useMgmt();

  const handleNavigate = (listId) => {
    setState({ ...state, current: listId });
    navigation.navigate("List");
  };

  const headerHeight = useHeaderHeight();

  return (
    <View style={styles.safeArea}>
      <ScrollView style={{ paddingTop: headerHeight }}>
        <View style={styles.listsScreen}>
          <ListsList
            current={state.current}
            lists={state.lists}
            handleNavigate={handleNavigate}
          />
        </View>
      </ScrollView>
      <AddItemBtn />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
  },
  listsScreen: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});
