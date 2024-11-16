import { useEffect, useState } from "react";
import CategoriesType from "../types/CategoriesType";
import ProductType from "../types/ProductType";
import axios from "axios";

function Products(){

    const[Products,setProducts]=useState<ProductType[]>([]);
    const[productName,setProductName]=useState<string>("");
    const[productDescription,setProductDescription]=useState<string>("");
    const[productPrice,setProductPrice]=useState<number>(0);
    const[CategoryId,setCategoryId]=useState<number>(0);
    const[categories,setCategories]=useState<CategoriesType[]>([]);

    async function getProducts() {
        const response= await axios.get("http://localhost:8081/product");
        setProducts(response.data);
    }

    function handelProductName(event: any){
        setProductName(event.target.value);
    }

    function handelProductDescription(event: any){
        setProductDescription(event.target.value);
    }

    function handelProductPrice(event: any){
        setProductPrice(event.target.value);
    }

    function handelProductCategoryId(event: any){
        setCategoryId(event.target.value);
    }

    async function loadCategories() {
        const apiResponse=await axios.get("http://localhost:8081/category");
        setCategories(apiResponse.data);
    }
    async function addCategory() {
        await axios.post("http://localhost:8081/product",{
              name:productName,
               price:productPrice,
              description:productDescription,
              categoryId:CategoryId
        });
        getProducts();
    }

    useEffect(function (){
        getProducts();
        loadCategories();
    },[])

    return(
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3xl font-semibold mb-5 text-slate-800">Products</h1>
            <table className="table-auto- w-full">
                <thead>
                    <tr className="bg-slate-200 text-sm font-medium text-slate-600">
                        <th className="p-2 w-[50px] text-left">#</th>
                        <th className="p-2 w-[50px] text-left">Product Name</th>
                        <th className="p-2 w-[50px] text-left">Product Price</th>
                        <th className="p-2 w-[50px] text-left">Category</th>
                    </tr>
                </thead>
                <tbody>
                    {Products.map(function(product){
                        return(
                            <tr key={product.id}>
                                <td className="p-2 text-slate-600 border-b border-slate-200">{product.id}</td>
                                <td className="p-2 text-slate-600 border-b border-slate-200">{product.name}</td>
                                <td className="p-2 text-slate-600 border-b border-slate-200">{product.price}</td>
                                <td className="p-2 text-slate-600 border-b border-slate-200">{product.category.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div className="mt-10 w-[650px] border border-slate-200 px-4 py-3 rounded-lg">
            <h2 className="text-xl font-medium mb-4">Add product</h2>
            <div>
                <label className="text-sm text-slate-600 block mb-3">Enter product name</label>
                <input type="text" className="block w-full p-2 border border-salte-300 rounded-lg text-slate-600 text-sm mb-4" onChange={handelProductName}/>
            </div>

            <div>
                <label className="text-sm text-slate-600 block mb-3">Enter product description</label>
                <input type="text" className="block w-full p-2 border border-salte-300 rounded-lg text-slate-600 text-sm mb-4" onChange={handelProductDescription}/>
            </div>

            <div>
                <label className="text-sm text-slate-600 block mb-3">Enter product price</label>
                <input type="text" className="block w-full p-2 border border-salte-300 rounded-lg text-slate-600 text-sm mb-4" onChange={handelProductPrice}/>
            </div>

            <div>
                <label className="text-sm text-slate-600 block mb-3">Enter product category</label>
                <select className="block w-full p-2 border border-salte-300 rounded-lg text-slate-600 text-sm mb-4" onChange={handelProductCategoryId}>
                    <option value="">select Category</option>
                    {categories.map(function(category){
                        return(
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )
                    })}
                </select>
            </div>

            <button className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={addCategory}>Add Category</button>
            </div>
        </div>
    )
}

export default Products;