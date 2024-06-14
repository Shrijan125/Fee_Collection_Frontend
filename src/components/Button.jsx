import React from 'react'

const Button = ({text,onClick}) => {
  return (
    <button type='button' className='p-3 mt-5 text-2xl font-bold rounded-md bg-appBar text-light'  onClick={onClick}>{ text }</button>
  )
}

export default Button