import React, { Suspense, useLayoutEffect, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useThree, extend, useFrame } from '@react-three/fiber'
import { OrbitControls, Box, shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { SSR, DepthOfField, Bloom, Noise, Glitch, Vignette, EffectComposer, SSAO, Selection } from '@react-three/postprocessing'
import { BlendFunction, Resizer, KernelSize } from 'postprocessing'
import { useControls } from 'leva'

export default function Postprocess () {

  const { bloomintensity, luminanceThreshold, luminanceSmoothing, blurPass } = useControls('辉光', {
    bloomintensity: { value: 1, min: 0, max: 10, step: 0.01, label: '强度' },
    luminanceThreshold: { value: 0.9, min: 0, max: 2, step: 0.01, label: '发光阀值' },
    luminanceSmoothing: { value: 0.025, min: 0, max: 5, step: 0.001, label: '亮度阀值平滑度' },
    blurPass: { value: 12, min: 0, max: 50, step: 0.001, label: '模糊深度' },
  }, { collapsed: true },//初始化折叠
  )
  const ssao = useControls('环境光遮蔽AO', {
    samples: { value: 9, min: 0, max: 100, step: 1, label: '采样数' },
    rings: { value: 7, min: 0, max: 20, step: 0.01, label: '遮挡环数' },
    distanceThreshold: { value: 0.97, min: 0, max: 1, step: 0.001, label: '距离阈值' },
    distanceFalloff: { value: 0.03, min: 0, max: 1, step: 0.0001, label: '距离衰减' },
    rangeThreshold: { value: 0.0005, min: 0, max: 1, step: 0.0001, label: '范围阀值' },
    rangeFalloff: { value: 0.001, min: 0, max: 1, step: 0.001, label: '范围衰减' },
    minRadiusScale: { value: 0.33, min: 0, max: 1, step: 0.001, label: '最小半径刻度' },
    luminanceInfluence: { value: 0.7, min: 0, max: 10, step: 0.01, label: '亮度影响' },
    radius: { value: 0.1825, min: 0, max: 1, step: 0.0001, label: '半径' },
    intensity: { value: 1, min: 0, max: 10, step: 0.01, label: '环境光遮蔽强度' },
    scale: { value: 0.5, min: 0, max: 10, step: 0.001, label: '距离降低' },
    bias: { value: 0.025, min: 0, max: 1, step: 0.001, label: '遮挡偏差' },
    color: '#000000',
  }, { collapsed: true },//初始化折叠
  )
  // const ssr = useControls('屏幕反射', {
  //   temporalResolve: true,
  //   STRETCH_MISSED_RAYS: true,
  //   USE_MRT: true,
  //   USE_NORMALMAP: true,
  //   USE_ROUGHNESSMAP: true,
  //   ENABLE_JITTERING: true,
  //   ENABLE_BLUR: true,
  //   temporalResolveMix: { value: 0.9, min: 0, max: 1 },
  //   temporalResolveCorrectionMix: { value: 0.25, min: 0, max: 1 },
  //   maxSamples: { value: 0, min: 0, max: 1 },
  //   resolutionScale: { value: 1, min: 0, max: 1 },
  //   blurMix: { value: 0.5, min: 0, max: 1 },
  //   blurKernelSize: { value: 8, min: 0, max: 8 },
  //   blurSharpness: { value: 0.5, min: 0, max: 1 },
  //   rayStep: { value: 0.3, min: 0, max: 1 },
  //   intensity: { value: 1, min: 0, max: 5 },
  //   maxRoughness: { value: 0.1, min: 0, max: 1 },
  //   jitter: { value: 0.7, min: 0, max: 5 },
  //   jitterSpread: { value: 0.45, min: 0, max: 1 },
  //   jitterRough: { value: 0.1, min: 0, max: 1 },
  //   roughnessFadeOut: { value: 1, min: 0, max: 1 },
  //   rayFadeOut: { value: 0, min: 0, max: 1 },
  //   MAX_STEPS: { value: 20, min: 0, max: 20 },
  //   NUM_BINARY_SEARCH_STEPS: { value: 5, min: 0, max: 10 },
  //   maxDepthDifference: { value: 3, min: 0, max: 10 },
  //   maxDepth: { value: 1, min: 0, max: 1 },
  //   thickness: { value: 10, min: 0, max: 10 },
  //   ior: { value: 1.45, min: 0, max: 2 }
  // }, { collapsed: true },)
  return (
    <>
      <EffectComposer //效果器 必须包装您的所有效果。它将为您管理它们
        // enabled={boolean}
        // children={JSX.Element | JSX.Element[]}
        // depthBuffer={true}
        // disableNormalPass={boolean}
        // stencilBuffer={boolean}
        // autoClear={boolean}
        multisampling={8}   //默认8, 多重采样用于防止混叠效应, 值越高边缘越清晰但性能变差， 0多重采样时性能应该更好
      // frameBufferType={TextureDataType}
      // /** 有关支持DepthDownsmplingPass的效果 */
      // resolutionScale={number}
      // renderPriority={number}
      // camera={THREE.Camera}
      // scene={THREE.Scene}
      >



        <Bloom  //辉光 ,颜色通道超出1阈值时才会发光, 解决方法: mateerial.toneMapped = {false} mateerial.color={ [ 1.5, 1, 4 ] }内部光 颜色必须大于1 mateerial.emissive={color}外部光  mateerial.emissiveIntensity={number}发光度
          mipmapBlur
          intensity={bloomintensity} //亮度默认1
          luminanceThreshold={luminanceThreshold} //默认0.9 定义材料开始发光的阈值
          luminanceSmoothing={luminanceSmoothing}//亮度阈值的平滑度。范围是 [0, 1]
          // blurPass={blurPass} //模糊深度
          width={Resizer.AUTO_SIZE}
          height={Resizer.AUTO_SIZE}
          kernelSize={KernelSize.LARGE} // 模糊内核大小
        />


        {/* 此效果支持深度感知的上采样，应以较低的分辨率渲染。分辨率应与缩减采样的法线和深度的分辨率相匹配。如果您打算以全分辨率渲染 SSAO，请不要提供缩减采样的 normalDepthBuffer，并确保禁用 depthAwareUpsampling。 */}
        <SSAO
          {...ssao}
          blendFunction={BlendFunction.MULTIPLY} // 混合模式
          depthAwareUpsampling={false}
          width={Resizer.AUTO_SIZE}
          height={Resizer.AUTO_SIZE}
        // samples={30} // 每个像素的样品量（不应是环数的倍数）
        // rings={4} // 遮挡抽样模式中的环数
        // distanceThreshold={1.0} // 闭塞效果开始消失的全球距离阈值。最小：0，最大：1
        // distanceFalloff={0.0} // 距离降低. min: 0, max: 1
        // rangeThreshold={0.5} // 闭塞开始消失的局部遮挡范围阈值. min: 0, max: 1
        // rangeFalloff={0.1} // 闭塞范围降低. min: 0, max: 1
        // luminanceInfluence={0.9} // 场景的亮度对环境阻塞有多大影响
        // radius={20} // 遮挡采样半径
        // scale={0.5} // 环境阻塞的比例
        // bias={0.5} // 闭塞偏见
        />

        {/* <Noise premultiply blendFunction={BlendFunction.ADD} 
        opacity={0.3} //透明度
        ref={noise} /> */}

        {/* <SSR {...ssr} /> */}





      </EffectComposer>
    </>
  )
}