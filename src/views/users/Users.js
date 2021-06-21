import React, { useState, useEffect } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CCollapse,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import User from "./User";

  const Users = () => {
  const [details, setDetails] = useState([])
  // const [items, setItems] = useState(usersData)

  const toggleDetails = (index,id) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      // alert(id)
      newDetails = [...details, index]
    }

    setDetails(newDetails)
  }


  const fields = [
    { key: 'id', label:'ID', _style: { width: '2%'} },
    { key: 'firstName', label:'Prénom', _style: { width: '20%'} },
    { key: 'lastName', label:'Nom', _style: { width: '20%'} },
    { key: 'email', label:'Email', _style: { width: '20%'} },
    { key: 'sexe', label:'Sexe', _style: { width: '10%'} },
    { key: 'role', _style: { width: '10%'} },
    { key: 'createdAt', label:'Date de création', _style: { width: '10%'} },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]

  const getBadge = (status)=>{
    switch (status) {
      case 0: return 'success'
      case 1: return 'primary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }
  const getRoleName = (role)=>{
    switch (role) {
      case 1: return 'Admin'
      case 0: return 'Super Admin'
      default: return 'Admin'
    }
  }
  const getSexeName = (sexe)=>{
    switch (sexe) {
      case 0: return 'Homme'
      case 1: return 'Femme'
      default: return 'Autre'
    }
  }

  const onDelete = (id) => {
    if (window.confirm("Confirmer la suppression")) {
      const requestOptions = {
        method: 'DELETE'
      };
      fetch('http://localhost:8080/api/users/'+id, requestOptions)
        .then(response => console.log(response))
      const newList = data.filter((item) => item.id !== id);
      setData(newList);
    } else {
      
    }

  }

  const [data, setData] = useState([])
  useEffect(() => {
    fetch("http://localhost:8080/api/users/")
      .then((response) => response.json())
      .then((json) => setData(json)); 
    
  }, []);

  return (
    <div>
          <a href="/#/users/create" >   
            <CButton variant="outline" color="success">Ajouter</CButton>
          </a>
            
          <CDataTable
      items={data}
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
        'role':
          (item)=>(
            <td>
              <CBadge color={getBadge(item.role)}>
                {getRoleName(item.role)}
              </CBadge>
            </td>
          ),
          'sexe':
          (item)=>(
            <td>
              <CBadge color='secondary'>
                {getSexeName(item.sexe)}
              </CBadge>
            </td>
          ),
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
                <User user = {item} />
                <CCardBody>
                  <a href={`/#/users/edit/${item.id}`}> 
                    <CButton size="sm" color="info">
                      Modifier
                    </CButton>
                  </a>
                  <CButton size="sm" color="danger" className="ml-1" onClick= {() =>{onDelete(item.id)}}>
                    Suprimmer
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
  export default Users