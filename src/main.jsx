import React, { Component, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Compass,
  Users,
  Handshake,
  ShieldCheck,
  Github,
} from 'lucide-react';
import './styles.css';

const CORE = 'https://github.com/rllibo833-sudo/kawasan-masjid-core';
const REPO = 'https://github.com/rllibo833-sudo/kawasan-masjid-core';
const MEMORY = 'https://github.com/rllibo833-sudo/Founder-OS';
const EMAIL = 'mailto:fadlibo833@gmail.com?subject=Kawasan%20Masjid%20%E2%80%94%20Peluang%20atau%20Kebutuhan';

const paths = [
  {
    icon: Compass,
    number: '01',
    title: 'Jelajahi',
    titleEn: 'Explore',
    text: 'Pahami visi, apa yang sedang dibangun, dan bukti yang benar-benar tersedia.',
    action: 'Lihat project',
    href: '#about',
  },
  {
    icon: Users,
    number: '02',
    title: 'Berkontribusi',
    titleEn: 'Contribute',
    text: 'Bawa kemampuan, riset, pengetahuan domain, testing, atau kemampuan implementasi.',
    action: 'Cara berkontribusi',
    href: '#contribute',
  },
  {
    icon: Handshake,
    number: '03',
    title: 'Berkolaborasi',
    titleEn: 'Collaborate',
    text: 'Bawa kebutuhan nyata, kemampuan, pilot, jalur implementasi, atau peluang yang dapat dinilai.',
    action: 'Ajukan peluang',
    href: '#collaborate',
  },
  {
    icon: ShieldCheck,
    number: '04',
    title: 'Founder',
    titleEn: 'Founder',
    text: 'Workspace privat untuk keputusan, review AI, validasi, dan pengendalian arah project.',
    action: 'Founder workspace',
    href: CORE,
    external: true,
  },
];

