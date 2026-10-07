import React,{useEffect,useRef,useState} from 'react';
import './spatial-map-v2.css';

const BLUEPRINT='https://raw.githubusercontent.com/rllibo833-sudo/kawasan-masjid-core/main/IMG_20260921_131112.png';

const POINTS=[
 {id:'01',name:'Masjid Utama',type:'LIFE',x:51,y:48},
 {id:'02',name:'Plaza & Civil Life',type:'LIFE',x:55,y:39},
 {id:'03',name:'Library & Education',type:'KNOW',x:39,y:32},
 {id:'04',name:'Health & Community',type:'LIFE',x:31,y:42},
 {id:'05',name:'Culinary / UMKM',type:'ACT',x:67,y:39},
 {id:'06',name:'Agriculture',type:'LIFE',x:77,y:57},
 {id:'07',name:'Livestock',type:'LIFE',x:82,y:69},
 {id:'08',name:'Water & Ecology',type:'LIFE',x:67,y:73},
 {id:'09',name:'Energy & Utilities',type:'ACT',x:27,y:70},
 {id:'10',name:'Sports / Archery / Equestrian',type:'ACT',x:44,y:79},
 {id:'11',name:'Living & Housing',type:'PURPOSE',x:69,y:25},
 {id:'12',name:'E-bike / Mobility Hub',type:'KNOW',x:59,y:63}
];

const tone={LIFE:'#10b981',KNOW:'#4285f4',ACT:'#ea4335',PURPOSE:'#fbbc04'};

export default function SpatialMapV2(){
 const viewport=useRef(null);
 const [view,setView]=useState('map');
 const [zoom,setZoom]=useState(1);
 const [pan,setPan]=useState({x:0,y:0});
 const [selected,setSelected]=useState(POINTS[0]);
 const drag=useRef(null);

 useEffect(()=>{
  const el=viewport.current;if(!el)return;
  const onWheel=e=>{e.preventDefault();setZoom(z=>Math.min(2.8,Math.max(.75,z+(e.deltaY<0?.12:-.12))))};
  el.addEventListener('wheel',onWheel,{passive:false});
  return()=>el.removeEventListener('wheel',onWheel);
 },[]);

 const pointerDown=e=>{drag.current={x:e.clientX,y:e.clientY,px:pan.x,py:pan.y};e.currentTarget.setPointerCapture?.(e.pointerId)};
 const pointerMove=e=>{if(!drag.current)return;setPan({x:drag.current.px+e.clientX-drag.current.x,y:drag.current.py+e.clientY-drag.current.y})};
 const pointerUp=()=>{drag.current=null};
 const reset=()=>{setZoom(1);setPan({x:0,y:0})};
 const transform=view==='bird'
   ? `translate(calc(-50% + ${pan.x}px),calc(-50% + ${pan.y}px)) scale(${zoom}) perspective(1100px) rotateX(48deg)`
   : `translate(calc(-50% + ${pan.x}px),calc(-50% + ${pan.y}px)) scale(${zoom})`;

 return <section className="spatialV2" id="spatial-explorer">
  <div className="spatialV2Head">
   <div><span>CORE BLUEPRINT · IMMERSIVE SPATIAL VIEW</span><h2>Jelajahi kawasan<br/><i>seperti peta.</i></h2><p>PNG blueprint dari CORE menjadi <b>base layer yang tidak diubah</b>. Pengalaman di atasnya menambahkan zoom, pan, marker, animasi alur, dan bird's-eye view tanpa mengarang ulang layout kawasan.</p></div>
   <div className="spatialV2Controls"><button className={view==='map'?'on':''} onClick={()=>setView('map')}>MAP</button><button className={view==='bird'?'on':''} onClick={()=>setView('bird')}>BIRD'S-EYE</button></div>
  </div>

  <div className="spatialV2Frame">
   <div className="spatialV2Canvas">
    <div className="mapToolbar">
      <div className="mapSearch"><span>⌕</span><b>Explore kawasan</b></div>
      <div className="mapTools"><button onClick={()=>setZoom(z=>Math.min(2.8,z+.2))}>+</button><button onClick={()=>setZoom(z=>Math.max(.75,z-.2)}>−</button><button onClick={reset}>↺</button></div>
    </div>
    <div className="mapHud"><b>BLUEPRINT SOURCE</b><span>CORE · LIVE IMAGE</span></div>
    <div className="north">N<strong>↑</strong></div>
    <div className="blueprintViewport" ref={viewport} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
      <div className="blueprintLayer" style={{transform}}>
        <img src={BLUEPRINT} alt="Blueprint Kawasan Masjid 1.000 Ha dari CORE" draggable="false"/>
        <svg className="flowOverlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M51 48 C57 43 61 39 67 39 C72 45 75 53 77 57 C80 62 81 67 82 69" pathLength="1"/>
          <path d="M51 48 C47 42 43 36 39 32 C35 35 32 39 31 42 C28 51 27 62 27 70" pathLength="1"/>
          <path d="M51 48 C55 55 57 59 59 63 C54 70 49 76 44 79" pathLength="1"/>
        </svg>
        {POINTS.map(p=><button key={p.id} className={'mapPoint '+(selected.id===p.id?'selected':'')} style={{left:p.x+'%',top:p.y+'%', '--point':tone[p.type]}} onClick={e=>{e.stopPropagation();setSelected(p)}} aria-label={p.name}><i/><span>{p.id}</span><b>{p.name}</b></button>)}
      </div>
    </div>
    <div className="mapScale"><span>1000 HA</span><i/></div>
    <div className="mapAttribution">KAWASAN MASJID · CONCEPTUAL MASTERPLAN · BLUEPRINT IS SOURCE OF TRUTH</div>
   </div>

   <aside className="spatialV2Panel">
    <div className="panelKicker">SELECTED POINT</div>
    <div className="selectedNumber" style={{background:tone[selected.type]}}>{selected.id}</div>
    <h3>{selected.name}</h3>
    <span className="selectedType" style={{color:tone[selected.type]}}>{selected.type} · EXPLORATION LAYER</span>
    <p>Marker adalah lapisan interaksi untuk membantu membaca blueprint. Bentuk dan posisi masterplan tetap mengikuti PNG sumber.</p>
    <div className="mapLegend"><b>MAP LAYERS</b>{Object.entries(tone).map(([k,c])=><span key={k}><i style={{background:c}}/>{k}</span>)}</div>
    <div className="pointList">{POINTS.map(p=><button key={p.id} className={selected.id===p.id?'selected':''} onClick={()=>setSelected(p)}><i style={{background:tone[p.type]}}/><span>{p.id}</span><b>{p.name}</b></button>)}</div>
   </aside>
  </div>
 </section>
}
