import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Student from './components/Student'
import Vehicale from './components/Vehicale'
import Home from './pages/Home'
import Book from './components/Book'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Categories from './pages/Categories'
import Products from './pages/Products'
//import Categories2 from './pages/Categories2'
import Products2 from './pages/Products2'
import Orders from './pages/orders/Orders'
//import CreateOrder from './pages/orders/Createorder'
import Items from './pages/Item'
import Stocks from './pages/Stock'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/auth/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  //const [count, setCount] = useState(0)

  return (

    <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/*Protected routes - need login to access */}
        <Route element={<ProtectedRoute/>}>
        <Route path="/" element={<Home/>}/>
        
        
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/products" element={<Products/>}/>
     
        <Route path="/products2" element={<Products2/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/stock" element={<Stocks/>} />
       < Route path="/item" element={<Items/>}/>
       </Route>

         {/*Open routes  */}
       <Route path="/auth/login" element={<Login/>}/>

      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
