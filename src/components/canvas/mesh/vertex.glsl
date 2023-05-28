varying vec2 vUv;
uniform float u_time;   
attribute float size;



/* Math 2D Transformations */
      <mesh >
        <boxGeometry />
        <meshBasicMaterial color={'#fdff50'}
          visible={false} //主体材质不可见
        />
        <Edges //只显示边框
          scale={1.1}
          threshold={15} // 仅当两个面之间的角度超过此值时显示边缘(default=15 degrees)
          color="#a5ff8a"
          position={[0, 0, 0]}
        />
      </mesh>

  void main() {
      
    vUv = uv;
    mat2 easet = rotate2d(u_time);
    
    vec4 newp = vec4(position,1.0);
    newp.xz *= easet;
    vec4 mvPosition = modelViewMatrix * vec4( newp.xyz, 1.0 ); //固定position 

    // gl_PointSize = size *10.0;

    gl_Position = projectionMatrix * mvPosition;//固定

  }





//glsl-canvas提供的片段功能教程
//https://github.com/actarian/vscode-glsl-canvas/blob/master/src/snippets/snippets.md