import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const User = (props) => {
  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader  className="text-muted">
           Identifiant de l'utilisateur : {props.user.id}
          </CCardHeader>
          <CCardBody>
            <ul>
              <li> Nom : {props.user.lastName}</li>
              <li> Prénom : {props.user.firstName}</li>
              <li> Email : {props.user.email}</li>
              <li> Droit d'accès : {props.user.role}</li>
              <li> Créé le : {props.user.createdAt}</li>
              <li> Dernière modification : {props.user.updatedAt}</li>
            </ul>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
