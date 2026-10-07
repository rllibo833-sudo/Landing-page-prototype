import React,{useEffect,useRef,useState} from 'react';
import './spatial-map-v2.css';

const BLUEPRINT='https://raw.githubusercontent.com/rllibo833-sudo/kawasan-masjid-core/main/IMG_20260921_131112.png';

const POINTS=[
 {id:'01',name:'Masjid Utama',type:'LIFE',x:50,y:49},
 {id:'02',name:'Plaza & Civil Life',type:'LIFE',x:50,y:40},
 {id:'03',name:'Education / Library',type:'KNOW',x:50,y:27},
 {id:'04',name:'Health & Community',type:'LIFE',x:31,y:43},
 {id:'05',name:'Culinary / UMKM',type:'ACT',x:69,y:42},
 {id:'06',name:'Agriculture / Hydroponic',type:'LIFE',x:73,y:72},
 {id:'07',name:'Livestock',type:'LIFE',x:83,y:62},
 {id:'08',name:'Water & Ecology',type:'LIFE',x:23,y:27},
 {id:'09',name:'Energy / Waste Utilities',type:'ACT',x:77,y:79},
 {id:'10',name:'Sports / Archery / Equestrian',type:'ACT',x:67,y:20},
 {id:'11',name:'Living & Housing',type:'PURPOSE',x:34,y:63},
 {id:'12',name:'Mobility / Parking Hub',type:'KNOW',x:50,y:84}
];

const tone={LIFE:'#34a853',KNOW:'#4285f4',ACT:'#ea4335',PURPOSE:'#fbbc04'};

export default function SpatialMapV2(){
 const viewport=useRef(null);
 const [view,setView]=useState('map');
 const [zoom,setZoom]=useState(1);
 const [pan,setPan]=useState({x:0,y:0});
 const [selected,setSelected]=useState(null);
 const drag=useRef(null);

 useEffect(()=>{
  const el=viewport.current;if(!el)return;
  const onWheel=e=>{
   e.preventDefault();
   setZoom(z=>Math.min(3.5,Math.max(.7,z+(e.deltaY<0?.12:-.12))));
  };
  el.addEventListener('wheel',onWheel,{passive:false});
  return()=>el.removeEventListener('wheel',onWheel);
 },[]);

 const pointerDown=e=>{
  drag.current={x:e.clientX,y:e.clientY,px:pan.x,py:pan.y};
  e.currentTarget.setPointerCapture?.(e.pointerId);
 };
 const pointerMove=e=>{
  if(!drag.current)return;
  setPan({x:drag.current.px+e.clientX-drag.current.x,y:drag.current.py+e.clientY-drag.current.y});
 };
 const pointerUp=()=>{drag.current=null};
 const reset=()=>{setZoom(1);setPan({x:0,y:0});setSelected(null)};

 const transform=view==='bird'
  ? `translate(calc(-50% + ${pan.x}px),calc(-50% + ${pan.y}px)) scale(${zoom}) perspective(1100px) rotateX(48deg)`
  : `translate(calc(-50% + ${pan.x}px),calc(-50% + ${pan.y}px)) scale(${zoom})`;

 return <section className="spatialV2" id="spatial-explorer">
  <div className="spatialV2Head">
   <div>
    <span>CORE BLUEPRINT · INTERACTIVE MAP</span>
    <h2>Jelajahi kawasan<br/><i>seperti peta.</i></h2>
    <p>Blueprint CORE menjadi base layer. Zoom, pan, marker, dan bird's-eye view hanya menambahkan interaksi tanpa mengubah geometri sumber.</p>
   </div>
   <div className="spatialV2Controls">
    <button className={view==='map'?'on':''} onClick={()=>setView('map')}>MAP</button>
    <button className={view==='bird'?'on':''} onClick={()=>setView('bird')}>BIRD'S-EYE</button>
   </div>
  </div>

  <div className="spatialV2Frame">
   <div className="spatialV2Canvas">
    <div className="mapToolbar">
      <div className="mapSearch"><span>⌕</span><b>Kawasan Masjid</b></div>
      <div className="mapTools">
       <button aria-label="Zoom in" onClick={()=>setZoom(z=>Math.min(3.5,z+.2))}>+</button>
       <button aria-label="Zoom out" onClick={()=>setZoom(z=>Math.max(.7,z-.2))}>−</button>
       <button aria-label="Reset map" onClick={reset}>↺</button>
      </div>
    </div>

    <div className="north">N<strong>↑</strong></div>

    <div
      className="blueprintViewport"
      ref={viewport}
      onPointerDown={pointerDown}
      onPointerMove={pointerMove}
      onPointerUp={pointerUp}
      onPointerCancel={pointerUp}
    >
      <div className="blueprintLayer" style={{transform}}>
       <img src={BLUEPRINT} alt="Blueprint Kawasan Masjid 1.000 Ha dari CORE" draggable="false"/>
       {POINTS.map(p=>
        <button
         key={p.id}
         className={'mapPoint '+(selected?.id===p.id?'selected':'')}
         style={{left:p.x+'%',top:p.y+'%', '--point':tone[p.type]}}
         onClick={e=>{e.stopPropagation();setSelected(p)}}
         aria-label={p.name}
        >
         <i/>
         {selected?.id===p.id&&<span className="mapPopup"><b>{p.name}</b><small>{p.type} · exploration layer</small></span>}
        </button>
       )}
      </div>
    </div>

    <div className="mapScale"><span>1.000 HA</span><i/></div>
    <div className="mapAttribution">CORE · MASTER BLUEPRINT</div>
   </div>
  </div>
 </section>
}
