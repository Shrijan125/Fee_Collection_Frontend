import React from 'react'

const FormBox = ({label,value,setField,required=false} ) => {
  return (
    <div className='flex flex-col items-start justify-center mt-5'>
        <label className={`text-2xl font-bold text-light`}  rel={label}>{label} {required && <span>*</span>}</label>
        <input className='p-3 text-xl font-bold border rounded-md outline-none text-appBar border-appBar' name={label} required={required} type='text' value={value} onChange={(e)=>{setField(e.target.value)}}></input>
    </div>
  )
}

export default FormBox