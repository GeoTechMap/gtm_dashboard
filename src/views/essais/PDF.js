import React, { useState, useEffect, useContext } from 'react';

import SinglePagePDFViewer from "./single-page";
import AllPagesPDFViewer from "./all-pages";
import "./styles.css";
import ClipLoader from "react-spinners/ClipLoader";

const LoadFromBase64Example = ({match}) => {


    const [data, setData] = useState({})
    useEffect(() => {
        setLoadingState(true);

        fetch(`http://localhost:8080/api/file/info?id=${match.params.id}`)
        .then(response => response.json())
        .then(data =>   {
            fetch(`http://localhost:8081/api/file/getfile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                'Accept': 'application/json'},
                body: JSON.stringify({
                    nomFichier: data.nom,
                    hashNomFichier: data.hashNomFichier,
                    hashBase64:data.hashPdf
                })})
                .then(res => res.json())
                .then(res => setData(res))
                .catch((error) => {
                    console.error('Error:', error);
                  });
       return data;
     })
     .then(() => setLoadingState(false))
     .catch((error) => {
       console.log(error);
       setLoadingState(false);
     }); 
      
        
      
    }, []);

    const [loadingState, setLoadingState] = useState(false);

 
    return (
        // <div  >{console.log(globalData)}
        //     <embed src={`data:application/pdf;base64,${data.base64File}`}  
        //     type="application/pdf" width="100%" height="100%"></embed>
       
        // </div>
        <div className="App">
        <ClipLoader loading={loadingState} size={50} />
        <SinglePagePDFViewer pdf={`data:application/pdf;base64,${data.base64File}`}  />
      </div>
  
    );
};

export default LoadFromBase64Example;