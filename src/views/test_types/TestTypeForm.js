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
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';

const BasicForms = ({match}) => {
  //__toaster
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
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
    codeCouleur:'0077FF',
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
    codeCouleur: Yup.string()
    .max(6,"Maximum 6 caractères"),
    description: Yup.string()
      .max(255,"Maximum 255 caractères"),
        
  })

  const [errorMessage, setErrorMessage] = useState('Echec du processus. Veuillez essayer ultérieurement !');
  const [loadingState, setLoadingState] = useState(false);
  
  return (
    <div>
    <Formik
      initialValues = {
        dataForEdit || initVal
      }
      enableReinitialize
      validationSchema= {validate}
      onSubmit={values => {
        setLoadingState(true);
      //  console.log(values);

  

 
        const requestOptions = {
          method: match.params.id ?'PUT':'POST',
          headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${UserService.getToken()}`,
          "Access-Control-Allow-Origin" : "*", 
          "Access-Control-Allow-Credentials" : true  },
          body: JSON.stringify(values)
      };

       //check if it is POST or PUT
       if(match.params.id){
        fetch(`http://localhost:8080/api/type_essais/`+match.params.id, requestOptions)
          .then(response => response.json())
          .then((res) => {
            if(res.message !=='success'){
             console.log(res.message)
             setErrorMessage(res.message);
             setShowError(true)
             setLoadingState(false);
            }          
             return res;
           })
          .then(() => setShow(true))
          .then(() => setLoadingState(false))
          .catch((error) => {
            console.log(error);
            setShowError(true)
            setLoadingState(false);
          })
          // .then(data =>   setAlert({ ...alert,isActive: true, message: "Opération réussie !"}));
      }else{
          fetch(`http://localhost:8080/api/type_essais/`, requestOptions)
          .then(response => response.json())
          .then((res) => {
           if(res.message !=='success'){
            console.log(res.message)
            setErrorMessage(res.message);
            setShowError(true)
            setLoadingState(false);
           }          
            return res;
          })
          .then(() => setShow(true))
          .then(() => setLoadingState(false))
          .catch((error) => {
            console.log(error);
            setShowError(true)
            setLoadingState(false);
          })
          // .then(data =>   setAlert({ ...alert,isActive: true, message: "Opération réussie !"}));
        }
 
        
  setTimeout(() => {
    setShow(false)
    setShowError(false);
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
                        <TextField label="Code couleur:" name="codeCouleur" type="text" placeholder="Exemple: 0077FF" autoComplete="codeCouleur"/>
                        <CFormText className="help-block">Veillez entrer le code de couleur du marqueur en hexadécimal</CFormText>
                      </CFormGroup> 
                      <CFormGroup>
                        <TextField label="Description:" type="textarea" name="description"  placeholder="Entrer la description de téléphone..." autoComplete="description"/>
                        <CFormText className="help-block">Veillez entrer la description de l'institution</CFormText>
                      </CFormGroup>      
                    </CCardBody>
                    <CCardFooter>
                      <button className="btn btn-dark mt-3" type="submit"
                         disabled={loadingState}
                         >{match.params.id ? 'Modifier': 'Enregistrer'} 
                      <ClipLoader loading={loadingState} size={15} />
                     </button>
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
    {/* SHOW SUCCES */}
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

    {/* SHOW ERROR */}
    <CCol sm="12" lg="6">
          <CToaster
            position={'top-right'}
          > 
                <CToast
                  show={showError}
                  autohide={true && 4000}
                  fade={true}
                >
                  <CToastHeader closeButton={true}>
                  <CBadge className="mr-1" color="danger">ECHEC</CBadge>              
                  </CToastHeader>
                  <CToastBody  color="danger">
                    {errorMessage}
                  </CToastBody>
                </CToast>
          </CToaster>
        </CCol>
</div>
  )
}
export default BasicForms
