import React from 'react'
import loader from '../assets/Loader.png'
import './Loader.css'

const Loader = () => {
  return (
    <div className='loader-container'><img className='loader md:h-[200px] md:w-[200px] w-[100px] h-[200px]' src={loader} alt="" /></div>
  )
}

export default Loader