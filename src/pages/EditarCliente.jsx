import {useParams} from "react-router-dom"
import { useEffect, useState } from 'react'
import Spinner from "../components/Spinner"
import Formulario from "../components/Formulario"

const EditarCliente = () => {

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
                            <h1 className="font-black text-4xl text-blue-900">Editar cliente</h1>
                            <p className="mt-3">Cambia los campos para editar el cliente</p>
                            <Formulario 
                              cliente={cliente}
                            />

                        </>
                    )}
                </>
            )}
        </div>
  )
}

export default EditarCliente