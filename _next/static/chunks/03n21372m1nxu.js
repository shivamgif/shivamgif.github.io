(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,26446,e=>{"use strict";var c=e.i(43476),o=e.i(83160);let i=`
precision highp float;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_click;
uniform float u_clickAge;
uniform vec2 u_res;

float hash(vec2 p){return fract(sin(dot(p,vec2(41.7,289.1)))*143758.5453);}
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);
}
float fbm(vec2 p){
  float v=0.,a=.55;
  mat2 r=mat2(.64,.77,-.77,.64);
  for(int i=0;i<6;i++){v+=a*noise(p);p=r*p*2.03;a*=.5;}
  return v;
}

void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  float asp=u_res.x/u_res.y;
  vec2 p=(uv-.5)*vec2(asp,1.)*3.1;
  vec2 m=u_mouse*vec2(asp,1.)*1.55;
  vec2 c=u_click*vec2(asp,1.)*1.55;

  float md=length(p-m);
  float heat=exp(-md*md*2.4);
  p += normalize(p-m+0.001)*sin(md*18.-u_time*4.)*.09*heat;
  p += vec2(fbm(p*1.8+u_time*.07),fbm(p*1.8-3.7-u_time*.05))*.9;

  float shock=exp(-pow(length(p-c)-u_clickAge*1.35,2.)*24.)*exp(-u_clickAge*.9);
  p += normalize(p-c+0.001)*shock*.22;

  float n1=fbm(p*1.3+vec2(u_time*.05,-u_time*.04));
  float n2=fbm(p*3.0+n1*2.4);
  float veins=abs(sin((p.x*.9+p.y*.25+n1*2.6+n2*.9)*8.0));
  veins=pow(1.-veins,7.5);
  float blackVein=pow(1.-abs(sin((p.x-n2*.7)*14.)),16.);

  vec3 cream=vec3(1.,.976,.875); // site paper
  vec3 jade=vec3(.071,.847,1.);  // site cyan
  vec3 coral=vec3(.902,.224,.275);
  vec3 ink=vec3(.039,.039,.039);
  vec3 gold=vec3(1.,.902,0.);

  vec3 col=mix(cream,jade,smoothstep(.22,.95,n1));
  col=mix(col,coral,smoothstep(.76,1.,n2)*.72);
  col=mix(col,ink,blackVein*.85);
  col+=gold*veins*1.25;
  col+=jade*shock*.7;
  col+=coral*heat*.18;
  col*=1.-smoothstep(.35,1.15,length(uv-.5))*.45;
  gl_FragColor=vec4(clamp(col,0.,1.),1.);
}
`;e.s(["MarbleResin",0,function(){return(0,c.jsx)(o.ShaderCanvas,{fragmentShader:i})}])},78941,e=>{e.n(e.i(26446))}]);