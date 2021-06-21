import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const Institution = (props) => {
  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader  className="text-muted">
           Identifiant de l'institution : {props.institution.id}
          </CCardHeader>
          <CCardBody>
            <ul>
              <li>Nom : {props.institution.nom}</li>
              <li>Sigle : {props.institution.sigle}</li>
              <li>Site web : {props.institution.siteWeb}</li>
              <li>Email : {props.institution.email}</li>
              <li>Téléphone 1 : {props.institution.telephone1}</li>
              <li>Téléphone 2 : {props.institution.telephone1}</li>
              <li>Adresse: {props.institution.adresse}</li>
              <li>Numéro fiscal: {props.institution.numeroFiscal}</li>
              <li>Description : {props.institution.description}</li>
              <li>Créée le : {props.institution.createdDate}</li>
              <li>Créée par : <a href="#">{props.institution.createdBy}</a></li>
              <li>Dernière modification : {props.institution.lastModifiedDate}</li>
              <li>Modifiée par: <a href="#">{props.institution.lastModifiedBy}</a></li>
            </ul>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Institution
