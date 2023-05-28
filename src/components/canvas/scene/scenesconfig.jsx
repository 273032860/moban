import React, { Suspense, useLayoutEffect, useEffect, useMemo, useRef, useState } from 'react'
import { useThree, extend, useFrame } from '@react-three/fiber'
import { OrbitControls, Stats, PerformanceMonitor, GizmoHelper, GizmoViewport } from '@react-three/drei'
import * as THREE from 'three'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'


export default function Scenes () {
  const { gl, scene } = useThree() //获取gl mesh 相机 

  const { encoding, toneMapping, toneMappingExposure, physicallyCorrectLights } = useControls('scene全局', {
    encoding: {//!gl编码
      options: [THREE.sRGBEncoding, THREE.LinearEncoding], onChange: (v) => {
        gl.encoding = v//色调映射的曝光级别。默认是1
      },
      label: 'encoding'
    },
    toneMapping: {//!gl色调映射
      options: [THREE.ACESFilmicToneMapping, THREE.NoToneMapping, THREE.LinearToneMapping, THREE.ReinhardToneMapping, THREE.CineonToneMapping, THREE.CustomToneMapping], onChange: (v) => {
        gl.toneMapping = v//色调映射的曝光级别。默认是1
      },
    },
    toneMappingExposure: {//!gl色调曝光度
      value: 0.45, min: 0, max: 10, step: 0.1, onChange: (v) => {
        gl.toneMappingExposure = v
      },
    },
    physicallyCorrectLights: {//!gl色调曝光度
      value: true, onChange: (v) => {
        gl.physicallyCorrectLights = v
      },
    }
  }, { collapsed: true },//初始化折叠
  )


  return (
    <>
      <OrbitControls makeDefault />
      {/* <fog  //在材质上使用fog属性，可以使材质受到雾的影响
          attach="fog" color={'#457192'} near={8.1} far={50} /> */}
      <primitive object={new THREE.AxesHelper(10)} />
      {/* <primitive object={new THREE.GridHelper(100, 100)} /> */}
      <Perf position='bottom-left'
        chart={{ hz: 60 }}
        matrixUpdate //计算每帧调用 matrixWorldUpdate 的时间数
        deepAnalyze //详细 有关 gl 程序的更多详细信息
        antialias //采取更多的表演，但使用抗锯齿渲染文本
        overClock//禁用 fps 的监视器刷新率限制
        showGraph
      // minimal //精简版

      />
      {/* <Stats showPanel={0} className="stats" /> */}
      {/* <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} /> */}


      <GizmoHelper
        alignment="bottom-right" // widget alignment within scene
        margin={[80, 80]} // widget margins (X, Y)
      // onUpdate=//{/* called during camera animation  */}
      // onTarget=//{/* return current camera target (e.g. from orbit controls) to center animation */}
      >
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
        {/* alternative: <GizmoViewcube /> */}
      </GizmoHelper>










    </>
  )
}