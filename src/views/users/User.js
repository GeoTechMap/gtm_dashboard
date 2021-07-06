import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const User = (props) => {
  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader  className="text-muted">
           Identifiant de l'utilisateur : {props.utilisateur.id}
          </CCardHeader>
          <CCardBody>
            <ul>
              <li> Nom : {props.utilisateur.nom}</li>
              <li> Prénom : {props.utilisateur.prenom}</li>
              <li> Email : {props.utilisateur.email}</li>
              <li> Téléphone : {props.utilisateur.telephone}</li>
              <li> Institution : {props.utilisateur.institution.nom}</li>
              <li> Créé le : {props.utilisateur.createdDate}</li>
              <li> Dernière modification : {props.utilisateur.lastModifiedDate}</li>
            </ul>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
