import React,{useEffect,useRef,useState} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import './spatial-map-v2.css';

const BLUEPRINT='https://raw.githubusercontent.com/rllibo833-sudo/kawasan-masjid-core/main/IMG_20260921_131112.png';
const ZONES=[
{id:'01',name:'Masjid & Civil Life',x:0,z:0,w:5,d:5,h:4,color:0xfbbc04},
{id:'02',name:'Education & Research',x:-7,z:-5,w:5,d:4,h:2.2,color:0x4285f4},
{id:'03',name:'Food & Agriculture',x:8,z:-5,w:6,d:4,h:1.6,color:0x10b981},
{id:'04',name:'Water & Ecology',x:10,z:5,w:5,d:4,h:.8,color:0x27b9d6},
{id:'05',name:'Energy & Utilities',x:-9,z:6,w:5,d:4,h:1.3,color:0xea4335},
{id:'06',name:'Local Economy',x:3,z:8,w:6,d:4,h:2,color:0xff6b57},
{id:'07',name:'Digital Ecosystem',x:-2,z:-10,w:6,d:3,h:2.5,color:0x8b5cf6},
{id:'08',name:'Living & Public Space',x:-12,z:-1,w:4,d:5,h:1,color:0xffb020}
];

function addBuilding(group,x,z,w,d,h,color,seed){
 const body=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshStandardMaterial({color,roughness:.72,metalness:.05}));
 body.position.set(x,h/2+.18,z);body.castShadow=true;body.receiveShadow=true;group.add(body);
 const roof=new THREE.Mesh(new THREE.BoxGeometry(w*.9,.12,d*.9),new THREE.MeshStandardMaterial({color:0xe8edf0,roughness:.8}));
 roof.position.set(x,h+.25,z);roof.castShadow=true;group.add(roof);
 if(seed%2===0){
  const glass=new THREE.Mesh(new THREE.BoxGeometry(w*.72,.035,.04),new THREE.MeshBasicMaterial({color:0x9dd8ff}));
  glass.position.set(x,h*.55,z-d/2-.021);group.add(glass);
 }
}

function buildZone(z){
 const g=new THREE.Group();g.userData=z;
 const pad=new THREE.Mesh(new THREE.BoxGeometry(z.w,.16,z.d),new THREE.MeshStandardMaterial({color:z.color,transparent:true,opacity:.22,roughness:1}));
 pad.position.y=.1;pad.userData=z;g.add(pad);
 const count=z.id==='01'?1:3;
 for(let i=0;i<count;i++){
  const bw=z.id==='01'?3.8:1.3+(i%2)*.55,bd=z.id==='01'?3.8:1.25+(i%2)*.4;
  addBuilding(g,z.x+(i-(count-1)/2)*1.65,z.z+(i%2-.5)*1.15,bw,bd,z.h*(.72+(i%3)*.16),z.id==='01'?0xf2eadb:z.color,i);
 }
 if(z.id==='01'){
  const dome=new THREE.Mesh(new THREE.SphereGeometry(1.45,32,18,0,Math.PI*2,0,Math.PI/2),new THREE.MeshStandardMaterial({color:0xfbbc04,roughness:.32,metalness:.18}));
  dome.position.set(z.x,z.h*.9+.5,z.z);dome.scale.y=.8;g.add(dome);
  const minaret=new THREE.Mesh(new THREE.CylinderGeometry(.12,.18,4.8,12),new THREE.MeshStandardMaterial({color:0xf8f1e5,roughness:.6}));
  minaret.position.set(z.x+1.8,2.45,z.z-.7);g.add(minaret);
 }
 return g;
}

