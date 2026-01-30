// --- INDUSTRY DATABASE & STRATEGY ---
const INDUSTRY_DATA = {
  "Bakery / Donut Shop": { layout: "L-01", cat: "Food" },
  "Brewery / Distillery / Winery": { layout: "L-01", cat: "Food" },
  "Coffee Shop / Café": { layout: "L-01", cat: "Food" },
  "Art Gallery": { layout: "L-19", cat: "Art" },
  "Boutique / Jewelry": { layout: "L-20", cat: "Retail" },
  "Automotive": { layout: "L-21", cat: "Service" },
  "Law / Financial": { layout: "L-23", cat: "Service" },
  "Tech Startup": { layout: "L-24", cat: "Tech" },
  "SaaS": { layout: "L-24", cat: "Tech" },
  "Photography": { layout: "L-19", cat: "Art" },
  "Vacation Rentals": { layout: "L-01", cat: "Travel" }
};

const LAYOUT_MAP = {
  "L-01": ["header", "heroVisual:Welcome", "textBlock", "gridMasonry", "cta:Book Now", "footer"],
  "L-19": ["header", "heroModern:Portfolio", "heroVisual", "gridMasonry", "footer"],
  "L-20": ["header", "heroVisual:New Arrivals", "grid2", "grid2", "cta:Shop All", "footer"],
  "L-21": ["header", "heroModern:Trusted Service", "features", "listMenu", "footer"],
  "L-23": ["header", "heroModern:Corporate", "textBlock", "grid3", "footer"],
  "L-24": ["header", "heroModern:Search...", "features", "listMenu", "footer"],
  "default": ["header", "heroModern", "textBlock", "grid2", "footer"]
};

// --- CSS ART RENDERERS ---
const RENDERERS = {
  header: () => `<div class="w-header"><div class="w-logo"></div><div class="w-nav"><span></span><span></span><span></span></div></div>`,
  heroModern: (txt="Learn More") => `<div class="w-hero modern"><div class="w-h1"></div><div class="w-sub"></div><div class="w-btn">${txt}</div></div>`,
  heroVisual: (txt="Explore") => `<div class="w-hero visual"><div class="w-h1"></div><div class="w-btn accent">${txt}</div></div>`,
  grid2: () => `<div class="w-grid-2">${Array(4).fill('<div class="w-card"><div class="w-card-img"></div><div class="w-card-txt"><div class="w-line"></div></div></div>').join('')}</div>`,
  grid3: () => `<div class="w-grid-3">${Array(6).fill('<div class="w-card" style="height:40px; background:#e0e0e0;"></div>').join('')}</div>`,
  gridMasonry: () => `<div class="w-masonry">${Array(6).fill('').map((_,i) => `<div class="w-m-item" style="height:${80 + (i%3)*40}px;"></div>`).join('')}</div>`,
  listMenu: () => `<div class="w-list">${Array(4).fill('<div class="w-list-item"><div class="w-line" style="width:40%"></div><div class="w-line" style="width:10%"></div></div>').join('')}</div>`,
  features: () => `<div class="w-grid-2" style="grid-template-columns:1fr 1fr 1fr">${Array(3).fill('<div style="text-align:center"><div style="width:30px;height:30px;background:#ddd;border-radius:50%;margin:0 auto 5px;"></div><div class="w-line" style="width:80%;margin:0 auto"></div></div>').join('')}</div>`,
  textBlock: () => `<div class="w-text-block"><div class="w-line" style="width:90%"></div><div class="w-line" style="width:95%"></div><div class="w-line" style="width:60%"></div></div>`,
  cta: (txt="Get Started") => `<div style="padding:30px; text-align:center; background:#eee;"><div class="w-h1" style="background:#222; width:50%; height:12px; margin:0 auto 10px;"></div><div class="w-btn accent">${txt}</div></div>`,
  footer: () => `<div class="w-footer"><div class="w-f-block"></div><div class="w-f-block" style="width:20%"></div></div>`
};

// --- ENGINE ---
function selectIndustry(name) {
  const data = INDUSTRY_DATA[name] || { layout: "default", cat: "Service" };
  const structure = LAYOUT_MAP[data.layout];
  const screen = document.getElementById('screen');
  screen.innerHTML = '';
  
  structure.forEach(blockStr => {
    const [funcName, arg] = blockStr.split(':');
    if(RENDERERS[funcName]) screen.insertAdjacentHTML('beforeend', RENDERERS[funcName](arg));
  });

  document.getElementById('strategyCard').classList.remove('hidden');
  document.getElementById('noteText').innerHTML = `For <b>${name}</b>, we use a strategy that prioritizes ${data.cat}-focused conversion points.`;
}

function filterIndustries(val) {
  const cloud = document.getElementById('tagCloud');
  cloud.innerHTML = '';
  Object.keys(INDUSTRY_DATA).filter(k => k.toLowerCase().includes(val.toLowerCase())).forEach(ind => {
    const t = document.createElement('div');
    t.className = 'tag';
    t.innerText = ind;
    t.onclick = () => selectIndustry(ind);
    cloud.appendChild(t);
  });
}

// Initial State
window.onload = () => filterIndustries('');
