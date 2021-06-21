import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { Link } from 'react-router-dom';

const Essai = (props) => {
  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader  className="text-muted">
           Identifiant de l'essai : {props.essai.id}
          </CCardHeader>
          <CCardBody>
            <ul>
              <li>Type d'essai :
                <Link 
                to={`/type_essais/edit/${props.essai.typeEssai.id}`} 
                >{props.essai.typeEssai.nom}
                </Link>
              </li>
              <li>Institution :
                <Link 
                to={`/institutions/edit/${props.essai.institution.id}`} 
                >{props.essai.institution.nom} ({props.essai.institution.sigle})
                </Link>
              </li>
              {/* <li>Coordonnées : ({props.essai.position.latitude}, {props.essai.position.longitude}, {props.essai.position.altitude})</li>
              <li>Adresse : {props.essai.position.adresse}</li> */}
              <li>Latitute : {props.essai.position.latitude}</li>
              <li>Longitude : {props.essai.position.longitude}</li>
              <li>Altitude : {props.essai.position.altitude}</li>
              <li>Fichier : {props.essai.fichier.id}</li>
              <li>Créé le : {props.essai.createdDate}</li>
              <li>Créé par : <a href="#">{props.essai.createdBy}</a></li>
              <li>Dernière modification : {props.essai.lastModifiedDate}</li>
              <li>Modifié par: <a href="#">{props.essai.lastModifiedBy}</a></li>
            </ul>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Essai
