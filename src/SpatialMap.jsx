import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './spatial-map.css';

const BLUEPRINT='https://raw.githubusercontent.com/rllibo833-sudo/kawasan-masjid-core/main/IMG_20260921_131112.png';

const ZONES=[
  {id:'01',name:'Masjid & Civil Life',x:0,z:0,h:3.8,c:0xfbbc04},
  {id:'02',name:'Education & Research',x:-7,z:-5,h:1.9,c:0x4285f4},
  {id:'03',name:'Food & Agriculture',x:8,z:-5,h:1.5,c:0x10b981},
  {id:'04',name:'Water & Ecology',x:10,z:5,h:.9,c:0x22c7d6},
  {id:'05',name:'Energy & Utilities',x:-9,z:6,h:1.3,c:0xea4335},
  {id:'06',name:'Local Economy',x:3,z:8,h:2.2,c:0xff6b57},
  {id:'07',name:'Digital Ecosystem',x:-2,z:-10,h:2.6,c:0x8b5cf6},
  {id:'08',name:'Living & Public Space',x:-12,z:-1,h:1.1,c:0xffb020}
];

function makeZone(zone){
  const g=new THREE.Group();
  g.position.set(zone.x,0,zone.z);
  const size=zone.id==='01'?3.2:2.7;
  const base=new THREE.Mesh(
    new THREE.BoxGeometry(size,.35,size),
    new THREE.MeshStandardMaterial({color:zone.c,roughness:.82,metalness:.04,transparent:true,opacity:.78})
  );
  base.position.y=.18;
  base.userData=zone;
  g.add(base);

  const tower=new THREE.Mesh(
    new THREE.CylinderGeometry(zone.id==='01'?1.05:.42,zone.id==='01'?1.35:.72,zone.h,10),
    new THREE.MeshStandardMaterial({color:zone.id==='01'?0xf7f1df:zone.c,roughness:.68,metalness:.05})
  );
  tower.position.y=zone.h/2+.34;
  tower.userData=zone;
  g.add(tower);

  if(zone.id==='01'){
    const dome=new THREE.Mesh(new THREE.SphereGeometry(1.22,20,12,0,Math.PI*2,0,Math.PI/2),
      new THREE.MeshStandardMaterial({color:0xfbbc04,roughness:.4,metalness:.18}));
    dome.position.y=zone.h+.38;
    dome.scale.y=.82;
    dome.userData=zone;
    g.add(dome);
    const minaret=new THREE.Mesh(new THREE.CylinderGeometry(.13,.18,3.4,10),
      new THREE.MeshStandardMaterial({color:0xf4ead5,roughness:.62}));
    minaret.position.set(1.25,1.7,-.3);
    minaret.userData=zone;
    g.add(minaret);
  }
  return g;
}

