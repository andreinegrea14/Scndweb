import { Select } from '@material-ui/core';
import React, { ChangeEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { useHistory } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";

import axios from 'axios';
import { RerenderContext } from '../App';
import { baseUrl } from './product-list';

export function AddProduct() {
    const { rerender, setRerender } = useContext(RerenderContext);
    const [inputs, setInputs] = useState({
        sku: "",
        name: "",
        price: "",
        type: ""
    });

    const history = useHistory();
    const [showAlert, setShowAlert] = useState({
        emptyField: false,
        invalidField: false,
        existingSKU: false
    });

    const [invalidInputs, setInvalidInputs] = useState({
        sku: false,
        name: false,
        price: false,
        size: false,
        weight: false,
        width: false,
        length: false,
        height: false
 
        
    });

    const [typeInputs, setTypeInputs] = useState({
        size: "",
        weight: "",
        width: "",
        length:"",
        height: ""
    });
        

    function handleDropdown(event: ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: ReactNode) {
        const type = event.target.name as keyof typeof inputs;
        setInputs({
            ...inputs,
            [type]: event.target.value
        } as any)
    }

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        } as any);
    }

    const handletypeInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTypeInputs({
            ...typeInputs,
            [e.target.name]: e.target.value
        } as any);
    }
  
      
    function AlertShowing(){
        
        return(
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {showAlert.emptyField ? <div><strong>Please, submit required data!</strong> 
            <button  type="button" className="btn-close"  onClick = {() => setShowAlert({...showAlert, emptyField: false})} aria-label="Close">
            </button></div>
            : showAlert.invalidField ? <div><strong>Please, provide the data of indicated type! Value or text are accepted.</strong>
            <button  type="button" className="btn-close"  onClick = {() => setShowAlert({...showAlert, invalidField: false})} aria-label="Close">
            </button></div>
            : <div><strong>The SKU entered already exists.</strong>
            <button  type="button" className="btn-close"  onClick = {() => setShowAlert({...showAlert, existingSKU: false})} aria-label="Close">
            </button></div>
            }
        </div>
      );
    }

        async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
           
         event.preventDefault();
        const sku = localStorage.getItem("SKU");
        const obj = {
            sku: inputs.sku,
            name: inputs.name,
            price: inputs.price,
            type: inputs.type,
            size: typeInputs.size,
            weight: typeInputs.weight,
            height: typeInputs.height,
            width: typeInputs.width,
            length: typeInputs.length
        }
         setInvalidInputs({name: validateField(inputs.name), price: !validateNumericField(inputs.price), sku: validateField(inputs.sku), size: !validateNumericField(typeInputs.size), weight: !validateNumericField(typeInputs.weight), width: !validateNumericField(typeInputs.width), length: !validateNumericField(typeInputs.length), height: !validateNumericField(typeInputs.height)});
          if (inputs.sku === "" || inputs.name === "" || inputs.price === "" || inputs.type === ""){
            setShowAlert({invalidField: false, emptyField: true, existingSKU: false});
        }

          else if( inputs.type === "1" && typeInputs.size === ""){
            setShowAlert({invalidField: false, emptyField: true, existingSKU: false});
          }
           else if(inputs.type === "2"&& typeInputs.weight === ""){ 
            setShowAlert({invalidField: false, emptyField: true, existingSKU: false});
           }
            else if(inputs.type === "3" && (typeInputs.width === "" || typeInputs.length === "" || typeInputs.height === "")){
                setShowAlert({invalidField: false, emptyField: true, existingSKU: false});
          } 
          else if(validateField(inputs.sku) || validateField(inputs.price) || validateField(inputs.name)){
            setShowAlert({emptyField: false, invalidField: true, existingSKU: false});
          }

          else if (!validateNumericField(typeInputs.size)){
            setShowAlert({emptyField: false, invalidField: true, existingSKU: false});
           
      }
          else if (!validateNumericField(typeInputs.weight)){
            setShowAlert({emptyField: false, invalidField: true, existingSKU: false});
       
  }
          else if (!validateNumericField(typeInputs.width)){
            setShowAlert({emptyField: false, invalidField: true, existingSKU: false});
   
}
        else if (!validateNumericField(typeInputs.length)){
            setShowAlert({emptyField: false, invalidField: true, existingSKU: false});
   
}
        else if (!validateNumericField(typeInputs.height)){
            setShowAlert({emptyField: false, invalidField: true, existingSKU: false});
} 
// else if (!validateNumericField(typeInputs.size)) {
//     setShowAlert({emptyField: false, invalidField: true, existingSKU: false});
// }
else if (sku?.includes(inputs.sku)) {
        setShowAlert({emptyField: false, invalidField: false, existingSKU: true})
}
          else {
            const url = 'http://3.126.255.191/index.php';
            await axios.post(baseUrl, obj, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
            })
            .then(res => console.log(res.config.data))
            .catch(err => console.log(err))
            setRerender(!rerender);
            history.push("/");
          }
        
        }

        function validateField(text: string){

            const expression: RegExp = /[^A-Za-z0-9]/;
            return expression.test(text);
        }

        function validateNumericField(text: string) {
            const numericExpression: RegExp = /^(\s*|\d+)$/;
            return numericExpression.test(text);
        }
    return (
        <div>
            <Header
                title = "Product Add"
                button1 = "Save"
                button2 = "Cancel"
                isSave = {true}
                isCancel = {true}
            />
            <br></br>
            {(showAlert.invalidField || showAlert.emptyField || showAlert.existingSKU) ? <AlertShowing /> : <></>}
            <div style = {{marginLeft: 30}}>
                <form id = "product_form" onSubmit = {onSubmit}>
                    <div className ="form-group">
                    <label htmlFor = "sku" id = "label-type">SKU</label>
                    <input type = "text" className ="form-control input-sm"  id = "sku" value = {inputs.sku} style ={invalidInputs.sku ? {borderColor: 'red'} : {} } name = "sku" onChange = {handleFieldChange}></input>
                    </div>
                    <br /> <br />
                    <label id = "label-type" >Name</label>
                    <input id = "name"  type = "text" className ="form-control input-sm"  value = {inputs.name} style ={invalidInputs.name ? {borderColor: 'red'} : {}} name = "name" onChange = {handleFieldChange}></input>
                    <br /> <br />
                    <label id = "label-type">Price ($)</label>
                    <input id = "price" type = "text" className ="form-control input-sm"  value = {inputs.price} style ={invalidInputs.price ? {borderColor: 'red'} : {}} name = "price" onChange = {handleFieldChange}></input>
                    <br /> <br />
                    <br /> <br />
                    <label id = "label-type">Type Switcher</label>
                    <Select
                        style = {{position: 'absolute', left: 150}}
                        native
                        id = "productType"
                        value={inputs.type}
                        onChange = {handleDropdown}
                        inputProps={{
                            name: 'type',
                            id: 'product-type',
                        }}
                    >
                        <option value = {0}>{"Type Switcher"}</option>
                        <option id = "DVD" value ={1}>{"DVD"}</option>
                        <option id = "Book" value ={2}>{"Book"}</option>
                        <option id = "Furniture" value ={3}>{"Furniture"}</option>
                    </Select>


                    <br /> <br />
                    {inputs.type === "1" ?
                    <div>
                        <label id = "label-type">Size (MB)</label>
                        <input id = "size" type = "text" className ="form-control input-sm" value = {typeInputs.size} style ={invalidInputs.size ? {borderColor: 'red'} : {}} name = "size" onChange = {handletypeInputsChange}></input>
                        <br></br><br></br>
                        <text style ={{fontWeight: 'bolder', fontSize: 20}}>Please, provide size.</text>
                    </div>
                    : inputs.type === "2" ?
                    <div>
                        <label id = "label-type" >Weight (KG)</label>
                        <input id = "weight" type = "text" className ="form-control input-sm" value = {typeInputs.weight} style ={invalidInputs.weight ? {borderColor: 'red'} : {}} name = "weight" onChange = {handletypeInputsChange}></input>
                        <br></br><br></br>
                        <text style ={{fontWeight: 'bolder', fontSize: 20}}>Please, provide weight.</text>

                    </div>
                    : inputs.type === "3" ?
                    <div>
                        <label htmlFor = "height" id = "label-type">Height (CM)</label>
                        <input id = "height" type = "text" className ="form-control input-sm"  value = {typeInputs.height} style ={invalidInputs.height ? {borderColor: 'red'} : {}} name = "height" onChange = {handletypeInputsChange}></input>
                        <br></br><br></br>
                        <label id = "label-type">Width (CM)</label>
                        <input id = "width" type = "text" className ="form-control input-sm" value = {typeInputs.width} style ={invalidInputs.width ? {borderColor: 'red'} : {}} name = "width" onChange = {handletypeInputsChange}></input>
                        <br></br><br></br>
                        <label id = "label-type">Length (CM)</label>
                        <input id = "length" type = "text" className ="form-control input-sm" value = {typeInputs.length} style ={invalidInputs.length ? {borderColor: 'red'} : {}} name = "length" onChange = {handletypeInputsChange}></input>

                        <br></br><br></br>
                        <text style ={{fontWeight: 'bolder', fontSize: 20}}>Please, provide dimensions.</text>

                        
                    </div>
                    : <></>}
                </form>
            </div>
            <Footer></Footer>
        </div>
    );
}