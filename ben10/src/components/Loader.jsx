import React from 'react'
import loader from '../assets/Loader.png'
import './Loader.css'

const Loader = () => {
  return (
    <div className='loader-container'><img className='loader md:h-[200px] md:w-[200px] w-[100px] h-[200px] top-[25%] md:left-[46%] left-[40%]' src={loader} alt="" /></div>
  )
}

export default Loader