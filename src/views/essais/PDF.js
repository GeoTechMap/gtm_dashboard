import React, { useState, useEffect, useContext } from 'react';

import SinglePagePDFViewer from "./single-page";
import AllPagesPDFViewer from "./all-pages";
import "./styles.css";

const LoadFromBase64Example = ({match}) => {


    const [data, setData] = useState({})
    useEffect(() => {
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
      
        
      
    }, []);
 
    return (
        // <div  >{console.log(globalData)}
        //     <embed src={`data:application/pdf;base64,${data.base64File}`}  
        //     type="application/pdf" width="100%" height="100%"></embed>
       
        // </div>
        <div className="App">
        <SinglePagePDFViewer pdf={`data:application/pdf;base64,${data.base64File}`}  />
      </div>
  
    );
};

export default LoadFromBase64Example;