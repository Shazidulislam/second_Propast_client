import React from 'react'
import logo from "../../../assets/potho/logo.png"

export default function ProFastButton() {
  return (
    <div className='flex  items-end'>
      <img className='mb-2' src={logo} alt="" />
      <h1 className='text-3xl font-medium -ml-4'>ProFast </h1>
    </div>
  )
}