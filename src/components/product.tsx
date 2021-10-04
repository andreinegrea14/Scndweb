import React, { useState } from "react";
import "./styles.scss";

export function ProductBox(p: {selectBoxes: () => void, code: string, name: string, price: string, size: string}) {

    return(
        <div className = "box">
            <div style = {{marginTop: 35}}>
                <input className = "delete-checkboxes" type = "checkbox" onClick = {p.selectBoxes}></input>
                <div className  = "box-content">
                <text className = "text-style">{p.code}</text>
                <text id = "name" className = "text-style">{p.name}</text>
                <text className = "text-style">{p.price}</text>
                <text className = "text-style">{p.size}</text>
                </div>
            </div>
        </div>
    );
}