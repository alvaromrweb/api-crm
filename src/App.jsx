import { useState } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Layout from './layout/Layout'
import Inicio from './pages/Inicio'
import NuevoCliente from './pages/NuevoCliente'
import EditarCliente from './pages/EditarCliente'
import VerCliente from './pages/VerCliente'

function App() {

  console.log(import.meta.env.VITE_API_URL)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/clientes"/>} />
        <Route path="/clientes" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="nuevo" element={<NuevoCliente />} />
          <Route path="editar/:id" element={<EditarCliente />} />
          <Route path=":id" element={<VerCliente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
