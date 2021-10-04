import React from 'react';

export function Footer() {
    return (
        <div>
            <div style = {{textAlign: 'center'}}>
            <hr className = "footer-line"/>    
            <text className = "scandiweb-text">Scandiweb Test assignment</text>
            </div>
        <div style = {{width: '100%', height: 30, backgroundColor: 'gray', borderTop: "2px solid black", marginTop: 20}} />
        </div>
    );
}