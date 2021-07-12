import React, { useState, useEffect } from 'react'
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
import Institution from "./Institution";
import UserService from "../../../src/services/UserService";
import ClipLoader from "react-spinners/ClipLoader";

  const Institutions = () => {
          //__toaster
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  //__end toaster
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
    { key: 'nom', label:'Nom', _style: { width: '20%'} },
    { key: 'sigle', label:'Abbréviation', _style: { width: '20%'} },
    { key: 'siteWeb', label:'Site web', _style: { width: '20%'} },
    { key: 'telephone1', label:'Téléphone', _style: { width: '20%'} },
    { key: 'createdDate', label:'Date de création', _style: { width: '10%'} },
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
      fetch(`${process.env.REACT_APP_API_URL}/api/institutions/`+id, requestOptions)
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

  function bearerAuth(token) {
    return `Bearer ${token}`
  }

  const [data, setData] = useState([])
  useEffect(() => {
    setLoadingStateHead(true);
    
    fetch(`${process.env.REACT_APP_API_URL}/api/institutions/`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .then(() =>   setLoadingStateHead(false))
      .catch((error) => {
        console.log(error);
        setLoadingStateHead(false);
      }); 
    
  }, []);

  const [loadingStateHead, setLoadingStateHead] = useState(false);

  return (
    <div>
          <a href="/#/institutions/create" >   
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
        'details':
            (item, index)=>{
              return (
              <CCollapse show={details.includes(index)}>
                <Institution institution = {item} />
                <CCardBody>
                  <a href={`/#/institutions/edit/${item.id}`}> 
                    <CButton size="sm" color="info">
                      Modifier
                    </CButton>
                  </a>
                  <CButton size="sm" color="danger" className="ml-1" onClick= {() =>{onDelete(item.id)}}>
                    Supprimmer  <ClipLoader loading={loadingState} size={15} />
                  </CButton>
                </CCardBody>
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
  export default Institutions