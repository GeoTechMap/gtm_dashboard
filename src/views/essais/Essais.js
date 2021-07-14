import React, { useState, useEffect, useContext } from 'react'
import {
  CCardBody,
  CDataTable,
  CButton,
  CCollapse,
  CCol,
  CBadge,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
} from '@coreui/react'
import Test from "./Essai";
import ClipLoader from "react-spinners/ClipLoader";
import { EssaiContext } from "../../EssaisContext";
import UserService from "../../../src/services/UserService";


  const Essais = () => {
    const [globalData, setGlobalData] = useContext(EssaiContext);
  const [details, setDetails] = useState([])

      //__toaster
      const [show, setShow] = useState(false);
      const [showError, setShowError] = useState(false);
      //__end toaster

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
    { key: 'idEssai', label:'ID', _style: { width: '2%'} },
    { key: 'nomTypeEssai', label:'Type d\'essai', _style: { width: '20%'} },
    { key: 'nomInstitution', label:'Institution', _style: { width: '20%'} },
    // { key: 'departement', label:'Département', _style: { width: '20%'} },
    // { key: 'adresse', label:'Adresse', _style: { width: '20%'} },
    { key: 'nomFichier', label:'Fichier', _style: { width: '20%'} },
    { key: 'dateRealisationEssai', label:'Date de réalisation', _style: { width: '10%'} },
    {
      key: 'show_details',
      label: 'Actions',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]

  const [errorMessage, setErrorMessage] = useState('Echec du processus. Veuillez essayer ultérieurement !');
  const [loadingState, setLoadingState] = useState(false);


  const onDelete = (id) => {
    if (window.confirm("Confirmer la suppression")) {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${UserService.getToken()}`,
        "Access-Control-Allow-Credentials" : true  },
      };
      fetch(`${process.env.REACT_APP_API_URL}/api/essais/`+id, requestOptions)
        .then(response => console.log(response))
        .then(() => setShow(true))
        .then(() => setLoadingState(false))
        .catch((error) => {
          console.log(error);
          setShowError(true)
          setLoadingState(false);
        })
      const newList = data.filter((item) => item.id !== id);
      setData(newList);
    } 

    setTimeout(() => {
      setShow(false)
      setShowError(false);
    }, 3000)
  }

  
  const [data, setData] = useState([])
  useEffect(() => {
    setLoadingStateHead(true);

    fetch(`${process.env.REACT_APP_API_URL}/api/essais/`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .then(() => setLoadingStateHead(false))
      .catch((error) => {
        console.log(error);
        setLoadingStateHead(false);
      }); 
    
  }, []);

  const [loadingStateHead, setLoadingStateHead] = useState(false);


 
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
            <ClipLoader loading={loadingStateHead} size={25} />
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
          // 'typeEssai':
          // (item)=>{
          //   return (
          //     <td>{item.typeEssai ? item.typeEssai.nom : ''}</td>
          //     )
          // },
          // 'institution':
          // (item)=>{
          //   return (
          //     <td>{item.institution.nom} ({item.institution.sigle})</td>
          //     )
          // },
          // 'fichier':
          // (item)=>{
          //   return (
          //     <td>{item.fichier.nom}</td>
          //     )
          // },
          // // 'departement':
          // // (item)=>{
          // //   return (
          // //     <td>{item.position.departement}</td>
          // //     )
          // // },
          // // 'adresse':
          // // (item)=>{
          // //   return (
          // //     <td>{item.position.adresse}</td>
          // //     )
          // // },
          // 'latitude':
          // (item)=>{
          //   return (
          //     <td>{item.latitude} </td>
          //     )
          // },
          // 'longitude':
          // (item)=>{
          //   return (
          //     <td>{item.longitude} </td>
          //     )
          // },
          // 'altitude':
          // (item)=>{
          //   return (
          //     <td>{item.altitude} </td>
          //     )
          // },
        'details':
            (item, index)=>{
              return (
              <CCollapse show={details.includes(index)}>
                <Test essai = {item} />{console.log(globalData.connectedUser)}
                {globalData.connectedUser.institution.id === item.idInstitution ?
                <CCardBody>
                  <a href={`/#/tests/edit/${item.idEssai}`}> 
                    <CButton size="sm" color="info">
                      Modifier
                    </CButton>
                  </a>
                    <CButton size="sm" color="danger" className="ml-1" onClick= {() =>{onDelete(item.idEssai)}}>
                      Supprimmer
                    </CButton>
                </CCardBody>
                 :'' }
              </CCollapse>
            )
          }
      }}
    />

         {/* SHOW SUCCES */}
         <CCol sm="12" lg="6">
    <CToaster
      position={'top-right'}
      > 
          <CToast
            show={show}
            autohide={true && 4000}
            fade={true}
          >
            <CToastHeader closeButton={true}>
            <CBadge className="mr-1" color="success">SUCCÈS</CBadge>              
            </CToastHeader>
            <CToastBody  color="success">
              Opération réussie !
            </CToastBody>
          </CToast>
      </CToaster>
    </CCol>

    {/* SHOW ERROR */}
    <CCol sm="12" lg="6">
          <CToaster
            position={'top-right'}
          > 
                <CToast
                  show={showError}
                  autohide={true && 4000}
                  fade={true}
                >
                  <CToastHeader closeButton={true}>
                  <CBadge className="mr-1" color="danger">ECHEC</CBadge>              
                  </CToastHeader>
                  <CToastBody  color="success">
                    {errorMessage}
                  </CToastBody>
                </CToast>
          </CToaster>
        </CCol>
    </div>
    
  )
    }
  export default Essais