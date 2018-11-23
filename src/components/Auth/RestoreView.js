import React from 'react';

const RestoreInfoSent = ({
    email
}) => (
    <p>
        New password was sent to your email: "<b>{email}</b>".
        <br />
        Have a nice day!
    </p>
);

const RestoreView = ({
    handleSend,
    show,
    handleEmailValueChange,
    emailValue,
    invalidEmail
}) => (
    <div>
        <legend>
            Enter youe email:
        </legend>
        <input 
            name = 'email'
            placeholder = 'email'
            className = 'input'
            onChange={(e) => {handleEmailValueChange(e.target.value)}}
        />
        <br />
        <button
            onClick = {handleSend}
            className = 'add-pay-save'
        >
            Restore
        </button>
        {show
            ? <RestoreInfoSent email = {emailValue} />
            : null
        }
        {invalidEmail
            ? <p>
                Enter valid email!
            </p>
            : null
        }
    </div>
);

export default RestoreView;