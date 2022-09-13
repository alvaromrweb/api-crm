import { useState, useEffect } from 'react'
import Cliente from '../components/Cliente'

const Inicio = () => {

  const [clientes, setClientes] = useState([])

  useEffect(() => {

    const getClientes = async () => {
      try {
          const urlApi = import.meta.env.VITE_API_URL
          const respuesta = await fetch(urlApi)
          const resultado = await respuesta.json()
          setClientes(resultado)
          

      } catch (error) {
          console.log(error)
      }
    }
    getClientes()
    
  }, [])

  const handleDelete = async (idDelete) => {
    const confirmation = confirm('¿Estas seguro de que quieres eliminar este cliente?')
    if(confirmation) {

        try {
            const urlApi = `${import.meta.env.VITE_API_URL}/${idDelete}`
            const respuesta = await fetch(urlApi, {
                method: 'DELETE'
            })
            console.log(respuesta)
            const resultado = await respuesta.json()
            console.log(resultado)
            const arrayClientes = clientes.filter(cliente => cliente.id != idDelete)
            setClientes(arrayClientes)
    
        } catch (error) {
            console.log(error)
        }
    }
}
  

  return (
    <div>
      <h1 className="font-black text-4xl text-blue-900">Lista de clientes</h1>
      <p className="mt-3">Administra tus clientes</p>
      <table className='w-full mt-5 table-auto shadow bg-white'>
        <thead className='bg-blue-800 text-white'>
          <tr>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Contacto</th>
            <th className='p-2'>Empresa</th>
            <th className='p-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <Cliente
              key={cliente.id}
              cliente={cliente}
              handleDelete={handleDelete}
            />
          ))}

        </tbody>
      </table>
    </div>
  )
}

export default Inicio