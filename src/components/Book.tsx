import BookType from "../types/BookType";

function Book(props:BookType){
    return (
        <div>
            <h1>{props.name}</h1>
            <p>{props.qty}</p>
        </div>
    )
}

export default Book;