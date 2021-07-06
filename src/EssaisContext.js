import React, { useState, createContext,useEffect } from "react";
import UserService from "../src/services/UserService";

// Create Context Object
export const EssaiContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const EssaiContextProvider = props => {

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/utilisateurs/search?username=${UserService.getUsername()}`)
  .then((response) => response.json())
  .then((json) => setGlobalData({...globalData,
        connectedUser:json
      }))
      .catch((error) => {
        console.log(error);
      }); 
     
    
  }, []);
  const [globalData, setGlobalData] = useState({
    selectedEssai:{},
    connectedUser:null
  });


  return (
    <EssaiContext.Provider value={[globalData, setGlobalData]}>
      {props.children}
    </EssaiContext.Provider>
  );
};