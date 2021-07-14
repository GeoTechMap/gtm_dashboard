import React ,{useState, useEffect, useRef, useContext} from 'react'
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
  CLabel,
  CBadge,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
} from '@coreui/react';
import UserService from "../../../src/services/UserService";
import ClipLoader from "react-spinners/ClipLoader";
import { EssaiContext } from "../../EssaisContext";


const BasicForms = ({match}) => {
//__toaster
const [show, setShow] = useState(false);
const [showError, setShowError] = useState(false);
//__end toaster
const [globalData, setGlobalData] = useContext(EssaiContext);

  useEffect(() => {

    //__START fetch all test types for the select field
      fetch(`http://localhost:8080/api/type_essais/`)
        .then((response) => response.json())
        .then((json) => {
          setAllTestTypes(json)
         return json;})

         setAllDepartements([
           {id:'Artibonite',nom:'Artibonite'},
           {id:'Centre',nom:'Centre'},
           {id:'Grand\'Anse',nom:'Grand\'Anse'},
           {id:'Nippes',nom:'Nippes'},
           {id:'Nord',nom:'Nord'},
           {id:'Nord-Est',nom:'Nord-Est'},
           {id:'Nord-Ouest',nom:'Nord-Ouest'},
           {id:'Ouest',nom:'Ouest'},
           {id:'Sud-Est',nom:'Sud-Est'},
           {id:'Sud',nom:'Sud'},
         ])

        //  .then((json) => setInitVal({...initVal,
        //   typeEssai:json[0].id,
        // }))
    //__END fetch all test types for the select field

    //__START fetch all test types for the select field
      // fetch(`http://localhost:8080/api/institutions/`)
      // .then((response) => response.json())
      // .then((json) =>{ 
      //   setAllInstitutions(json)
      //   return json;})

      setAllInstitutions([{
        id: globalData.connectedUser ? globalData.connectedUser.institution.id : null, 
        nom: globalData.connectedUser ? globalData.connectedUser.institution.nom : null}])
      // .then((json) => setInitVal({...initVal,
      //   institution:json[0].id,
      // }))
    //__END fetch all test types for the select field

   if( match.params.id ){
    fetch(`http://localhost:8080/api/essais/`+match.params.id)
      .then((response) => response.json())
      .then((json) => { setDataForEdit({
        id:json.id,
        typeEssai:json.typeEssai.id,
        institution:json.institution.id,
        latitude:json.position.latitude,
        longitude:json.position.longitude,
        altitude:json.position.altitude,
        departement:json.position.departement,
        commune:json.position.commune,
        sectionCommunale:json.position.sectionCommunale,
        commentaire:json.commentaire,
        dateRealisation:json.dateRealisation,
        motsCles:json.motsCles,
        pdf:'',
        //---------
        idPosition:json.position.id,
        idFichier:json.fichier.id,
        nomFichier:json.fichier.nom
      })
      return json;})
      .then((json)=>{
        setAncienNomDuFichier(json.fichier.hashNomFichier)
        return json;
      })
      .then((json)=>{ setMyFile({...myFile,
        file:{
          id:json.fichier.id,
          name:json.fichier.nom,
          type: json.fichier.format,
          size:json.fichier.capacite
        }
        
      })
        return json;
      })
      .then(data =>   {
        fetch(`http://localhost:8081/api/file/getfile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Accept': 'application/json'},
            body: JSON.stringify({
                nomFichier: data.fichier.nom,
                hashNomFichier: data.fichier.hashNomFichier,
                hashBase64:data.fichier.hashPdf
            })})
            .then(res => res.json())
            .then(res => {
               setDataForAPI({...dataForAPI,
             
              pdf:res.base64File})
              return res;
            }
           )
           .then((json)=>{setMyFile({
            file:{
              id:data.fichier.id,
              name:data.fichier.nom,
              type: data.fichier.format,
              size:data.fichier.capacite
            }
            
          })})
            .then(()=> setIsPDFPresent(true))
            // .then(()=>console.log('-----------'+dataForAPI.pdf))
            .catch((error) => {
                console.error('Error:', error);
              });
          return data;
        })
      
   }
  }, [match.params.id, dataForAPI, myFile,globalData]);


  const [myFile, setMyFile] = useState({file:null});//for the file
  // const onFileChange = event => {
  //   // Update the state
  //   setMyFile({file: event.target.files[0]}); 
  //   };
const init = {
  typeEssai: {
    id:null
},
institution: {
    id:null
},
position: {
    id:null
},
fichier: {
    id:null
},
motsCles: '',
pdf:''
}

  const [dataForAPI = init, setDataForAPI] = useState();
  const dataForAPIref = useRef(dataForAPI);
  useEffect(
    () => { dataForAPIref.current = dataForAPI },
    [dataForAPI]
  )


   const [initVal, setInitVal] = useState({
    typeEssai:'',
    institution:'',
    latitude:'',
    longitude:'',
    altitude:'',
    departement:'',
    commune:'',
    sectionCommunale:'',
    commentaire:'',
    dateRealisation:'',
    motsCles:'',
    pdf:'',
  });
  const [anncienNomDuFichier, setAncienNomDuFichier] = useState('');
  const [dataForEdit, setDataForEdit] = useState(null);
  const [allTestTypes, setAllTestTypes] = useState([]);
  const [allInstitutions, setAllInstitutions] = useState([]);
  const [allDepartements, setAllDepartements] = useState([]);
  const [alert, setAlert] = React.useState({ 
    isActive: false, status: '', message: '',})

  const validate = Yup.object({
    typeEssai: Yup.number()
      .max(99999999,"Maximum 45 caractères")
      .min(1,"Faire un choix")
      .required("Champs obligatoire"),
    institution: Yup.number()
      .max(99999999,"Maximum 45 caractères")
      .min(1,"Faire un choix")
      .required("Champs obligatoire"),
    latitude: Yup.number("Entrer un nombre")
      .min(17.5,"Latitude situé en dehors d'Haïti")
      .max(21.0,"Latitude situé en dehors d'Haïti")
      .required("Champs obligatoire"),
    longitude:  Yup.number("Entrer un nombre")
      .min(-75.0,"Latitude situé en dehors d'Haïti")
      .max(-71.5,"Latitude situé en dehors d'Haïti")
      .required("Champs obligatoire"),
    altitude:  Yup.number("Entrer un nombre")
      .max(99999999,"Maximum 255 caractères")
      .required("Champs obligatoire"),
    commentaire: Yup.string()
      .max(255,"Maximum 255 caractères"),
    dateRealisation: Yup.string()
      .max(20,"Maximum 20 caractères"),
    motsCles: Yup.string()
    .max(255,"Maximum 255 caractères"),
    departement: Yup.string()
    .max(255,"Maximum 255 caractères")
    .required("Champs obligatoire"),
    // commune: Yup.string()
    // .max(255,"Maximum 255 caractères")
    // .required("Champs obligatoire"),
    // sectionCommunale: Yup.string()
    // .max(255,"Maximum 255 caractères")
    // .required("Champs obligatoire"),

  })
  

const getBase64 = (file, callback) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    callback(reader.result);
  };
  reader.onerror = (error) => {
    console.log("Error: ", error);
  };
};

const handleChange = (event) => {
  const file = event.currentTarget.files[0];
  setMyFile({file: event.target.files[0]});//for just getting the name outside of the function
  getBase64(file, (result) => {
    setDataForAPI({...dataForAPI, pdf:result.substr(result.indexOf(',') + 1)})
 
  });
  setIsPDFPresent(true);
};

const [isPDFPresent, setIsPDFPresent] = useState(false);
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
        if(!isPDFPresent){//s'il n'y a aucun document
          // alert('Noooooo')
          console.log("no document");
        }else{
        function first(){
          return new Promise(function(resolve, reject){
              // console.log("First");
              
              // toBase64(myFile.file, (base64String)=>{
              // })
              resolve();
          });
      }
      
      function second(){
          return new Promise(function(resolve, reject){
              // console.log("Second");
              setDataForAPI({
                id:match.params.id ? dataForEdit.id : null,
                typeEssai: {
                  id:values.typeEssai
              },
              institution: {
                  id:values.institution
              },
              position: {
                  id: match.params.id ? dataForEdit.idPosition : null,
                  latitude:values.latitude,
                  longitude:values.longitude,
                  altitude:values.altitude,
                  departement:values.departement,
                  // commune:values.commune,
                  // sectionCommunale:values.sectionCommunale
              },
              fichier: {
                  id:match.params.id ? dataForEdit.idFichier : null,
                  nom:myFile.file.name,
                  format: myFile.file.type,
                  capacite:myFile.file.size
              },
              commentaire:values.commentaire,
              dateRealisation:values.dateRealisation,
              motsCles: values.motsCles,
              pdf:dataForAPI.pdf,
              nomFichierASuprimmer:anncienNomDuFichier
            })
            setDataForAPI((state) => {
              // console.log(state); // "React is awesome!"
              
              return state;
            });
            
              resolve();
          });
      }
      
      function third(){
        // console.log(dataForAPI)
          return new Promise(function(resolve, reject){
              // console.log("Third");
              const requestOptions = {
                method: match.params.id ?'PUT':'POST',
                headers: { 'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${UserService.getToken()}`},
                body: JSON.stringify(dataForAPIref.current)
            };
            console.log(dataForAPIref.current)
            //check if it is POST or PUT
            if(match.params.id){//_______________PUT RESQUEST________________
              fetch(`http://localhost:8080/api/essais/`+match.params.id, requestOptions)
                .then(response => response.json())
                .then( essaiSaved => {
                  fetch(`http://localhost:8081/api/file`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json',
                    'Accept': 'application/json'},
                    body: JSON.stringify({
                      hashNomFichier: essaiSaved.essaiDto.fichier.hashNomFichier,
                      nomFichierASuprimmer:anncienNomDuFichier,
                      base64: dataForAPI.pdf
                    })})
                    // .then(res => console.log(res))
                    
                  }
                  )
                  .then(() => setShow(true))
                  .then(() => setLoadingState(false))
                //.then(data =>   setAlert({ ...alert,isActive: true, message: "Opération réussie !"}))
                .catch((error) => {
                  console.log(error);
                  setShowError(true);
                  setLoadingState(false);
                })
            }else{//_______________POST RESQUEST________________
              // console.log(requestOptions.body)
                fetch(`http://localhost:8080/api/essais`, requestOptions)
                .then(response => response.json())//to the app server
                .then( essaiSaved => {
                  fetch(`http://localhost:8081/api/file`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json',
                    'Accept': 'application/json'},
                    body: JSON.stringify({
                      hashNomFichier: essaiSaved.essaiDto.fichier.hashNomFichier,
                      nomFichierASuprimmer:"",//We dont delete any old doc
                      base64: dataForAPI.pdf
                    })})
                    // .then(res => console.log(res))
                  }
                  )
                  
                  .then(() => setShow(true))
                  .then(() => setLoadingState(false))
               // .then(data =>   setAlert({ ...alert,isActive: true, message: "Opération réussie !"}))
               .catch((error) => {
                console.log(error);
                setShowError(true);
                setLoadingState(false);
              })
                // fetch(`${process.env.REACT_APP_API_URL}/api/essais`,
                //   {
                //     method: 'POST',
                //     body: values,
                //   }
                // )
                // .then(data =>   setAlert({ ...alert,isActive: true, message: "Opération réussie !"}))
                // .catch((error) => {
                //   console.error('Error:', error);
                // });
              }
              resolve();
          });
      }

      first()
      .then(second)
      .then(third);



      setTimeout(() => {
        setShow(false);
        setShowError(false);
      }, 3000)
            // setTimeout(() => {
            //   setAlert({...alert, isActive: false, message:''})
            // }, 4000)
      }
      }
    }
    >
      { formik => (
        <div>
       <Form>
       { alert.isActive ?  <CAlert color="info" closeButton>{alert.message}</CAlert> : ''}
          <CRow>
            <CCol xs="12" sm="6">
              <CCard>
                  <CCardHeader>
                  Informations sur l'essai   {  match.params.id}
                 </CCardHeader>
                    <CCardBody>
                      <CFormGroup>
                          <TextField  label="Type d'essai*:" name="typeEssai" 
                          type="select" options={allTestTypes} placeholder="Entrer le type d'essai..."/>
                          <CFormText className="help-block">Veuillez entrer le type d'essai</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                        <TextField label="Institution*:" name="institution" 
                         type="select" options={allInstitutions} placeholder="Entrer l'institution" />
                        <CFormText className="help-block">Veuillez entrer l'institution</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                        <TextField label="Latitude*:" name="latitude" 
                        type="text" placeholder="Entrer la latitude" autoComplete="latitude"/>
                        <CFormText className="help-block">Veuillez entrer la latitude (ex: 18.54)</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                        <TextField label="Longitude*:" name="longitude" 
                        type="text" placeholder="Entrer la longitude" autoComplete="longitude"/>
                        <CFormText className="help-block">Veuillez entrer la longitude (ex: -72.68)</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                        <TextField label="Altitude*:" name="altitude" 
                        type="text" placeholder="Entrer l'altitude" autoComplete="altitude"/>
                        <CFormText className="help-block">Veuillez entrer l'altitude (ex: 45)</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                          <TextField  label="Département*:" name="departement" 
                          type="select" options={allDepartements} placeholder="Entrer le département de l'essai..."/>
                          <CFormText className="help-block">Veuillez entrer le département de l'essai</CFormText>
                      </CFormGroup>
                    </CCardBody>
              </CCard>
            </CCol>
            <CCol xs="12" sm="6">
              <CCard>
                  <CCardHeader>
                  Informations sur l'essai   {  match.params.id}
                 </CCardHeader>
                    <CCardBody>  
                    {/* <CFormGroup>
                          <TextField  label="Commune*:" name="commune" 
                          type="select" options={allTestTypes} placeholder="Entrer la commune de l'essai..."/>
                          <CFormText className="help-block">Veuillez entrer la commune de l'essai</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                          <TextField  label="Section communale*:" name="sectionCommunale" 
                          type="select" options={allTestTypes} placeholder="Entrer la section communale de l'essai..."/>
                          <CFormText className="help-block">Veuillez entrer la section communale de l'essai</CFormText>
                      </CFormGroup> */}
                      <CFormGroup>
                        <TextField label="Date de réalisation: (ex: 31/12/2013)" name="dateRealisation" 
                        type="text" placeholder="Entrer la date de réalisation de l'essai" autoComplete="dateRealisation"/>
                        <CFormText className="help-block">Veuillez entrer la date de réalisation de l'essai (format: Jour/Mois/Année)</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                        <TextField label="Mots clés:" name="motsCles" 
                        type="textarea" placeholder="Entrer les mots clés" autoComplete="motsCles"/>
                        <CFormText className="help-block">Veuillez entrer les mots clés</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                        <TextField label="Commentaires:" name="commentaire" 
                        type="textarea" placeholder="Entrer les commentaires" autoComplete="commentaire"/>
                        <CFormText className="help-block">Veuillez entrer un commentaire</CFormText>
                      </CFormGroup>
                      {/* <CFormGroup >
                        <TextField label="Fichier:" name="fichier" 
                        type="file" placeholder="Entrer le fichier" autoComplete="fichier"/>
                        <CFormText className="help-block">Veuillez entrer le fichier (Max: 2 MB)</CFormText>
                      </CFormGroup>  */}
                      <CFormGroup row>{}
                      <CCol xs="12" md="12">
                        <input  id="custom-file-input" 
                        // onChange={onFileChange}
                        type="file" 
                        accept="application/pdf"     
                        onChange={(event) => handleChange(event)}
                          />
                        <CLabel htmlFor="custom-file-input" variant="custom-file">
                           {myFile.file ? myFile.file.name:'Choisir un fichier...'}
                        </CLabel>
                      </CCol>
                    </CFormGroup> 
                    {!dataForEdit && !isPDFPresent ? 
                      <CFormGroup row>
                      <CCol xs="12" md="12"> 
                      <CFormText className="help-block"><span style={{color:'red'}}>Choisir un PDF*</span></CFormText>
                      </CCol>
                    </CFormGroup>  
                    : ''}   
                     
                    </CCardBody>
                    
                    {dataForEdit ? 
                    <CFormGroup row>
                      <CCol xs="12" md="12"> 
                      <CFormText className="help-block"> Ancien PDF:  {dataForEdit ? dataForEdit.nomFichier :''}</CFormText>
                      </CCol>
                    </CFormGroup>   :''}
                     
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
              <CToastBody  color="success">
                Echec de l'opération. Veuillez essayer plus tard !
              </CToastBody>
            </CToast>
      </CToaster>
    </CCol>
 </div> 
  )
}
export default BasicForms
