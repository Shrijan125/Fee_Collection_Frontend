import React from 'react'
import FormBox from '../components/FormBox'
import Button from '../components/Button'

const Login = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-dark' >
        <div className='flex flex-col'>
          <FormBox label={'Admin ID'}></FormBox>
          <div className='flex flex-col items-start justify-center mt-5'>
            <label className='text-2xl font-bold text-light' rel='adminPassword'>Password</label>
            <input className='p-3 text-xl font-bold border rounded-md outline-none text-appBar border-appBar' type='password' name='adminPassword'></input>
          </div>
          <Button text={'Login'}></Button>
    </div>
    </div>
  )
}

export default Login

