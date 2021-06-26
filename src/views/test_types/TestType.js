import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const TypeEssai = (props) => {
  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader  className="text-muted">
           Identifiant du type d'essai : {props.testType.id}
          </CCardHeader>
          <CCardBody>
            <ul>
              <li>Nom : {props.testType.nom}</li>
              <li>Sigle : {props.testType.sigle}</li>
              <li>Description : {props.testType.description}</li>
              <li>Créé le : {props.testType.createdDate}</li>
              <li>Créé par : <a href="wwww.google.com">{props.testType.createdBy}</a></li>
              <li>Dernière modification : {props.testType.lastModifiedDate}</li>
              <li>Modifié par: <a href="wwww.google.com">{props.testType.lastModifiedBy}</a></li>
            </ul>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default TypeEssai
