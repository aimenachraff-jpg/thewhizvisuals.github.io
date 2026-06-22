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
  { title:"Backstreet, Sidi El Houari", cat:"photography", tag:"Street", h:1.3, img:"assets/images/angleaftr.jpg" },
  { title:"USTO MB",              cat:"photography", tag:"Architecture", h:1.0, img:"assets/images/usto.JPG" },
  { title:"beauty of mosta Poster",     cat:"posters",      tag:"Poster", h:0.85, img:"assets/images/postermosta.JPG" },
  { title:"Code Genius Club",           cat:"logos",        tag:"Logo", h:0.9, img:"assets/images/cgcb.PNG" },
  { title:"Coastal Drive, 6PM",         cat:"photography", tag:"Street", h:1.2, img:"assets/images/showfull.jpg" },
  { title:"Golden Salamander",             cat:"editing",      tag:"Color Grade", h:1.0, img:"assets/images/mosta2.JPG" },
  { title:"Relizane's architecture",               cat:"photography", tag:"Architecture", h:1.15, img:"assets/images/relizanemosque.JPG" },
  { title:"CODE GENIUS CLUB LIGHT V",          cat:"logos",        tag:"Logo", h:0.85, img:"assets/images/IMG_4846.PNG" },
  { title:"Souk, Early Light",          cat:"photography", tag:"Street", h:1.35, img:"assets/images/cpa.jpg" },
  { title:"AI house bachground poster",        cat:"posters",      tag:"Poster", h:0.7, img:"assets/images/aihp.PNG" },
  { title:"mercedes tire under sunlights",            cat:"photography", tag:"Cars", h:1.1, img:"assets/images/goldenmerc.jpg" },
  { title:"sinlight refletion",            cat:"editing",      tag:"Retouch", h:0.95, img:"assets/images/favwall.jpeg" },
  { title:"historic grand poste ORAN",              cat:"photography", tag:"Architecture", h:1.4, img:"assets/images/historic grand poste ORAN.JPG" },
  { title:"AI House Relizane University",       cat:"logos",        tag:"Logo", h:0.9, img:"assets/images/aih.PNG" },
  { title:"Bored flowers",           cat:"editing",      tag:"Color Grade", h:1.05, img:"assets/images/floweraftr.JPG" },
  { title:"my beautiful fish ",           cat:"editing",      tag:"Color Grade", h:1.05, img:"assets/images/favfish.JPG" },
  { title:"long exposure streeshot",       cat:"photography", tag:"Street", h:1.25, img:"assets/images/long expo.JPG" },
  { title:"Beatiful Megane",              cat:"photography", tag:"Cars", h:1.4, img:"assets/images/amine.JPG" },
  { title:"Bravo ",              cat:"photography", tag:"Cars", h:0.7, img:"assets/images/abdoucar.JPG" },
  { title:"Blue Skin '307' ",              cat:"photography", tag:"Cars", h:1.4, img:"assets/images/307SHOT.JPG" },
  { title:"Bijaia's Beauty", cat:"photography", tag:"Street", h:1.3, img:"assets/images/bj7.JPG" },
  { title:"quite Boat", cat:"photography", tag:"Nature", h:1.3, img:"assets/images/babor.JPG" },
  { title:"My cat CJ", cat:"photography", tag:"animals", h:1.3, img:"assets/images/cataftr.jpg" },
  { title:"silver Legs huh!", cat:"photography", tag:"Cars", h:1.3, img:"assets/images/merc1after.JPG" },
  { title:"CONTROLLER ", cat:"photography", tag:"Nature", h:1.3, img:"assets/images/ps5cont.JPG" },
  { title:"Shot during exam ", cat:"photography", tag:"Nature", h:1.3, img:"assets/images/ustoclass.JPG" },
  { title:"cloudy night ", cat:"photography", tag:"Street", h:1.3, img:"assets/images/smithnight.jpg" },
  { title:"THE SMITH ", cat:"photography", tag:"Nature", h:1.3, img:"assets/images/smith.JPG" },
  { title:"USTO vibe ", cat:"photography", tag:"Nature", h:1.3, img:"assets/images/ustostares.JPG" },
  { title:"River and Nature ", cat:"editing", tag:"Nature", h:1.3, img:"assets/images/abdoushot.JPG" },
  { title:"Cloud obsession ", cat:"photography", tag:"Nature", h:1.3, img:"assets/images/skyvint.JPG" },
  { title:"KAWASAKI ", cat:"photography", tag:"Nature", h:1.3, img:"assets/images/kawasaki.JPG" },
  { title:"RUBI remaked",           cat:"logos",        tag:"Logo", h:0.9, img:"assets/images/IMG_2111.JPG" },
  { title:"11th dec poster ",        cat:"posters",      tag:"Poster", h:0.85, img:"assets/images/IMG_2109.jpg" },
  { title:"Hydro club poster r",        cat:"posters",      tag:"Poster", h:0.85, img:"assets/images/IMG_2110.jpg" },

  

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
