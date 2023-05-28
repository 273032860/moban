import React, { Suspense, useLayoutEffect, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useThree, extend, useFrame } from '@react-three/fiber'
import { SoftShadows, BakeShadows, AccumulativeShadows, RandomizedLight, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { useControls } from 'leva'



export default function Shadows () {
  // const { gl, scene } = useThree()

  // const { shadowMapType } = useControls('阴影类型(全局)', {
  //   shadowMapType: {//阴影类型
  //     options: [
  //       THREE.PCFShadowMap,//默认值,性能较差但边缘更平滑
  //       THREE.BasicShadowMap, //非常高效但质量很差,
  //       THREE.PCFSoftShadowMap,//性能较差但边缘更柔和
  //       THREE.VSMShadowMap,//性能较低，约束较多，可能会产生意想不到的结果
  //     ], onChange: (v) => {
  //       gl.shadowMap.type = v//色调映射的曝光级别。默认是1
  //     },
  //   },
  //   shadowRadius: {//阴影模糊度,PCFSoftShadowMap时不生效
  //     value: 3, min: 0, max: 50, step: 0.01, onChange: (v) => {
  //       scene.getObjectByName('sun').shadow.radius = v//调整太阳光的阴影模糊度
  //     },
  //   }
  // }, { collapsed: true },//初始化折叠
  // )

  // const { size, samples, focus } = useControls('软阴影', {
  //   size: { value: 25, min: 0, max: 50, step: 0.01 },
  //   samples: { value: 10, min: 0, max: 100, step: 1 },
  //   focus: { value: 4, min: 0, max: 100, step: 0.1 },
  // })
  return (
    <>
      {/* 软阴影 */}
      {/* <SoftShadows 
        size={size} //光源大小（越大光线越柔和） 默认25
        samples={samples} //样本数量（样本越多噪音越小但成本越高） 默认10
        focus={focus}//深度焦点，用它来移动焦点（阴影最锐利的地方）
      /> */}
      {/* 烘焙阴影 */}
      {/* <BakeShadows /> */}

      {/* <AccumulativeShadows  //累积阴影平面,对动态物体阴影效果差
        scale={10} position={[0, -0.9, 0]} color="#4fb65d"
        opacity={0.8} frames={Infinity}
        resolution={1024} //缓冲分辨率,默认1024
        temporal//会随着时间的推移累积阴影，这会提高性能，但对即时结果有视觉上的回归,默认false
        blend={100}//if frames === Infinity blend 控制刷新率,默认100
        limit={Infinity}//如果 frames === Infinity，可以限制渲染的帧数，通常是为了在可移动场景稳定后恢复一些性能，默认Infinity
      >
        <RandomizedLight //默认8盏灯，可拆分多个在不同位置
          frames={Infinity}//默认1
          amount={8}//多少盏灯
          radius={1}//抖动的幅度,值越大光线越柔和
          ambient={0.5}//环境遮挡，较低的值意味着较少的 AO，较高的则更多，您可以混合 AO 和定向光,默认0.5
          intensity={0.8}//灯光的强度
          position={[5, 15, -10]}
          bias={0.001} //阴影偏差,默认0
          castShadow
          mapSize={1024} //阴影贴图大小,默认512
          size={10}//阴影相机的默认大小，10
          near={0.5}//阴影相机的近裁剪面,默认0.5
          far={500}//阴影相机的远裁剪面,默认500
        />
      </AccumulativeShadows> */}

      {/* <ContactShadows //接触阴影,正上方的平面
        frames={Infinity} //默认Infinity
        position={[0, -0.9, 0]}
        opacity={1}
        scale={10}
        blur={1}
        far={10}
        resolution={512}
        color="#000000"
      /> */}
    </>
  )
}