import React, { lazy, useEffect, useState, useContext } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
} from '@coreui/react'
import {
  CChartBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPie,
  CChartPolarArea
} from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'

import MainChartExample from '../charts/MainChartExample.js'
import { EssaiContext } from "../../EssaisContext";

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {

  const [globalData, setGlonbalData] = useContext(EssaiContext);

  // useEffect(() => {
  //   fetch('http://localhost:8080/api/type_essais')
  //     .then((response) => response.json())
  //     .then((json) => setAllTypeEssais(json))
  //     .then(() => 
  //       setListNomsTypeEssais(
  //         allTypeEssais.map((typeEssai, key) => (
  //           typeEssai.nom
  //      ))
  //       )
  //     )
  //     .then(() =>
  //     setListValeursTypeEssais(
  //       allTypeEssais.map((typeEssai, key) => (
  //         typeEssai.essais.length
  //    ))
  //     ))

  //     .catch((err) => console.log(err))
    
  // }, []);

  const [allTypeEssais, setAllTypeEssais] = useState([]);
  const [listNomsTypeEssais, setListNomsTypeEssais] = useState([]);
  const [listValeursTypeEssais, setListValeursTypeEssais] = useState([]);

  return (
    <>
      <WidgetsDropdown />
      <CCard>
        <CCardHeader>
          Types d'essai <strong>VS</strong> nombre d'essais géotechniques
        </CCardHeader>
        <CCardBody>
          <CChartBar
            datasets={[
              {
                label: 'Nombre d\'essais',
                backgroundColor: globalData.listCouleurTypeEssais,
                data: globalData.listValeursTypeEssais
              }
            ]}
            labels={globalData.listeNomTypeEssais}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>

    </>
  )
}

export default Dashboard
