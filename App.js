import React from "react";
import { MgmtProvider } from "./app/hooks/useMgmt";
import Navigator from "./app/components/Navigator";

import { AppLoading } from "expo";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

export default function App() {
  const initialState = {
    theme: "light",
    current: null,
    lists: {
      today: {
        id: "today",
        title: "today",
        emoji: "💅",
        order: 0,
        items: [
          { id: 1, text: "Make commit", done: true },
          { id: 2, text: "Pull request", done: false },
        ],
      },
      tomorrow: {
        id: "tomorrow",
        title: "tomorrow",
        emoji: "☂️",
        order: 1,
        items: [
          { id: 1, text: "Walk dog", done: false },
          { id: 2, text: "Do laundry", done: true },
          { id: 3, text: "Work out", done: true },
        ],
      },
      someday: {
        id: "someday",
        title: "someday",
        emoji: "🔮",
        order: 2,
        items: [
          { id: 1, text: "Other stuff", done: false },
          { id: 2, text: "Other thangs", done: false },
          { id: 3, text: "Whoooo", done: true },
        ],
      },
    },
  };

  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <MgmtProvider initialState={initialState}>
      <Navigator />
    </MgmtProvider>
  );
}
