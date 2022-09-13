import {Formik, Form, Field} from 'formik'
import * as yup from 'yup'
import Alerta from './Alerta';
import { useNavigate } from "react-router-dom";

const Formulario = ({cliente}) => {

    const navigate = useNavigate()

    const isUpdating = Object.keys(cliente).length !== 0

    const nuevoClienteSchema = yup.object().shape({
        nombre: yup.string()
                        .min(3, 'El nombre es muy corto')
                        .max(40, 'El nombre es muy largo')
                        .required('El nombre de cliente es obligatorio'),
        empresa: yup.string()
                        .min(3, 'El nombre de empresa es muy corto')
                        .max(40, 'El nombre de empresa es muy largo')
                        .required('El nombre de empresa es obligatorio'),
        email: yup.string()
                        .email('Email no válido')
                        .required('El email es obligatorio'),
        telefono: yup.number()
                        .positive('Teléfono no válido')
                        .integer('Teléfono no válido')
                        .typeError('Teléfono no válido'),
        notas: '',
      });

    const handleSubmit = async (values) => {
        try {
            let respuesta
            if(isUpdating) {
                const urlApi =  `http://localhost:4000/clientes/${cliente.id}`
                respuesta = await fetch(urlApi, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                
            } else {

                const urlApi =  "http://localhost:4000/clientes"
                respuesta = await fetch(urlApi, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            }
            console.log(respuesta)
            const resultado = await respuesta.json()
            console.log(resultado)
            navigate("/clientes")

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{isUpdating ? 'Editar cliente' : 'Agregar cliente'}</h1>

        <Formik 
        initialValues={{
            nombre: cliente?.nombre ?? '',
            empresa: cliente?.empresa ?? '',
            email: cliente?.email ?? '',
            telefono: cliente?.telefono ?? '',
            notas: cliente?.notas ?? '',

        }}
        onSubmit={async (values, {resetForm}) => {
            await handleSubmit(values)
            resetForm()
        }}
        validationSchema={nuevoClienteSchema}
        >
            {({errors, touched}) => {
                
                return (

            
                <Form className='mt-10'>
                    <div className='mb-4'>
                        <label className='text-gray-800' htmlFor='nombre'>Nombre</label>
                        <Field id="nombre" type="text" placeholder="Nombre del cliente" name="nombre" className="mt-2 block w-full p-3 bg-gray-50" />
                        {errors.nombre && touched.nombre ? (
                            <Alerta>{errors.nombre}</Alerta>
                        ) : null}
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-800' htmlFor='empresa'>Empresa</label>
                        <Field id="empresa" type="text" placeholder="Empresa del cliente" name="empresa" className="mt-2 block w-full p-3 bg-gray-50" />
                        {errors.empresa && touched.empresa ? (
                            <Alerta>{errors.empresa}</Alerta>
                        ) : null}
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-800' htmlFor='email'>Email</label>
                        <Field id="email" type="email" placeholder="Email del cliente" name="email" className="mt-2 block w-full p-3 bg-gray-50" />
                        {errors.email && touched.email ? (
                            <Alerta>{errors.email}</Alerta>
                        ) : null}
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-800' htmlFor='telefono'>Teléfono</label>
                        <Field id="telefono" type="tel" placeholder="Teléfono del cliente" name="telefono" className="mt-2 block w-full p-3 bg-gray-50" />
                        {errors.telefono && touched.telefono ? (
                            <Alerta>{errors.telefono}</Alerta>
                        ) : null}
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-800' htmlFor='notas'>Notas</label>
                        <Field as="textarea" id="notas" type="text" placeholder="Notas del cliente" name="notas" className="mt-2 block w-full p-3 bg-gray-50 h-40" />
                    </div>
                    <input type="submit" value={isUpdating ? 'Editar cliente' : 'Agregar cliente'} className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg cursor-pointer hover:bg-blue-300' />
                </Form>
            )}}
        </Formik>
    </div>
  )
}

Formulario.defaultProps = {
    cliente: {}
}

export default Formulario