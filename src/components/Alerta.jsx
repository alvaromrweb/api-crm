import React from 'react'

const Alerta = ({children}) => {
  return (
    <div className='text-center my-4 p-3 bg-red-600 text-white font-bold uppercase text-lg'>
        {children}
    </div>
  )
}

export default Alerta