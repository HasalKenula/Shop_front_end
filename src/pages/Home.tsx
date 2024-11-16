import { useState } from "react";
import { Link } from "react-router-dom";
import Furniture from "../components/furniture";
import Tree from "../components/Tree";

function Home(){
    const [counter, setCounter]=useState<number>(0);
    const [userName, setUsername]=useState<string>("");
    const [multiply, setMultiply]= useState<number>(1);
    const[tenMmultiply,setTenMultiply]=useState<number>(1);
    const[divied,setDivided]=useState<number>(1000);
    

    function increase(){
        const newCount=counter+1;
        setCounter(newCount);
    }

    function decrease(){
        const newCount=counter-1;
        setCounter(newCount);
    }

    function handelUserName(event: any){
        setUsername(event.target.value) ;
    }

    function multiplybyfive(){
        const newCount=multiply*5;
        setMultiply(newCount);
    }

    function tenMul(){
        const newCount=tenMmultiply*10;
        setTenMultiply(newCount);
    }

    function tenDiv(){
        const newCount=tenMmultiply/10;
        setTenMultiply(newCount);
    }

    function divideTwo(){
        const newCount=divied/2;
        setDivided(newCount);
    }

    return(
        <div className="container mx-auto pt-20 pb-5 px-[40%]">
            <h1>{counter}</h1>
            <h1>Welcome {userName}</h1>
            <Link to="/profile">Setting</Link>
            <input type="text" onChange={handelUserName}/>
            <button onClick={increase}>Increaase Counter</button>
            <button onClick={decrease}>decrase Counter</button>

            <div>
            <h1>{multiply}</h1>
            <button onClick={multiplybyfive}>To multiply</button>
            </div>

            <div className="border border-yellow-500 mt-20 inner-block w-[400px] rounded-lg p-3 border-8">
                <h1 className="border border-red-300 m-auto rounded-lg p-3 border-8">{tenMmultiply}</h1>
                <div className="pl-[120px] p-2 m-auto">
                <button className="block m-2 bg-slate-800 text-white rounded-lg p-5 hover:bg-slate-600" onClick={tenMul}>MultiplyBy*10</button>
                <button className="block  m-2 bg-slate-800 text-white rounded-lg p-5 hover:bg-slate-600" onClick={tenDiv}>Divide By /10</button>
                </div>
            </div>
            <div>
                <h1 className="text-3xl">funiture</h1>
                <Furniture name="ff" num={23}/>
            </div>

            <div>
                <Tree treeName={"Mango"} priority={12}/>
                <Tree treeName={"Mango"} priority={12}/>
            </div>

            <div>
                <h1>{divied}</h1>
                <button onClick={divideTwo}>click</button>
                <div>
                <Link to="/categories">Category</Link>
                </div>
              
            </div>
           
          
        </div>
          
    )


}

export default Home;