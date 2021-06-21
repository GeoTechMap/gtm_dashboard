import React ,{useState, useEffect} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch,
  CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'

const BasicForms = ({match}) => {
  //to know if the form is for create (return false) or for edit (return true)
  const [isEdit, setIsEdit] = React.useState(false);
  // const { id } = match.params;
  useEffect(() => {
   if( match.params.id ){
    fetch("http://localhost:8080/api/users/"+match.params.id)
      .then((response) => response.json())
      .then((json) => setInputValues(json))
   }
 
    
  }, []);

  const [inputValues, setInputValues] = useState({
    firstName: '', lastName: '', password: '', email: '', role: '1', sexe: '0', phone: '', address: '', institution: ''
  });
  
  const handleOnChange = event => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const onReinitialiserInput = () =>{
    setInputValues({
      firstName: '', lastName: '', password: '', email: '', role: '1', sexe: '0', phone: '', address: '', institution: ''
    })
  }

  const [alert, setAlert] = React.useState({ 
    isActive: false, status: '', message: '',})
   const handleSubmit = (evt) => {
      evt.preventDefault();
      //VALIDATION
      const requestOptions = {
        method: match.params.id ?'PUT':'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputValues)
    };
    //check if it is POST or PUT
    if(match.params.id){
      fetch('http://localhost:8080/api/users/'+match.params.id, requestOptions)
        .then(response => response.json())
        .then(data =>   setAlert({ ...alert,isActive: true, message: "Opération réussie !"}));
    }else{
        fetch('http://localhost:8080/api/users/', requestOptions)
        .then(response => response.json())
        .then(data =>   setAlert({ ...alert,isActive: true, message: "Opération réussie !"}));
      }

        setTimeout(() => {
          setAlert({...alert, isActive: false, message:''})
        }, 4000)
  }

  return (
    <>
          <form onSubmit={handleSubmit}>
            { alert.isActive ?  <CAlert color="info" closeButton>{alert.message}</CAlert> : ''}
         
      <CRow>
  
        <CCol xs="12" sm="6">
        <CCard>
            <CCardHeader>
              Informations de l'utilisateur   {  match.params.id}
            </CCardHeader>
            <CCardBody>
              <CForm >
                <CFormGroup>
                  <CLabel >Prénom</CLabel>
                  <CInput type="text" onChange={handleOnChange} value={inputValues.firstName} name="firstName" placeholder="Entrer le prénom.." autoComplete="prenom"/>
                  <CFormText className="help-block">Veillez entrer le prénom</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel >Nom</CLabel>
                  <CInput type="text" onChange={handleOnChange} value={inputValues.lastName} name="lastName" placeholder="Entrer le nom.." autoComplete="nom"/>
                  <CFormText className="help-block">Veillez entrer le nom</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel >Email</CLabel>
                  <CInput type="email" onChange={handleOnChange} value={inputValues.email} name="email" placeholder="Enter Email.." autoComplete="email"/>
                  <CFormText className="help-block">Veillez entrer l'email</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel >Télṕhone</CLabel>
                  <CInput type="text" onChange={handleOnChange} value={inputValues.phone} name="phone" placeholder="Entrer le téléphone.." autoComplete="phone"/>
                  <CFormText className="help-block">Veillez entrer le téléphone</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel >Addresse</CLabel>
                  <CInput type="text" onChange={handleOnChange} value={inputValues.adress} name="adress" placeholder="Entrer l'addresse.." autoComplete="adress"/>
                  <CFormText className="help-block">Veillez entrer l'adresse</CFormText>
                </CFormGroup>
              
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6">
          <CCard>
            <CCardHeader>
            Informations de l'utilisateur
            </CCardHeader>
            <CCardBody>
                <CFormGroup>
                  <CLabel>Mot de passe</CLabel>
                  <CInput type="password" onChange={handleOnChange} name="password" placeholder="Enter Password.." autoComplete="current-password"/>
                  <CFormText className="help-block">Veuillez entre un mot de passe</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Confirmer mot de passe</CLabel>
                  <CInput type="password" onChange={handleOnChange} name="confirm_password" placeholder="Enter Password.." autoComplete="current-password"/>
                  <CFormText className="help-block">Veuillez confirmer le mot de passe</CFormText>
                </CFormGroup>
                <CFormGroup>
                <CLabel>Sexe</CLabel>
                    <CSelect custom onChange={handleOnChange} name="sexe" >
                      <option value="0"selected={inputValues.sexe == '0'}>Homme</option>
                      <option value="1" selected={inputValues.sexe == '1'}>Femme</option>
                      <option value="2" selected={inputValues.sexe == '2'}>Autre</option>
                    </CSelect>
                    <CFormText className="help-block">Choisir le sexe</CFormText>
                </CFormGroup>
                <CFormGroup>
                <CLabel>Rôle</CLabel>
                    <CSelect custom onChange={handleOnChange} name="role" >
                      <option value="1">Admin</option>
                      <option value="0">Super Admin</option>
                    </CSelect>
                    <CFormText className="help-block">Choisir le rôle</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Institution</CLabel>
                  <CInputGroup>
                    <CSelect custom onChange={handleOnChange} name="institution" >
                      <option value="0">URGéo</option>
                      <option value="1">BME</option>
                      <option value="2">LNBTP</option>
                    </CSelect>
                    <CInputGroupAppend>
                      <CInputGroupText><CIcon name="cil-scrubber" /></CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> {match.params.id ? 'Modifier': 'Enregistrer'} </CButton>
              <CButton type="reset" size="sm" color="danger" onClick={() => onReinitialiserInput()}><CIcon name="cil-ban" /> Réinitialiser</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      
      </CRow>
      </form>
     </>
  )
}

export default BasicForms
