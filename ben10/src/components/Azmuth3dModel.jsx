// Azmuth3DModel.jsx
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

 const Azmuth3dModel=({ mouse })=> {
  const modelRef = useRef()
  const { scene } = useGLTF('/Azmuth.glb')

  useFrame(() => {
    if (modelRef.current && mouse.current) {
      const x = (mouse.current.x - 0.5) * 2
      const y = (mouse.current.y - 0.5) * 2
      modelRef.current.rotation.y = x
      modelRef.current.rotation.x = -y * 0.3
    }
  })

  return <primitive ref={modelRef} object={scene} scale={0.9} />
}
export default Azmuth3dModel