uniform float u_time; 
varying vec2 vUv;
uniform sampler2D image;

#define PI 3.1415926

//rgb函数
vec4 rgb(float r, float g, float b){
  return vec4(r/255.0, g/255.0, b/255.0, 1.0);

}

  void main() {
    // vec2 uv = 2.0 * vUv -1.0; //uv坐标变成0-2,再减1，就变-1~1,中心就是0,0

    
    vec4 color = vec4(0.1294, 0.2157, 0.4078, 1.0);
  
    gl_FragColor = color;  
  }
  

