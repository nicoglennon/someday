import React, { useContext, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
const MgmtContext = React.createContext();
import PropTypes from "prop-types";

export const MgmtProvider = ({ initialState, children }) => {
  const [state, setState] = useState(initialState);

  const setStorage = async (newState) => {
    try {
      setState({ ...state, ...newState });
      const jsonNewState = JSON.stringify({ ...state, ...newState });
      // console.log("New state:", jsonNewState);
      await AsyncStorage.setItem("@storage", jsonNewState);
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

MgmtProvider.propTypes = {
  initialState: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
};

export const useMgmt = () => useContext(MgmtContext);
