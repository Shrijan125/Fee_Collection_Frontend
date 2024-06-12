import React from 'react'
import FormBox from './FormBox'
import Button from './Button'

const FeeCollection = () => {
  return ( 
  
    <div className='flex flex-col items-center justify-center w-screen h-screen ml-96 bg-dark'>
        <FormBox label={'Admission No.'}></FormBox>
        <FormBox label={'Name'}></FormBox>
        <FormBox label={'Class'}></FormBox>
        <Button text={'Confirm'}></Button>
     </div>

  )
}

export default FeeCollection