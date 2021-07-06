import React, { useContext } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { Link } from 'react-router-dom';
import { EssaiContext } from "../../EssaisContext";

const Essai = (props) => {
  const [globalData, setGlonbalData] = useContext(EssaiContext);
  const handleOnClick = (essai) => {
    setGlonbalData({...globalData, 
      selectedEssai: essai})
  }
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
              {props.essai.typeEssai ?    <Link 
                to={`/type_essais/edit/${props.essai.typeEssai.id}`} 
                >{props.essai.typeEssai.nom}
                </Link> 
                : ''}
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
              <li>Département : {props.essai.position.departement}</li>
              <li>Créé le : {props.essai.createdDate}</li>
              <li>Créé par : <a href="www.google.com">{props.essai.createdBy}</a></li>
              <li>Dernière modification : {props.essai.lastModifiedDate}</li>
              <li>Modifié par: <a href="www.google.com">{props.essai.lastModifiedBy}</a></li>
              <li onClick={() => handleOnClick(props.essai)}><Link 
                to={`/pdf/${props.essai.fichier.id}`} 
                >Voir PDF
                </Link></li>
            </ul>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Essai
