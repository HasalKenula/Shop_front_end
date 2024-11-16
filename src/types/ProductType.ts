import CategoriesType from "./CategoriesType";

interface ProductType{
    id:number,
    name:string,
    description:string,
    price:number,
    category:CategoriesType
}

export default ProductType;