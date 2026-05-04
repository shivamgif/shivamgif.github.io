(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,99102,e=>{"use strict";var c=e.i(43476),i=e.i(83160);let o=`
precision highp float;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_click;
uniform float u_clickAge;
uniform vec2 u_res;

float hash(vec2 p){return fract(sin(dot(p,vec2(17.7,91.3)))*98765.123);}
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);
}
float fbm(vec2 p){
  float v=0.,a=.5;
  for(int i=0;i<5;i++){v+=a*noise(p);p*=2.04;a*=.52;}
  return v;
}
float height(vec2 p, vec2 m, vec2 c){
  float h=fbm(p*1.4+u_time*.05)*.6+fbm(p*4.2-u_time*.08)*.22;
  float md=length(p-m);
  h-=exp(-md*md*2.6)*.5;
  float ring=sin((length(p-c)-u_clickAge*1.5)*30.)*.5+.5;
  h+=ring*exp(-pow(length(p-c)-u_clickAge*1.5,2.)*18.)*exp(-u_clickAge*.8)*.42;
  return h;
}

void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  float asp=u_res.x/u_res.y;
  vec2 p=(uv-.5)*vec2(asp,1.)*3.4;
  vec2 m=u_mouse*vec2(asp,1.)*1.7;
  vec2 c=u_click*vec2(asp,1.)*1.7;
  float e=.008;
  float h=height(p,m,c);
  vec3 n=normalize(vec3(height(p+vec2(e,0.),m,c)-h,height(p+vec2(0.,e),m,c)-h,e*2.2));
  vec3 light=normalize(vec3(-.45,.62,.68));
  float diff=max(dot(n,light),0.);
  float fres=pow(1.-max(n.z,0.),3.);
  vec3 refl=.5+.5*cos(vec3(.0,1.9,3.8)+(n.x+n.y+h)*4.8+u_time*.35);
  refl=mix(vec3(1.,.902,0.),mix(vec3(.071,.847,1.),vec3(.902,.224,.275),refl.x),refl.y);
  vec3 base=mix(vec3(.039,.039,.039),refl,diff*.9+fres);
  vec3 hot=vec3(.902,.224,.275)*exp(-length(p-m)*1.2)*.28;
  vec3 ring=vec3(.071,.847,1.)*exp(-pow(length(p-c)-u_clickAge*1.5,2.)*18.)*exp(-u_clickAge*.8);
  vec3 col=base+hot+ring;
  col+=pow(diff,18.)*vec3(1.,.976,.875);
  col*=1.-smoothstep(.48,1.16,length(uv-.5))*.55;
  gl_FragColor=vec4(clamp(col,0.,1.),1.);
}
`;e.s(["LiquidChrome",0,function(){return(0,c.jsx)(i.ShaderCanvas,{fragmentShader:o})}])},22668,e=>{e.n(e.i(99102))}]);