import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

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

           
            

            
           
          
        </div>
          
    )


}

export default Home;