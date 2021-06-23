import React, { useState, useEffect, useContext } from 'react';
import { EssaiContext } from "../../EssaisContext";

const LoadFromBase64Example = () => {
    const [globalData, setGlonbalData] = useContext(EssaiContext);

    const [data, setData] = useState({})
    useEffect(() => {
        fetch(`http://localhost:8081/api/file/getfile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Accept': 'application/json'},
            body: JSON.stringify({
                nomFichier: globalData.selectedEssai.fichier.nom,
                hashNomFichier: globalData.selectedEssai.fichier.hashNomFichier,
                hashBase64:globalData.selectedEssai.fichier.hashPdf
            })})
            .then(res => res.json())
            .then(res => setData(res))
            .catch((error) => {
                console.error('Error:', error);
              });
      
    }, []);
  

    return (
        <div  >{console.log(globalData)}
            <embed src={`data:application/pdf;base64,${data.base64File}`}  
            type="application/pdf" width="100%" height="100%"></embed>
       
        {/* <iframe
        src={`data:application/pdf;base64,${
            data.base64File
        }`}
        />  */}
        </div>
  
    );
};

export default LoadFromBase64Example;