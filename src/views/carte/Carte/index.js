import React, { useContext } from "react";
import { CounterContext, CounterContextProvider } from "../EssaisContext";
import  CarteContent from './CarteContent';
  export default function Carte() {
  return (
  <CounterContextProvider>
      <CarteContent />
  </CounterContextProvider>
   
  )
}