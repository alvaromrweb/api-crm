import { useNavigate } from "react-router-dom"

const Cliente = ({cliente, handleDelete}) => {
    const navigate = useNavigate()

    
    return (
        <tr className='border-b hover:bg-gray-50'>
            <td className='p-3'>{cliente.nombre}</td>
            <td className='p-3'>
                <p><span className='text-gray-800 uppercase font-bold'>Email: </span>{cliente.email}</p>
                <p><span className='text-gray-800 uppercase font-bold'>Tel: </span>{cliente.telefono}</p>
                
                </td>
            <td className='p-3'>{cliente.empresa}</td>
            <td className='p-3'>
                <button onClick={() => navigate(`/clientes/${cliente.id}`)} type="button" className='bg-yellow-500 hover:bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-xs mt-3'>Ver</button>
                <button onClick={() => navigate(`/clientes/editar/${cliente.id}`)} type="button" className='bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3'>Editar</button>
                <button onClick={() => handleDelete(cliente.id)} type="button" className='bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3'>Eliminar</button>
            </td>
        </tr>
    )
}

export default Cliente