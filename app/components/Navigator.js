import React from "react";
import TodosScreen from "../screens/TodosScreen";
import ListsScreen from "../screens/ListsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useMgmt } from "../hooks/useMgmt";

const Stack = createStackNavigator();

export default function Navigator() {
  const [{ current, lists }] = useMgmt();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          backgroundColor: "transparent",
          headerTransparent: true,
          headerBackTitleStyle: {
            fontFamily: "DMSans_400Regular",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={ListsScreen}
          options={{
            headerTitle: "",
            headerTintColor: "black",
          }}
        />
        <Stack.Screen
          name="List"
          component={TodosScreen}
          options={{
            headerBackTitle: "Back",
            // headerTitle: lists[current] && lists[current].title,
            headerTitle: "",
            headerTintColor: "black",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
