import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import FormInput from './FormInput';
import * as Api from '../../api/api';
import * as appOperations from '../../modules/app/appOperations';
import store from '../../store/store';
import { routes } from '../../common/routes';

function validate(values) {
    const errors = {};
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

function LoginScene({
    history
}) {
    async function onSubmit(values, form) {
        try {
            const res = await Api.Auth.login(values);
            Api.setToken(res.data.token);

            form.reset();
            store.dispatch(appOperations.init())

            history.push(routes.admin)

        } catch(err) {
            return {
                [FORM_ERROR]: 'Wrong email or password!',
            }
        }
        return null;
    }
    
    return (
    <div>
        <legend>
            Fill next fields to login:
        </legend>
        <Form
            onSubmit = {onSubmit}
            validate = {validate}
            render = {({ handleSubmit, submitError }) => (
                <React.Fragment>
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
                        Login
                    </button>
                    {submitError && <div>{submitError}</div>}
                </React.Fragment>
            )}
        />
        <p>
            Forgot password? &ensp; 
            <Link to={routes.restore} >
                Restore it.
            </Link>
        </p>
        <p>
            Don't have account? &ensp;
            <Link to={routes.register} >
                Register.
            </Link>
        </p>
    </div>
    )
}

export default withRouter(LoginScene);