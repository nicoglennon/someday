import React, { useContext, useState } from "react";

const MgmtContext = React.createContext();

export const MgmtProvider = ({ initialState, children }) => {
  const stateHook = useState(initialState);
  return (
    <MgmtContext.Provider value={stateHook}>{children}</MgmtContext.Provider>
  );
};
export const useMgmt = () => useContext(MgmtContext);
