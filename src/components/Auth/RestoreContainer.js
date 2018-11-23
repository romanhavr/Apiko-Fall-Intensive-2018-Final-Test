import React from 'react';
import { compose, withHandlers, withState } from 'recompose';
import RestoreView from './RestoreView';

const Restore = props => (
    <RestoreView {...props} />
);

const enhance = compose(
    withState('emailValue', 'setEmailValue', ''),
    withState('show', 'setShow', false),
    withState('invalidEmail', 'setInvalidEmail', false),
    withHandlers({
        handleEmailValueChange: props => value => {
            props.setEmailValue(value);
            props.setShow(false);
            props.setInvalidEmail(false)
        },
        handleSend: props => () => {
            (props.emailValue.length > 0 
                && props.emailValue.includes('@'))
                    ? props.setShow(true)
                    : props.setInvalidEmail(true)
        },
    })
);

export default enhance(Restore);