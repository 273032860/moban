import React, { Suspense, useLayoutEffect, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useThree, extend, useFrame } from '@react-three/fiber'
import { OrbitControls, Box, shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import vertex from './vertex.glsl'
import fragment from './fragment.glsl'



//单纹理导入，并添加名字
// let texture = new THREE.TextureLoader().load('/public/trails.jpg', (texture) => { texture['name'] = 'one' })

//shaderMaterial
const MyShaderMaterial = shaderMaterial(
  {
    // color: new THREE.Color(0.8, 0.1, 1.0),
    // uBig: 0.2,
    // uBigx: 4.0,
    u_time: 0,
    // texture: texture
  },
  vertex,
  fragment
)
extend({ MyShaderMaterial })

export default function Meshs ({  }) {
  const materef = useRef()
  const mesh = useRef()

  const [state1, setstate1] = useState(false)

  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, state1 ? 100 : 0, 0.1)
  })
//https://threejs.org/docs/index.html#api/zh/math/MathUtils
  return (
    <>
      <mesh position={[3.571, 2.823, 3.112]} scale={[1.6, 1.2, 1]} ref={ref} >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"rgb(48, 163, 103)"} flatShading={false} wireframe={false} fog={true} transparent={true} opacity={0.6} />
      </mesh>
      <mesh onClick={() => { setstate1(!state1) }} >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"rgb(48, 163, 103)"} flatShading={false} wireframe={false} fog={true} transparent={true} opacity={0.6} />
      </mesh >
    </>
  );

}

