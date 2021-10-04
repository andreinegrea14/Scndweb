import React from 'react';
import { Link } from 'react-router-dom';
import './../pages/styles.scss';
import Button from 'react-bootstrap/Button';

export function Header(p: {title: string, button1: string, button2: string, isSave: boolean, isCancel: boolean, handleDelete?: () => void}) {
    return (
        <div>
            <div className = "header">
                <p className = "title" >{p.title}</p>
                <div className = "buttons">
                    {!p.isSave ?
                        <button  className = " btn btn"  id = "add-product-btn">
                            <Link style = {{textDecoration: 'none', color: 'black'}} to={'/addproduct'}>
                                {p.button1}
                            </Link>
                        </button> 
                    : 
                    <button name = "save" form = "product_form" type = "submit" className = "btn btn"  id = "add-product-btn"> {p.button1}
                        
                     </button> }
                    {p.isCancel ?
                        <button className = " btn btn-danger"  id = "delete-product-btn">
                            <Link style = {{textDecoration: 'none', color: 'black'}} to={'/'}>
                                {p.button2}
                            </Link>
                        </button> 
                    : 
                    <button onClick = {p.handleDelete} className = "btn btn-danger" id = "delete-product-btn">{p.button2}</button>}
                </div>
            </div>
        <hr className = "header-line"/>
        </div>
    );
}