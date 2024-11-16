import VehicaleType from "../types/VehicaleType";

function Vehicale(props: VehicaleType){
    return(
       <div>
             <h1>{props.name}</h1>
             <p>{props.color}</p>
       </div>
    )
}
export default Vehicale;