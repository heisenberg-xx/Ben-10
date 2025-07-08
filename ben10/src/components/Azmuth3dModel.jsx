// Azmuth3DModel.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const Azmuth3dModel = ({ mouse }) => {
  const modelRef = useRef();
  const { scene } = useGLTF("/Azmuth.glb");

  useFrame(() => {
    if (modelRef.current && mouse.current) {
      const x = (mouse.current.x - 0.5) * 2; // -1 (left) to +1 (right)
      const y = (mouse.current.y - 0.5) * 2;

      let targetYRotation;

      if (x < 0) {
        targetYRotation = 0.4; 
      } else {
        targetYRotation = x * 0.8;
      }

      modelRef.current.rotation.y +=
        (targetYRotation - modelRef.current.rotation.y) * 0.1;

      modelRef.current.rotation.x = -y * 0.3;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={0.9} />;
};
export default Azmuth3dModel;
