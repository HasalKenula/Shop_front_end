import { useEffect, useState } from "react";
import OrderType from "../../types/OrderType";
import axios from "axios";

function Orders(){

    const[order,setOrder]=useState<OrderType[]>([]);

    async function loadOrder() {
       try {
        const apiResponse=await axios.get("http://localhost:8081/order");
        setOrder(apiResponse.data);
       } catch (error) {
        console.log(error);
       }
    }

    useEffect(function (){
        loadOrder();
    },[]);

    return(
        <div>
            <h1>Order Details</h1>

            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="p-2 w-[50px] text-left">#</th>
                        <th className="p-2 w-[50px] text-left">Date</th>
                        <th className="p-2 w-[50px] text-left">Total Price</th>
                    </tr>
                </thead>

                <tbody>
                    {order.map(function(orders){
                        return(
                            <tr key={orders.id}>
                                <td>{orders.id}</td>
                                <td>{orders.orderDateTime}</td>
                                <td>{orders.totalePrice}</td>
                            </tr>
                        )
                    })};
                </tbody>
            </table>
        </div>
    )
}

export default Orders;