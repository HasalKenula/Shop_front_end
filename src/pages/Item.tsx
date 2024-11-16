import { useEffect, useState } from "react";
import ProductType from "../types/ItemType";
import CategoryType from "../types/CategoriesType";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
function Items(){

    const{isAuthenticated,jwtToken}=useAuth();

    const [Products,setProducts]=useState<ProductType[]>([]);
    const[productName, setProductName]=useState<string>("");
    const[productDescription, setProductDescription]=useState<string>("");
    const[productPrice, setProductPrice]=useState<number>(0);
    const[CategoryId, setCategoryId]=useState<number>(0);
    const[categories, setCategories]=useState<CategoryType[]>([]);

    const config={
        headers:{
            Authorization:`Bearer ${jwtToken}`
        }
    }

    async function getProducts() {
        const response = await axios.get("http://localhost:8081/item",config)
        setProducts(response.data);
    }

    function handleProductName(event: any){
        setProductName(event.target.value);
        
    }

    function handleProductDescription(event: any){
        
        setProductDescription(event.target.value);
        
    }

    function handleProductPrice(event: any){
        
        setProductPrice(event.target.value);
        
    }

    function handleProductCategoryId(event: any){
        
        setCategoryId(event.target.value);
        
    }

    async function loadCategories(){
        const apiResponse=await axios.get("http://localhost:8081/category",config);
        setCategories(apiResponse.data);
    }

    async function addCategory(){
        await axios.post("http://localhost:8081/item",{
            name: productName,
            description:productDescription,
            price:productPrice,
            categoryId:CategoryId

            
        });
        getProducts();
    }

    useEffect(function () {
        if(isAuthenticated){
            getProducts();
            loadCategories();
        }
    },[isAuthenticated])

    const [productEditing, setProductEditing]=useState<ProductType | null>();

    function editProduct(product: ProductType){
        setProductEditing(product);
        setProductName(product.name);
        setProductPrice(product.price);
        setCategoryId(product.category.id);
        setProductDescription(product.description);
    }

    async function updateProduct() {
        try {
            await axios.put(`http://localhost:8081/item/${productEditing?.id}`,{
                name: productName,
                description:productDescription,
                price:productPrice,
                categoryId:CategoryId
            });
            getProducts();
            setProductEditing(null);
            setProductName("");
            setProductPrice(0);
            setCategoryId(0);
            setProductDescription("");
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteProduct(produtId:number) {
        try {
            await axios.delete(`http://localhost:8081/item/${produtId}`);
            getProducts();
        } catch (error) {
            console.log(error);
        }
    }
    return(
        
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3xl font-semibold mb-5 text-slate-800">Items</h1>

            <table className="table-auto- w-full">
                <thead>
                    <tr className="bg-slate-200 text-sm font-medium text-slate-600">
                        <th className="p-2 w-[50px] text-left">#</th>
                        <th className="p-2 w-[50px] text-left">Item Name</th>
                        <th className="p-2 w-[50px] text-left">Item Price</th>
                        <th className="p-2 w-[50px] text-left">Category</th>
                        <th className="p-2 w-[50px] text-left"></th>
                        <th className="p-2 w-[50px] text-left"></th>
                    </tr>
                </thead>
                <tbody>
                   {Products.map (function (product){
                    return(
                        <tr key={product.id}>
                            <td className="p-2 text-slate-600 border-b border-slate-200">{product.id}</td>
                            <td className="p-2 text-slate-600 border-b border-slate-200">{product.name}</td>
                            <td className="p-2 text-slate-600 border-b border-slate-200">{product.price}</td>
                            <td className="p-2 text-slate-600 border-b border-slate-200">{product.category.name}</td>
                            <td> <button className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={() => editProduct(product)}>Edit</button></td>
                            <td> <button className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={() => deleteProduct(product.id)}>Delete</button></td>
                        </tr>
                    )
                   })}
                </tbody>
            </table>

            <div className="mt-10 w-[650px] border border-slate-200 px-4 py-3 rounded-lg">
            <h2 className="text-xl font-medium mb-4">{productEditing ? "Edit Item" : "Add Item"}</h2>
            <div>
                <label className="text-sm text-slate-600 block mb-3">Enter product name</label>
                <input type="text" className="block w-full p-2 border border-salte-300 rounded-lg text-slate-600 text-sm mb-4" value={productName} onChange={handleProductName}/>
            </div>
            <div>
                <label className="text-sm text-slate-600 block mb-3">Enter product description</label>
                <input type="text" className="block w-full p-2 border border-salte-300 rounded-lg text-slate-600 text-sm mb-4" value={productDescription} onChange={handleProductDescription}/>
            </div>
            <div>
                <label className="text-sm text-slate-600 block mb-3">Enter product price</label>
                <input type="text" className="block w-full p-2 border border-salte-300 rounded-lg text-slate-600 text-sm mb-4" value={productPrice} onChange={handleProductPrice}/>
            </div>
            <div>
                <label className="text-sm text-slate-600 block mb-3">Enter product category</label>
                <select  className="block w-full p-2 border border-salte-300 rounded-lg text-slate-600 text-sm mb-4" value={CategoryId} onChange={handleProductCategoryId}>
                <option value="">Select Category</option>

                    {categories.map(function (category) {
                    return (
                         <option key={category.id} value={category.id}>{category.name}</option>
                     )
                    })}
                </select>
            </div>
            
            
            {productEditing ?(<button className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={updateProduct}>Update Item</button>):(<button className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={addCategory}>Add Item</button>)}
            </div>
        </div>
    )
}

export default Items;