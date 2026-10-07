import React,{useState}from'react';
import{createRoot}from'react-dom/client';
import{ArrowUpRight,Menu,X}from'lucide-react';
import'./styles.css';

const CORE='https://rllibo833-sudo.github.io/kawasan-masjid-1000ha/';
const REPO='https://github.com/rllibo833-sudo/kawasan-masjid-1000ha';
const EMAIL='mailto:fadlibo833@gmail.com';

const systems=[
 ['01','Worship & civic life','A mosque-centered community with public space, services, and shared life.'],
 ['02','Education & research','Knowledge, learning, research, and skills across generations.'],
 ['03','Food & agriculture','Farming, livestock, food systems, and local resilience.'],
 ['04','Water & ecology','Water, gardens, conservation, landscape, and ecological balance.'],
 ['05','Energy & utilities','Practical infrastructure developed progressively and responsibly.'],
 ['06','Local economy','MSMEs, work, services, trade, and community economic activity.'],
 ['07','Digital ecosystem','Data, GIS, coordination, AI-assisted operations, and future applications.'],
 ['08','Housing & public life','Homes, facilities, mobility, recreation, and shared spaces.']
];

function App(){
 const[open,setOpen]=useState(false),[id,setId]=useState(false);
 const t=(en,idn)=>id?idn:en;
 const go=(anchor)=>{document.getElementById(anchor)?.scrollIntoView({behavior:'smooth'});setOpen(false)};
 return <div>
  <header>
   <button className="brand" onClick={()=>go('top')}><span>KM</span><b>Kawasan Masjid<small>1.000 Ha · Open Project</small></b></button>
   <button className="mobile" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
   <nav className={open?'show':''}>
    {[
      ['vision',t('Vision','Visi')],
      ['why',t('Why','Mengapa')],
      ['ecosystem',t('Ecosystem','Ekosistem')],
      ['journey',t('Journey','Perjalanan')],
      ['imagine',t('Imagine','Bayangkan')],
      ['economic',t('Work with us','Bekerja sama')],
      ['collaborate',t('Collaborate','Kolaborasi')],
      ['explore',t('Explore','Jelajahi')]
    ].map(([a,b])=><button key={a} onClick={()=>go(a)}>{b}</button>)}
    <button className="lang" onClick={()=>setId(!id)}>{id?'EN':'ID'}</button>
   </nav>
  </header>

  <main id="top">
   <section id="vision" className="hero">
    <label>● {t('OPEN PROJECT · LONG-TERM VISION','OPEN PROJECT · VISI JANGKA PANJANG')}</label>
    <h1>{t('A mosque-centered community designed as one living ecosystem.','Kawasan berpusat pada masjid yang dirancang sebagai satu ekosistem kehidupan.')}</h1>
    <p>{t('Kawasan Masjid 1.000 Ha is a long-term Islamic Eco-City vision. The work begins with research, design, digital coordination, and small verifiable steps toward real-world implementation.','Kawasan Masjid 1.000 Ha adalah visi jangka panjang Islamic Eco-City. Perjalanan dimulai dari riset, desain, koordinasi digital, dan langkah kecil yang dapat dibuktikan menuju realisasi nyata.')}</p>
    <div className="actions">
      <a className="primary" href={CORE}>{t('Explore the project','Jelajahi project')} <ArrowUpRight/></a>
      <a className="ghost" href="#economic">{t('Need a small research/ops deliverable?','Butuh deliverable riset/operasional kecil?')} <ArrowUpRight/></a>
    </div>
    <div className="stats"><span><b>1,000</b>hectares envisioned</span><span><b>08</b>connected systems</span><span><b>01</b>direction</span></div>
   </section>

   <section id="why">
    <label>01 / {t('WHY THIS EXISTS','MENGAPA INI ADA')}</label>
    <h2>{t('More than a place. A system for human life.','Bukan sekadar tempat. Sebuah sistem untuk kehidupan manusia.')}</h2>
    <div className="two">
      <div>
       <p>{t('The vision starts with a simple question: how can a place help people worship, learn, work, raise families, care for nature, and build a resilient local economy together?','Visi ini dimulai dari pertanyaan sederhana: bagaimana sebuah kawasan membantu manusia beribadah, belajar, bekerja, berkeluarga, menjaga alam, dan membangun ekonomi lokal yang tangguh secara bersama?')}</p>
       <p>{t('The mosque is an orientation point—not only a building, but a connector between people, knowledge, services, economy, ecology, and public life.','Masjid menjadi titik orientasi—bukan hanya bangunan, tetapi penghubung manusia, pengetahuan, layanan, ekonomi, ekologi, dan kehidupan publik.')}</p>
      </div>
      <div className="quote">{t('A good kawasan should feel alive when people are inside it—not only look impressive from a distance.','Kawasan yang baik harus terasa hidup ketika manusia berada di dalamnya—bukan hanya terlihat mengesankan dari kejauhan.')}</div>
    </div>
   </section>

   <section id="ecosystem" className="cream">
    <label>02 / {t('THE ECOSYSTEM','EKOSISTEM')}</label>
    <h2>{t('Eight systems designed to reinforce one another.','Delapan sistem yang dirancang untuk saling memperkuat.')}</h2>
    <div className="pillars">{systems.map(([n,a,b])=><article key={n}><small>{n}</small><h3>{a}</h3><p>{b}</p></article>)}</div>
   </section>

   <section id="journey">
    <label>03 / {t('THE JOURNEY','PERJALANAN')}</label>
    <h2>{t('A large vision is not built in one leap.','Visi besar tidak dibangun dalam satu lompatan.')}</h2>
    <p>{t('The project moves from understanding to design, then to small things that can be tested, measured, and expanded only when they earn the right to grow.','Project bergerak dari pemahaman menuju desain, lalu ke hal-hal kecil yang dapat diuji dan diukur, kemudian diperluas hanya ketika memang layak berkembang.')}</p>
    <div className="journey">
      {[['01','UNDERSTAND','Research the place, people, constraints, and real needs.'],['02','DESIGN','Turn evidence into a coherent masterplan and system model.'],['03','TEST','Build the smallest useful digital or physical component.'],['04','GROW','Expand only what is supported by evidence and real value.']].map(([n,a,b])=><article key={n}><small>{n}</small><b>{t(a,a==='UNDERSTAND'?'PAHAMI':a==='DESIGN'?'RANCANG':a==='TEST'?'UJI':'KEMBANGKAN')}</b><p>{b}</p></article>)}
    </div>
   </section>

   <section id="imagine" className="experience">
    <div className="experienceInner">
     <label>04 / {t('IMAGINE BEING THERE','BAYANGKAN BERADA DI SANA')}</label>
     <h2>{t('Imagine a morning here.','Bayangkan suatu pagi di kawasan ini.')}</h2>
     <div className="storyline">
      <p>{t('The call to prayer becomes part of the morning rhythm. People walk to the mosque. Children learn. Farmers work. Families meet in open spaces. A small shop opens its doors.','Suara adzan menjadi bagian dari ritme pagi. Orang berjalan menuju masjid. Anak-anak belajar. Petani bekerja. Keluarga bertemu di ruang terbuka. Sebuah kedai kecil mulai membuka pintunya.')}</p>
      <p>{t('Rainwater is collected. Gardens grow food. Energy is used wisely. Knowledge moves between generations. Local work connects production with markets and daily life.','Air hujan dikumpulkan. Kebun menghasilkan pangan. Energi digunakan dengan bijak. Pengetahuan berpindah antargenerasi. Pekerjaan lokal menghubungkan produksi dengan pasar dan kehidupan sehari-hari.')}</p>
      <p>{t('Technology works behind the scenes—not to replace people, but to make the kawasan easier to understand, coordinate, operate, and improve.','Teknologi bekerja di balik layar—bukan untuk menggantikan manusia, tetapi agar kawasan lebih mudah dipahami, dikoordinasikan, dioperasikan, dan diperbaiki.')}</p>
     </div>
    </div>
   </section>


   <section id="economic">
    <label>05 / {t('A SMALL REAL-WORLD OFFER','TAWARAN NYATA BERSKALA KECIL')}</label>
    <h2>{t('Turn a real problem into a reviewable deliverable.','Ubah masalah nyata menjadi deliverable yang dapat ditinjau.')}</h2>
    <div className="two">
      <div>
       <p>{t('The first economic experiment is deliberately narrow: an AI-assisted Operations / Research Pack for a concrete operational or research need.','Eksperimen ekonomi pertama sengaja dibuat sempit: AI-assisted Operations / Research Pack untuk kebutuhan operasional atau riset yang konkret.')}</p>
       <p>{t('Possible outputs include a decision brief, evidence register, reasoning, recommended workflow, implementation checklist, and limitations.','Output dapat berupa decision brief, evidence register, penalaran, rekomendasi alur kerja, checklist implementasi, dan batasan.')}</p>
      </div>
      <div className="quote"><b>{t('Initial pilot floor: Rp100.000','Batas awal pilot: Rp100.000')}</b><p>{t('This is an offer target, not claimed revenue. Every request is reviewed before scope, price, commitment, or delivery is accepted.','Ini adalah target penawaran, bukan klaim pendapatan. Setiap permintaan ditinjau sebelum scope, harga, komitmen, atau delivery diterima.')}</p><a className="primary" href={EMAIL}>{t('Send a concrete request','Kirim kebutuhan konkret')} <ArrowUpRight/></a></div>
    </div>
    <p className="inbound-note">{t('Path: Request → Qualify → Founder Review → Scope & Price → Deliver → Accept → Pay → Prove. No legal, medical, tax, investment, or other regulated advice.','Alur: Request → Qualify → Founder Review → Scope & Price → Deliver → Accept → Pay → Prove. Tidak menerima layanan hukum, medis, pajak, investasi, atau layanan teregulasi lainnya.')}</p>
   </section>

   <section id="collaborate">
    <label>06 / {t('COLLABORATION GATEWAY','GERBANG KOLABORASI')}</label>
    <h2>{t('If you can make one real next step possible, there is a place for you here.','Jika Anda dapat membuat satu langkah nyata berikutnya menjadi mungkin, ada tempat untuk Anda di sini.')}</h2>
    <div className="two">
      <div>
       <p>{t('This is an open, evidence-first project. We welcome inbound technical capability, research and domain expertise, credible pilot pathways, implementation partners, and concrete paid problems.','Ini adalah project terbuka yang berorientasi pada bukti. Kami terbuka untuk kemampuan teknis, keahlian riset/domain, jalur pilot yang kredibel, mitra implementasi, dan kebutuhan berbayar yang konkret.')}</p>
       <p>{t('The strongest signal is specific: a real need, useful capability, credible pathway, or evidence — not a generic promise.','Sinyal terkuat adalah sesuatu yang spesifik: kebutuhan nyata, kemampuan yang berguna, jalur yang kredibel, atau bukti — bukan janji umum.')}</p>
      </div>
      <div className="quote"><b>{t('DISCOVER → QUALIFY → MATCH → FOUNDER GATE → DELIVER → PROVE','TEMUKAN → KUALIFIKASI → COCOKKAN → FOUNDER GATE → KERJAKAN → BUKTIKAN')}</b></div>
    </div>
    <div className="actions">
      <a className="primary" href={EMAIL}>{t('Bring a concrete opportunity','Bawa peluang konkret')} <ArrowUpRight/></a>
      <a className="ghost" href="https://github.com/rllibo833-sudo/kawasan-masjid-1000ha/blob/main/docs/COLLABORATION.md" target="_blank" rel="noreferrer">{t('See collaboration pathways','Lihat jalur kolaborasi')} <ArrowUpRight/></a>
    </div>
    <p className="inbound-note">{t('No verified partner or customer is claimed today. This gateway exists to make the right inbound opportunity easier to recognize and qualify.','Belum ada partner atau pelanggan terverifikasi yang diklaim saat ini. Gerbang ini dibuat agar peluang inbound yang tepat lebih mudah dikenali dan dikualifikasi.')}</p>
   </section>

   <section id="explore" className="dark">
    <label>07 / {t('EXPLORE THE PROJECT','JELAJAHI PROJECT')}</label>
    <h2>{t('The digital foundation is being built before the physical foundation.','Fondasi digital dibangun sebelum fondasi fisik.')}</h2>
    <p>{t('The Core Project OS holds the project model, research, blueprint, digital ecosystem logic, and future operational infrastructure. It is the place to understand what actually exists and what is still only a plan.','Core Project OS menyimpan model proyek, riset, blueprint, logika ekosistem digital, dan infrastruktur operasional masa depan. Di sanalah kondisi nyata dan hal yang masih berupa rencana dapat dibedakan.')}</p>
    <div className="actions">
      <a className="primary" href={CORE}>{t('Open the Core Project','Buka Core Project')} <ArrowUpRight/></a>
      <a className="ghost" href={EMAIL}>{t('Contact Founder','Hubungi Founder')} <ArrowUpRight/></a>
    </div>
    <p className="inbound-note">{t('Current truth: no verified customer, no verified payment, no verified partner, and no physical implementation claim. No Proof, No Claim.','Kondisi saat ini: belum ada pelanggan terverifikasi, pembayaran terverifikasi, atau partner terverifikasi, dan belum ada klaim realisasi fisik. Tidak ada bukti, tidak ada klaim.')}</p>
   </section>
  </main>

  <footer><div><b>Kawasan Masjid 1.000 Ha</b><p>{t('Open project for research, development, validation, and gradual collaboration.','Open project untuk riset, pengembangan, validasi, dan kolaborasi bertahap.')}</p></div><div className="links"><a href={CORE}>Core Project</a><a href={REPO} target="_blank" rel="noreferrer">GitHub</a><a href="https://github.com/rllibo833-sudo/Founder-ai-memory" target="_blank" rel="noreferrer">Founder AI Memory</a><a href={EMAIL}>Request a paid pilot</a></div></footer>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