export default function SpatialMapV2(){
 const mount=useRef(null),[selected,setSelected]=useState('01'),[view,setView]=useState('orbit'),[status,setStatus]=useState('LOADING');
 useEffect(()=>{
  const el=mount.current;if(!el)return;
  let raf;const scene=new THREE.Scene();scene.background=new THREE.Color(0xa9b9a1);
  scene.fog=new THREE.Fog(0xa9b9a1,48,95);
  const camera=new THREE.PerspectiveCamera(42,el.clientWidth/el.clientHeight,.1,180);
  camera.position.set(28,28,30);
  const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.setSize(el.clientWidth,el.clientHeight,false);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  el.appendChild(renderer.domElement);
  const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.065;controls.minDistance=12;controls.maxDistance=70;controls.maxPolarAngle=Math.PI*.49;controls.minPolarAngle=.25;controls.target.set(0,0,0);
  scene.add(new THREE.HemisphereLight(0xeaf4ff,0x36533d,2.4));
  const sun=new THREE.DirectionalLight(0xfff0cf,3.5);sun.position.set(-22,38,18);sun.castShadow=true;sun.shadow.mapSize.set(1536,1536);scene.add(sun);
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(64,64),new THREE.MeshStandardMaterial({color:0x718d68,roughness:1}));
  ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);

  const tex=new THREE.TextureLoader().load(BLUEPRINT,()=>setStatus('CORE BLUEPRINT LOADED'),()=>{},()=>setStatus('3D READY · BLUEPRINT REMOTE'));
  tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=4;
  const base=new THREE.Mesh(new THREE.PlaneGeometry(38,28),new THREE.MeshBasicMaterial({map:tex,transparent:true,opacity:.82,depthWrite:false}));
  base.rotation.x=-Math.PI/2;base.position.y=.035;base.renderOrder=1;scene.add(base);

  const roads=new THREE.Group();
  const roadMat=new THREE.MeshStandardMaterial({color:0xd7d1bf,roughness:.95});
  [[0,0,38,.8],[-9,0,30,.55],[9,0,30,.55],[0,-7,38,.42],[0,7,38,.42],[-14,-3,24,.32],[14,3,24,.32]].forEach(([x,z,l,w])=>{const r=new THREE.Mesh(new THREE.BoxGeometry(w,.08,l),roadMat);r.position.set(x,.12,z);r.receiveShadow=true;roads.add(r)});
  scene.add(roads);

  const zones=ZONES.map(z=>{const g=buildZone(z);g.position.set(0,0,0);g.traverse(o=>{o.userData=z});scene.add(g);return g});
  const landscape=new THREE.Group();
  for(let i=0;i<120;i++){
   const a=i*2.399,r=7+(i%13)*1.25,x=Math.cos(a)*r,z=Math.sin(a)*r*.74;
   if(Math.abs(x)<5&&Math.abs(z)<5)continue;
   const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.035,.065,.55,6),new THREE.MeshStandardMaterial({color:0x634a32}));
   const crown=new THREE.Mesh(new THREE.SphereGeometry(.22+(i%4)*.07,7,6),new THREE.MeshStandardMaterial({color:i%3===0?0x477f4c:0x2f7041,roughness:1}));
   trunk.position.set(x,.28,z);crown.position.set(x,.68,z);trunk.castShadow=crown.castShadow=true;landscape.add(trunk,crown);
  }
  scene.add(landscape);

  const flows=new THREE.Group();
  for(let i=0;i<18;i++){
   const p=new THREE.Mesh(new THREE.SphereGeometry(.075,8,8),new THREE.MeshBasicMaterial({color:i%4===0?0xfbbc04:0xffffff}));
   p.userData={t:i/18,s:.04+(i%4)*.008};flows.add(p);
  }scene.add(flows);

  const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();
  const onPick=e=>{const r=renderer.domElement.getBoundingClientRect();pointer.x=(e.clientX-r.left)/r.width*2-1;pointer.y=-(e.clientY-r.top)/r.height*2+1;ray.setFromCamera(pointer,camera);const hit=ray.intersectObjects(zones.flatMap(g=>g.children),true).find(h=>h.object.userData?.id);if(hit)setSelected(hit.object.userData.id)};
  renderer.domElement.addEventListener('pointerup',onPick);

  const setCamera=(next)=>{if(next==='top'){camera.position.set(0,44,.01);controls.maxPolarAngle=.15;controls.minPolarAngle=.05}else{camera.position.set(28,28,30);controls.maxPolarAngle=Math.PI*.49;controls.minPolarAngle=.25}controls.target.set(0,0,0);controls.update()};
  setCamera(view);setStatus('CORE BLUEPRINT LOADED');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,clock=new THREE.Clock();
  const animate=()=>{const t=clock.getElapsedTime();if(!reduced){flows.children.forEach((p,i)=>{const q=(t*p.userData.s+p.userData.t)%1;p.position.set(-15+30*q,.8+Math.sin(t*2+i)*.05,-7+14*((q+i*.17)%1));});landscape.rotation.y=Math.sin(t*.025)*.008}controls.update();renderer.render(scene,camera);raf=requestAnimationFrame(animate)};animate();
  const resize=()=>{camera.aspect=el.clientWidth/el.clientHeight;camera.updateProjectionMatrix();renderer.setSize(el.clientWidth,el.clientHeight,false)};const ro=new ResizeObserver(resize);ro.observe(el);
  return()=>{cancelAnimationFrame(raf);ro.disconnect();renderer.domElement.removeEventListener('pointerup',onPick);controls.dispose();renderer.dispose();tex.dispose();el.removeChild(renderer.domElement)}
 },[view]);
 const active=ZONES.find(z=>z.id===selected)||ZONES[0];
 return <section className="spatialV2" id="spatial-explorer">
  <div className="spatialV2Head"><div><span>LIVE SPATIAL EXPERIENCE · CORE SOURCE</span><h2>See the kawasan<br/><i>from above.</i></h2><p>Blueprint asli CORE menjadi base layer. Kamera, terrain, bangunan, landscape, jalan, dan activity flow ditambahkan sebagai spatial layers yang bisa dijelajahi.</p></div><div className="spatialV2Controls"><button className={view==='orbit'?'on':''} onClick={()=>setView('orbit')}>3D ORBIT</button><button className={view==='top'?'on':''} onClick={()=>setView('top')}>SATELLITE / TOP</button></div></div>
  <div className="spatialV2Frame"><div className="spatialV2Canvas" ref={mount}><div className="mapHud"><b>CORE BLUEPRINT</b><span>{status}</span></div><div className="north">N<br/><strong>↑</strong></div><div className="mapNote">CONCEPTUAL SPATIAL MODEL · NOT GEOGRAPHICALLY VERIFIED</div></div>
  <aside className="spatialV2Panel"><small>SELECTED AREA</small><h3>{active.name}</h3><p>Tap a zone on the model atau pilih layer untuk melihat hubungan kawasan.</p><div className="selectedTag" style={{borderColor:'#'+active.color.toString(16).padStart(6,'0')}}>ZONE {active.id}</div><div className="layerList">{ZONES.map(z=><button key={z.id} className={selected===z.id?'selected':''} onClick={()=>setSelected(z.id)}><i style={{background:'#'+z.color.toString(16).padStart(6,'0')}}/><span>{z.id}</span><b>{z.name}</b></button>)}</div></aside></div>
 </section>
}
