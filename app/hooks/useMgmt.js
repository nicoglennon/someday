import React, { useContext, useState } from "react";
import { AsyncStorage } from "react-native";
const MgmtContext = React.createContext();

export const MgmtProvider = ({ initialState, children }) => {
  const [state, setState] = useState(initialState);

  const setStorage = async (newState) => {
    console.log("Setting data async:");
    try {
      const jsonNewState = JSON.stringify(newState);
      console.log("New state:", jsonNewState);
      await AsyncStorage.setItem("@storage", jsonNewState);
      setState(newState);
    } catch (e) {
      alert("Error saving state!");
    }
  };

  return (
    <MgmtContext.Provider value={[state, setStorage]}>
      {children}
    </MgmtContext.Provider>
  );
};
export const useMgmt = () => useContext(MgmtContext);
