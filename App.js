import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { MgmtProvider } from "./app/hooks/useMgmt";
import Navigator from "./app/components/Navigator";
import { initialState } from "./app/utils/constants";

import { AppLoading } from "expo";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

import { DMMono_400Regular } from "@expo-google-fonts/dm-mono";
import { LayoutAnimation } from "react-native";

const getDataASync = async () => {
  console.log("Getting data async:");
  try {
    const jsonValue = await AsyncStorage.getItem("@storage");
    console.log("stored data:", jsonValue);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    alert("Error reading state!");
  }
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
    DMMono_400Regular,
  });

  if (!fontsLoaded || !dataLoaded) {
    return <AppLoading />;
  } else {
    LayoutAnimation.configureNext({
      duration: 500,
      create: { type: "spring", property: "scaleXY", springDamping: 0.8 },
    });
    return (
      <MgmtProvider initialState={dataLoaded ? dataLoaded : initialState}>
        <Navigator />
      </MgmtProvider>
    );
  }
}