const systems = [
  'Ibadah & kehidupan sipil',
  'Pendidikan & riset',
  'Pangan & pertanian',
  'Air & ekologi',
  'Energi & utilitas',
  'Ekonomi lokal',
  'Ekosistem digital',
  'Hunian & ruang publik',
];

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('Kawasan Masjid public site runtime error:', error);
    window.dispatchEvent(
      new CustomEvent('km:runtime-error', {
        detail: { message: error?.message || 'Unknown runtime error' },
      })
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="runtimeFallback" role="alert">
          <div>
            <span className="eyebrow darkEyebrow">KAWASAN MASJID 1.000 HA</span>
            <h1>Halaman sedang memulihkan tampilan.</h1>
            <p>
              Terjadi masalah saat memuat antarmuka. Silakan muat ulang halaman.
              Jika masalah berulang, gunakan Founder Workspace untuk melanjutkan.
            </p>
            <a className="button primary" href={CORE}>Buka Founder Workspace <ArrowUpRight /></a>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState('id');

  const isId = language === 'id';

  const t = (id, en) => (isId ? id : en);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    setMenuOpen(false);
  };

  return (
    <div className="site">
      <header className="header">
        <button className="brand" onClick={() => goTo('top')}>
          <span className="brandMark">KM</span>

          <span className="brandText">
            <strong>Kawasan Masjid</strong>
            <small>1.000 Ha · Open Project</small>
          </span>
        </button>

        <button
          className="mobileMenu"
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? 'nav navOpen' : 'nav'}>
          <button onClick={() => goTo('about')}>
            {t('Tentang', 'About')}
          </button>

          <button onClick={() => goTo('paths')}>
            {t('Jalur', 'Paths')}
          </button>

          <button onClick={() => goTo('contribute')}>
            {t('Kontribusi', 'Contribute')}
          </button>

          <button onClick={() => goTo('collaborate')}>
            {t('Kolaborasi', 'Collaborate')}
          </button>

          <a href={CORE}>
            {t('Founder', 'Founder')}
          </a>

          <button
            className="languageButton"
            onClick={() => setLanguage(isId ? 'en' : 'id')}
          >
            {isId ? 'EN' : 'ID'}
          </button>
        </nav>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="heroGlow" />

          <div className="heroContent">
            <div className="eyebrow">
              <span className="statusDot" />
              {t(
                'OPEN PROJECT · VISI JANGKA PANJANG',
                'OPEN PROJECT · LONG-TERM VISION'
              )}
            </div>

            <h1>
              {t(
                'Membangun kawasan berpusat pada masjid sebagai satu ekosistem kehidupan.',
                'Building a mosque-centered community as one living ecosystem.'
              )}
            </h1>

            <p className="heroLead">
              {t(
                'Kawasan Masjid 1.000 Ha adalah visi jangka panjang Islamic Eco-City. Fondasi pertama yang sedang dibangun adalah ekosistem digital: tempat orang menemukan kebutuhan, kemampuan, riset, kolaborasi, dan peluang yang dapat diuji dengan bukti.',
                'Kawasan Masjid 1.000 Ha is a long-term Islamic Eco-City vision. The first foundation is a digital ecosystem where needs, capabilities, research, collaboration, and opportunities can be discovered and tested with evidence.'
              )}
            </p>

            <div className="heroActions">
              <button className="button primary" onClick={() => goTo('paths')}>
                {t('Mulai di sini', 'Start here')}
                <ArrowRight />
              </button>

              <a className="button secondary" href={CORE}>
                {t('Founder workspace', 'Founder workspace')}
                <ArrowUpRight />
              </a>
            </div>

            <div className="truthLine">
              <span>
                <b>1.000</b>
                <small>Ha envisioned</small>
              </span>

              <span>
                <b>08</b>
                <small>connected systems</small>
              </span>

              <span>
                <b>01</b>
                <small>direction</small>
              </span>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section">
          <div className="sectionIntro">
            <div>
              <div className="eyebrow darkEyebrow">
                01 / {t('TENTANG PROJECT', 'ABOUT THE PROJECT')}
              </div>

              <h2>
                {t(
                  'Bukan sekadar tempat. Sebuah sistem untuk kehidupan.',
                  'More than a place. A system for life.'
                )}
              </h2>
            </div>

            <div className="introText">
              <p>
                {t(
                  'Masjid menjadi titik orientasi yang menghubungkan ibadah, pendidikan, pangan, ekonomi, ekologi, teknologi, hunian, dan kehidupan publik.',
                  'The mosque becomes an orientation point connecting worship, education, food, economy, ecology, technology, housing, and public life.'
                )}
              </p>

              <p>
                {t(
                  'Fondasi digital dibangun terlebih dahulu agar visi besar dapat dipahami, diuji, didokumentasikan, dan dikembangkan secara bertahap.',
                  'The digital foundation is built first so the larger vision can be understood, tested, documented, and developed step by step.'
                )}
              </p>
            </div>
          </div>

          <div className="truthCard">
            <div>
              <span className="truthLabel">
                {t('KONDISI SAAT INI', 'CURRENT TRUTH')}
              </span>

              <h3>
                {t(
                  'Yang sudah ada harus dibedakan dari yang masih menjadi rencana.',
                  'What exists must remain distinct from what is still a plan.'
                )}
              </h3>
            </div>

            <div className="truthItems">
              <div>
                <strong>Digital foundation</strong>
                <span>{t('Sedang dibangun', 'Being built')}</span>
              </div>

              <div>
                <strong>Physical kawasan</strong>
                <span>{t('Belum direalisasikan', 'Not implemented')}</span>
              </div>

              <div>
                <strong>Customers</strong>
                <span>0 verified</span>
              </div>

              <div>
                <strong>Partners</strong>
                <span>0 verified</span>
              </div>

              <div>
                <strong>Payment</strong>
                <span>Rp0 verified</span>
              </div>
            </div>
          </div>
        </section>

        {/* PATHS */}
        <section id="paths" className="section creamSection">
          <div className="centerHeading">
            <div className="eyebrow darkEyebrow">
              02 / {t('PILIH JALUR ANDA', 'CHOOSE YOUR PATH')}
            </div>

            <h2>
              {t(
                'Satu pintu untuk berbagai jenis peluang.',
                'Not everyone needs to enter the technical system.'
              )}
            </h2>

            <p>
              {t(
                'Anda tidak perlu memahami seluruh mesin di belakang layar. Pilih cara Anda ingin terlibat.',
                'Choose what you want to do. Technical machinery stays behind the scenes.'
              )}
            </p>
          </div>

          <div className="pathGrid">
            {paths.map((path) => {
              const Icon = path.icon;

              return (
                <article className="pathCard" key={path.number}>
                  <div className="pathTop">
                    <span>{path.number}</span>
                    <Icon />
                  </div>

                  <h3>{path.title}</h3>

                  <p>{path.text}</p>

                  {path.external ? (
                    <a href={path.href} className="cardLink">
                      {path.action}
                      <ArrowUpRight />
                    </a>
                  ) : (
                    <button
                      className="cardLink"
                      onClick={() =>
                        path.href.startsWith('#')
                          ? goTo(path.href.substring(1))
                          : null
                      }
                    >
                      {path.action}
                      <ArrowRight />
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* ECOSYSTEM */}
        <section className="section">
          <div className="sectionHeading">
            <div>
              <div className="eyebrow darkEyebrow">
                03 / {t('EKOSISTEM', 'ECOSYSTEM')}
              </div>

              <h2>
                {t(
                  'Delapan sistem yang saling memperkuat.',
                  'Eight systems designed to reinforce one another.'
                )}
              </h2>
            </div>

            <p>
              {t(
                'Kawasan tidak dipandang sebagai satu bangunan besar, tetapi sebagai hubungan antara manusia, tempat, layanan, ekonomi, alam, dan teknologi.',
                'The kawasan is not treated as one large building, but as relationships between people, place, services, economy, nature, and technology.'
              )}
            </p>
          </div>

          <div className="systemGrid">
            {systems.map((system, index) => (
              <div className="systemItem" key={system}>
                <span>0{index + 1}</span>
                <strong>{system}</strong>
              </div>
            ))}
          </div>
        </section>

        {/* SYSTEM FLOW */}
        <section className="section systemFlowSection">
          <div className="sectionHeading">
            <div>
              <div className="eyebrow darkEyebrow">
                04 / {t('CARA SISTEM BEKERJA', 'HOW THE SYSTEM WORKS')}
              </div>

              <h2>
                {t(
                  'Dari visi → sistem digital → bukti → keputusan → implementasi.',
                  'From vision → digital system → evidence → decisions → implementation.'
                )}
              </h2>
            </div>

            <p>
              {t(
                'Website ini adalah pintu masuk publik dan magnet peluang. Di belakangnya ada workspace inti untuk data, riset, evidence, keputusan Founder, dan pengembangan sistem. Setiap langkah harus meninggalkan bukti sebelum diperluas.',
                'This website is the public entry point and opportunity layer. Behind it is the core workspace for data, research, evidence, Founder decisions, and system development. Each step must leave evidence before it expands.'
              )}
            </p>
          </div>

          <div className="systemFlow">
            <article className="systemFlowCard">
              <span>01</span>
              <strong>{t('VISI', 'VISION')}</strong>
              <p>{t('Arah besar, tujuan, prinsip, dan batasan project.', 'Long-term direction, purpose, principles, and constraints.')}</p>
            </article>
            <div className="systemFlowArrow">→</div>
            <article className="systemFlowCard">
              <span>02</span>
              <strong>{t('DIGITAL', 'DIGITAL')}</strong>
              <p>{t('Riset, dokumen, data, tools, dan koordinasi yang dapat ditinjau.', 'Research, documents, data, tools, and coordination that can be reviewed.')}</p>
            </article>
            <div className="systemFlowArrow">→</div>
            <article className="systemFlowCard">
              <span>03</span>
              <strong>{t('EVIDENCE', 'EVIDENCE')}</strong>
              <p>{t('Apa yang benar-benar sudah ada dipisahkan dari asumsi dan rencana.', 'What actually exists is separated from assumptions and plans.')}</p>
            </article>
            <div className="systemFlowArrow">→</div>
            <article className="systemFlowCard">
              <span>04</span>
              <strong>{t('FOUNDER GATE', 'FOUNDER GATE')}</strong>
              <p>{t('Hal yang membutuhkan validasi, prioritas, atau keputusan naik ke Founder.', 'Items requiring validation, prioritization, or decisions reach the Founder.')}</p>
            </article>
            <div className="systemFlowArrow">→</div>
            <article className="systemFlowCard">
              <span>05</span>
              <strong>{t('IMPLEMENTASI', 'IMPLEMENTATION')}</strong>
              <p>{t('Komponen terkecil yang berguna diuji sebelum sistem diperbesar.', 'The smallest useful component is tested before the system expands.')}</p>
            </article>
          </div>

          <div className="systemBoundary">
            <div>
              <strong>{t('PUBLIC', 'PUBLIC')}</strong>
              <span>{t('Untuk manusia, calon partner, reviewer, dan masyarakat memahami project.', 'For people, potential partners, reviewers, and the public to understand the project.')}</span>
            </div>
            <div>
              <strong>{t('CORE', 'CORE')}</strong>
              <span>{t('Untuk runtime, backend, Supabase, evidence, dan ekonomi sistem.', 'For runtime, backend, Supabase, evidence, and system economics.')}</span>
            </div>
            <div>
              <strong>{t('MEMORY', 'MEMORY')}</strong>
              <span>{t('Untuk keputusan Founder, constraint, dan konteks agar project tidak kehilangan arah.', 'For Founder decisions, constraints, and continuity so the project does not lose direction.')}</span>
            </div>
          </div>
        </section>

        {/* CONTRIBUTE */}
        <section id="contribute" className="section darkSection">
          <div className="sectionHeading">
            <div>
              <div className="eyebrow goldEyebrow">
                04 / {t('BERKONTRIBUSI', 'CONTRIBUTE')}
              </div>

              <h2>
                {t(
                  'Bawa kemampuan yang membuat satu langkah nyata menjadi mungkin.',
                  'Bring a capability that makes one real next step possible.'
                )}
              </h2>
            </div>

            <p>
              {t(
                'Kami terbuka terhadap kemampuan teknis, riset, pengetahuan domain, desain, testing, dokumentasi, operasi, dan implementasi.',
                'We welcome technical capability, research, domain knowledge, design, testing, documentation, operations, and implementation capability.'
              )}
            </p>
          </div>

          <div className="contributionGrid">
            <div className="contributionItem">
              <span>01</span>
              <h3>{t('Kemampuan', 'Capability')}</h3>
              <p>
                {t(
                  'Keahlian yang dapat membantu satu bagian project menjadi lebih baik.',
                  'Skills that can improve one defined part of the project.'
                )}
              </p>
            </div>

            <div className="contributionItem">
              <span>02</span>
              <h3>{t('Riset', 'Research')}</h3>
              <p>
                {t(
                  'Evidence, data, analisis, atau pengetahuan domain yang dapat diverifikasi.',
                  'Evidence, data, analysis, or domain knowledge that can be verified.'
                )}
              </p>
            </div>

            <div className="contributionItem">
              <span>03</span>
              <h3>{t('Testing', 'Testing')}</h3>
              <p>
                {t(
                  'Menguji apakah sesuatu benar-benar berguna bagi manusia nyata.',
                  'Testing whether something is actually useful to real people.'
                )}
              </p>
            </div>

            <div className="contributionItem">
              <span>04</span>
              <h3>{t('Implementasi', 'Implementation')}</h3>
              <p>
                {t(
                  'Membantu membawa satu komponen dari konsep menuju penggunaan nyata.',
                  'Helping move one component from concept toward real use.'
                )}
              </p>
            </div>
          </div>

          <div className="sectionActions">
            <a className="button secondary" href={REPO}>
              <Github />
              {t('Inspect GitHub', 'Inspect GitHub')}
              <ArrowUpRight />
            </a>
          </div>
        </section>

        {/* COLLABORATE */}
        <section id="collaborate" className="section">
          <div className="collaborationBox">
            <div className="collaborationMain">
              <div className="eyebrow darkEyebrow">
                05 / {t('BERKOLABORASI', 'COLLABORATE')}
              </div>

              <h2>
                {t(
                  'Punya kebutuhan nyata? Mari mulai dari satu deliverable yang jelas.',
                  'Have a real need? Start with one clear deliverable.'
                )}
              </h2>

              <p>
                {t(
                  'Project ini dibangun untuk menemukan hubungan yang menghasilkan langkah nyata — bukan sekadar followers atau janji kolaborasi. Jalur terkuat adalah kebutuhan nyata, pilot, implementation pathway, atau pekerjaan konkret dengan hasil yang dapat diterima.',
                  'This project is designed to find relationships that create real next steps — not merely followers or vague collaboration promises. The strongest pathway is a real need, pilot, implementation pathway, or concrete work with an accepted outcome.'
                )}
              </p>

              <div className="flow">
                <span>Request</span>
                <i>→</i>
                <span>Qualify</span>
                <i>→</i>
                <span>Founder Review</span>
                <i>→</i>
                <span>Deliver</span>
                <i>→</i>
                <span>Prove</span>
              </div>
            </div>

            <div className="collaborationOffer">
              <span className="offerLabel">
                {t('EKSPERIMEN EKONOMI AWAL', 'INITIAL ECONOMIC EXPERIMENT')}
              </span>

              <h3>AI-assisted Operations / Research Pack</h3>

              <p>
                {t(
                  'Decision brief, evidence register, recommended workflow, implementation checklist, dan limitations untuk kebutuhan konkret.',
                  'Decision brief, evidence register, recommended workflow, implementation checklist, and limitations for a concrete need.'
                )}
              </p>

              <strong>
                {t('Target pilot mulai Rp100.000', 'Pilot target from Rp100,000')}
              </strong>

              <small>
                {t(
                  'Target penawaran, bukan klaim revenue.',
                  'Offer target, not claimed revenue.'
                )}
              </small>

              <a className="button primary" href={EMAIL}>
                {t('Kirim kebutuhan konkret', 'Send a concrete request')}
                <ArrowUpRight />
              </a>
            </div>
          </div>

          <div className="noClaim">
            <ShieldCheck />
            <span>
              <strong>No Proof, No Claim.</strong>{' '}
              {t(
                'Tidak ada partner, customer, payment, atau implementasi fisik yang diklaim tanpa bukti terverifikasi.',
                'No partner, customer, payment, or physical implementation is claimed without verified evidence.'
              )}
            </span>
          </div>
        </section>

        {/* GROWTH */}
        <section className="section creamSection">
          <div className="centerHeading">
            <div className="eyebrow darkEyebrow">
              06 / {t('CARA BERKEMBANG', 'HOW IT GROWS')}
            </div>

            <h2>
              {t(
                'Visi besar. Langkah kecil. Bukti nyata.',
                'Large vision. Small steps. Real evidence.'
              )}
            </h2>
          </div>

          <div className="growthSteps">
            <article>
              <span>01</span>
              <h3>{t('Pahami', 'Understand')}</h3>
              <p>
                {t(
                  'Riset kebutuhan, tempat, manusia, dan batasan.',
                  'Research needs, place, people, and constraints.'
                )}
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>{t('Rancang', 'Design')}</h3>
              <p>
                {t(
                  'Ubah evidence menjadi model dan solusi yang koheren.',
                  'Turn evidence into a coherent model and solution.'
                )}
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>{t('Uji', 'Test')}</h3>
              <p>
                {t(
                  'Bangun komponen terkecil yang berguna dan dapat diuji.',
                  'Build the smallest useful component that can be tested.'
                )}
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>{t('Kembangkan', 'Grow')}</h3>
              <p>
                {t(
                  'Perluas hanya ketika bukti dan nilai nyata mendukungnya.',
                  'Expand only when evidence and real value support it.'
                )}
              </p>
            </article>
          </div>
        </section>

        {/* FOUNDER */}
        <section className="founderSection">
          <div className="founderContent">
            <div className="eyebrow goldEyebrow">
              07 / FOUNDER WORKSPACE
            </div>

            <h2>
              {t(
                'Founder tidak perlu melihat semua mesin di belakang layar.',
                'The Founder does not need to see every machine behind the scenes.'
              )}
            </h2>

            <p>
              {t(
                'Workspace Founder dirancang untuk menjawab satu pertanyaan: apa yang membutuhkan keputusan saya?',
                'The Founder workspace is designed to answer one question: what requires my decision?'
              )}
            </p>

            <div className="founderQueue">
              <div className="queueBadge">FOUNDER GATE</div>

              <div>
                <strong>
                  {t(
                    'AI bekerja di belakang layar.',
                    'AI works behind the scenes.'
                  )}
                </strong>

                <span>
                  {t(
                    'Founder menerima hal yang membutuhkan review, validasi, atau keputusan.',
                    'The Founder receives what requires review, validation, or a decision.'
                  )}
                </span>
              </div>

              <a href={CORE}>
                {t('Buka workspace', 'Open workspace')}
                <ArrowUpRight />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footerBrand">
          <strong>Kawasan Masjid 1.000 Ha</strong>

          <p>
            {t(
              'Open project untuk riset, pengembangan, validasi, dan kolaborasi bertahap.',
              'An open project for research, development, validation, and gradual collaboration.'
            )}
          </p>
        </div>

        <div className="footerLinks">
          <a href={CORE}>
            Founder Workspace <ArrowUpRight />
          </a>

          <a href={REPO} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight />
          </a>

          <a href={MEMORY} target="_blank" rel="noreferrer">
            Founder Memory <ArrowUpRight />
          </a>

          <a href={EMAIL}>
            Contact <ArrowUpRight />
          </a>
        </div>

        <div className="footerBottom">
          <span>© Kawasan Masjid 1.000 Ha</span>
          <span>No Proof, No Claim.</span>
        </div>
      </footer>
    </div>
  );
}

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element #root is missing.');
}

createRoot(root).render(
  <AppErrorBoundary>
    <App />
  </AppErrorBoundary>
);
