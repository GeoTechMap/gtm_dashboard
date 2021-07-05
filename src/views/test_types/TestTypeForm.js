import React ,{useState, useEffect} from 'react'
import {Formik, Form} from 'formik';
import { TextField } from '../commun/TextField';
import * as Yup from 'yup';
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CFormText,
  CRow,
  CAlert,
  CBadge,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
} from '@coreui/react';
import UserService from "../../../src/services/UserService";

const BasicForms = ({match}) => {
  //__toaster
  const [show, setShow] = useState(false)
  //__end toaster

  useEffect(() => {
   if( match.params.id ){
    fetch(`http://localhost:8080/api/type_essais/`+match.params.id)
      .then((response) => response.json())
      .then((json) => setDataForEdit(json.typeEssaiDto))
      
   }
  }, [match.params.id]);

  const initVal ={
    nom: '',
    sigle:'',
    description:'',
  }
  const [dataForEdit, setDataForEdit] = useState(null);
  const [alert, setAlert] = React.useState({ 
    isActive: false, status: '', message: '',})

  const validate = Yup.object({
    nom: Yup.string()
      .max(45,"Maximum 45 caractères")
      .required("Champs obligatoire"),
    sigle: Yup.string()
    .max(45,"Maximum 45 caractères"),
    description: Yup.string()
      .max(255,"Maximum 255 caractères"),
        
  })
  
  return (
    <div>
    <Formik
      initialValues = {
        dataForEdit || initVal
      }
      enableReinitialize
      validationSchema= {validate}
      onSubmit={values => {
       console.log(values)
          const requestOptions = {
            method: match.params.id ?'PUT':'POST',
            headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${UserService.getToken()}` },
            body: JSON.stringify(values)
        };
        
        //check if it is POST or PUT
        if(match.params.id){
          fetch(`http://localhost:8080/api/type_essais/`+match.params.id, requestOptions)
            .then(response => response.json())
            .then(() => setShow(true))
            // .then(data =>   setAlert({ ...alert,isActive: true, message: "Opération réussie !"}));
        }else{
            fetch(`http://localhost:8080/api/type_essais/`, requestOptions)
            .then(response => response.json())
            .then(() => setShow(true))
            // .then(data =>   setAlert({ ...alert,isActive: true, message: "Opération réussie !"}));
          }
          setTimeout(() => {
            setShow(false)
          }, 3000)
            // setTimeout(() => {
            //   setAlert({...alert, isActive: false, message:''})
            // }, 4000)
      }}
    >
      { formik => (
        <div>
       <Form>
       { alert.isActive ?  <CAlert color="info" closeButton>{alert.message}</CAlert> : ''}
          <CRow>
            <CCol xs="12" sm="6">
              <CCard>
                  <CCardHeader>
                  Informations sur le type de d'essai   {  match.params.id}
                 </CCardHeader>
                    <CCardBody>
                      <CFormGroup>
                          <TextField  label="Nom*:" name="nom" 
                          type="text" placeholder="Entrer le nom du type d'essai..."
                           autoComplete="nom"                       
                           />
                          <CFormText className="help-block">Veillez entrer le nom du type d'essai</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                        <TextField label="Sigle:" name="sigle" type="text" placeholder="Entrer l'abbréviation du type d'essai.." autoComplete="sigle"/>
                        <CFormText className="help-block">Veillez entrer l'abbréviation du type d'essai</CFormText>
                      </CFormGroup> 
                    </CCardBody>
              </CCard>
            </CCol>
            <CCol xs="12" sm="6">
              <CCard>
                  <CCardHeader>
                  Informations sur le type d'essai   {  match.params.id}
                 </CCardHeader>
                    <CCardBody>  
                      <CFormGroup>
                        <TextField label="Description:" type="textarea" name="description"  placeholder="Entrer la description de téléphone..." autoComplete="description"/>
                        <CFormText className="help-block">Veillez entrer la description de l'institution</CFormText>
                      </CFormGroup>      
                    </CCardBody>
                    <CCardFooter>
                      <button className="btn btn-dark mt-3" type="submit">{match.params.id ? 'Modifier': 'Enregistrer'} </button>
                      <button className="btn btn-danger mt-3 ml-3" type='reset'>Réinitialiser</button>
                    </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
       </Form>
        </div>    
      )
      }
    </Formik>   

<CCol sm="12" lg="6">
<CToaster
        position={'top-right'}
      > 
            <CToast
              show={show}
              autohide={true && 4000}
              fade={true}
            >
              <CToastHeader closeButton={true}>
              <CBadge className="mr-1" color="success">SUCCÈS</CBadge>              
              </CToastHeader>
              <CToastBody  color="success">
                Opération réussie !
              </CToastBody>
            </CToast>
      </CToaster>
</CCol>
</div>
  )
}
export default BasicForms
