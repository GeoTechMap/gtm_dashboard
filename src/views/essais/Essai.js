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
           Identifiant de l'essai : {props.essai.idEssai}
          </CCardHeader>
          <CCardBody>
            <ul>
              <li>Type d'essai :
              {props.essai.idTypeEssai ?    <Link 
                to={`/type_essais/edit/${props.essai.idTypeEssai}`} 
                >{props.essai.nomTypeEssai}
                </Link> 
                : ''}
              </li>
              <li>
                <details>
                  <summary>Institution : {props.essai.nomInstitution} ({props.essai.sigleInstitution})</summary>
                  <ul>
                    <li>Email : {props.essai.emailInstitution}</li>
                    <li>Téléphone : {props.essai.telephone1Institution}</li>
                    <li>Adresse : {props.essai.adresseInstitution}</li>
                    <li>À propos : {props.essai.descriptionInstitution}</li>
                  </ul>
                </details>
              </li>
              {/* <li>Coordonnées : ({props.essai.position.latitude}, {props.essai.position.longitude}, {props.essai.position.altitude})</li>
              <li>Adresse : {props.essai.position.adresse}</li> */}
              <li>Latitute : {props.essai.latitudePosition}</li>
              <li>Longitude : {props.essai.longitudePosition}</li>
              <li>Altitude : {props.essai.altitudePosition}</li>
              <li>Département : {props.essai.departementPosition}</li>
              {/* <li>Créé le : {props.essai.createdDateEssai}</li> */}
              <li>Date de réalisation: {props.essai.dateRealisationEssai}</li>
              {/* <li>Dernière modification : {props.essai.lastModifiedDateEssai}</li>
              <li>Modifié par: <a href="www.google.com">{props.essai.lastModifiedByEssai}</a></li> */}
              <li onClick={() => handleOnClick(props.essai)}><Link 
                to={`/pdf/${props.essai.idFichier}`} 
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
