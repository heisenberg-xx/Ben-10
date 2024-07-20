import React from 'react'
import { Header } from './components/Header'
import { Outlet } from 'react-router'

const App = () => {
  return (
    <>
      <Header/>
      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default App