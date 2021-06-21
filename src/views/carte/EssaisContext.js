import React, { useState, createContext, useEffect } from "react";
import useSwr from 'swr';

// Create Context Object
export const CounterContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const CounterContextProvider = props => {
  // const fetcher = (...args) => fetch(...args).then(response => response.json());
  // const url = "http://localhost:8080/api/essais"
  // const { data, error } = useSwr(url, {fetcher});
  // const __essais = data && !error ? data.slice(0,100): [];
  const [essais, setEssais] = useState([]);
  // setEssais({...essais, __essais})

  // const [data, setData] = useState([])
  useEffect(() => {
    fetch('http://localhost:8080/api/type_essais')
      .then((response) => response.json())
      .then((json) => setEssais(json)); 
    
  }, []);

  // const [count, setCount] = useState(0);

  return (
    <CounterContext.Provider value={[essais, setEssais]}>
      {props.children}
    </CounterContext.Provider>
  );
};