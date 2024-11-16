import CategoryType from "./CategoriesType";

interface ItemType{
    id:number,
    name:string,
    description:string,
    price:number,
    category:CategoryType
}

export default ItemType;