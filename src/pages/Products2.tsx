import { useEffect, useState } from "react";
import Categories2Type from "../types/Categories2Type";
import Product2Type from "../types/Product2Type";
import axios from "axios";

function Products2(){
    const [product,setProduct]=useState<Product2Type[]>([]);
    const[category,setCategory]=useState<Categories2Type[]>([]);
    const[productName,setProductName]=useState<string>("");
    const[productDescription,setProductDescrition]=useState<string>("");
    const[productPrice,setProductPrice]=useState<number>(0);
    const[CategoryId,setCategoryId]=useState<number>(0);

    async function getProducts(){
        const response =await axios.get("http://localhost:8081/product");
        setProduct(response.data);
    }

    async function loadCategories() {
        const apiResponse=await axios.get("http://localhost:8081/category");
        setCategory(apiResponse.data);
    }

     function handelProductName(event:any) {
        setProductName(event.target.value);
    }

     function handelProductDescription(event:any) {
        setProductDescrition(event.target.value);
    }

     function handelProductPrice(event:any) {
        setProductPrice(event.target.value);
    }

     function handelProductCategoryId(event:any) {
        setCategoryId(event.target.value);
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

    const[productEditing,setPoductEditing]=useState<Product2Type|null>();

    function editProduct(product:Product2Type){
        setPoductEditing(product);
        setProductName(product.name);
        setProductDescrition(product.description);
        setProductPrice(product.price);
        setCategoryId(product.category.id);
    }

    async function updateProduct() {
       try {
        await axios.put(`http://localhost:8081/product/${productEditing?.id}`,{
            name:productName,
               price:productPrice,
              description:productDescription,
              categoryId:CategoryId
        });
        getProducts();
        setPoductEditing(null);
        setProductName("");
        setProductDescrition("");
        setProductPrice(0);
        setCategoryId(0);
       } catch (error) {
        console.log(error);
       }
    }

    async function deleteProduct(productId:number) {
        try {
            await axios.delete(`http://localhost:8081/product/${productId}`);
            getProducts();
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            <h1>Product 2</h1>

            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="p-2 w-[50px] text-left">#</th>
                        <th className="p-2 w-[50px] text-left">product name</th>
                        <th className="p-2 w-[50px] text-left">product price</th>
                        <th className="p-2 w-[50px] text-left">category</th>
                        <th className="p-2 w-[50px] text-left"></th>
                        <th className="p-2 w-[50px] text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    {product.map(function(products){
                        return(
                            <tr key={products.id}>
                                <td>{products.id}</td>
                                <td>{products.name}</td>
                                <td>{products.price}</td>
                                
                                <td>{products.category.name}</td>
                                <td ><button onClick={() => editProduct(products)}>Edit</button></td>
                                <td ><button onClick={() => deleteProduct(products.id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div>
                <h1>{productEditing ? "Edit product" : "Add product"}</h1>
                <div>
                    <label>Enter product name</label>
                    <input type="text" className="border border-slate-800" onChange={handelProductName} value={productName} />
                </div>

                <div>
                    <label>Enter product description</label>
                    <input type="text"  className="border border-slate-800" onChange={handelProductDescription} value={productDescription} />
                </div>

                <div>
                    <label>Enter product price</label>
                    <input type="text"  className="border border-slate-800" onChange={handelProductPrice} value={productPrice}/>
                </div>

                <div>
                    <label>Enter product category id</label>
                    <select  className="border border-slate-800" onChange={handelProductCategoryId} value={CategoryId}>
                        <option value="">select categories</option>
                        {category.map(function(categories){
                            return(
                                <option key={categories.id} value={categories.id}>{categories.name}</option>
                            )
                        })};
                    </select>
                </div>

                {/* <div>
                    <button onClick={addCategory} className="bg-slate-800 text-sm text-white ">Add Category</button>
                </div> */}
                {productEditing ? <button className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={updateProduct}>update Category</button>:<button className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={addCategory}>Add Category</button>}
            </div>


        </div>
    )
}

export default Products2;