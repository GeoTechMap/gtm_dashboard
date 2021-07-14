import React, { useState, createContext,useEffect } from "react";
import UserService from "../src/services/UserService";
import TypeEssai from "./views/test_types/TestType";

// Create Context Object
export const EssaiContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const EssaiContextProvider = props => {

  useEffect(() => {
            fetch(`${process.env.REACT_APP_API_URL}/api/utilisateurs/search?username=${UserService.getUsername()}`)
          .then((response) => response.json())
          // .then((json) => {setGlobalData({...globalData,
          //       connectedUser:json
          //     })
          //     return json;
          //   })
            
          .then((data) => {
            fetch('http://localhost:8080/api/type_essais')
            .then((response) => response.json())
            .then((json) => 
            setGlobalData({...globalData,
              connectedUser:data,
            listeNomTypeEssais:json.map((typeEssai) => typeEssai.nom),
            listValeursTypeEssais: json.map((typeEssai) => typeEssai.essais.length) ,
            listCouleurTypeEssais: json.map((typeEssai) => `#${typeEssai.codeCouleur}`) 
          }))
          })
              .catch((error) => {
                console.log(error);
              }); 

   
      

 
  
    
  }, []);

  
  const [globalData, setGlobalData] = useState({
    selectedEssai:{},
    connectedUser:null,
    listeNomTypeEssais:[],
    listCouleurTypeEssais:[]
  });


  return (
    <EssaiContext.Provider value={[globalData, setGlobalData]}>
      {props.children}
    </EssaiContext.Provider>
  );
};