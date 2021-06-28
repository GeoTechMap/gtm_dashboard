import React from 'react';
import { useField } from 'formik';

export const SearchTextField = ({label, type, options, ...props}) => {
    const [ field, meta] = useField(props);
    // console.log(options)
    return (
        <div className="mb-2" >
            <input 
            className={`form-control shadow-none 
            
            `}
            {...field} {...props}
            />
            {/* <ErrorMessage component="div" name={field.name} style={{position: "absolute", color:"red", fontSize: ".6rem"} }/> */}
        </div>
    )
}