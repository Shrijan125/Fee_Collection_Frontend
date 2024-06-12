import React from 'react'

const Button = ({text}) => {
  return (
    <button type='button' className='p-3 mt-5 text-2xl font-bold rounded-md bg-appBar text-light'>{text}</button>
  )
}

export default Button