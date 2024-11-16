import Categories2Type from "./Categories2Type"


interface Product2Type{
    id:number,
    name:string,
    description:string,
    price:number,
    category:Categories2Type
}
export default Product2Type;