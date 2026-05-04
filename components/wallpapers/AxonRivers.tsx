"use client";

import { ShaderCanvas } from "./ShaderCanvas";

const frag = /* glsl */ `
precision highp float;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_click;
uniform float u_clickAge;
uniform vec2 u_res;

float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);
}
float fbm(vec2 p){
  float v=0.,a=.5;
  mat2 r=mat2(.8,.6,-.6,.8);
  for(int i=0;i<6;i++){v+=a*noise(p);p=r*p*2.1;a*=.48;}
  return v;
}
float fibers(vec2 p){
  vec2 q=vec2(fbm(p+vec2(.3,.7)),fbm(p+vec2(9.2,1.7)));
  vec2 w=vec2(fbm(p+4.*q+u_time*.04),fbm(p+4.*q+vec2(5.7,3.1)+u_time*.03));
  float n=fbm(p+4.*w);
  float lines=abs(sin(n*62.83));
  return pow(lines,14.);
}

void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  float asp=u_res.x/u_res.y;
  vec2 st=(uv-.5)*vec2(asp,1.)*2.8;
  vec2 m=u_mouse*vec2(asp,1.)*1.4;
  vec2 c=u_click*vec2(asp,1.)*1.4;
  vec2 toM=st-m;
  float md=length(toM);
  float vort=.9*exp(-md*md*1.2);
  vec2 warp=vec2(-toM.y,toM.x)*vort;
  vec2 p=st+warp+vec2(u_time*.021,u_time*.011);
  float f=fibers(p);
  float cd=length(st-c);
  float ring=exp(-pow(cd-u_clickAge*1.8,2.)*30.)*exp(-u_clickAge*1.1);
  float lit=fibers(p+normalize(st-c+0.0001)*ring*.15);
  f+=ring*(.4+lit*2.);
  float nc=fbm(p*.4+u_time*.03);
  vec3 cA=vec3(.071,.847,1.);   // site cyan
  vec3 cB=vec3(.902,.224,.275); // site red
  vec3 col=vec3(.039,.039,.039)+mix(cA,cB,nc)*f*2.2;
  col+=cA*.18*exp(-md*md*2.5);
  col*=1.-smoothstep(.35,1.12,length(uv-.5));
  col*=.96+.04*sin(gl_FragCoord.y*.8+u_time*2.);
  gl_FragColor=vec4(clamp(col,0.,1.),1.);
}
`;

export function AxonRivers() {
  return <ShaderCanvas fragmentShader={frag} />;
}
