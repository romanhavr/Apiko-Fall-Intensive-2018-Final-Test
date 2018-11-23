import React from 'react';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const AdminProductScene = ({
    id,
    title,
    onDeleteClick
}) => (
    <div className='admin-product'>
            <Link 
                to={{
                pathname: `/admin/product/${id}`,
                state: { modal: true }
            }}>
                {title}
            </Link>
            <button
                className='add-edit-delete-button delete'
                onClick={() => onDeleteClick(id)}
            >
                Delete
            </button>
            <Link 
                to={{
                pathname: `/admin/product/edit/${id}`,
                state: { modal: true, id:`${id}` }
             }}>
                 <button
                className='add-edit-delete-button edit'
            >
                Edit
            </button>
            </Link>
    </div>
);

export default withRouter(AdminProductScene);