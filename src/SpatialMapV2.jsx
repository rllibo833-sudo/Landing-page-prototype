import React,{useEffect,useRef,useState} from 'react';
import './spatial-map-v2.css';

const BLUEPRINT='https://raw.githubusercontent.com/rllibo833-sudo/kawasan-masjid-core/main/IMG_20260921_131112.png';

// The CORE blueprint is the spatial source of truth. Coordinates are interaction anchors only; the artwork itself remains unchanged.

const POINTS=[
 {id:'01',name:'Masjid Utama',type:'PURPOSE',x:49.5,y:48},
 {id:'02',name:'Plaza Utama',type:'PURPOSE',x:49.5,y:38},
 {id:'03',name:'Taman & Ruang Hijau',type:'LIFE',x:35,y:46},
 {id:'04',name:'Perpustakaan',type:'KNOW',x:43,y:40},
 {id:'05',name:'Coffee Shop & Pusat Literasi',type:'KNOW',x:40,y:48},
 {id:'06',name:'Pusat Pendidikan',type:'KNOW',x:27,y:45},
 {id:'07',name:'Sport Center & Kesehatan',type:'LIFE',x:29,y:53},
 {id:'08',name:'Klinik & Rumah Sakit',type:'LIFE',x:36,y:57},
 {id:'09',name:'Asrama Santri',type:'KNOW',x:55,y:67},
 {id:'10',name:'Pusat Kuliner & UMKM',type:'ACT',x:63,y:59},
 {id:'11',name:'Masjid Kecil',type:'PURPOSE',x:52,y:57},
 {id:'12',name:'Perumahan Masyarakat',type:'PURPOSE',x:21,y:71},
 {id:'13',name:'Rumah Pengurus Inti',type:'PURPOSE',x:70,y:48},
 {id:'14',name:'Rusun Staf & Pengelola',type:'PURPOSE',x:71,y:57},
 {id:'15',name:'Hub Sepeda Listrik',type:'ACT',x:49,y:30},
 {id:'16',name:'Taman Rekreasi & Danau',type:'LIFE',x:23,y:27},
 {id:'17',name:'Pengelolaan Air & Danau Buatan',type:'LIFE',x:17,y:37},
 {id:'18',name:'Area Pertanian',type:'LIFE',x:49,y:10},
 {id:'19',name:'Peternakan',type:'LIFE',x:62,y:14},
 {id:'20',name:'Olahraga Panahan + Berkuda',type:'ACT',x:69,y:22},
 {id:'21',name:'Pertanian & Perkebunan',type:'LIFE',x:78,y:77},
 {id:'22',name:'Area Parkir',type:'ACT',x:41,y:79},
 {id:'23',name:'Pintu Utama',type:'ACT',x:49,y:86},
 {id:'24',name:'Jalan Lingkar Luar',type:'ACT',x:49,y:91},
 {id:'25',name:'Utilitas & Pengelolaan Sampah',type:'ACT',x:70,y:80}
];

