import React from 'react';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import FormInput from './FormInput';
import * as Api from '../../api/api';
import { routes } from '../../common/routes';

function validate(values) {
    const errors = {};
    if (!values.firstName
        || values.firstName.trim().length < 0 ) {
            errors.firstName = 'Firstname is required.'
    }
    
    if (!values.lastName
        || values.lastName.trim().length < 0 ) {
            errors.lastName = 'Lastname is required.'
    }
    
    if (!values.email
        || values.email.trim().length < 0
        || !values.email.includes('@')) {
        errors.email = 'Enter valid email.' 
    }
    
    if (!values.password
        || values.password.trim().length < 8 ) {
            errors.password = 'Password should be at least 8 symbols.'
    }

    return errors;
}

function RegisterScene({
    history
}) {
    async function onSubmit(values, form) {
        try {
            const res = await Api.Auth.register(values);
            console.log(res);
            form.reset();

            history.push(routes.login)
        } catch(err) {
            return {
                [FORM_ERROR]: `Wrong input data!`,
            }
        }
        return null;
    }
    
    return (
    <div>
        <legend>
            Fill next fields to register:
        </legend>
        <Form
            onSubmit = {onSubmit}
            validate = {validate}
            render = {({ handleSubmit, submitError }) => (
                <React.Fragment>
                    <Field name = 'firstName'>
                        {({ input, meta }) => (
                            <FormInput 
                                {...input}
                                meta = {meta}
                                placeholder = 'FirstName'
                            />
                        )}
                    </Field>
                    <Field name = "lastName">
                        {({ input, meta }) => (
                            <FormInput
                                {...input}
                                meta = {meta}
                                placeholder = 'LastName'    
                            />
                        )}
                    </Field>
                    <Field name = "email">
                        {({ input, meta }) => (
                            <FormInput
                                {...input}
                                meta = {meta}
                                placeholder = 'email'    
                            />
                        )}
                    </Field>
                    <Field name = 'password'>
                        {({ input, meta }) => (
                            <FormInput
                                {...input}
                                meta = {meta}
                                placeholder = 'password'    
                            />
                        )}
                    </Field>
                    <button
                        onClick = {handleSubmit}
                        className = 'add-pay-save'
                    >
                        Register
                    </button>
                    {submitError && <div>{submitError}</div>}
                </React.Fragment>
            )}
        />
        <p>
            Already have account? &ensp; 
            <Link to={routes.login} >
                Log in.
            </Link>
        </p>
    </div>
    )
}

export default withRouter(RegisterScene);