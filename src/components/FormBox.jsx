import React from 'react'

const FormBox = ({label}) => {
  return (
    <div className='flex flex-col items-start justify-center mt-5'>
        <label className='text-2xl font-bold text-light' rel={label}>{label}</label>
        <input className='p-3 text-xl font-bold border rounded-md outline-none text-appBar border-appBar' name={label} type='text'></input>
    </div>
  )
}

export default FormBox