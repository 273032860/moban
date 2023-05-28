import React, { Suspense, useLayoutEffect, useEffect, useMemo, useRef, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useHelper, TransformControls, AccumulativeShadows } from '@react-three/drei'
import * as THREE from 'three'
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js'
import { useControls } from 'leva'


export default function Light () {
  const { scene } = useThree() //获取gl mesh 相机 
  const rectRef = useRef()
  useHelper(rectRef, RectAreaLightHelper)

  const directRef = useRef()
  useHelper(directRef, THREE.DirectionalLightHelper)
  const { intensity } = useControls('太阳光亮度', {
    intensity: {
      value: 5, min: 0, max: 50, step: 0.1, onChange: (v) => {
        scene.getObjectByName('sun').intensity = v//调整太阳光的阴影模糊度
      },
    }
  }, { collapsed: true },//初始化折叠
  )
  // //*灯光相机辅助
  // const { scene } = useThree() //获取gl mesh 相机 
  // useEffect(() => {
  //   scene.add(new THREE.CameraHelper(directRef.current.shadow.camera))
  // }, [])

  const spotRef = useRef()
  useHelper(spotRef, THREE.SpotLightHelper)
  const pointRef = useRef()
  useHelper(pointRef, THREE.PointLightHelper)
  const sphereref = useRef()
  useHelper(sphereref, THREE.HemisphereLightHelper)



  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.7} color={'#ffffff'} />

      {/* 太阳光 */}
      <TransformControls mode='translate' object={directRef} onObjectChange={() => { console.log(directRef.current.position) }}>
        <directionalLight intensity={intensity}
          name='sun'
          castShadow
          position={[4, 4, 1]}
          ref={directRef}
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-camera-near={0.1}
          shadow-camera-far={30}
          shadow-normalBias={0.14}
        />
      </TransformControls>

      {/* 点光 */}
      {/* <TransformControls mode='translate' object={pointRef} onObjectChange={() => { console.log(pointRef.current.position) }}>
        <pointLight intensity={0.43}
          ref={pointRef}
          position={[0, 0, 0]}
          color={'white'}
          distance={10} //从光源到光照强度为0的位置。 当设置为0时，光永远不会消失(距离无穷大)。缺省值 0.
          decay={2}//沿着光照距离的衰退量。缺省值 2。
          castShadow
        >

        </pointLight>
      </TransformControls> */}

      {/* 聚光灯 */}
      {/* <TransformControls mode='translate' object={spotRef} onObjectChange={() => { console.log(spotRef.current.position) }}>
        <spotLight
          ref={spotRef}
          position={[-2, 1, 0]}
          color={new THREE.Color(0x78ff00)}
          intensity={0.5}
          distance={10} //强度下降到的距离0
          angle={Math.PI * 0.1} //光束有多大
          penumbra={0.25} //光束轮廓的扩散程度
          decay={1}  //衰减
        // target={cref.current} //目标
        />
      </TransformControls> */}

      {/* 平面光 */}
      {/* <TransformControls mode='translate' object={rectRef} onObjectChange={() => { console.log(rectRef.current.position) }}>
        <rectAreaLight intensity={0.43} ref={rectRef}
          position={[0, 1, 2]}
          color={'red'}
          width={2}
          height={2}
          lookAt={new THREE.Vector3(1, 0, 0)}
        /></TransformControls> */}

      {/* 半球光 */}
      {/* <TransformControls mode='translate' object={sphereref} onObjectChange={() => { console.log(sphereref.current.position) }}>
        <hemisphereLight intensity={0.43}
          color={'red'}
          groundColor={'blue'}
          ref={sphereref}
        />
      </TransformControls> */}


      {/* <spotLight position={[5, 5, -10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <ambientLight intensity={0.5} />
      <AccumulativeShadows
        temporal
        frames={100}
        color="orange"
        colorBlend={2}
        toneMapped={true}
        alphaTest={0.8}
        opacity={1}
        scale={12}
        position={[0, -0.5, 0]}
      >
        <RandomizedLight amount={8} radius={10} ambient={0.5} intensity={1} position={[5, 5, -10]} bias={0.001} />
      </AccumulativeShadows> */}
    </>
  )
}