export default function SpatialMap(){
  const mount=useRef(null);
  const [selected,setSelected]=useState('01');
  const [ready,setReady]=useState(false);
  const [mode,setMode]=useState('orbit');

  useEffect(()=>{
    const el=mount.current;
    if(!el) return;
    let renderer,frameId;
    const scene=new THREE.Scene();
    scene.background=new THREE.Color(0x9eb38f);
    scene.fog=new THREE.Fog(0x9eb38f,34,72);
    const camera=new THREE.PerspectiveCamera(46,el.clientWidth/el.clientHeight,.1,180);
    camera.position.set(24,24,27);

    try{
      renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance',alpha:false});
    }catch{
      setReady(false);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6));
    renderer.setSize(el.clientWidth,el.clientHeight,false);
    renderer.shadowMap.enabled=true;
    renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);

    const controls=new OrbitControls(camera,renderer.domElement);
    controls.enableDamping=true;
    controls.dampingFactor=.075;
    controls.minDistance=13;
    controls.maxDistance=55;
    controls.maxPolarAngle=Math.PI*.47;
    controls.minPolarAngle=.48;
    controls.target.set(0,0,0);

    const hemi=new THREE.HemisphereLight(0xeaf4ff,0x314d39,2.25);
    scene.add(hemi);
    const sun=new THREE.DirectionalLight(0xfff2cf,3.2);
    sun.position.set(-15,28,10);
    sun.castShadow=true;
    sun.shadow.mapSize.set(1024,1024);
    scene.add(sun);

    const ground=new THREE.Mesh(
      new THREE.PlaneGeometry(54,54),
      new THREE.MeshStandardMaterial({color:0x6f8f65,roughness:1,metalness:0})
    );
    ground.rotation.x=-Math.PI/2;
    ground.receiveShadow=true;
    scene.add(ground);

    const texture=new THREE.TextureLoader().load(BLUEPRINT,()=>setReady(true),undefined,()=>setReady(true));
    texture.colorSpace=THREE.SRGBColorSpace;
    texture.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),4);
    const mapPlane=new THREE.Mesh(
      new THREE.PlaneGeometry(34,25),
      new THREE.MeshStandardMaterial({map:texture,transparent:true,opacity:.86,roughness:1,metalness:0})
    );
    mapPlane.rotation.x=-Math.PI/2;
    mapPlane.position.y=.025;
    mapPlane.renderOrder=2;
    scene.add(mapPlane);

    const grid=new THREE.GridHelper(52,26,0xd9ead0,0xb4c9a8);
    grid.position.y=.04;
    grid.material.opacity=.22;
    grid.material.transparent=true;
    scene.add(grid);

    const roads=[];
    const roadMat=new THREE.MeshStandardMaterial({color:0xc7c1ad,roughness:.95});
    [[0,0,25,.62],[-8,0,20,.38],[8,0,20,.38],[0,-7,25,.32],[0,7,25,.32]].forEach(([x,z,len,w])=>{
      const road=new THREE.Mesh(new THREE.BoxGeometry(w,.06,len),roadMat);
      road.position.set(x,.09,z);
      roads.push(road);scene.add(road);
    });

    const trees=new THREE.Group();
    for(let i=0;i<72;i++){
      const a=(i*2.399)%Math.PI*2;
      const r=6+(i%9)*1.55;
      const x=Math.cos(a)*r, z=Math.sin(a)*r*.78;
      if(Math.abs(x)<4&&Math.abs(z)<4) continue;
      const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.045,.07,.55,6),new THREE.MeshStandardMaterial({color:0x5c4632}));
      const crown=new THREE.Mesh(new THREE.SphereGeometry(.32+(i%3)*.08,7,6),new THREE.MeshStandardMaterial({color:i%2?0x2e6f43:0x3e814d,roughness:1}));
      trunk.position.set(x,.3,z); crown.position.set(x,.7,z);
      trunk.castShadow=true;crown.castShadow=true;
      trees.add(trunk,crown);
    }
    scene.add(trees);

    const zones=ZONES.map(z=>{const g=makeZone(z);g.traverse(o=>{if(o.isMesh)o.castShadow=true});scene.add(g);return g});
    const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();
    const selectAt=(event)=>{
      const rect=renderer.domElement.getBoundingClientRect();
      pointer.x=((event.clientX-rect.left)/rect.width)*2-1;
      pointer.y=-((event.clientY-rect.top)/rect.height)*2+1;
      raycaster.setFromCamera(pointer,camera);
      const hits=raycaster.intersectObjects(zones.flatMap(g=>g.children),false);
      if(hits[0]?.object?.userData?.id)setSelected(hits[0].object.userData.id);
    };
    renderer.domElement.addEventListener('pointerup',selectAt);

    const particles=[];
    for(let i=0;i<26;i++){
      const m=new THREE.Mesh(new THREE.SphereGeometry(.055,7,7),new THREE.MeshBasicMaterial({color:0xffffff}));
      m.position.set((i%7-3)*2.7,.8,((i*1.9)%18)-9);
      m.userData.speed=.12+(i%5)*.035;
      scene.add(m);particles.push(m);
    }

    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clock=new THREE.Clock();
    const animate=()=>{
      const t=clock.getElapsedTime();
      if(!reduced && mode==='orbit'){
        particles.forEach((p,i)=>{p.position.x+=p.userData.speed*.018;if(p.position.x>18)p.position.x=-18;p.position.y=.65+Math.sin(t*1.5+i)*.06});
        trees.rotation.y=Math.sin(t*.025)*.012;
      }
      controls.update();
      renderer.render(scene,camera);
      frameId=requestAnimationFrame(animate);
    };
    animate();

    const resize=()=>{
      const w=el.clientWidth,h=el.clientHeight;
      camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);
    };
    const ro=new ResizeObserver(resize);ro.observe(el);
    setReady(true);

    return()=>{cancelAnimationFrame(frameId);ro.disconnect();renderer.domElement.removeEventListener('pointerup',selectAt);controls.dispose();renderer.dispose();texture.dispose();el.removeChild(renderer.domElement)};
  },[mode]);

  const focus=(zone)=>{
    setSelected(zone.id);
    if(mode!=='orbit')setMode('orbit');
  };

  const active=ZONES.find(z=>z.id===selected)||ZONES[0];
  return <section className="spatialMapSection" id="spatial-explorer">
    <div className="spatialHeader">
      <div><span className="spatialEyebrow">LIVE SPATIAL MODEL · CORE BLUEPRINT</span><h2>Explore the kawasan<br/><i>as a place, not a diagram.</i></h2><p>Blueprint CORE menjadi lapisan referensi. Viewer ini menerjemahkannya menjadi terrain, massa 3D, landscape, kamera orbit, dan aktivitas bergerak.</p></div>
      <div className="spatialModes" role="group" aria-label="Spatial view mode">
        <button className={mode==='orbit'?'active':''} onClick={()=>setMode('orbit')}>3D ORBIT</button>
        <button className={mode==='top'?'active':''} onClick={()=>setMode('top')}>TOP VIEW</button>
      </div>
    </div>
    <div className="spatialShell">
      <div className="spatialCanvas" ref={mount}>
        {!ready&&<div className="spatialLoader"><span>LOADING SPATIAL MODEL</span><b>Reading CORE blueprint…</b></div>}
        <div className="spatialCompass">N<span>↑</span></div>
        <div className="spatialScale">SPATIAL MODEL · NOT GEOGRAPHICALLY VERIFIED</div>
      </div>
      <aside className="spatialPanel">
        <span className="spatialEyebrow">LAYER INSPECTOR</span>
        <div className="spatialStatus"><span className="liveDot"/> LIVE MOTION · WEBGL</div>
        <h3>{active.name}</h3>
        <p>Interactive zone. Pilih node untuk melihat bagaimana area ini menjadi bagian dari jaringan kawasan.</p>
        <button className="spatialFocus" onClick={()=>focus(active)}>FOCUS ZONE <span>↗</span></button>
        <div className="spatialLegend">{ZONES.map(z=><button key={z.id} className={selected===z.id?'selected':''} onClick={()=>focus(z)}><i style={{background:'#'+z.c.toString(16).padStart(6,'0')}}/><span>{z.id}</span><b>{z.name}</b></button>)}</div>
      </aside>
    </div>
  </section>;
}
