import StudentType from "../types/StudentType";

function Student(props: StudentType){
    return(
        <div>
            <h1>{props.name}</h1>
            <p>{props.age}</p>
        </div>
    )
}

export default Student;