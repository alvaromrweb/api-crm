import {useParams} from "react-router-dom"
import { useEffect, useState } from 'react'
import Spinner from "../components/Spinner"

const VerCliente = () => {
    const { id } = useParams()
    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(false)
  
    useEffect(() => {
        setCargando(true)
        const getCliente = async () => {
          try {
              const urlApi = `${import.meta.env.VITE_API_URL}/${id}`
              const respuesta = await fetch(urlApi)
              const resultado = await respuesta.json()
              setCliente(resultado)
          } catch (error) {
              console.log(error)
          }
          setCargando(false)
        }
        getCliente()
        
      }, [])

    return (
        <div>
            
            {cargando ? <Spinner /> : (
                <>
                    {Object.keys(cliente).length == 0 ? <p>No hay resultados</p> : (
                        <>
                            <h1 className="font-black text-4xl text-blue-900">Ver cliente: {cliente.nombre}</h1>
                            <p className="mt-3">Informacion del cliente</p>

                            {cliente.nombre && (
                                <p className="text-2xl mt-10 text-gray-600">
                                    <span className="uppercase font-bold">Nombre: </span>{cliente.nombre}
                                </p>
                            )}
                            {cliente.email && (
                                <p className="text-2xl mt-4 text-gray-600">
                                    <span className="uppercase font-bold">Email: </span>{cliente.email}
                                </p>
                            )}
                            {cliente.telefono && (
                                <p className="text-2xl mt-4 text-gray-600">
                                    <span className="uppercase font-bold">Telefono: </span>{cliente.telefono}
                                </p>
                            )}
                            {cliente.empresa && (
                                <p className="text-2xl mt-4 text-gray-600">
                                    <span className="uppercase font-bold">Empresa: </span>{cliente.empresa}
                                </p>
                            )}
                            {cliente.notas && (
                                <p className="text-2xl mt-4 text-gray-600">
                                    <span className="uppercase font-bold">Notas: </span>{cliente.notas}
                                </p>
                            )}

                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default VerCliente