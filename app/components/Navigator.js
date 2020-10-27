import React, { useEffect } from "react";
import TodosScreen from "../screens/TodosScreen";
import ListsScreen from "../screens/ListsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useMgmt } from "../hooks/useMgmt";
import SettingsButton from "./SettingsButton";
// import ClearDataButton from "./ClearDataButton";
import { StatusBar } from "expo-status-bar";
import { onLoad } from "../scripts/onLoad";

const Stack = createStackNavigator();

export default function Navigator() {
  const [state, setState] = useMgmt();
  const { mode } = state;
  // setState(initialState);
  useEffect(() => {
    onLoad(state, setState);
  }, []);
  return (
    <NavigationContainer>
      <StatusBar style={mode === "dark" ? "light" : "dark"} />
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
            headerTintColor: mode === "dark" ? "white" : "black",
            // eslint-disable-next-line react/display-name
            headerRight: () => <SettingsButton />,
            // eslint-disable-next-line react/display-name
            // headerLeft: () => <ClearDataButton />,
          }}
        />
        <Stack.Screen
          name="List"
          component={TodosScreen}
          options={{
            headerBackTitle: "back",
            headerBackTitleStyle: { fontSize: 20 },
            headerTitle: "",
            headerTintColor: mode === "dark" ? "white" : "black",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
