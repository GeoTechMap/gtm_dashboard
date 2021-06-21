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
  CAlert
} from '@coreui/react'

const BasicForms = ({match}) => {

  useEffect(() => {
   if( match.params.id ){
    fetch(`${process.env.REACT_APP_API_URL}/api/institutions/`+match.params.id)
      .then((response) => response.json())
      .then((json) => setDataForEdit(json))
      
   }
  }, []);

  const initVal ={
    nom: '',
    sigle:'',
    adresse:'',
    telephone1:'',
    telephone2:'',
    email:'',
    siteWeb:'',
    numeroFiscal:'',
    description:'',
  }
  const [dataForEdit, setDataForEdit] = useState(null);
  const [alert, setAlert] = React.useState({ 
    isActive: false, status: '', message: '',})

  const validate = Yup.object({
    nom: Yup.string()
    .max(100,"Maximum 100 caractères")
    .required("Champs obligatire"),
    sigle: Yup.string()
    .max(45,"Maximum 45 caractères"),
    adresse: Yup.string()
    .max(45,"Maximum 45 caractères")
    .required("Champs obligatire"),
    telephone1: Yup.string()
      .max(15,"Maximum 15 caractères")
      .required("Champs obligatire"),
    telephone1: Yup.string()
      .max(15,"Maximum 15 caractères"),
    email: Yup.string()
      .email("Email invalide")
      .required("Champs obligatire"),
    siteWeb: Yup.string()
      .max(45,"Maximum 45 caractères"),
    numeroFiscal: Yup.string()
      .max(45,"Maximum 45 caractères")
      .required("Champs obligatire"),
    description: Yup.string()
      .max(255,"Maximum 255 caractères"),
        
  })
  
  return (
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };
        
        //check if it is POST or PUT
        if(match.params.id){
          fetch(`${process.env.REACT_APP_API_URL}/api/institutions/`+match.params.id, requestOptions)
            .then(response => response.json())//to do:TEST IF SUCCES first
            .then(data =>   setAlert({ ...alert,isActive: true, message: "Opération réussie !"}));
        }else{
            fetch(`${process.env.REACT_APP_API_URL}/api/institutions/`, requestOptions)
            .then(response => response.json())
            .then(data =>   setAlert({ ...alert,isActive: true, message: "Opération réussie !"}));
          }

            setTimeout(() => {
              setAlert({...alert, isActive: false, message:''})
            }, 4000)
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
                  Informations sur l'institution   {  match.params.id}
                 </CCardHeader>
                    <CCardBody>
                      <CFormGroup>
                          <TextField label="Nom*:" name="nom" 
                          type="text" placeholder="Entrer le nom de l'institution..." 
                          autoComplete="nom" 
                          />
                          <CFormText className="help-block">Veuillez entrer le nom de l'institution</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                          <TextField label="Sigle:" name="sigle" 
                          type="text" placeholder="Entrer le sigle de l'institution..." 
                          autoComplete="sigle" 
                          />
                          <CFormText className="help-block">Veuillez entrer le sigle de l'institution</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                        <TextField label="Adresse*:" name="adresse" type="text" placeholder="Entrer l'adresse de l'institution.." autoComplete="adresse"/>
                        <CFormText className="help-block">Veuillez entrer l'adresse de l'institution</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                        <TextField label="Téléphone 1:" name="telephone1" type="text" placeholder="Entrer un numéro de téléphone..." autoComplete="telephone1"/>
                        <CFormText className="help-block">Veuillez entrer un numéro de téléphone de l'institution</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                        <TextField label="Téléphone 2:" name="telephone2" type="text" placeholder="Entrer un auntre numéro de téléphone..." autoComplete="telephone2"/>
                        <CFormText className="help-block">Veuillez entrer un autre numéro de téléphone de l'institution</CFormText>
                      </CFormGroup>
                    </CCardBody>
              </CCard>
            </CCol>
            <CCol xs="12" sm="6">
              <CCard>
                  <CCardHeader>
                  Informations sur l'institution   {  match.params.id}
                 </CCardHeader>
                    <CCardBody>
                      <CFormGroup>
                        <TextField label="Email*:" name="email" type="text" placeholder="Enter l'email de l'institution..." autoComplete="email"/>
                        <CFormText className="help-block">Veuillez entrer l'email de l'institution</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                          <TextField label="Site web:" name="siteWeb" type="text" placeholder="Entrer le site web de l'institution..." autoComplete="siteWeb" />
                          <CFormText className="help-block">Veuillez entrer le site web de l'institution</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                        <TextField label="Numéro social:" name="numeroFiscal" type="text" placeholder="Entrer le numéro social de l'institution.." autoComplete="numeroFiscal"/>
                        <CFormText className="help-block">Veuillez entrer le numéro social de l'intitution</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                        <TextField label="Description:" type="textarea" name="description" placeholder="Entrer la description de téléphone..." autoComplete="description"/>
                        <CFormText className="help-block">Veuillez entrer la description de l'institution</CFormText>
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
  )
}
export default BasicForms
