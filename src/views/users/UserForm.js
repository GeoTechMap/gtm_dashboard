import React ,{useState, useEffect, useRef} from 'react'
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
} from '@coreui/react'
import UserService from "../../../src/services/UserService";
import ClipLoader from "react-spinners/ClipLoader";

const UserForm = ({match}) => {
  //__toaster
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  //__end toaster

  useEffect(() => {
    //__START fetch all test types for the select field
    fetch(`http://localhost:8080/api/keycloakusers/`)
    .then((response) => response.json())
    .then((json) => {
    setAllKeycloalUserWithoutProfile(json)
    return json;})
//__END fetch all test types for the select field
    //__START fetch all test types for the select field
    fetch(`http://localhost:8080/api/institutions/`)
    .then((response) => response.json())
    .then((json) =>{ 
      setAllInstitutions(json)
      return json;})
//__END fetch all test types for the select field

   if( match.params.id ){
    fetch(`http://localhost:8080/api/utilisateurs/`+match.params.id)
      .then((response) => response.json())
      .then((json) => setDataForEdit(
        {
          nom: json.utilisateurDto.nom,
          prenom:json.utilisateurDto.prenom,
          username:json.utilisateurDto.username,
          email:json.utilisateurDto.email,
          adresse:json.utilisateurDto.adresse,
          telephone:json.utilisateurDto.telephone,
          institution:json.utilisateurDto.institution.id,
        }))
      
   }
  }, [match.params.id]);

  const initVal ={
    nom: '',
    prenom:'',
    username:'',
    email:'',
    adresse:'',
    telephone:'',
    institution:'',
  }
  const [allKeycloalUserWithoutProfile, setAllKeycloalUserWithoutProfile] = useState([]);
  const [allInstitutions, setAllInstitutions] = useState([]);
  const [dataForEdit, setDataForEdit] = useState(null);
  const [alert, setAlert] = React.useState({ 
    isActive: false, status: '', message: '',})

const init ={
    nom: '',
    prenom:'',
    username:'',
    email:'',
    adresse:'',
    telephone:'',
    institution: {
        id:null
    },
    }
const [dataForAPI = init, setDataForAPI] = useState();

  const validate = Yup.object({
    nom: Yup.string()
    .max(100,"Maximum 100 caract??res")
    .min(3,"3 caract??res au minimum")
    .required("Champs obligatire"),
    prenom: Yup.string()
    .max(45,"Maximum 45 caract??res")
    .min(3,"3 caract??res au minimum"),
    adresse: Yup.string()
    .max(45,"Maximum 45 caract??res")
    .min(3,"3 caract??res au minimum")
    .required("Champs obligatire"),
    telephone: Yup.string()
      .max(15,"Maximum 15 caract??res")
      .min(3,"3 caract??res au minimum")
      .required("Champs obligatire"),
    email: Yup.string()
      .email("Email invalide")
      .required("Champs obligatire"),
    username: Yup.string()
      .max(45,"Maximum 45 caract??res")
      .min(1,"Faire un choix")
      .required("Champs obligatoire"),
    institution: Yup.number()
      .min(1,"Faire un choix")
      .required("Champs obligatoire"),
        
  })
  
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
                const requestOptions = {
                    method: match.params.id ?'PUT':'POST',
                    headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${UserService.getToken()}`},
                    body: JSON.stringify( {
                        id:match.params.id ? dataForEdit.id : null,
                        nom:values.nom,
                        idKeycloak:'plplp',
                        prenom:values.prenom,
                        adresse:values.adresse,
                        telephone:values.telephone,
                        email:values.email,
                        username:values.username,
                        institution:{
                            id:values.institution
                        }
                    })

                };
                  //check if it is POST or PUT
        if(match.params.id){
            fetch(`http://localhost:8080/api/utilisateurs/`+match.params.id, requestOptions)
              .then(response => response.json())//to do:TEST IF SUCCES first
              .then(() => setShow(true))
              .then(() => setLoadingState(false))
              .catch((error) => {
                console.log(error);
                setShowError(true);
                setLoadingState(false);
              })
              // .then(data =>   setAlert({ ...alert,isActive: true, message: "Op??ration r??ussie !"}));
          }else{
              fetch(`http://localhost:8080/api/utilisateurs/`, requestOptions)
              .then(response => response.json())
              // .then(data =>   setAlert({ ...alert,isActive: true, message: "Op??ration r??ussie !"}));
              .then(() => setShow(true))
              .then(() => setLoadingState(false))
              .then(() => 
              setTimeout(() => {
                window.location.reload()
              }, 3000))
              .catch((error) => {
                console.log(error);
                setShowError(true)
                setLoadingState(false);
              })
            }
              
        
      

            setTimeout(() => {
              setShow(false);
              setShowError(false);
            }, 3000)
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
                  Informations sur l'utilisateur   {  match.params.id}
                 </CCardHeader>
                    <CCardBody>
                      <CFormGroup>
                          <TextField label="Nom*:" name="nom" 
                          type="text" placeholder="Entrer le nom de l'utilisateur..." 
                          autoComplete="nom" 
                          />
                          <CFormText className="help-block">Veuillez entrer le nom de l'utilisateur</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                          <TextField label="Pr??nom:" name="prenom" 
                          type="text" placeholder="Entrer le pr??nom de l'utilisateur..." 
                          autoComplete="sigle" 
                          />
                          <CFormText className="help-block">Veuillez entrer le pr??nom de l'utilisateur</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                        <TextField label="Adresse*:" name="adresse" type="text" placeholder="Entrer l'adresse de l'institution.." autoComplete="adresse"/>
                        <CFormText className="help-block">Veuillez entrer l'adresse de l'utilisateur</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                        <TextField label="T??l??phone:" name="telephone" type="text" placeholder="Entrer un num??ro de t??l??phone..." autoComplete="telephone1"/>
                        <CFormText className="help-block">Veuillez entrer le num??ro de t??l??phone de l'utilisateur</CFormText>
                      </CFormGroup>
                    </CCardBody>
              </CCard>
            </CCol>
            <CCol xs="12" sm="6">
              <CCard> 
                  <CCardHeader>
                  Informations sur l'utilisateur   {  match.params.id}
                 </CCardHeader>
                    <CCardBody>
                      <CFormGroup>
                        <TextField label="Email*:" name="email" type="text" placeholder="Enter l'email de l'utilisateur..." autoComplete="email"/>
                        <CFormText className="help-block">Veuillez entrer l'email de l'utilisateur</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                          <TextField  label="Nom d'utilisateur*:" name="username" 
                          type="selectString" options={allKeycloalUserWithoutProfile}/>
                          <CFormText className="help-block">Veuillez choisir le nom d'utilisateur</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                        <TextField label="Institution*:" name="institution" 
                         type="select" options={allInstitutions} placeholder="Entrer l'institution" />
                        <CFormText className="help-block">Veuillez entrer l'institution</CFormText>
                      </CFormGroup>
                    </CCardBody>
                    <CCardFooter>
                      <button className="btn btn-dark mt-3" type="submit"
                         disabled={loadingState}
                         >{match.params.id ? 'Modifier': 'Enregistrer'} 
                      <ClipLoader loading={loadingState} size={15} />
                      </button>
                      <button className="btn btn-danger mt-3 ml-3" type='reset'>R??initialiser</button>
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
              <CBadge className="mr-1" color="success">SUCC??S</CBadge>              
              </CToastHeader>
              <CToastBody  color="success">
                Op??ration r??ussie !
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
              <CToastBody  color="success">
                Echec de l'op??ration. Veuillez essayer plus tard !
              </CToastBody>
            </CToast>
      </CToaster>
    </CCol>
  </div>
  )
}
export default UserForm
