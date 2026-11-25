document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  // ---- Hero timeline ----
  gsap.set('.nav-item', { y: -20, opacity: 0 });
  gsap.set('.reveal-text', { yPercent: 110, rotationX: 15, transformOrigin: '0% 100%' });
  gsap.set('.left-block', { x: -40, opacity: 0, filter: 'blur(10px)' });
  gsap.set('#bg-layer', { scale: 1.35, filter: 'blur(40px) brightness(0.15) saturate(0.6)' });
  gsap.set('.frame-border', { opacity: 0 });
  gsap.set('.frame-corner', { scale: 0, opacity: 0 });
  gsap.set('.frame-line', { scaleY: 0, transformOrigin: 'top' });
  gsap.set('.frame-line-h', { scaleX: 0, transformOrigin: 'left' });
  gsap.set('.scroll-cue', { opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.to('#bg-layer', { scale: 1.02, filter: 'blur(0px) brightness(1) saturate(0.85) contrast(1.03)', duration: 4, ease: 'power2.inOut' }, 0)
    .to('.frame-border', { opacity: 1, duration: 1.6 }, 0.8)
    .to('.frame-corner', { scale: 1, opacity: 1, duration: 1, stagger: 0.12, ease: 'back.out(1.7)' }, 1.0)
    .to('.frame-line', { scaleY: 1, duration: 2, ease: 'expo.inOut' }, 1.2)
    .to('.frame-line-h', { scaleX: 1, duration: 1.8, ease: 'expo.inOut' }, 1.4)
    .to('.nav-item', { y: 0, opacity: 1, duration: 1.2, stagger: 0.08, ease: 'expo.out' }, 1.6)
    .to('.left-block', { x: 0, opacity: 1, filter: 'blur(0px)', duration: 1.6, ease: 'power3.out' }, 2.0)
    .to('.reveal-text', { yPercent: 0, rotationX: 0, duration: 1.9, stagger: 0.18, ease: 'expo.out' }, 1.9)
    .to('.scroll-cue', { opacity: 1, duration: 1.2 }, 3.2)
    .to('#bg-layer', { x: '-1.5%', y: '-1%', duration: 12, ease: 'none', repeat: -1, yoyo: true }, 4);

  // ---- Hero background slider ----
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let slideIndex = 0;
  let slideTimer = null;

  function goToSlide(i) {
    slideIndex = i % slides.length;
    slides.forEach((s, idx) => s.classList.toggle('is-active', idx === slideIndex));
    dots.forEach((d, idx) => d.classList.toggle('is-active', idx === slideIndex));
  }
  function startSlideshow() {
    if (reduceMotion) return;
    clearInterval(slideTimer);
    slideTimer = setInterval(() => goToSlide(slideIndex + 1), 6000);
  }
  if (slides.length > 1) {
    startSlideshow();
    dots.forEach((dot, i) => dot.addEventListener('click', () => {
      goToSlide(i);
      startSlideshow();
    }));
    // Pause while the tab is in the background
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { clearInterval(slideTimer); slideTimer = null; }
      else startSlideshow();
    });
  }

  // Scroll-triggered section reveals
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.utils.toArray('section').forEach((sec) => {
      gsap.from(sec.querySelectorAll('h2, h3, p, li, .border'), {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.05, ease: 'power3.out',
        scrollTrigger: { trigger: sec, start: 'top 75%', once: true }
      });
    });
  }

  // ---- Portfolio gallery + lightbox ----
  const solar = [
    { f: 'IMG-20240313-WA0012.jpg', t: 'Residential Solar System', d: 'Rooftop solar array with battery storage, designed to keep a family home powered through the night.' },
    { f: 'IMG-20240313-WA0023.jpg', t: 'Hybrid Solar Installation', d: 'Hybrid inverter and lithium battery bank, blending grid supply with solar.' },
    { f: 'IMG-20240313-WA0035.jpg', t: 'Solar Inverter & Battery', d: 'Wall-mounted inverter with changeover and metering, neatly installed.' },
    { f: 'IMG-20240313-WA0042.jpg', t: 'Residential Solar System', d: 'Complete solar system with inverter, battery and smart metering for a Harare home.' },
    { f: 'IMG-20240313-WA0046.jpg', t: 'Commercial Solar Array', d: 'Rooftop panel installation for a commercial premises, sized to offset daytime load.' },
    { f: 'IMG-20240313-WA0053.jpg', t: 'Solar Upgrade', d: 'Upgraded panels and battery capacity to boost output on an existing system.' },
    { f: 'IMG-20240313-WA0057.jpg', t: 'Solar Maintenance', d: 'Routine inspection and maintenance of panels, inverter and wiring.' }
  ];
  const aircon = [
    { f: '128838200_3592121577514397_7036576690951244594_n.jpg', t: 'Commercial Air Conditioning', d: 'Split unit installation for an office space.' },
    { f: '134728411_119159786702073_7799540130585186870_n.jpg', t: 'Aircon Installation', d: 'Clean indoor unit install with tidy pipework.' },
    { f: '135135854_119159806702071_2244050210604304817_n.jpg', t: 'Aircon Servicing', d: 'Filter cleaning and gas top-up for optimal performance.' },
    { f: '135220030_119159876702064_3861415869406528030_n.jpg', t: 'Split System Install', d: 'Residential split aircon supplied and installed.' },
    { f: '135781599_119159856702066_183227685553813506_n.jpg', t: 'HVAC Installation', d: 'Commercial HVAC unit installation.' },
    { f: '78435454_2633307970062434_4146899960622743552_n.jpg', t: 'Aircon Repair', d: 'Fault diagnosis and repair on a wall-mounted unit.' },
    { f: '78633292_2654774364582461_2421768338356043776_n.jpg', t: 'Aircon Unit Install', d: 'Indoor unit mounted and commissioned.' },
    { f: '82180981_2753266124733284_8844608899769171968_n.jpg', t: 'Commercial HVAC', d: 'Ceiling cassette installation for a business premises.' },
    { f: '86313466_2811435625583000_1918751234756444160_n.jpg', t: 'Aircon Maintenance', d: 'Scheduled servicing to extend equipment lifespan.' },
    { f: 'WhatsApp Image 2023-11-25 at 22.34.00.jpg', t: 'Aircon Project', d: 'On-site air conditioning installation.' },
    { f: 'WhatsApp Image 2023-11-25 at 22.35.51.jpg', t: 'Aircon Project', d: 'Completed air conditioning installation.' }
  ];

  const arrival = [
    { f: 'WhatsApp Image 2026-11-14 at 6.17.48 PM (1).jpeg', t: 'Commercial VRF System', d: 'Multi-unit Midea V4 Plus commercial VRF outdoor condensing units mounted on a concrete plinth.' },
    { f: 'WhatsApp Image 2026-11-14 at 6.11.17 PM.jpeg', t: 'Ceiling Cassette Installation', d: 'Kansatech technicians installing a round commercial ceiling cassette air conditioning unit.' },
    { f: 'WhatsApp Image 2026-11-14 at 6.17.48 PM.jpeg', t: 'VRV Branch Selector & Piping', d: 'Daikin VRV branch selector box with insulated copper refrigerant piping on a commercial slab.' },
    { f: 'WhatsApp Image 2026-11-14 at 6.48.10 PM (1).jpeg', t: 'Commercial HVAC & Ducting', d: 'Ceiling cassette, air handling unit and galvanized spiral ductwork installed in a commercial space.' },
    { f: 'WhatsApp Image 2026-11-14 at 6.48.10 PM.jpeg', t: 'Retail HVAC Ductwork', d: 'Exposed spiral ducting and round air diffusers installed for a modern retail store.' },
    { f: 'WhatsApp Image 2026-11-14 at 6.48.11 PM (1).jpeg', t: 'Industrial Spiral Ducting', d: 'Large-scale commercial spiral ductwork and plenum transitions suspended from steel trusses.' },
    { f: 'WhatsApp Image 2026-11-14 at 6.53.12 PM.jpeg', t: 'Plant Room & Duct Risers', d: 'Commercial mechanical plant corridor with insulated chilled-water risers and galvanized ducting.' },
    { f: 'WhatsApp Image 2026-11-14 at 6.48.11 PM.jpeg', t: 'Inline Duct Extraction', d: 'Inline ventilation fan and spiral ducting neatly suspended from an acoustic ceiling.' },
    { f: 'WhatsApp Image 2026-11-14 at 6.48.10 PM (2).jpeg', t: 'Commercial Kitchen Extraction', d: 'Stainless steel kitchen exhaust canopy hood with overhead extraction fan and baffle filters.' },
    { f: 'WhatsApp Image 2026-11-14 at 6.48.11 PM (2).jpeg', t: 'Walk-In Cold Room', d: 'Insulated walk-in cold room with diamond-plate flooring and dual multi-fan evaporator units.' },
    { f: 'WhatsApp Image 2026-11-14 at 6.48.12 PM (1).jpeg', t: 'Commercial Kitchen Refrigeration', d: 'Stainless steel glass-door reach-in chillers and prep refrigeration in a commercial kitchen.' },
    { f: 'WhatsApp Image 2026-11-14 at 6.48.12 PM.jpeg', t: 'Retail Display Chillers', d: 'Multi-door glass-front commercial refrigeration bank for retail and supermarket display.' },
    { f: 'WhatsApp Image 2026-11-14 at 6.17.49 PM.jpeg', t: 'Split AC Servicing & Charging', d: 'Technician using manifold gauges to test and recharge a Samsung split air conditioning unit.' },
    { f: 'WhatsApp Image 2026-11-14 at 6.17.49 PM (1).jpeg', t: 'Deye Hybrid Solar Inverter', d: 'Wall-mounted Deye hybrid inverter with neat trunking, AC/DC protection boxes and system schematic.' }
  ];

  const items = [];
  arrival.forEach((x) => items.push({ ...x, dir: 'arrival' }));
  solar.forEach((x) => items.push({ ...x, dir: 'Solar' }));
  aircon.forEach((x) => items.push({ ...x, dir: 'Aircon' }));

  const layout = ['col-span-2 row-span-2', '', '', '', '', 'col-span-2', '', '', 'col-span-2 row-span-2'];

  const gallery = document.getElementById('gallery');
  if (gallery) {
    items.forEach((it, i) => {
      const tile = document.createElement('button');
      tile.className = 'group relative rounded-2xl overflow-hidden border border-white/10 text-left ' + (layout[i % layout.length] || '');
      tile.type = 'button';
      tile.innerHTML = `
        <img src="./assets/images/${it.dir}/${encodeURIComponent(it.f)}" alt="${it.t}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
        <span class="absolute bottom-3 left-3 right-3 text-sm font-medium pointer-events-none">${it.t}</span>`;
      tile.addEventListener('click', () => openLightbox(it));
      gallery.appendChild(tile);
    });
  }

  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbTitle = document.getElementById('lb-title');
  const lbDesc = document.getElementById('lb-desc');

  function openLightbox(it) {
    if (!lb) return;
    lbImg.src = `./assets/images/${it.dir}/${encodeURIComponent(it.f)}`;
    lbImg.alt = it.t;
    lbTitle.textContent = it.t;
    lbDesc.textContent = it.d;
    lb.classList.remove('hidden');
    lb.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lb) return;
    lb.classList.add('hidden');
    lb.classList.remove('flex');
    document.body.style.overflow = '';
  }
  document.getElementById('lb-close')?.addEventListener('click', closeLightbox);
  lb?.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeMobileMenu();
    }
  });

  // ---- Mobile navigation drawer ----
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  function closeMobileMenu() {
    if (!mobileMenu || !mobileMenuBtn) return;
    mobileMenu.classList.remove('is-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileMenu.classList.toggle('is-open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (e) => {
      if (mobileMenu.classList.contains('is-open') && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }
});
