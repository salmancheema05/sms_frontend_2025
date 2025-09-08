import React, { useState, createContext, useContext } from "react";
const StateContext = createContext();
export const StateProvider = ({ children }) => {
  const [dropdownShow, setDropdownShow] = useState(null);
  const [pageName, setPageName] = useState(null);
  return (
    <StateContext.Provider
      value={{
        dropdownShow,
        setDropdownShow,
        pageName,
        setPageName,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);
