import { useEffect, useState } from "react";
import ItemType from "../types/ItemType";
import StockType from "../types/StockType";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


function Stocks(){

    const{isAuthenticated,jwtToken}=useAuth();


    const[stocks,setStocks]=useState<StockType[]>([]);
    const[stockQty,setStockQty]=useState<number>(0);
    const[itemId,setItemId]=useState<number>(0);
    const[items,setItems]=useState<ItemType[]>([]);

    const config={
        headers:{
            Authorization:`Bearer ${jwtToken}`
        }
    }


    async function getStocks(){
        const response=await axios.get("http://localhost:8081/stock",config);
        setStocks(response.data);
    }

    function handleStockQty(event:any){
        setStockQty(event.target.value);
    }

    function handleStockItem(event:any){
        setItemId(event.target.value);
    }

    async function loadItems(){
        const apiResponse=await axios.get("http://localhost:8081/item",config);
        setItems(apiResponse.data);
    }

    async function addStock(){
        await axios.post("http://localhost:8081/stock",{
            qty:stockQty,
            itemId:itemId,
        },config)
        getStocks();
    }

    useEffect(function(){
        getStocks();
        loadItems();
    },[isAuthenticated])

    const [stockEditing,setStockEditing]=useState<StockType|null>();

    function editStock(stock:StockType){
        setStockEditing(stock);
        setStockQty(stock.qty);
        setItemId(stock.item.id);
    }

    async function updateStock(){
        try {
            await axios.put(`http://localhost:8081/stock/${stockEditing?.id}`,{
                qty:stockQty,
                itemId:itemId,
            },config);
            getStocks();
            setStockEditing(null);
            setStockQty(0);
            setItemId(0);

        } catch (error) {
            console.log(error);
        }
    }

    async function deleteStock(stockId:number){
        try {
            await axios.delete(`http://localhost:8081/stock/${stockId}`,config);
            getStocks();
        } catch (error) {
            console.log(error);
        }
    }



    return(
        
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3xl font-semibold mb-5 text-slate-800">Stock</h1>

            <table className="table-auto- w-full">
                <thead>
                    <tr className="bg-slate-200 text-sm font-medium text-slate-600">
                        <th className="p-2 w-[50px] text-left">#</th>
                        <th className="p-2 w-[50px] text-left">Item Name</th>
                        <th className="p-2 w-[50px] text-left">Stock Qty</th>
                        
                        <th className="p-2 w-[50px] text-left"></th>
                        <th className="p-2 w-[50px] text-left"></th>
                    </tr>
                </thead>
                <tbody>
                   {stocks.map (function (stock){
                    return(
                        <tr key={stock.id}>
                            <td className="p-2 text-slate-600 border-b border-slate-200">{stock.id}</td>
                            <td className="p-2 text-slate-600 border-b border-slate-200">{stock.item.name}</td>
                            <td className="p-2 text-slate-600 border-b border-slate-200">{stock.qty}</td>
                            
                            <td> <button className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={() => editStock(stock)}>Edit</button></td>
                            <td> <button className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={() => deleteStock(stock.id)}>Delete</button></td>
                        </tr>
                    )
                   })}
                </tbody>
            </table>

            <div className="mt-10 w-[650px] border border-slate-200 px-4 py-3 rounded-lg">
            <h2 className="text-xl font-medium mb-4">{stockEditing ? "Edit Stock" : "Add Stock"}</h2>
          
            <div>
                <label className="text-sm text-slate-600 block mb-3">Enter Stock Qty</label>
                <input type="text" className="block w-full p-2 border border-salte-300 rounded-lg text-slate-600 text-sm mb-4" value={stockQty} onChange={handleStockQty}/>
            </div>
            <div>
                <label className="text-sm text-slate-600 block mb-3">Enter Stock Product Name</label>
                <select  className="block w-full p-2 border border-salte-300 rounded-lg text-slate-600 text-sm mb-4" value={itemId} onChange={handleStockItem}>
                <option value="">Select Item</option>

                    {items.map(function (item) {
                    return (
                         <option key={item.id} value={item.id}>{item.name}</option>
                     )
                    })}
                </select>
            </div>
            
            
            {stockEditing ?(<button className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={updateStock}>Update Stock</button>):(<button className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={addStock}>Add Stock</button>)}
            </div>
        </div>
    )




}

export default Stocks