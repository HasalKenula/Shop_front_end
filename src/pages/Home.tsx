import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import Market from "../assets/market.jpg";

function Home(){

    const{logout}=useAuth();


    

    
    

    
    return(


        <div >

            <div>
                <Link to="/categories" className="bg-gray-800 text-white px-5 py-2 me-3">Category</Link>
                <Link to="/item" className="bg-gray-800 text-white px-5 py-2 me-3">Item</Link>
                <Link to="/stock" className="bg-gray-800 text-white px-5 py-2 me-3">Stock</Link>
                <Link to="/profile" className="bg-gray-800 text-white px-5 py-2 me-3">Setting</Link>
                <button className="bg-gray-800 text-white px-5 py-2 me-3" onClick={logout}>Logout</button>
            </div>

            <div >
            <img src={Market} className="w-[1500px] h-[1200px]"/>
  
           </div> 


  



export default App;




            
           
          
        </div>
          
    )


}

export default Home;