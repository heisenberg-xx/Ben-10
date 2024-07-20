import React from 'react'
import { Header } from './components/Header'
import { Outlet } from 'react-router'

const App = () => {
  return (
    <>
      <Header/>
      <main >
        <Outlet/>
      </main>
      <footer className=" font-para opacity-60 text-[13px] text-green-600 absolute left-[45%] bottom-3"> A tribute to Ben 10 by Rajesh Ande</footer>
    </>
  )
}

export default App