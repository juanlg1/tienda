import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from '../api/axios'
import FormInput from '../form/FormInput'
import Button from '../components/Button'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContextProvider'

const LoginClient = () => {
  const [loged, setLoged] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await axios.post('clientes/auth/login', data)
      authContext.loginClient({ client: response.data })
      setIsLoading(false)
      navigate('/cart')
    } catch (error) {
      console.log(error)
      setLoged(error.response.data)
    } finally {
      setIsLoading(false)
    }
  }

  const { register, handleSubmit, formState: { errors } } = useForm()
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-gray-100'>
      <div className='w-80 m-auto bg-red-400 p-5 rounded-lg py-12'>
        <div className='flex justify-center items-center'>
          <h2 className='text-2xl font-medium'>INICIAR SESION</h2>
        </div>
        <form method='post' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 pt-4'>
          <FormInput
            type='text'
            label='Nombre de usuario'
            name='names'
            register={register}
            rules={{ required: true }}
            errors={errors}
          />
          <FormInput
            type='text'
            label='CORREO'
            name='email'
            register={register}
            rules={{ required: true }}
            errors={errors}
          />
          <FormInput
            type='text'
            label='CONTRASEÑA'
            name='password'
            register={register}
            rules={{ required: true }}
            errors={errors}
          />
          <div className='flex justify-center items-center gap-4'>
            <Button
              type='primary'
            >
              {isLoading ? <Loader /> : 'ENVIAR'}
            </Button>
          </div>
          {loged === 'EL USUARIO NO ESTA AUTORIZADO' && (
              <span>ERROR DE AUTENTICACION</span>
            )}
        </form>
      </div>
    </div>
  )
}

export default LoginClient
