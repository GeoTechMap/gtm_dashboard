import React from 'react';
import { CSelect,
    CInputFile, CLabel,CCol} from '@coreui/react';
import { ErrorMessage, useField } from 'formik';

export const TextField = ({label, type, options, ...props}) => {
    const [ field, meta] = useField(props);
    return (
        <div className="mb-2" >
            <label htmlFor={field.name}>{label}</label>
            {type == "textarea" ?
            <textarea 
            className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid' }`}
            placeholder="Veuillez entrer la description..."
            rows="6"
            {...field} {...props}
            ></textarea>:
            type == "select" ?
            <CSelect name={label}
            className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid' }`}
            {...field} {...props}>
                 { options.map((option, key) => {              
                    return <option key={key} value={option.id}>{option.nom}</option>
                    })}      
            </CSelect>:
        //     type == "file" ?
        //     <CCol xs="12" md="12">
        //      <CInputFile custom id="custom-file-input" />
        //     <CLabel htmlFor="custom-file-input" variant="custom-file">
        //     Choisir fichier...
        //     </CLabel>
        //     </CCol>
        //    :
            <input 
            className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid' }`}
            {...field} {...props}
            />
            }
            <ErrorMessage component="div" name={field.name} style={{position: "absolute", color:"red", fontSize: ".6rem"} }/>
            
        </div>
    )
}