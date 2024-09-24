import React from 'react'
import loader from '../assets/Loader.png'
import './Loader.css'

const Loader = () => {
  return (
    <div className="w-screen h-[70vh]  flex justify-center items-center animate-spin ">
      <img className="loader md:h-[150px] md:w-[150px] w-[90px] h-[90px]" src={loader} alt="Loader" />
    </div>
  )
}

export default Loader
