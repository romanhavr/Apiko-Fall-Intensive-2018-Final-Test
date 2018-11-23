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
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          background: "rgba(210, 236, 158, 0.3)"
        }}
      >
        <div
          className="modal"
          onClick = {(e) => e.stopPropagation()}
          style={{
            position: "fixed",
            background: "#fff",
            top: 25,
            maxHeight: "80vh",
            left: "10%",
            right: "10%",
            padding: 15,
            border: "1px solid rgb(40, 49, 0)",
            borderRadius: "10px",
            boxShadow: "3px 3px 0 rgba(105, 121, 72, 0.7)",
            overflow: "scroll"
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