import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Inscription from './pages/Inscription'
import Ecrivain from './pages/Ecrivain'
import Connection from './pages/Connection'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth'
import Admin from './pages/Admin'
import Home from './pages/Home'
import Layout from './components/Layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="presentation">
    {/*<Inscription/> */}
      <Routes>
      <Route path="/" element={<Layout />}></Route>
      {/* public routes*/}
        <Route path="/inscription" element={<Inscription/>}></Route>
        <Route path="/connection" element={<Connection/>}></Route>
        {/*<Route element={<RequireAuth/>}>
          <Route path='/home' element={<Home/>}></Route>
        </Route>*/}

        <Route element={<RequireAuth allowedRoles={[2001]}/>} >
          <Route path="/" element={<Home/>}></Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={[1984]}/>} >
          <Route path="/ecrivain" element={<Ecrivain/>}></Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={[5150]}/>} >
          <Route path="/admin" element={<Admin/>}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
