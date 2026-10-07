import React, { Component, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ArrowUpRight, Menu, X, Compass, Users, ShieldCheck, Search, BookOpen, Network, Layers3, Sparkles, Map, FlaskConical } from 'lucide-react';
import './styles.css';

const REPO='https://github.com/rllibo833-sudo/kawasan-masjid-core';
const MEMORY='https://github.com/rllibo833-sudo/Founder-OS';
const EMAIL='mailto:fadlibo833@gmail.com?subject=Kawasan%20Masjid%20%E2%80%94%20Peluang%20atau%20Kebutuhan';
const BASE='/kawasan-masjid-public/';
const links=[['vision.html','Visi'],['ecosystem.html','Ekosistem'],['system.html','Cara Kerja'],['research.html','Riset'],['collaborate.html','Kolaborasi'],['about.html','Tentang']];
const systems=[
 {id:'01',name:'Masjid & Civil Life',short:'Orientasi kehidupan',tone:'gold',desc:'Ibadah, layanan sosial, komunitas, dan ruang berkumpul.',icon:Compass},
 {id:'02',name:'Education & Research',short:'Knowledge engine',tone:'blue',desc:'Pendidikan, riset, eksperimen, dan transfer pengetahuan.',icon:BookOpen},
 {id:'03',name:'Food & Agriculture',short:'Food system',tone:'green',desc:'Pangan, produksi, distribusi, dan ekonomi lokal.',icon:Layers3},
 {id:'04',name:'Water & Ecology',short:'Living ecology',tone:'aqua',desc:'Air, lanskap, biodiversitas, dan daya dukung lingkungan.',icon:Sparkles},
 {id:'05',name:'Energy & Utilities',short:'Infrastructure',tone:'amber',desc:'Energi, limbah, utilitas, dan ketahanan kawasan.',icon:FlaskConical},
 {id:'06',name:'Local Economy',short:'Value engine',tone:'coral',desc:'Usaha, pekerjaan, transaksi, dan sirkulasi nilai.',icon:Users},
 {id:'07',name:'Digital Ecosystem',short:'Coordination layer',tone:'violet',desc:'Data, tools, AI, coordination, evidence, dan access.',icon:Network},
 {id:'08',name:'Living & Public Space',short:'Human habitat',tone:'rose',desc:'Hunian, pedestrian, ruang publik, budaya, dan aktivitas.',icon:Map},
];

class AppErrorBoundary extends Component{
 constructor(p){super(p);this.state={hasError:false}}
 static getDerivedStateFromError(){return {hasError:true}}
 render(){return this.state.hasError?<main className="runtimeFallback"><div><span>KAWASAN MASJID 1.000 HA</span><h1>Tampilan sedang memulihkan diri.</h1><p>Muat ulang halaman atau kembali ke beranda.</p><a className="button buttonGold" href={BASE}>Kembali <ArrowRight/></a></div></main>:this.props.children}
}

function Header(){
 const [open,setOpen]=useState(false);
 const current=window.location.pathname.split('/').pop()||'index.html';
 return <header className="header">
  <a className="brand" href={BASE} onClick={()=>setOpen(false)}><span className="brandMark">KM</span><span><strong>KAWASAN MASJID</strong><small>1.000 HA · ISLAMIC ECO-CITY</small></span></a>
  <button className="mobileMenu" aria-label="Menu" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
  <nav className={open?'nav navOpen':'nav'}>
   {links.map(([file,label])=><a key={file} className={current===file?'activeNav':''} href={BASE+file} onClick={()=>setOpen(false)}>{label}</a>)}
   <a href={MEMORY} target="_blank" rel="noreferrer">Founder-OS <ArrowUpRight/></a>
   <a className="navAction" href={BASE+'collaborate.html'} onClick={()=>setOpen(false)}>Masuk ke ekosistem <ArrowRight/></a>
  </nav>
 </header>
}

function Footer(){return <footer className="footer"><div><strong>KAWASAN MASJID 1.000 HA</strong><p>Fondasi digital pertama menuju visi jangka panjang Islamic Eco-City.</p></div><div className="footerLinks"><a href={REPO}>CORE Engine <ArrowUpRight/></a><a href={MEMORY}>Founder-OS <ArrowUpRight/></a><a href={EMAIL}>Hubungi Founder <ArrowUpRight/></a></div><div className="footerBottom"><span>Open Project · 2026</span><span>No Proof, No Claim.</span></div></footer>}
function Shell({children}){return <div className="site"><Header/>{children}<Footer/></div>}
function Eyebrow({children,light=false}){return <div className={light?'eyebrow light':'eyebrow'}>{children}</div>}
function Button({href,children,gold=false}){return <a className={gold?'button buttonGold':'button buttonOutline'} href={href}>{children}<ArrowRight/></a>}

