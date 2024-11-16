import { useEffect, useState } from "react";
import Product2Type from "../../types/Product2Type";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateOrder(){

    const[products,setProducts]=useState<Product2Type[]>([]);

    async function loadProduct() {
        try {
            const apiResponse=await axios.get("http://localhost:8081/product");
            setProducts(apiResponse.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(function (){
        loadProduct();
    },[]);

    const[orderProducts,setOrderProduct]=useState<Product2Type[]>([]);
    const[totalPrice,setTotalPrice]=useState<number>(0);

    function addProduct(product:Product2Type){
        const newarray=[...orderProducts,product]
        setOrderProduct(newarray);
    }

    useEffect(function (){
        orderProducts.map(function(product){
            
                const total=totalPrice+product.price;
                setTotalPrice(total);
            
        })
    },[orderProducts]);

    const navigate =useNavigate();
    async function saveOrder() {
        try {
            const productIds:any =[];
            orderProducts.map(function(product){
                productIds.push(product.id);
            });

            await axios.post("http://localhost:8081/order",{
                orderIdList: productIds
            });

            navigate("/orders");
        } catch (error) {
            console.log(error);
        }
        
    }

    return(
        <div className="flex">
            <div className="w-[300px]">
            <div>Product</div>
            <div >
                {products.map(function(product){
                    return(
                        <div className="border border-slate-800 w-[300px]" onClick={()=>addProduct(product)} key={product.id}>
                            <div>{product.name}</div>
                            <div>{product.category.name}</div>
                            <div>{product.price}</div>
                        </div>
                    )
                })}
            </div>
            </div>



            <div className="w-full">
                <div>
                    new order
                </div>
                <table className="table-auto w-full">
                    <thead >
                        <tr>
                            <th className="p-2 w-[50px] text-left">#</th>
                            <th className="p-2 w-[50px] text-left">product</th>
                            <th className="p-2 w-[50px] text-left">totalePrice</th>
                        </tr>
                    </thead>

                    <tbody>
                    {orderProducts.map (function (product){
                    return(
                        <tr key={product.id}>
                            <td >{product.id}</td>
                            <td >{product.name}</td>
                            <td >{product.price}</td>
                           
                        </tr>
                    )
                   })}
                        <tr>
                            <td colSpan={2}>grand total</td>
                            <td>{totalPrice}</td>
                        </tr>
                    </tbody>
                </table>

                <div>
                <button type="button" onClick={saveOrder}>Save Order</button>
                </div>
            </div>

        </div>
    )
}

export default CreateOrder;