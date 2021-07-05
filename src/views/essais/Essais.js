import React, { useState, useEffect, useContext } from 'react'
import {
  CCardBody,
  CDataTable,
  CButton,
  CCollapse,
} from '@coreui/react'
import Test from "./Essai";
import ClipLoader from "react-spinners/ClipLoader";
import { EssaiContext } from "../../EssaisContext";

  const Essais = () => {
    const [globalData, setGlobalData] = useContext(EssaiContext);
  const [details, setDetails] = useState([])

  const toggleDetails = (index,id) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }

    setDetails(newDetails)
  }

  const fields = [
    { key: 'id', label:'ID', _style: { width: '2%'} },
    { key: 'typeEssai', label:'Type d\'essai', _style: { width: '20%'} },
    { key: 'institution', label:'Institution', _style: { width: '20%'} },
    // { key: 'departement', label:'Département', _style: { width: '20%'} },
    // { key: 'adresse', label:'Adresse', _style: { width: '20%'} },
    { key: 'fichier', label:'Fichier', _style: { width: '20%'} },
    { key: 'createdDate', label:'Date de création', _style: { width: '10%'} },
    {
      key: 'show_details',
      label: 'Actions',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]

  const onDelete = (id) => {
    if (window.confirm("Confirmer la suppression")) {
      const requestOptions = {
        method: 'DELETE'
      };
      fetch(`${process.env.REACT_APP_API_URL}/api/essais/`+id, requestOptions)
        .then(response => console.log(response))
      const newList = data.filter((item) => item.id !== id);
      setData(newList);
    } else {
      
    }
  }

  
  const [data, setData] = useState([])
  useEffect(() => {
    setLoadingState(true);

    fetch(`${process.env.REACT_APP_API_URL}/api/essais/`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .then(() => setLoadingState(false))
      .catch((error) => {
        console.log(error);
        setLoadingState(false);
      }); 
    
  }, []);

  const [loadingState, setLoadingState] = useState(false);

 
    //  const getInstitutionOfActualUser = () =>{
    //   //   var idIns;
    //     fetch(`${process.env.REACT_APP_API_URL}/api/utilisateurs/search?username=${UserService.getUsername()}`)
    //   .then((response) => response.json())
    //   //   return idIns;   // The function returns the product of p1 and p2

    //   }
  

  return (
    <div>
          <a href="/#/tests/create" >   
            <CButton variant="outline" color="success">Ajouter</CButton>
            <ClipLoader loading={loadingState} size={25} />
         </a>
            
          <CDataTable
      items={data ? data : null}
      fields={fields}
      columnFilter
      tableFilter
      footer
      itemsPerPageSelect
      itemsPerPage={5}
      hover
      sorter
      pagination
      scopedSlots = {{
        'show_details':
          (item, index)=>{
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={()=>{toggleDetails(index,item.id)}}
                >
                  {details.includes(index) ? 'Cacher' : 'Voir'}
                </CButton>                          
              </td>
              )
          },
          'typeEssai':
          (item)=>{
            return (
              <td>{item.typeEssai ? item.typeEssai.nom : ''}</td>
              )
          },
          'institution':
          (item)=>{
            return (
              <td>{item.institution.nom} ({item.institution.sigle})</td>
              )
          },
          'fichier':
          (item)=>{
            return (
              <td>{item.fichier.nom}</td>
              )
          },
          // 'departement':
          // (item)=>{
          //   return (
          //     <td>{item.position.departement}</td>
          //     )
          // },
          // 'adresse':
          // (item)=>{
          //   return (
          //     <td>{item.position.adresse}</td>
          //     )
          // },
          'latitude':
          (item)=>{
            return (
              <td>{item.latitude} </td>
              )
          },
          'longitude':
          (item)=>{
            return (
              <td>{item.longitude} </td>
              )
          },
          'altitude':
          (item)=>{
            return (
              <td>{item.altitude} </td>
              )
          },
        'details':
            (item, index)=>{
              return (
              <CCollapse show={details.includes(index)}>
                <Test essai = {item} />
                <CCardBody>
                  <a href={`/#/tests/edit/${item.id}`}> 
                    <CButton size="sm" color="info">
                      Modifier
                    </CButton>
                  </a>
                  {/* seulement le créateur de l'essai peut le supprimer. */}
                 
                  {globalData.connectedUser.institution.id == item.institution.id ?
                    <CButton size="sm" color="danger" className="ml-1" onClick= {() =>{onDelete(item.id)}}>
                      Supprimmer
                      {console.log(globalData.connectedUser.institution.id+ '@' + item.institution.id )}
                    </CButton>
                   :'' }
                </CCardBody>
              </CCollapse>
            )
          }
      }}
    />
    </div>
    
  )
    }
  export default Essais