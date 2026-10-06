import type { Metadata } from "next";
import styles from "./company.module.css";

export const metadata: Metadata = {
  title: "Q-Order — Digital Ordering for Modern F&B",
  description:
    "Q-Order membantu bisnis F&B mengubah proses pemesanan manual menjadi pengalaman digital yang lebih cepat, praktis, dan terorganisir.",
};

type IconName =
  | "arrow"
  | "arrowUp"
  | "check"
  | "clock"
  | "menu"
  | "qr"
  | "scan"
  | "message"
  | "store"
  | "spark"
  | "layers"
  | "users"
  | "target"
  | "wallet";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  };

  switch (name) {
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "arrowUp":
      return (
        <svg {...common}>
          <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
          <path d="M12 7.5v5l3.2 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "qr":
      return (
        <svg {...common}>
          <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z" stroke="currentColor" strokeWidth="1.7" />
          <path d="M14 14h2M18 14h2M14 18h2M17 17h3M14 20h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "scan":
      return (
        <svg {...common}>
          <path d="M7 4H5a1 1 0 0 0-1 1v2M17 4h2a1 1 0 0 1 1 1v2M7 20H5a1 1 0 0 1-1-1v-2M17 20h2a1 1 0 0 0 1-1v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M7 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "message":
      return (
        <svg {...common}>
          <path d="M19.5 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3-.6L4 20l1.6-4.1A7.4 7.4 0 0 1 4.5 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 7.5 7.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      );
    case "store":
      return (
        <svg {...common}>
          <path d="M5 10v9h14v-9M4 10l2-5h12l2 5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M4 10c0 1.1 1 2 2.3 2 1 0 1.8-.4 2.3-1.2.5.8 1.3 1.2 2.3 1.2s1.8-.4 2.3-1.2c.5.8 1.3 1.2 2.3 1.2 1 0 1.8-.4 2.3-1.2.5.8 1.3 1.2 2.3 1.2 1.3 0 2.3-.9 2.3-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 19v-4h6v4" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="m12 3 1.2 5.8L19 10l-5.8 1.2L12 17l-1.2-5.8L5 10l5.8-1.2L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="m12 4 8 4-8 4-8-4 8-4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="m4 12 8 4 8-4M4 16l8 4 8-4" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
          <path d="M3.8 18a5.2 5.2 0 0 1 10.4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M16 6.2a2.8 2.8 0 0 1 0 5.4M16.2 14.2a4.6 4.6 0 0 1 4 3.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...common}>
          <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z" stroke="currentColor" strokeWidth="1.7" />
          <path d="M4 8h12.5A2.5 2.5 0 0 1 19 10.5V14h-4.5a2 2 0 0 1 0-4H20" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      );
  }
}

function Logo() {
  return (
    <a href="#top" className={styles.logo} aria-label="Q-Order home">
      <span className={styles.logoMark}>Q</span>
      <span>ORDER</span>
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`${styles.sectionHeading} ${align === "center" ? styles.center : ""}`}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function ProductPreview() {
  return (
    <div className={styles.productStage} aria-label="Q-Order product preview">
      <div className={styles.stageGlow} />
      <div className={`${styles.floatCard} ${styles.floatTop}`}>
        <span className={styles.floatIcon}><Icon name="qr" size={17} /></span>
        <span>
          <b>QR Self-Order</b>
          <small>Table 08</small>
        </span>
        <span className={styles.liveDot} />
      </div>

      <div className={`${styles.floatCard} ${styles.floatBottom}`}>
        <span className={styles.floatIcon}><Icon name="message" size={17} /></span>
        <span>
          <b>Order confirmed</b>
          <small>via WhatsApp</small>
        </span>
        <span className={styles.floatAmount}>Ready</span>
      </div>

      <div className={styles.phone}>
        <div className={styles.phoneTop}>
          <span>9:41</span>
          <span className={styles.phoneSignal}>● ● ▬</span>
        </div>
        <div className={styles.phoneContent}>
          <div className={styles.appBrand}>
            <div>
              <span className={styles.miniMark}>Q</span>
              <strong>Q-ORDER</strong>
            </div>
            <span className={styles.storeLabel}>Kopi Pagi</span>
          </div>

          <div className={styles.phoneHero}>
            <span className={styles.phoneHeroTag}>ORDER WITHOUT THE QUEUE</span>
            <h3>What are you having today?</h3>
            <p>Browse the menu and send your order in a few taps.</p>
          </div>

          <div className={styles.miniTabs}>
            <span className={styles.activeTab}>Popular</span>
            <span>Meals</span>
            <span>Drinks</span>
          </div>

          <div className={styles.menuRows}>
            <div className={styles.menuRow}>
              <div className={`${styles.foodThumb} ${styles.foodOne}`}>
                <span>☕</span>
              </div>
              <div className={styles.foodCopy}>
                <strong>Kopi Aren</strong>
                <span>Signature coffee</span>
              </div>
              <b>Rp18K</b>
            </div>
            <div className={styles.menuRow}>
              <div className={`${styles.foodThumb} ${styles.foodTwo}`}>
                <span>🥪</span>
              </div>
              <div className={styles.foodCopy}>
                <strong>Toast Melt</strong>
                <span>Cheese &amp; smoked beef</span>
              </div>
              <b>Rp24K</b>
            </div>
          </div>

          <div className={styles.cartBar}>
            <span>2 items in cart</span>
            <b>Rp42K</b>
            <span className={styles.cartArrow}><Icon name="arrow" size={15} /></span>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    number: "01",
    icon: "clock" as IconName,
    title: "Pre-Order",
    description:
      "Pelanggan dapat memesan lebih awal dan menentukan waktu pengambilan sesuai jadwal yang tersedia.",
  },
  {
    number: "02",
    icon: "scan" as IconName,
    title: "QR Self-Ordering",
    description:
      "Pindai QR Code di meja, buka menu digital, pilih pesanan, lalu kirim tanpa perlu berdiri di antrean kasir.",
  },
  {
    number: "03",
    icon: "message" as IconName,
    title: "WhatsApp Integration",
    description:
      "Informasi pesanan dan instruksi pembayaran dapat diteruskan melalui WhatsApp agar pelanggan tetap terinformasi.",
  },
];

const benefits = [
  ["Faster Ordering", "Kurangi langkah yang tidak perlu dari menu sampai pesanan dikirim."],
  ["Simpler Experience", "Pengalaman pemesanan dibuat familiar lewat smartphone, QR Code, dan WhatsApp."],
  ["Organized Operations", "Kurangi ketergantungan pada pencatatan manual yang rentan human error."],
  ["Flexible Ordering", "Sediakan jalur pemesanan langsung maupun pemesanan terjadwal."],
];

const useCases = [
  {
    icon: "store" as IconName,
    title: "Warung & UMKM",
    description: "Mulai digitalisasi pemesanan tanpa perlu membuat sistem dari nol.",
  },
  {
    icon: "users" as IconName,
    title: "Café",
    description: "Berikan pelanggan cara self-order yang lebih praktis saat kondisi ramai.",
  },
  {
    icon: "layers" as IconName,
    title: "Food Court",
    description: "Bantu mengurangi kepadatan di titik kasir dan membuat alur order lebih terstruktur.",
  },
];

const team = [
  ["M. Nabil Alzikra", "Tech Founder & CEO", "Strategic direction, product coordination, and final decisions."],
  ["Yoseph Widjaya", "Full-Stack Developer", "Application architecture, frontend, backend, and system integration."],
  ["Arya Setyanto", "Chief Growth Officer", "Branding, visual communication, and digital marketing strategy."],
  ["Nadito Satria Utomo", "Chief Finance Officer", "Budgeting, financial planning, and project financial analysis."],
  ["M. Zahran R.K", "Merchant Enterprise", "Merchant outreach, field marketing, and partner acquisition."],
];

export default function CompanyPage() {
  return (
    <main id="top" className={styles.page}>
      <header className={styles.navWrap}>
        <nav className={styles.nav}>
          <Logo />
          <div className={styles.navLinks}>
            <a href="#why">Why Q-Order</a>
            <a href="#features">Features</a>
            <a href="#flow">How It Works</a>
            <a href="#about">About</a>
          </div>
          <a className={styles.navCta} href="/demo-1">
            Try Demo <Icon name="arrowUp" size={16} />
          </a>
          <details className={styles.mobileMenu}>
            <summary aria-label="Open navigation"><Icon name="menu" size={22} /></summary>
            <div className={styles.mobilePanel}>
              <a href="#why">Why Q-Order</a>
              <a href="#features">Features</a>
              <a href="#flow">How It Works</a>
              <a href="#about">About</a>
              <a className={styles.mobileCta} href="/demo-1">Try Demo <Icon name="arrowUp" size={16} /></a>
            </div>
          </details>
        </nav>
      </header>

      <section className={`${styles.hero} ${styles.container}`}>
        <div className={styles.heroCopy}>
          <div className={styles.heroEyebrow}><span className={styles.pulse} /> DIGITAL ORDERING FOR F&amp;B</div>
          <h1>Pesan lebih cepat.<br /><em>Kelola lebih rapi.</em></h1>
          <p>
            Q-Order membantu bisnis F&amp;B mengubah proses pemesanan manual menjadi pengalaman digital yang lebih cepat, praktis, dan terorganisir.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="/demo-1">
              <p style={{color: 'white'}}>Try Q-Order <Icon name="arrow" size={17} /></p>
            </a>
            <a className={styles.textButton} href="#features">
              Explore features <Icon name="arrow" size={16} />
            </a>
          </div>
          <div className={styles.heroMeta}>
            <span><Icon name="qr" size={16} /> QR Self-Order</span>
            <span><Icon name="clock" size={16} /> Pre-Order</span>
            <span><Icon name="message" size={16} /> WhatsApp</span>
          </div>
        </div>
        <ProductPreview />
      </section>

      <section className={styles.ticker} aria-label="Q-Order capabilities">
        <div className={styles.tickerTrack}>
          {Array.from({ length: 2 }).map((_, i) => (
            <div className={styles.tickerSet} key={i}>
              <span>SELF-ORDER</span><b>•</b>
              <span>PRE-ORDER</span><b>•</b>
              <span>DIGITAL MENU</span><b>•</b>
              <span>WHATSAPP</span><b>•</b>
              <span>F&amp;B OPERATIONS</span><b>•</b>
            </div>
          ))}
        </div>
      </section>

      <section id="why" className={`${styles.problemSection} ${styles.container}`}>
        <div className={styles.problemIntro}>
          <SectionHeading
            eyebrow="01 — THE PROBLEM"
            title="Ketika kios ramai, antrean ikut menjadi masalah."
            description="Kami melihat satu pola yang berulang: kasir menjadi titik kemacetan, pesanan masih dicatat manual, dan pelanggan menghabiskan waktu untuk hal yang seharusnya bisa dibuat lebih sederhana."
          />
          <div className={styles.problemQuote}>
            <span>“</span>
            <p>Technology shouldn't complicate ordering. It should simplify it.</p>
          </div>
        </div>
        <div className={styles.problemGrid}>
          <article className={styles.problemCard}>
            <span className={styles.problemNo}>01</span>
            <h3>Long queues</h3>
            <p>Pelanggan harus antre hanya untuk melihat menu, memesan, dan melakukan pembayaran.</p>
          </article>
          <article className={styles.problemCard}>
            <span className={styles.problemNo}>02</span>
            <h3>Manual ordering</h3>
            <p>Pencatatan menggunakan kertas dapat meningkatkan risiko pesanan tertukar atau salah dicatat.</p>
          </article>
          <article className={styles.problemCard}>
            <span className={styles.problemNo}>03</span>
            <h3>Operational bottleneck</h3>
            <p>Semakin ramai pelanggan, semakin besar tekanan pada satu titik: kasir.</p>
          </article>
        </div>
      </section>

      <section className={`${styles.demoSection} ${styles.container}`}>
        <div className={styles.demoCard}>
          <div className={styles.demoTop}>
            <span className={styles.eyebrow}>02 — PRODUCT DEMO</span>
            <span className={styles.demoLive}><span className={styles.liveDot} /> Live preview</span>
          </div>
          <div className={styles.demoCopy}>
            <h2>See Q-Order<br />in action.</h2>
            <p>Jelajahi alur pemesanan digital yang dirancang untuk pelanggan dan operasional F&amp;B.</p>
            <a className={styles.darkButton} href="/demo-1">
              <p style={{ color: 'black'}}>Open Demo <Icon name="arrowUp" size={17} /></p>
            </a>
          </div>
          <div className={styles.browserMockup}>
            <div className={styles.browserBar}>
              <span /><span /><span />
              <div className={styles.browserAddress}>q-order-ubsi.vercel.app/demo-1</div>
            </div>
            <div className={styles.browserBody}>
              <div className={styles.browserSidebar}>
                <div className={styles.fakeLogo}><span>Q</span> Q-ORDER</div>
                <div className={`${styles.fakeNav} ${styles.fakeNavActive}`}>Overview</div>
                <div className={styles.fakeNav}>Orders</div>
                <div className={styles.fakeNav}>Menu</div>
                <div className={styles.fakeNav}>Tables</div>
              </div>
              <div className={styles.browserMain}>
                <div className={styles.fakeHeader}><span>Good morning, Merchant.</span><b>Today ↗</b></div>
                <div className={styles.fakeStats}>
                  <div><small>ACTIVE ORDERS</small><strong>18</strong></div>
                  <div><small>PRE-ORDERS</small><strong>07</strong></div>
                  <div><small>TABLES</small><strong>24</strong></div>
                </div>
                <div className={styles.fakeOrders}>
                  <div className={styles.fakeOrderHead}><span>Recent orders</span><small>View all →</small></div>
                  <div className={styles.fakeOrderRow}><span>#Q-1048</span><span>Table 08</span><b>Preparing</b></div>
                  <div className={styles.fakeOrderRow}><span>#Q-1047</span><span>Pre-Order</span><b>Confirmed</b></div>
                  <div className={styles.fakeOrderRow}><span>#Q-1046</span><span>Table 03</span><b>New order</b></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className={`${styles.featuresSection} ${styles.container}`}>
        <SectionHeading
          eyebrow="03 — CORE FEATURES"
          title="One platform. Multiple ways to order."
          description="Tiga kemampuan utama Q-Order dirancang untuk saling melengkapi: mempermudah pelanggan, sekaligus membuat alur pemesanan bisnis lebih terstruktur."
        />
        <div className={styles.featureGrid}>
          {features.map((feature) => (
            <article className={styles.featureCard} key={feature.number}>
              <div className={styles.featureTop}>
                <span className={styles.featureNumber}>{feature.number}</span>
                <span className={styles.featureIcon}><Icon name={feature.icon} size={22} /></span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <a href="/demo-1">Explore <Icon name="arrow" size={15} /></a>
            </article>
          ))}
        </div>
      </section>

      <section id="flow" className={`${styles.flowSection} ${styles.container}`}>
        <div className={styles.flowIntro}>
          <SectionHeading
            eyebrow="04 — HOW IT WORKS"
            title="From scan to served."
            description="Q-Order memangkas langkah yang tidak perlu dari proses pemesanan sehingga pelanggan dapat memesan dengan lebih mandiri."
          />
          <div className={styles.flowBadge}><Icon name="spark" size={18} /> Less waiting. More ordering.</div>
        </div>
        <div className={styles.flowTimeline}>
          {[
            ["01", "SCAN", "Pelanggan memindai QR Code di meja."],
            ["02", "BROWSE", "Menu digital terbuka di smartphone."],
            ["03", "ORDER", "Pilih menu lalu kirim pesanan."],
            ["04", "CONFIRM", "Detail pesanan dan instruksi pembayaran diteruskan."],
            ["05", "SERVE", "Pihak usaha memproses dan menyiapkan pesanan."],
          ].map(([number, title, description], index) => (
            <div className={styles.flowStep} key={number}>
              <div className={styles.flowLine}>{index < 4 ? <span /> : null}</div>
              <span className={styles.flowNumber}>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.benefitSection} ${styles.container}`}>
        <div className={styles.benefitPanel}>
          <div className={styles.benefitLead}>
            <span className={styles.eyebrow}>05 — VALUE</span>
            <h2>Built around<br /><em>real F&amp;B problems.</em></h2>
            <p>Q-Order bukan sekadar memindahkan menu ke layar. Tujuannya adalah membuat alur ordering terasa lebih masuk akal.</p>
          </div>
          <div className={styles.benefitList}>
            {benefits.map(([title, description], index) => (
              <article key={title} className={styles.benefitItem}>
                <span>0{index + 1}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
                <Icon name="check" size={18} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.twoSideSection} ${styles.container}`}>
        <SectionHeading
          eyebrow="06 — MADE FOR BOTH SIDES"
          title="Customer gets simplicity. Merchant gets structure."
          align="center"
        />
        <div className={styles.audienceGrid}>
          <article className={`${styles.audienceCard} ${styles.customerCard}`}>
            <div className={styles.audienceHeader}>
              <span className={styles.audienceIcon}><Icon name="users" size={21} /></span>
              <span className={styles.audienceLabel}>FOR CUSTOMERS</span>
            </div>
            <h3>Your order,<br /><em>on your terms.</em></h3>
            <p>Mulai dari memilih menu hingga menerima informasi pesanan, semuanya dibuat lebih praktis dari smartphone.</p>
            <div className={styles.audienceChecks}>
              {["No unnecessary queue", "Digital menu access", "QR self-ordering", "Scheduled pre-order", "Order info via WhatsApp"].map((item) => (
                <span key={item}><Icon name="check" size={15} /> {item}</span>
              ))}
            </div>
          </article>
          <article className={`${styles.audienceCard} ${styles.merchantCard}`}>
            <div className={styles.audienceHeader}>
              <span className={styles.audienceIcon}><Icon name="store" size={21} /></span>
              <span className={styles.audienceLabel}>FOR F&amp;B BUSINESSES</span>
            </div>
            <h3>A smoother way<br /><em>to run orders.</em></h3>
            <p>Gunakan ordering digital untuk membantu mengurangi ketergantungan pada pencatatan manual dan antrean kasir.</p>
            <div className={styles.audienceChecks}>
              {["More structured orders", "Less manual recording", "Flexible ordering channels", "Easier customer flow", "Digital-ready operation"].map((item) => (
                <span key={item}><Icon name="check" size={15} /> {item}</span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className={`${styles.useCaseSection} ${styles.container}`}>
        <SectionHeading
          eyebrow="07 — WHERE Q-ORDER FITS"
          title="Built for everyday F&amp;B operations."
          description="Q-Order dapat diterapkan pada berbagai jenis bisnis kuliner yang ingin membuat proses pemesanan lebih digital dan terstruktur."
        />
        <div className={styles.useCaseGrid}>
          {useCases.map((item) => (
            <article className={styles.useCase} key={item.title}>
              <span className={styles.useCaseIcon}><Icon name={item.icon} size={22} /></span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className={styles.caseArrow}><Icon name="arrowUp" size={17} /></span>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className={`${styles.aboutSection} ${styles.container}`}>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutVisual}>
            <div className={styles.aboutStamp}><span>Q</span><strong>ORDER</strong><small>BUILT BY Q ORDER</small></div>
            <div className={styles.aboutLines}>
              
            </div>
            <div className={styles.aboutMiniCards}>
              <span>OBSERVE</span><span>BUILD</span><span>IMPROVE</span>
            </div>
          </div>
          <div className={styles.aboutCopy}>
            <span className={styles.eyebrow}>08 — ABOUT US</span>
            <h2>Technology built by students, designed for real problems.</h2>
            <p>
              Kominfo UBSI adalah tim mahasiswa Informatika Universitas Bina Sarana Informatika yang mengembangkan Q-Order sebagai bentuk penerapan ilmu teknologi ke dalam solusi digital yang memiliki manfaat nyata bagi operasional bisnis F&amp;B.
            </p>
            <p>
              Berangkat dari observasi terhadap antrean, pencatatan manual, dan bottleneck pada kasir, kami membangun Q-Order sebagai platform yang menghubungkan pelanggan dan pelaku usaha melalui proses ordering yang lebih sederhana.
            </p>
            <div className={styles.aboutValues}>
              <span><Icon name="target" size={16} /> Solutive</span>
              <span><Icon name="spark" size={16} /> Practical</span>
              <span><Icon name="layers" size={16} /> Digital-first</span>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.visionSection} ${styles.container}`}>
        <div className={styles.visionCard}>
          <div>
            <span className={styles.eyebrow}>09 — VISION</span>
            <h2>Menjadi platform sistem pemesanan makanan digital pilihan utama yang membantu memodernisasi operasional UMKM.</h2>
          </div>
          <div className={styles.missionBlock}>
            <span className={styles.eyebrow}>MISSION</span>
            <div className={styles.missionList}>
              <span>01 <b>Teknologi simpel &amp; andal</b></span>
              <span>02 <b>Mendukung digitalisasi UMKM kuliner</b></span>
              <span>03 <b>Meningkatkan efisiensi waktu konsumen</b></span>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.teamSection} ${styles.container}`}>
        <SectionHeading
          eyebrow="10 — THE TEAM"
          title="Meet the team behind Q-Order."
          description="Setiap peran memiliki fokus berbeda, tetapi semuanya bergerak menuju satu tujuan: membangun solusi ordering yang dapat dipahami dan digunakan."
        />
        <div className={styles.teamGrid}>
          {team.map(([name, role, description], index) => (
            <article className={styles.teamCard} key={name}>
              <div className={styles.avatar}>{name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</div>
              <span className={styles.teamIndex}>0{index + 1}</span>
              <h3>{name}</h3>
              <span className={styles.teamRole}>{role}</span>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.finalCta} ${styles.container}`}>
        <div className={styles.finalCtaInner}>
          <div className={styles.finalOrb} />
          <span className={styles.eyebrow}>READY TO MOVE BEYOND THE QUEUE?</span>
          <h2>Let&apos;s make ordering<br /><em>less complicated.</em></h2>
          <p>Jelajahi pengalaman Q-Order dan lihat bagaimana proses pemesanan dapat dibuat lebih sederhana.</p>
          <div className={styles.heroActions}>
            <a className={styles.lightButton} href="/demo-1"><p style={{ color: 'black' }}>Try Q-Order <Icon name="arrowUp" size={17} /></p></a>
            <a className={styles.finalTextButton} href="#top">Back to top <Icon name="arrowUp" size={15} /></a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`${styles.footerInner} ${styles.container}`}>
          <div className={styles.footerBrand}>
            <Logo />
            <p>Digital ordering platform for modern F&amp;B.</p>
          </div>
          <div className={styles.footerColumns}>
            <div>
              <span>PRODUCT</span>
              <a href="#features">Features</a>
              <a href="#flow">How It Works</a>
              <a href="/demo-1">Live Demo</a>
            </div>
            <div>
              <span>COMPANY</span>
              <a href="#about">About Us</a>
              <a href="#why">Why Q-Order</a>
              <a href="#top">Our Team</a>
            </div>
            <div>
              <span>PROJECT</span>
              <a href="https://github.com/WhtDrc/q-order-ubsi" target="_blank" rel="noreferrer">GitHub</a>
              <a href="/demo-1">Demo</a>
            </div>
          </div>
        </div>
        <div className={`${styles.footerBottom} ${styles.container}`}>
          <span>© 2026 Kominfo UBSI. All rights reserved.</span>
          <span>A student-developed technology project by UBSI Informatics students.</span>
        </div>
      </footer>
    </main>
  );
}