const tone={LIFE:'#34a853',KNOW:'#4285f4',ACT:'#ea4335',PURPOSE:'#fbbc04'};
const ROLE={
 '01':{role:'Spiritual & civic center',desc:'Orientasi ibadah, komunitas, dan kehidupan kawasan.',lens:'MOSQUE-CENTERED LIFE'},
 '02':{role:'Gathering & public life',desc:'Ruang pertemuan yang menghubungkan masjid dengan aktivitas publik.',lens:'PUBLIC LIFE'},
 '03':{role:'Ecology & public life',desc:'Ruang hijau sebagai bagian dari kualitas hidup dan ekologi.',lens:'REGENERATIVE ECOLOGY'},
 '04':{role:'Knowledge infrastructure',desc:'Pengetahuan menjadi aset bersama yang dapat diwariskan.',lens:'KNOWLEDGE'},
 '05':{role:'Literacy & community',desc:'Tempat bertemu, belajar, berdiskusi, dan membangun koneksi.',lens:'COMMUNITY LEARNING'},
 '06':{role:'Human development',desc:'Pendidikan sebagai fondasi generasi dan kapasitas kawasan.',lens:'HUMAN DEVELOPMENT'},
 '07':{role:'Health & wellbeing',desc:'Aktivitas fisik dan kesehatan sebagai bagian dari kehidupan sehari-hari.',lens:'HEALTH'},
 '08':{role:'Healthcare access',desc:'Layanan kesehatan yang terhubung dengan komunitas.',lens:'HEALTH'},
 '09':{role:'Learning community',desc:'Hunian pendidikan yang mendukung pembentukan generasi.',lens:'EDUCATION'},
 '10':{role:'Local economy',desc:'Kuliner dan UMKM sebagai pintu masuk ekonomi lokal.',lens:'LOCAL ECONOMY'},
 '11':{role:'Daily worship',desc:'Masjid pendukung untuk aktivitas ibadah harian.',lens:'MOSQUE-CENTERED LIFE'},
 '12':{role:'Community housing',desc:'Hunian masyarakat sebagai bagian dari ekosistem, bukan sekadar blok rumah.',lens:'LIVING SYSTEM'},
 '13':{role:'Stewardship',desc:'Hunian pengurus untuk menjaga keberlangsungan pengelolaan.',lens:'GOVERNANCE'},
 '14':{role:'Operations',desc:'Hunian staf dan pengelola untuk mendukung operasi kawasan.',lens:'OPERATIONS'},
 '15':{role:'Clean mobility',desc:'Hub mobilitas untuk konektivitas yang lebih ringan dan ramah lingkungan.',lens:'MOBILITY'},
 '16':{role:'Recreation & ecology',desc:'Danau dan ruang rekreasi sebagai ruang hidup bersama.',lens:'REGENERATIVE ECOLOGY'},
 '17':{role:'Water resilience',desc:'Air sebagai infrastruktur ekologis dan ketahanan kawasan.',lens:'WATER SYSTEM'},
 '18':{role:'Food & learning',desc:'Pertanian sebagai sumber pangan sekaligus ruang belajar.',lens:'FOOD SYSTEM'},
 '19':{role:'Food & livelihood',desc:'Peternakan sebagai bagian dari pangan dan ekonomi produktif.',lens:'FOOD SYSTEM'},
 '20':{role:'Sport & tradition',desc:'Olahraga, pendidikan, dan aktivitas budaya dalam satu ruang.',lens:'HEALTH & CULTURE'},
 '21':{role:'Agriculture economy',desc:'Produksi pangan dan perkebunan untuk rantai nilai lokal.',lens:'LOCAL ECONOMY'},
 '22':{role:'Access & mobility',desc:'Parkir terpusat menjaga pusat kawasan tetap lebih ramah pejalan kaki.',lens:'MOBILITY'},
 '23':{role:'Gateway',desc:'Pintu masuk pertama menuju ekosistem kawasan.',lens:'DISCOVERY'},
 '24':{role:'Circulation',desc:'Ring road mengatur akses kendaraan di perimeter kawasan.',lens:'MOBILITY'},
 '25':{role:'Circular infrastructure',desc:'Utilitas dan sampah menjadi bagian dari sistem yang harus dikelola.',lens:'CIRCULAR INFRASTRUCTURE'}
};

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
 const zoneList=POINTS.map(p=>({...p,...ROLE[p.id]}));

 return <section className="spatialV2" id="spatial-explorer">
  <div className="spatialV2Head">
   <div>
    <span>CORE BLUEPRINT · MAP EXPLORER</span>
    <h2>Lihat kawasannya.<br/><i>Pahami sistemnya.</i></h2>
    <p>Di sini Anda melihat bentuk kawasan tanpa harus membaca seluruh legenda. Tap satu titik untuk membuka konteks; detail zona, data, dan pertanyaan riset ada di bawah sebagai lapisan terpisah.</p>
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
       <div className="blueprintMapCrop"><img src={BLUEPRINT} alt="Peta utama masterplan Kawasan Masjid 1.000 Ha" draggable="false"/></div>
       {POINTS.filter(p=>p.y<=77).map(p=>
        <button
         key={p.id}
         className={'mapPoint '+(selected?.id===p.id?'selected':'')}
         style={{left:p.x+'%',top:p.y+'%', '--point':tone[p.type]}}
         onClick={e=>{e.stopPropagation();setSelected(p)}}
         aria-label={p.name}
        >
         <i/>
         {selected?.id===p.id&&<span className="mapPopup"><b>{p.name}</b><small>{p.type} · exploration layer</small><strong>{ROLE[p.id]?.role}</strong><em>{ROLE[p.id]?.desc}</em><small className="mapLens">RESEARCH LENS · {ROLE[p.id]?.lens}</small></span>}
        </button>
       )}
      </div>
    </div>

    <div className="mapScale"><span>1.000 HA</span><i/></div>
    <div className="mapAttribution">CORE · MAP PRESENTATION</div>
   </div>
  </div>
  <div className="mapLegendSplit">
   <div><span>MAP</span><h3>Satu gambar untuk orientasi.</h3><p>Legenda, data kawasan, dan detail fasilitas sengaja dipisahkan agar peta tetap mudah dibaca di layar Android.</p></div>
   <div className="zoneDirectory">{zoneList.map(z=><button key={z.id} onClick={()=>setSelected(z)}><b>{z.id}</b><span>{z.name}</span><small>{z.lens}</small></button>)}</div>
  </div>
 </section>
}
