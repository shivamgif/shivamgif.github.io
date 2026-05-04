"use client";

import { ShaderCanvas } from "./ShaderCanvas";

const frag = /* glsl */ `
precision highp float;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_click;
uniform float u_clickAge;
uniform vec2 u_res;

vec2 hash2(vec2 p){
  p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));
  return fract(sin(p)*43758.5453);
}

void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  float asp=u_res.x/u_res.y;
  vec2 p=(uv-.5)*vec2(asp,1.)*7.5;
  vec2 m=u_mouse*vec2(asp,1.)*3.75;
  vec2 c=u_click*vec2(asp,1.)*3.75;

  vec2 g=floor(p);
  vec2 f=fract(p);
  float d1=10.;
  float d2=10.;
  vec2 id=vec2(0.);
  vec2 nearest=vec2(0.);

  for(int y=-1;y<=1;y++){
    for(int x=-1;x<=1;x++){
      vec2 o=vec2(float(x),float(y));
      vec2 h=hash2(g+o);
      vec2 r=o+h+.22*sin(u_time*.7+6.283*h)-f;
      float d=dot(r,r);
      if(d<d1){d2=d1;d1=d;id=g+o;nearest=r;}
      else if(d<d2){d2=d;}
    }
  }

  float edge=smoothstep(.13,.0,d2-d1);
  float node=1.-smoothstep(.0,.09,sqrt(d1));
  float neuron=1.-smoothstep(.0,.035,length(nearest));
  float md=length((p+nearest)-m);
  float active=exp(-md*md*.25);
  float signal=.5+.5*sin(u_time*5.+id.x*1.7+id.y*2.3);
  float cd=length((p+nearest)-c);
  float ring=exp(-pow(cd-u_clickAge*3.2,2.)*5.)*exp(-u_clickAge*.65);

  vec3 bg=vec3(.039,.039,.039);
  vec3 violet=vec3(1.,.902,0.);
  vec3 blue=vec3(.071,.847,1.);
  vec3 lime=vec3(1.,.976,.875);
  vec3 pink=vec3(.902,.224,.275);

  vec3 col=bg;
  col+=mix(violet,blue,signal)*edge*(.45+active*1.4+ring*2.2);
  col+=lime*node*(.55+active*1.8);
  col+=pink*neuron*(1.6+ring*4.);
  col+=blue*exp(-length(p-m)*.7)*.2;
  col*=1.-smoothstep(.4,1.13,length(uv-.5))*.75;
  gl_FragColor=vec4(clamp(col,0.,1.),1.);
}
`;

export function MyceliumNet() {
  return <ShaderCanvas fragmentShader={frag} />;
}
