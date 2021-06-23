import React, { useState, createContext, useEffect } from "react";
// import useSwr from 'swr';

// Create Context Object
export const EssaiContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const EssaiContextProvider = props => {

  const [globalData, setGlobalData] = useState({
    selectedEssai:{},
  });
  // useEffect(() => {
  //   fetch('http://localhost:8080/api/type_essais')
  //     .then((response) => response.json())
  //     .then((json) => setGlobalData(json)); 
    
  // }, []);

  // const [count, setCount] = useState(0);

  return (
    <EssaiContext.Provider value={[globalData, setGlobalData]}>
      {props.children}
    </EssaiContext.Provider>
  );
};