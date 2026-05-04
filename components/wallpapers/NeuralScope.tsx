"use client";

import { ShaderCanvas } from "./ShaderCanvas";

const frag = /* glsl */ `
precision highp float;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_click;
uniform float u_clickAge;
uniform vec2 u_res;

float line(vec2 uv, float y, float width){
  return 1.-smoothstep(0.,width,abs(uv.y-y));
}
float hash(float n){return fract(sin(n)*43758.5453123);}

void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  vec2 st=uv*2.-1.;
  st.x*=u_res.x/u_res.y;
  vec2 m=u_mouse;
  float amp=.12+.22*(m.y*.5+.5);
  float freq=3.5+8.0*(m.x*.5+.5);
  float click=exp(-u_clickAge*1.8);
  vec3 col=vec3(.039,.039,.039);

  vec2 grid=abs(fract(uv*vec2(28.,16.))-.5);
  float gridLine=1.-smoothstep(.0,.018,min(grid.x,grid.y));
  col+=vec3(.071,.847,1.)*gridLine*.26;

  for(int i=0;i<7;i++){
    float fi=float(i);
    float row=-.72+fi*.24;
    float phase=u_time*(1.2+fi*.11)+fi*.77;
    float wave=row+sin(st.x*freq+phase)*amp*(.55+.08*fi);
    wave+=sin(st.x*(freq*.37+fi)+phase*1.7)*amp*.45;
    float spike=exp(-pow(st.x-(u_click.x*(u_res.x/u_res.y)),2.)*22.)*click*(sin(fi*2.1)+1.4);
    wave+=spike*.28*sin(u_clickAge*32.-fi);
    float l=line(st,wave,.018);
    vec3 waveCol=mix(vec3(1.,.902,0.),vec3(.902,.224,.275),fi/6.);
    col+=waveCol*l*(1.2+.8*spike);
  }

  float cursor=exp(-length(st-vec2(m.x*(u_res.x/u_res.y),m.y))*8.);
  col+=vec3(.071,.847,1.)*cursor*.9;

  float scan=.88+.12*sin(gl_FragCoord.y*1.7-u_time*12.);
  col*=scan;
  col+=vec3(1.,.902,0.)*click*exp(-pow(length(st-vec2(u_click.x*(u_res.x/u_res.y),u_click.y))-u_clickAge*1.8,2.)*45.);
  gl_FragColor=vec4(clamp(col,0.,1.),1.);
}
`;

export function NeuralScope() {
  return <ShaderCanvas fragmentShader={frag} />;
}