function HeroVisual(){
 return <div className="heroVisual heroVisualImage" aria-label="Masjid dan ruang hijau sebagai orientasi ekosistem">
  <img className="heroPhoto" src="https://images.unsplash.com/photo-1754437958764-54d0837f254e?auto=format&fit=crop&fm=jpg&q=82&w=1800" alt="Arsitektur masjid Indonesia dengan pola geometris dan cahaya hangat" />
  <div className="heroPhotoShade"/>
  <div className="imageLabel labelTop"><span>01</span><b>ORIENTATION POINT</b><small>Masjid sebagai jantung</small></div>
  <div className="imageLabel labelMid"><span>02</span><b>LIVING SYSTEM</b><small>Nature · people · knowledge</small></div>
  <div className="imageLabel labelBottom"><span>03</span><b>FUTURE LAYER</b><small>Digital → evidence → action</small></div>
  <div className="imagePulse pulseA"/><div className="imagePulse pulseB"/>
  <div className="visualCaption"><span>VISUAL REFERENCE · UNSPLASH</span><b>THE MOSQUE IS THE STARTING POINT</b></div>
 </div>
}

function Home(){
 const [selected,setSelected]=useState(null);
 return <main>
  <section className="heroV2">
   <div className="heroBackdrop"/>
   <div className="heroGrid"/>
   <div className="heroCopy"><Eyebrow light>OPEN PROJECT · LONG-TERM VISION</Eyebrow><h1>Where a <em>mosque</em> becomes the heart of a living ecosystem.</h1><p>Kawasan Masjid 1.000 Ha adalah visi jangka panjang. Fondasi pertamanya dibangun secara digital — menghubungkan manusia, pengetahuan, kebutuhan, riset, ekonomi, dan peluang sebelum kawasan fisik diwujudkan.</p><div className="heroButtons"><Button gold href={BASE+'ecosystem.html'}>Jelajahi ekosistem</Button><Button href={BASE+'vision.html'}>Lihat visi</Button></div><div className="heroFacts"><span><b>1.000</b> HA VISION</span><span><b>08</b> SYSTEMS</span><span><b>01</b> DIRECTION</span></div></div>
   <HeroVisual/>
   <div className="scrollCue">SCROLL TO EXPLORE <span>↓</span></div>
  </section>

  <section className="statement reveal"><div><Eyebrow>THE IDEA</Eyebrow><h2>Bukan sekadar membangun tempat. <i>Kita membangun hubungan antar-kehidupan.</i></h2></div><p>Masjid, pendidikan, pangan, air, energi, ekonomi, teknologi, hunian, dan ruang publik dirancang sebagai satu jaringan. Digital menjadi lapisan pertama untuk menemukan apa yang benar-benar berguna.</p></section>

  <section className="ecosystemShowcase reveal">
   <div className="sectionTop"><div><Eyebrow>01 / THE ECOSYSTEM</Eyebrow><h2>Delapan sistem.<br/><i>Satu kawasan.</i></h2></div><p>Pilih satu titik. Lihat apa fungsinya, apa yang sedang dipelajari, dan dengan sistem mana ia terhubung.</p></div>
   <div className="systemExplorer">
    <div className="systemList">{systems.map((s,i)=>{const I=s.icon;return <button key={s.id} className={'systemRow '+(selected===i?'selected':'')} onClick={()=>setSelected(i)}><span>{s.id}</span><I/><div><b>{s.name}</b><small>{s.short}</small></div><ArrowRight/></button>})}</div>
    <div className="systemStage">{selected===null?<><div className="stageMap"><div className="stageCenter">MASJID<span>orientation point</span></div>{systems.map((s,i)=><button key={s.id} style={{'--i':i}} onClick={()=>setSelected(i)} className="stageDot"><span>{s.id}</span></button>)}</div><p><b>Explore the network.</b> Setiap sistem membuka cerita yang berbeda — dan tetap terhubung dengan yang lain.</p></>:<div className="selectedStage"><div className={'stageBadge '+systems[selected].tone}>{systems[selected].id}</div><h3>{systems[selected].name}</h3><span>{systems[selected].short}</span><p>{systems[selected].desc}</p><div className="stageMeta"><span>ROLE<br/><b>CONNECTED SYSTEM</b></span><span>STATUS<br/><b>EXPLORING</b></span></div><a href={BASE+'ecosystem.html'}>Open system <ArrowRight/></a></div>}</div>
   </div>
  </section>

  <section className="visualBand reveal"><div className="visualBandArt"><div className="sun"/><div className="land l1"/><div className="land l2"/><div className="land l3"/><div className="mosqueSilhouette"><span/></div></div><div className="visualBandCopy"><Eyebrow light>02 / WHY DIGITAL FIRST</Eyebrow><h2>Bangun sistemnya.<br/><i>Uji nilainya.</i></h2><p>Belum ada klaim kawasan fisik, customer, partner, atau revenue. Yang sedang dibangun adalah fondasi yang memungkinkan semuanya diuji dengan lebih disiplin.</p><Button gold href={BASE+'system.html'}>Lihat cara kerjanya</Button></div></section>

  <section className="researchTeaser reveal"><div className="sectionTop"><div><Eyebrow>03 / RESEARCH</Eyebrow><h2>Ide yang bisa <i>ditinjau.</i></h2></div><a className="textLink" href={BASE+'research.html'}>Buka research library <ArrowUpRight/></a></div><div className="researchGrid"><article className="researchCard large"><div className="researchArt artEnergy"><span>01</span><b>WASTE → ENERGY</b></div><div><small>EXPERIMENT · ENERGY SYSTEM</small><h3>Bagaimana limbah dapat berubah menjadi bagian dari infrastruktur energi?</h3><a href={BASE+'research.html'}>Explore evidence <ArrowRight/></a></div></article><article className="researchCard"><div className="researchArt artDigital"><span>02</span><b>DIGITAL COMMUNITY</b></div><div><small>RESEARCH · DIGITAL SYSTEM</small><h3>Bagaimana kebutuhan nyata bisa menemukan kemampuan yang tepat?</h3><a href={BASE+'research.html'}>Explore research <ArrowRight/></a></div></article><article className="researchCard"><div className="researchArt artFood"><span>03</span><b>FOOD SYSTEM</b></div><div><small>BLUEPRINT · FOOD SYSTEM</small><h3>Bagaimana pangan dapat menjadi bagian dari ekonomi lokal?</h3><a href={BASE+'research.html'}>Explore blueprint <ArrowRight/></a></div></article></div></section>

  <section className="returnSection reveal"><div className="returnOrb"/><Eyebrow light>THE DOOR IS OPEN</Eyebrow><h2>Datang karena penasaran.<br/><i>Kembali karena menemukan sesuatu.</i></h2><p>Temukan visi, telusuri sistem, baca riset, lalu masuk ketika Anda punya kebutuhan atau kontribusi yang nyata.</p><div><Button gold href={BASE+'collaborate.html'}>Masuk ke ekosistem</Button><Button href={BASE+'about.html'}>Kenali project</Button></div></section>
 </main>
}

