import React from 'react';

const FormInput = ({
    label,
    required,
    meta,
    ...props,
}) => (
    <div>
        <label>
            {label}
            {required && <span> *</span>}
        </label>
        <input 
            {...props} 
            className = 'input'
        />
        {meta.error && meta.touched && <div>{meta.error}</div> }
    </div>
)

export default FormInput;