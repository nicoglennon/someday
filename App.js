import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { MgmtProvider } from "./app/hooks/useMgmt";
import Navigator from "./app/components/Navigator";
import { initialState } from "./app/utils/constants";
import CrystalBall from "./app/assets/someday.png";
import { AppLoading } from "expo";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import { Asset } from "expo-asset";
import { DMMono_400Regular } from "@expo-google-fonts/dm-mono";
import { LayoutAnimation } from "react-native";

const getDataASync = async () => {
  // console.log("Getting data async:");
  try {
    const jsonValue = await AsyncStorage.getItem("@storage");
    // console.log("stored data:", jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    alert("Error reading state!");
  }
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState({ ready: false, data: null });

  useEffect(() => {
    const loadData = async () => {
      await Asset.fromModule(CrystalBall).downloadAsync();
      const loadedData = await getDataASync();
      setDataLoaded({ data: loadedData, ready: true });
    };

    loadData();
  }, []);

  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_700Bold,
    DMMono_400Regular,
  });

  if (!fontsLoaded || !dataLoaded.ready) {
    return <AppLoading />;
  } else {
    LayoutAnimation.configureNext({
      duration: 400,
      create: { type: "spring", springDamping: 0.8, property: "scaleXY" },
    });
    return (
      <MgmtProvider
        initialState={dataLoaded.data ? dataLoaded.data : initialState}
      >
        <Navigator />
      </MgmtProvider>
    );
  }
}
