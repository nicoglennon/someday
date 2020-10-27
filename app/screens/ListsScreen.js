import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Keyboard } from "react-native";
import ListsList from "../components/ListsList";
import AddItemBtn from "../components/AddItemBtn";
import { useMgmt } from "../hooks/useMgmt";
import { useHeaderHeight } from "@react-navigation/stack";
import TodoModal from "../components/TodoModal";
import PropTypes from "prop-types";
import WelcomeModal from "../components/WelcomeModal";

export default function ListsScreen({ navigation }) {
  const [{ user, mode, lists }, setStorage] = useMgmt();
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
    <View style={[styles.safeArea(mode)]}>
      <ScrollView style={{ paddingTop: headerHeight }}>
        <View style={styles.listsScreen}>
          <ListsList lists={lists} handleNavigate={handleNavigate} />
        </View>
      </ScrollView>
      <AddItemBtn setModalIsOpen={setModalIsOpen} />
      <TodoModal
        open={modalIsOpen}
        close={handleCloseNewTodo}
        handleNavigate={navigation.navigate}
      />
      {!user.registered && <WelcomeModal newUser={!user.registered} />}
    </View>
  );
}

ListsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  safeArea: (mode) => ({
    flex: 1,
    width: "100%",
    backgroundColor: mode === "dark" ? "black" : null,
  }),
  listsScreen: {
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "center",
  },
});