function Inner({type,title,lead,children}){return <main><section className="innerHero"><Eyebrow light>{type}</Eyebrow><h1>{title}</h1><p>{lead}</p></section>{children}</main>}
function Vision(){return <Inner type="01 / VISION" title="Visi besar dimulai dari fondasi yang dapat dibuktikan." lead="Kawasan Masjid 1.000 Ha adalah tujuan fisik jangka panjang. Tahap pertama adalah membangun ekosistem digital yang mampu menarik manusia, pengetahuan, kebutuhan, dan peluang."><section className="contentSection split"><div><Eyebrow>THE NORTH STAR</Eyebrow><h2>Masjid sebagai orientasi.<br/><i>Kawasan sebagai ekosistem.</i></h2></div><div className="prose"><p>Visi ini menghubungkan ibadah, pendidikan, pangan, air, energi, ekonomi, teknologi, hunian, dan ruang publik dalam satu arah.</p><p>Fisik dibangun bertahap setelah sistem, kebutuhan, dan evidence cukup kuat. Digital bukan pengganti kawasan — digital adalah fondasi awalnya.</p></div></section><section className="darkPanel"><Eyebrow light>FOUR PRINCIPLES</Eyebrow><div className="principles">{['No Proof, No Claim','Digital first','Human first','Phased'].map((x,i)=><div key={x}><span>0{i+1}</span><h3>{x}</h3><p>Prinsip yang menjaga project tetap jujur, bertahap, dan dekat dengan kebutuhan nyata.</p></div>)}</div></section></Inner>}
function Ecosystem(){return <Inner type="02 / ECOSYSTEM" title="Delapan sistem yang saling menguatkan." lead="Kawasan dipahami sebagai jaringan kehidupan, bukan delapan proyek yang berdiri sendiri."><section className="contentSection"><div className="fullHeading"><Eyebrow>CONNECTED SYSTEMS</Eyebrow><h2>Pilih satu sistem.<br/><i>Lihat hubungan yang lebih besar.</i></h2></div><div className="deepSystemGrid">{systems.map(s=>{const I=s.icon;return <a key={s.id} href={BASE+'research.html'} className="deepSystemCard"><span>{s.id}</span><I/><h3>{s.name}</h3><p>{s.desc}</p><b>Explore →</b></a>})}</div></section></Inner>}
function System(){return <Inner type="03 / SYSTEM" title="Sebuah ekosistem hanya hidup jika setiap lapisan terhubung." lead="Cara kerja project ini sederhana: arah datang dari Founder, kemampuan berjalan di CORE, bukti dijaga, lalu bagian yang aman dipublikasikan ke PUBLIC."><section className="contentSection"><div className="fullHeading"><Eyebrow>THE OPERATING LOOP</Eyebrow><h2>Visi → Digital → Evidence → Founder Gate → Implementasi</h2></div><div className="systemFlow"><div className="flowTrack">{[['01','VISI','Apa yang ingin diwujudkan?'],['02','DIGITAL','Apa yang bisa dibangun dan diuji sekarang?'],['03','EVIDENCE','Apa yang benar-benar terbukti?'],['04','FOUNDER GATE','Apa yang layak diteruskan?'],['05','IMPLEMENTASI','Apa yang benar-benar dilakukan?']].map(([n,t,d],i)=><article key={n} className="flowNode"><span>{n}</span><b>{t}</b><p>{d}</p>{i<4&&<ArrowRight className="flowArrow"/>}</article>)}</div></div></section><section className="darkPanel"><Eyebrow light>THREE LAYERS · ONE PROJECT</Eyebrow><div className="layerRoute"><article><span>MEMORY</span><h3>Founder-OS</h3><p>Menjaga arah, keputusan, constraint, continuity, dan Founder Gate.</p></article><article><span>ENGINE</span><h3>CORE</h3><p>Menjalankan runtime, data, workflows, evidence, economics, dan kemampuan digital.</p></article><article><span>FRONT DOOR</span><h3>PUBLIC</h3><p>Mengubah bagian yang aman menjadi discovery, cerita, research, dan opportunity.</p></article></div></section><section className="contentSection split"><div><Eyebrow>WHY THIS MATTERS</Eyebrow><h2>Jangan membuat website yang hanya terlihat bagus. <i>Buat sistem yang bisa bergerak.</i></h2></div><div className="prose"><p>PUBLIC bukan backend kedua. CORE tetap menjadi sumber kebenaran runtime, evidence, dan ekonomi. Founder-OS tetap menjadi sumber arah dan keputusan.</p><p>Karena itu setiap pengalaman publik harus punya tujuan: membuka pengetahuan, memperjelas hubungan, atau mengantar seseorang menuju peluang yang nyata.</p><a className="button buttonGold" href={BASE+'research.html'}>Lihat objek riset <ArrowRight/></a></div></section></Inner>}

