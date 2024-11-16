import Product2Type from "./Product2Type"
interface OrderType{
    id:number,
    orderDateTime:Date,
    totalePrice:number,
    ordeProducts:Product2Type[]
}

export default OrderType;