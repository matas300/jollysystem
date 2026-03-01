/* ══════════════════════════════════════════════════
   JOLLY SYSTEM – main.js
   Header scroll · Open status · Today highlight ·
   Mobile menu · Smooth scroll · Footer year
══════════════════════════════════════════════════ */

'use strict';

/* ─── Footer year ────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


/* ─── Header scroll class ────────────────────────── */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 20);
}, { passive: true });


/* ─── Active nav link on scroll ──────────────────── */
const sections = [...document.querySelectorAll('section[id]')];
const navLinks  = [...document.querySelectorAll('.nav-link[data-s]')];

function updateActiveLink() {
  let current = '';
  sections.forEach(sec => {
    if (sec.getBoundingClientRect().top <= 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('is-active', link.dataset.s === current);
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();


/* ─── Open / Closed status ───────────────────────── */
(function () {
  const statusEl = document.getElementById('openStatus');
  if (!statusEl) return;

  const now  = new Date();
  const day  = now.getDay();           // 0 = Domenica, 6 = Sabato
  const mins = now.getHours() * 60 + now.getMinutes();
  const open = 8 * 60;                 // 08:00
  const close = 20 * 60;              // 20:00

  // Aperti: martedì (2) – sabato (6), 08:00–20:00
  const isOpen = day >= 2 && day <= 6 && mins >= open && mins < close;

  statusEl.textContent = isOpen ? 'Siamo aperti' : 'Siamo chiusi';
  statusEl.className   = 'topbar-status ' + (isOpen ? 'is-open' : 'is-closed');
})();


/* ─── Highlight today's row in orari ────────────── */
(function () {
  const dayNames = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
  const today    = dayNames[new Date().getDay()];

  document.querySelectorAll('.hours-row[data-day]').forEach(row => {
    if (row.dataset.day === today) {
      row.classList.add('hours-row--today');
    }
  });
})();


/* ─── Mobile menu ────────────────────────────────── */
const hamburger  = document.querySelector('.hamburger');
const mobileNav  = document.getElementById('mobile-nav');
const backdrop   = document.querySelector('.mobile-backdrop');
const closeBtn   = document.querySelector('.mobile-nav__close');

function openMenu() {
  hamburger.classList.add('is-open');
  mobileNav.classList.add('is-open');
  backdrop.classList.add('is-open');
  mobileNav.setAttribute('aria-hidden', 'false');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('is-open');
  mobileNav.classList.remove('is-open');
  backdrop.classList.remove('is-open');
  mobileNav.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () =>
  mobileNav.classList.contains('is-open') ? closeMenu() : openMenu()
);
closeBtn.addEventListener('click', closeMenu);
backdrop.addEventListener('click', closeMenu);

document.querySelectorAll('.mobile-link').forEach(link =>
  link.addEventListener('click', closeMenu)
);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeMenu();
});


/* ─── Cookie banner ─────────────────────────────── */
(function () {
  const banner = document.getElementById('cookieBanner');
  const btn    = document.getElementById('cookieAccept');
  if (!banner || !btn) return;

  if (localStorage.getItem('cookieOk')) {
    banner.classList.add('is-hidden');
  }

  btn.addEventListener('click', function () {
    localStorage.setItem('cookieOk', '1');
    banner.classList.add('is-hidden');
  });
})();


/* ─── Smooth scroll ──────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const navH     = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'))     || 60;
    const topbarH  = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--topbar-h'))  || 0;
    const offsetY  = target.getBoundingClientRect().top + window.scrollY - navH - topbarH;

    window.scrollTo({ top: offsetY, behavior: 'smooth' });
  });
});
