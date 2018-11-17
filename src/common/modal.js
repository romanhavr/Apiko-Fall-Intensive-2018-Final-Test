import React from 'react';
import { withRouter } from 'react-router-dom';

function Modal({ 
  history,
  children
}) {
    let back = e => {
      e.stopPropagation();
      history.goBack();
    };
  
    return (
      <div
        onClick={back}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          background: "rgba(0, 0, 0, 0.25)"
        }}
      >
        <div
          className="modal"
          onClick = {(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            background: "#fff",
            top: 25,
            left: "10%",
            right: "10%",
            padding: 15,
            border: "2px solid #444"
          }}
        >
        <div
          type="button"
          className='close-button'
          onClick={back}
        >
          <b>
            &times;
          </b>
        </div>
          {children}
        </div>
      </div>
    );
  }

  export default withRouter(Modal);