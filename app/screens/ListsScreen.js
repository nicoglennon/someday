import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Keyboard } from "react-native";
import ListsList from "../components/ListsList";
import AddItemBtn from "../components/AddItemBtn";
import { useMgmt } from "../hooks/useMgmt";
import { useHeaderHeight } from "@react-navigation/stack";
import TodoModal from "../components/TodoModal";
import PropTypes from "prop-types";

export default function ListsScreen({ navigation }) {
  const [state, setStorage] = useMgmt();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleNavigate = async (listId) => {
    await setStorage({ current: listId });
    navigation.navigate("List");
  };

  const headerHeight = useHeaderHeight();
  const handleCloseNewTodo = () => {
    Keyboard.dismiss();
    setModalIsOpen(false);
  };

  return (
    <View style={[styles.safeArea(state.theme)]}>
      <ScrollView style={{ paddingTop: headerHeight }}>
        <View style={styles.listsScreen}>
          <Text style={styles.versionText}>1.0</Text>
          <ListsList lists={state.lists} handleNavigate={handleNavigate} />
        </View>
      </ScrollView>
      <AddItemBtn setModalIsOpen={setModalIsOpen} />
      <TodoModal
        open={modalIsOpen}
        close={handleCloseNewTodo}
        handleNavigate={handleNavigate}
      />
    </View>
  );
}

ListsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

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
