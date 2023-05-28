import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Box,
  Loader,
  Stats,
  Stage,
  ScrollControls,
  Preload,
} from "@react-three/drei";
import * as THREE from "three";
import Meshs from "./mesh/mesh";
import Light from "./scene/light";
import Shadows from "./scene/shadow";
import Background from "./scene/background";
import Scenes from "./scene/scenesconfig";
import Postprocess from "./scene/postprocessing";

function TCanvas() {
  return (
    <>
      <Canvas
        className="h-full"
        shadows //!开启阴影,meshBasicMaterial不支持阴影
        // flat //将toneMapping改为0
        // key={concurrent}
        // mode={concurrent ? "concurrent" : "blocking"}
        // linear //开启功能:关闭自动 sRGB 编码和伽玛校正 ,颜色变深
        //legacy //开启THREE.ColorManagement.legacyMode忽略了显示器或打印机的特定颜色特性和色彩空间，使用后颜色变淡
        gl={{
          // logarithmicDepthBuffer: true,
          // antialias: false, stencil: false, depth: false,
          // outputEncoding: THREE.sRGBEncoding,//默认THREE.sRGBEncoding 3001  THREE.LinearEncoding  3000  THREE.GammaEncoding
          // toneMapping: 4, //默认4 THREE.ACESFilmicToneMapping, toneMappingExposure曝光度需在gl外单独设置,使用leva
          physicallyCorrectLights: true, //!近似方法来模拟光线的传播、反射和折射等物理行为。但是，这种方法会导致一些不自然的效果
          //preserveDrawingBuffer: true //需要保留绘图缓冲区的内容，例如如果您想捕获渲染场景的屏幕截图,就开启
        }}
        camera={
          {
            // fov: 30,
            // near: 0.1,
            // far: 200,
            // zoom: 100, //获取或者设置摄像机的缩放倍数，其默认值为1
            // position: [3, 2, 6]
          }
        }
        // frameloop='always' //demand按需 never绝不 默认always总是
        // eventSource={document.getElementBtId('root')} //订阅事件的来源，HTMLElement
        // eventPrefix='client' //投射到画布指针 x/y 事件中的事件前缀
        onCreated={(e) => {
          // console.log(e) //渲染前操作，相机,gl,scene等
        }}
      >
        <Suspense fallback={null}>
          <Scenes />
          <Light />
          <Shadows />
          <Background />
          <Postprocess />

          {/* // ! 模型 */}
          <Meshs position={[2, 0, 0]} />
          <Preload all />
        </Suspense>
      </Canvas>

      <Loader //load加载器
      // containerStyles={...container} // Flex布局样式
      // innerStyles={...inner} // 内部容器样式
      // barStyles={...bar} // 装载型式风格
      // dataStyles={...data} // 文字样式
      // dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`} // 文本
      // initialState={(active) => active} // 最初的黑色状态
      />
    </>
  );
}

export default TCanvas;
