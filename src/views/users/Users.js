import React, { useState, useEffect } from 'react'
import {
  CCardBody,
  CDataTable,
  CButton,
  CCollapse,
} from '@coreui/react'
import User from "./User";
import UserService from "../../../src/services/UserService";
import ClipLoader from "react-spinners/ClipLoader";

  const Utilisateurs = () => {
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
    { key: 'prenom', label:'Prénom', _style: { width: '20%'} },
    { key: 'username', label:'Nom d\'utilisateur', _style: { width: '20%'} },
    { key: 'email', label:'Email', _style: { width: '20%'} },
    { key: 'institution', label:'Institution', _style: { width: '20%'} },
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
      fetch(`${process.env.REACT_APP_API_URL}/api/utilisateurs/`+id, requestOptions)
        .then(response => console.log(response))
      const newList = data.filter((item) => item.id !== id);
      setData(newList);
    } else {
      
    }
  }

  function bearerAuth(token) {
    return `Bearer ${token}`
  }

  const [data, setData] = useState([])
  useEffect(() => {
    setLoadingState(true);

    fetch(`${process.env.REACT_APP_API_URL}/api/utilisateurs/`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .then(() => setLoadingState(false))
      .catch((error) => {
        console.log(error);
        setLoadingState(false);
      }); 
    
  }, []);

  const [loadingState, setLoadingState] = useState(false);
  return (
    <div>
          <a href="/#/utilisateurs/create" >   
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
          'institution':
          (item)=>{
            return (
              <td>{item.institution.nom} ({item.institution.sigle})</td>
              )
          },
        'details':
            (item, index)=>{
              return (
              <CCollapse show={details.includes(index)}>
                <User utilisateur = {item} />
                <CCardBody>
                  <a href={`/#/utilisateurs/edit/${item.id}`}> 
                    <CButton size="sm" color="info">
                      Modifier
                    </CButton>
                  </a>
                  <CButton size="sm" color="danger" className="ml-1" onClick= {() =>{onDelete(item.id)}}>
                    Supprimmer
                  </CButton>
                </CCardBody>
              </CCollapse>
            )
          }
      }}
    />
    </div>
    
  )
    }
  export default Utilisateurs