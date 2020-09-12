import React from "react";
import TodosScreen from "../screens/TodosScreen";
import ListsScreen from "../screens/ListsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useMgmt } from "../hooks/useMgmt";
import ToggleThemeButton from "./ToggleThemeButton";
import ClearDataButton from "./ClearDataButton";
import { StatusBar } from "expo-status-bar";
const Stack = createStackNavigator();

export default function Navigator() {
  const [{ theme }] = useMgmt();
  return (
    <NavigationContainer>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
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
            headerTintColor: theme === "dark" ? "white" : "black",
            headerRight: () => <ToggleThemeButton />,
            headerLeft: () => <ClearDataButton />,
          }}
        />
        <Stack.Screen
          name="List"
          component={TodosScreen}
          options={{
            headerBackTitle: "back",
            headerBackTitleStyle: { fontSize: 20 },
            headerTitle: "",
            headerTintColor: theme === "dark" ? "white" : "black",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
