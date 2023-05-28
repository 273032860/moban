import React, { Suspense, useLayoutEffect, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useThree, extend, useFrame } from '@react-three/fiber'
import { Sky, Environment, Lightformer, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { LayerMaterial, Depth, Noise } from 'lamina'

//!envMapIntensity={1} //环境光强度,在材质中调节envMapIntensity可让环境光更强




export default function Background () {

  return (
    <>
      {/* hdr背景 */}
      {/* <Environment background
        // files="/dam_wall_2k.hdr"
        files="https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/hdris/noon-grass/noon_grass_1k.hdr"
      // ground={{//地板贴到环境地面
      //   height: 15,// 用于创建环境贴图的相机高度（默认值：15）
      //   radius: 60,//世界的半径。（默认 60）
      //   scale: 1000, // 包含环境纹理的背面投影球体的比例（默认值：1000）
      // }}
      /> */}

      {/* <color args={['ivory']} attach="background" /> */}

      {/* <Sky //天空盒子背景
        distance={450}//天空盒子大小
        sunPosition={[0, 1, 1]}//太阳方位
        inclination={0.6}//太阳高度,默认0.6
        azimuth={0.1}//太阳方位角,默认0.1
        mieCoefficient={0.005}//最小系数控制蓝天范围，越小蓝多,默认0.005
        mieDirectionalG={1.0}//最小方向系数控制蓝天范围，越小蓝多,默认0.8,0~1
        rayleigh={0.4}//天空蓝色深度,默认0.5越小越深
        turbidity={10}//天空全景变蓝,默认10越大越深,100变阴天
      /> */}

      {/* 自定义天空盒子 */}
      {/* <Environment
        background// 显示背景,默认false
        resolution={256} //分辨率
        frames={Infinity} //帧无限，用于动画
        blur={0} //模糊1等于看不到背景 介于 0 和 1 之间的模糊因子（默认值：0)
        files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}//用于盒子环境
        path='/' //files贴图路径
        preset={'sunset'}//内置环境，不能用在生产 sunset warehouse city park forest playground gym parking garage livingroom kitchen bathroom
        scene={undefined} // 添加传递自定义 THREE.Scene 的能力，也可以是 ref
      // encoding={undefined} // 添加传递自定义 THREE.TextureEncoding 的能力（默认：THREE.sRGBEncoding 用于文件数组和 THREE.LinearEncoding 用于单个纹理
      /> */}

      {/* 自建场景用作背景 */}
      {/* <Environment background resolution={64}>
        <mesh position={[10, 2, 0]} scale={[1, 3, 10]}>
          <boxGeometry />
          <meshBasicMaterial color="white" />
        </mesh>
        <mesh position={[-10, 2, 0]} scale={[1, 3, 10]}>
          <boxGeometry />
          <meshBasicMaterial color="white" />
        </mesh>
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <LayerMaterial side={THREE.BackSide} color="blue" alpha={1} mode="normal">
            <Depth colorA="#00ffff" colorB="#ff8f00" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
            <Noise mapping="local" type="cell" scale={0.5} mode="softlight" />
          </LayerMaterial>
        </mesh>
      </Environment> */}

      {/* 霓虹光 */}
      {/* <Environment files="/moonless_golf_2k.hdr">
        <Lightformer
          position-z={-2}
          scale={2} color="red"
          intensity={10}
          form="ring" //环形光板 circle | ring | rect (optional, default = rect)
          target={[0, 0, 0]} //光的Target position
        />
      </Environment> */}

      {/* 星星 */}
      {/* <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} speed={1}
        fade //开启星星变小,默认false
      /> */}

      {/* <Environment files={'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/evening_road_01_2k.hdr'}/> */}
    </>
  )
}