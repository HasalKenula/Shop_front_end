import { useEffect, useState } from "react";
import CategoriesType from "../types/CategoriesType";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Categories(){

    const{isAuthenticated,jwtToken}=useAuth();


    const[categories,setCategories]=useState<CategoriesType[]>([]);
    const[categoryName,setCategoryName]=useState<string>("");

    const config={
        headers:{
            Authorization:`Bearer ${jwtToken}`
        }
    }


    async function loadCategories(){
        const apiResponse=await axios.get("http://localhost:8081/category",config);
        setCategories(apiResponse.data);
    }

    function handelCategoryName(event: any){
        setCategoryName(event.target.value);
    }

    async function addCategory() {
        await axios.post("http://localhost:8081/category",{
            name:categoryName
        },config);
        loadCategories();
    }

    useEffect(function (){
        loadCategories();
    },[isAuthenticated])

    return(
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3xl font-semibold mb-5 text-slate-800">Categories</h1>
            {/* <button onClick={loadCategories}>Load Categories</button> */}
            {/* <ul className="m-5">
                {categories.map(category=>(
                    <li className="inline-block p-2 m-2 border border-slate-500 rounded-lg shadow-lg" key={category.id}>{category.name}</li>
                ))}
            </ul> */}
            <ul className="m-5">
                {categories.map(function(category){
                    return(<li  className="inline-block p-2 m-2 border border-slate-500 rounded-lg shadow-lg" key={category.id}>{category.name}</li>)
                })}
            </ul>

            <div className="mt-10 w-[650px] border border-slate-200 px-4 py-3 rounded-lg">
                <h2 className="text-xl font-medium mb-4">Add category</h2>
                <label className="text-sm text-slate-600 block mb-3">Enter the category Name here</label>
                <input type="text" className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm mb-4" onChange={handelCategoryName}/>
                <button className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={addCategory}>Add Category</button>
            </div>
        </div>

    )
}

export default Categories;