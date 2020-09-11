import React, { useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import { MgmtProvider } from "./app/hooks/useMgmt";
import Navigator from "./app/components/Navigator";

import { AppLoading } from "expo";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

const getDataASync = async () => {
  console.log("Getting data async:");
  try {
    const jsonValue = await AsyncStorage.getItem("@storage");
    console.log("stored data:", jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    alert("Error reading state!");
  }
};

export const initialState = {
  theme: "light",
  current: null,
  lists: {
    today: {
      id: "today",
      title: "today",
      emoji: "💅",
      order: 0,
      items: [{ id: 2, text: "Pull request", done: false }],
    },
    tomorrow: {
      id: "tomorrow",
      title: "tomorrow",
      emoji: "☂️",
      order: 1,
      items: [{ id: 1, text: "Walk dog", done: false }],
    },
    someday: {
      id: "someday",
      title: "someday",
      emoji: "🔮",
      order: 2,
      items: [
        { id: 1, text: "Other stuff", done: false },
        { id: 2, text: "Other thangs", done: false },
      ],
    },
  },
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const loadedData = await getDataASync();
      setDataLoaded(loadedData);
    };

    loadData();
  }, []);

  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <MgmtProvider initialState={dataLoaded ? dataLoaded : initialState}>
      <Navigator />
    </MgmtProvider>
  );
}
