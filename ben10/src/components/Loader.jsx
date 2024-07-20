import React from 'react'
import loader from '../assets/Loader.png'
import './Loader.css'

const Loader = () => {
  return (
    <div className="w-full h-[70vh]  flex justify-center items-center ">
      <img className="loader md:h-[200px] md:w-[200px] w-[100px] h-[100px]" src={loader} alt="Loader" />
    </div>
  )
}

export default Loader
