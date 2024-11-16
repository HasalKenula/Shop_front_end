import TreeType from "../types/TreeType";

function Tree(props:TreeType){
    return(
        <>
            <h1>{props.treeName}</h1>
            <p>{props.priority}</p>
        </>
    )
}

export default Tree;