import React, {useEffect, useState} from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'


const WidgetsDropdown = () => {
  
  const [totalEssais, setTotalEssais] = useState(0);
  const [totalTypesEssais, setTotalTypesEssais] = useState(0);
  const [totalInstitutions, setTotalInstitutions] = useState(0);
  const [totalUtilisateurs, setTotalUtilisateurs] = useState(0);

  useEffect(() => {    
    fetch(`${process.env.REACT_APP_API_URL}/api/essais/count`)
      .then((response) => response.json())
      .then((json) => setTotalEssais(json))
      .catch((error) => {
        console.log(error);
      }); 

    fetch(`${process.env.REACT_APP_API_URL}/api/type_essais/count`)
    .then((response) => response.json())
    .then((json) => setTotalTypesEssais(json))
    .catch((error) => {
      console.log(error);
    }); 

    fetch(`${process.env.REACT_APP_API_URL}/api/institutions/count`)
    .then((response) => response.json())
    .then((json) => setTotalInstitutions(json))
    .catch((error) => {
      console.log(error);
    });

    fetch(`${process.env.REACT_APP_API_URL}/api/utilisateurs/count`)
    .then((response) => response.json())
    .then((json) => setTotalUtilisateurs(json))
    .catch((error) => {
      console.log(error);
    });
    
  }, []);
  // render
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={String(totalEssais)}
          text="Essais géotechniques"
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={String(totalTypesEssais)}
          text="Types d'éssai"
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={String(totalInstitutions)}
          text="Institutions"
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header={String(totalUtilisateurs)}
          text="Utilisateurs"
        >
        </CWidgetDropdown>
      </CCol>

   </CRow>
  )
}

export default WidgetsDropdown
