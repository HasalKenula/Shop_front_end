import FurnitureType from "../types/furniture";

function Furniture(props:FurnitureType){
   return(
    <div>
        <h1>{props.name}</h1>
        <p>{props.num}</p>
    </div>
   )
}

export default Furniture;