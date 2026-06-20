// ============================================================
// thewhizvisuals — main.js
// ============================================================

document.getElementById('year').textContent = new Date().getFullYear();

/* ----------------------------------------------------------
   Work data
   Replace `img` with a real image path (e.g. "assets/images/street-01.jpg")
   to swap a placeholder plate for an actual photograph.
   tone: a CSS gradient angle/stop pairing used while img is empty.
---------------------------------------------------------- */
const WORKS = [
  { title:"Backstreet, Sidi El Houari", cat:"photography", tag:"Street", h:1.3, img:"" },
  { title:"Concrete Line",              cat:"photography", tag:"Architecture", h:1.0, img:"" },
  { title:"NOIR — Festival Poster",     cat:"posters",      tag:"Poster", h:1.45, img:"" },
  { title:"Atlas Coffee Co.",           cat:"logos",        tag:"Logo", h:0.9, img:"" },
  { title:"Coastal Drive, 6PM",         cat:"photography", tag:"Cars", h:1.2, img:"" },
  { title:"Grain & Shadow",             cat:"editing",      tag:"Color Grade", h:1.0, img:"" },
  { title:"Front de Mer",               cat:"photography", tag:"Architecture", h:1.15, img:"" },
  { title:"MERIDIAN Identity",          cat:"logos",        tag:"Logo", h:0.85, img:"" },
  { title:"Souk, Early Light",          cat:"photography", tag:"Street", h:1.35, img:"" },
  { title:"RUPTURE — Album Art",        cat:"posters",      tag:"Poster", h:1.5, img:"" },
  { title:"E36 in the Rain",            cat:"photography", tag:"Cars", h:1.1, img:"" },
  { title:"Dust & Daylight",            cat:"editing",      tag:"Retouch", h:0.95, img:"" },
  { title:"Vertical City",              cat:"photography", tag:"Architecture", h:1.4, img:"" },
  { title:"HALA Restaurant Mark",       cat:"logos",        tag:"Logo", h:0.9, img:"" },
  { title:"Tonal Study No.3",           cat:"editing",      tag:"Color Grade", h:1.05, img:"" },
  { title:"Esplanade, Blue Hour",       cat:"photography", tag:"Street", h:1.25, img:"" },
];

const FEATURED_IDX = [0,2,4,7,8,9,10,12,15];

/* Deterministic but varied plate gradients so the contact-sheet
   doesn't read as repeated/templated even before real images land. */
const PLATE_THEMES = [
  "linear-gradient(155deg,#262019 0%,#15120d 55%,#0a0a0a 100%)",
  "linear-gradient(160deg,#201c22 0%,#121016 55%,#0a0a0a 100%)",
  "linear-gradient(150deg,#231e16 0%,#161109 55%,#0a0a0a 100%)",
  "linear-gradient(165deg,#1d2320 0%,#0f1411 55%,#0a0a0a 100%)",
  "linear-gradient(145deg,#241a16 0%,#160f0c 55%,#0a0a0a 100%)",
  "linear-gradient(170deg,#1e1c24 0%,#100f15 55%,#0a0a0a 100%)",
];
function plateFor(i){
  const base = PLATE_THEMES[i % PLATE_THEMES.length];
  const glow = `radial-gradient(120% 90% at ${20+ (i*17)%60}% ${10+(i*13)%40}%, rgba(201,168,118,${0.05 + (i%4)*0.02}), transparent 60%)`;
  return `${glow}, ${base}`;
}

/* ----------------------------------------------------------
   Render masonry grid
---------------------------------------------------------- */
const masonry = document.getElementById('masonryGrid');
WORKS.forEach((w, i) => {
  const el = document.createElement('div');
  el.className = 'grid-item';
  el.dataset.cat = w.cat;
  const plateStyle = w.img
    ? `background-image:url('${w.img}'); background-size:cover; background-position:center;`
    : `background:${plateFor(i)};`;
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', `${w.title} — ${w.cat}`);
  el.innerHTML = `
    <div class="grid-plate" style="${plateStyle} aspect-ratio:${(0.78/w.h).toFixed(2)};">
      <span class="grid-tag">${w.tag}</span>
      <div class="grid-caption">
        <div class="grid-caption-title">${w.title}</div>
        <div class="grid-caption-cat">${w.cat}</div>
      </div>
    </div>`;
  masonry.appendChild(el);
});

