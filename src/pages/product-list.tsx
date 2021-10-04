import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { RerenderContext } from '../App';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { ProductBox } from '../components/product';
import { AddProduct } from './add-product';
import './styles.scss';
export const baseUrl = 'https://3.70.18.151/dashboard/server.php';
function ProductList() {
    const history = useHistory();
    const { rerender } = useContext(RerenderContext)
    const [deletedData, setDeletedData] = useState(false);
    
    const [boxes, setBoxes] = useState([{
        idProduct: "",
        sku: "",
        name: "",
        price: "",
        type:"",
        size:"",
        weight:"",
        height:"",
        width:"",
        length:""
    }])
    const selectedBoxes: string[] = [];
    const obj = {
        idProduct: selectedBoxes
    }
    function selectBoxes(item: string) {
        selectedBoxes.push(item)
    }

    async function deleteBoxes() {
        await axios.post(baseUrl, obj, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
        })
        .then(res => console.log(res.config.data))
        .catch(err => console.log(err))
        setDeletedData(!deletedData);
    }
    useEffect(() => {
        axios.get(baseUrl, {
            method: 'GET'
        })
        .then (res => {
            setBoxes(res.data)
        })
    }, [rerender, deletedData])

    useEffect(() => {
        // localStorage.setItem("SKU", JSON.stringify(boxes.map(item => item.sku)));
        // var elementExists = document.getElementById("name");
        // console.log(elementExists)

    }, [boxes])
    boxes.map(item=> {
        var elementExists = document.getElementsByName(`${item.name}`)
    console.log(elementExists)
    })
    return (
        <div>
            <Header 
                title = "Product List" 
                button1 = "ADD" 
                button2 = "MASS DELETE"
                isSave = {false}
                isCancel = {false}
                handleDelete = {deleteBoxes}
            />
            <div style = {{flexDirection: 'row', display: 'flex', flexWrap: 'wrap', marginRight: 20}}>
                {/* {boxes.map((item, index) => <div><p>{item.height} {item.length} {item.name} {item.price} {item.size} {item.sku} {item.type} {item.weight} {item.width} <br /> </p></div>)} */}
            {boxes.map((item, index) => <ProductBox key = {item.idProduct} code = {item.sku} name = {item.name} price = {item.price} size = {item.size} selectBoxes = {() => selectBoxes(item.idProduct)}></ProductBox>)}
        </div>
        <Footer />
        </div>
    );
}
export default ProductList;