function Research(){const [filter,setFilter]=useState('ALL');const items=[['01','WASTE → ENERGY','EXPERIMENT','ENERGY SYSTEM','Menguji hubungan limbah, energi, utilitas, dan ekonomi.'],['02','DIGITAL COMMUNITY','RESEARCH','DIGITAL SYSTEM','Menguji bagaimana kebutuhan dan kemampuan dapat dipertemukan.'],['03','FOOD SYSTEM','BLUEPRINT','FOOD SYSTEM','Mengkaji pangan sebagai sistem produksi, distribusi, dan ekonomi.']];const visible=filter==='ALL'?items:items.filter(x=>x[2]===filter);return <Inner type="04 / RESEARCH & EVIDENCE" title="Pengetahuan yang bisa ditinjau." lead="Research bukan halaman tulisan. Ia adalah perpustakaan objek: studi, evidence, blueprint, dan eksperimen yang punya hubungan dengan sistem."><section className="contentSection"><div className="researchFilters">{['ALL','EXPERIMENT','RESEARCH','BLUEPRINT'].map(x=><button key={x} className={filter===x?'activeFilter':''} onClick={()=>setFilter(x)}>{x}</button>)}</div><div className="researchLibrary">{visible.map(x=><article key={x[0]} className="libraryRow"><div className={'libraryVisual '+x[3].toLowerCase().replace(/ /g,'-')}><span>{x[0]}</span><b>{x[1]}</b><small>{x[3]}</small></div><div><small>{x[2]}</small><h3>{x[4]}</h3><p>Status saat ini: exploring. Evidence publik akan ditambahkan hanya ketika tersedia dan aman untuk dibagikan.</p><div className="researchLinks"><a href={BASE+'system.html'}>See system <ArrowRight/></a><a href={BASE+'collaborate.html'}>Discuss topic <ArrowUpRight/></a></div></div></article>)}</div></section></Inner>}
function Collaborate(){return <Inner type="04 / COLLABORATE" title="Masuk melalui kebutuhan nyata." lead="Kebutuhan, kemampuan, pilot, partner, atau peluang implementasi yang konkret adalah pintu masuk paling sehat ke ekosistem."><section className="contentSection split"><div><Eyebrow>THE PATH</Eyebrow><h2>Request → Qualify → Founder Review → Deliver → Prove</h2></div><div className="prose"><p>Mulai dari hal yang dapat dijelaskan dan diterima. Tidak ada klaim customer, partner, payment, atau implementasi fisik tanpa bukti.</p><a className="button buttonGold" href={EMAIL}>Kirim kebutuhan konkret <ArrowUpRight/></a></div></section><section className="darkPanel offerPanel"><Eyebrow light>INITIAL ECONOMIC EXPERIMENT</Eyebrow><h2>AI-assisted Operations / Research Pack</h2><p>Decision brief, evidence register, recommended workflow, implementation checklist, dan limitations untuk kebutuhan konkret.</p><strong>Target pilot mulai Rp100.000</strong><small>Target penawaran, bukan klaim revenue.</small></section></Inner>}
function About(){return <Inner type="05 / ABOUT" title="Tiga lapisan. Satu project." lead="PUBLIC, CORE, dan Founder-OS memiliki peran berbeda tetapi bekerja sebagai satu sistem."><section className="contentSection"><div className="layerCards"><article><span>PUBLIC</span><h3>Magnet & front door</h3><p>Menjelaskan, memperlihatkan, dan menerima discovery serta peluang eksternal.</p></article><article><span>CORE</span><h3>Engine & proof</h3><p>Runtime, backend, evidence, workflows, economics, dan kemampuan yang dapat dijalankan.</p></article><article><span>FOUNDER-OS</span><h3>Direction & memory</h3><p>Keputusan Founder, constraint, continuity, governance, dan Founder Gate.</p></article></div></section><section className="truthStrip"><ShieldCheck/><div><b>Current truth</b><span>Customer 0 · Partner 0 · Payment Rp0 · Physical implementation not claimed.</span></div><strong>No Proof, No Claim.</strong></section></Inner>}

function App(){useEffect(()=>{const nodes=[...document.querySelectorAll('.reveal')];if(!('IntersectionObserver' in window)){nodes.forEach(n=>n.classList.add('isVisible'));return;}const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('isVisible');io.unobserve(e.target);}}),{threshold:.12});nodes.forEach(n=>io.observe(n));return()=>io.disconnect();},[]);const path=window.location.pathname.split('/').pop()||'index.html';let page=path==='vision.html'?<Vision/>:path==='ecosystem.html'?<Ecosystem/>:path==='system.html'?<System/>:path==='research.html'?<Research/>:path==='collaborate.html'?<Collaborate/>:path==='about.html'?<About/>:<Home/>;return <Shell>{page}</Shell>}
createRoot(document.getElementById('root')).render(<AppErrorBoundary><App/></AppErrorBoundary>);