/* ----------------------------------------------------------
   Render featured grid
---------------------------------------------------------- */
const featuredGrid = document.getElementById('featuredGrid');
FEATURED_IDX.forEach((idx, n) => {
  const w = WORKS[idx];
  const el = document.createElement('div');
  el.className = 'feat-item';
  const plateStyle = w.img
    ? `background-image:url('${w.img}'); background-size:cover; background-position:center;`
    : `background:${plateFor(idx+3)};`;
  el.innerHTML = `
    <div class="feat-plate" style="${plateStyle}"></div>
    <span class="feat-num">F.${String(n+1).padStart(2,'0')}</span>
    <div class="feat-info">
      <div class="feat-title">${w.title}</div>
      <div class="feat-cat">${w.cat}</div>
    </div>`;
  featuredGrid.appendChild(el);
});

/* ----------------------------------------------------------
   Filter bar
---------------------------------------------------------- */
const filterBtns = document.querySelectorAll('.filter-btn');
const gridItems = document.querySelectorAll('.grid-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    gridItems.forEach(item => {
      const match = f === 'all' || item.dataset.cat === f;
      item.classList.toggle('hidden', !match);
    });
  });
});

/* ----------------------------------------------------------
   Scroll reveal (IntersectionObserver)
---------------------------------------------------------- */
const revealTargets = document.querySelectorAll('.reveal, .grid-item, .feat-item');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealTargets.forEach(t => io.observe(t));

/* ----------------------------------------------------------
   Nav: scrolled state + mobile menu
---------------------------------------------------------- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive:true });

const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ----------------------------------------------------------
   Before / After slider
---------------------------------------------------------- */
const baSlider = document.getElementById('baSlider');
const baBefore = document.getElementById('baBefore');
const baHandle = document.getElementById('baHandle');
let baDragging = false;

function setBaPosition(clientX){
  const rect = baSlider.getBoundingClientRect();
  let pct = ((clientX - rect.left) / rect.width) * 100;
  pct = Math.max(2, Math.min(98, pct));
  baBefore.style.width = pct + '%';
  baHandle.style.left = pct + '%';
}

baSlider.addEventListener('pointerdown', (e) => {
  baDragging = true;
  baSlider.setPointerCapture(e.pointerId);
  setBaPosition(e.clientX);
});
baSlider.addEventListener('pointermove', (e) => {
  if (baDragging) setBaPosition(e.clientX);
});
['pointerup','pointercancel','pointerleave'].forEach(ev =>
  baSlider.addEventListener(ev, () => { baDragging = false; })
);

// Gentle auto-demo sweep on first view, then hand control to the user
let baAutoPlayed = false;
const baObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !baAutoPlayed){
      baAutoPlayed = true;
      let t = 0;
      const sweep = setInterval(() => {
        t += 1;
        const pct = 50 + Math.sin(t/10) * 18;
        baBefore.style.width = pct + '%';
        baHandle.style.left = pct + '%';
        if (t > 60) clearInterval(sweep);
      }, 16);
    }
  });
}, { threshold:0.4 });
baObserver.observe(baSlider);

/* ----------------------------------------------------------
   Viewfinder cursor (desktop only, hover-capable)
---------------------------------------------------------- */
if (window.matchMedia('(hover:hover)').matches){
  const vf = document.getElementById('viewfinder');
  let vfActive = false;
  window.addEventListener('mousemove', (e) => {
    vf.style.left = e.clientX + 'px';
    vf.style.top = e.clientY + 'px';
    if (!vfActive){ vf.classList.add('active'); vfActive = true; }
  });
  document.querySelectorAll('.grid-plate, .feat-plate, .ba-slider, .contact-ig').forEach(el => {
    el.addEventListener('mouseenter', () => vf.style.transform = 'translate(-50%,-50%) scale(1.5)');
    el.addEventListener('mouseleave', () => vf.style.transform = 'translate(-50%,-50%) scale(1)');
  });
  window.addEventListener('mouseleave', () => { vf.classList.remove('active'); vfActive = false; });
}

/* ----------------------------------------------------------
   Loader
---------------------------------------------------------- */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('done');
  }, 500);
});
// Fallback in case 'load' is delayed
setTimeout(() => document.getElementById('loader').classList.add('done'), 2200);
