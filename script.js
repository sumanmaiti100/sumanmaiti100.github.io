/* ─────────────────────────────────────────────────────────────────
   SUMAN MAITI — ACADEMIC PORTFOLIO
   script.js
   ───────────────────────────────────────────────────────────────── */

'use strict';

// ── 1. THEME (dark / light) ──────────────────────────────────────

const html        = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');

function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', theme);
}

// Load persisted preference (default: light)
applyTheme(localStorage.getItem('theme') || 'light');

themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
});

// ── 2. MOBILE HAMBURGER MENU ─────────────────────────────────────

const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
});

// Close menu when a nav link is clicked
navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Close menu on outside click
document.addEventListener('click', e => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// ── 3. NAVBAR SCROLL SHADOW ──────────────────────────────────────

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── 4. ACTIVE NAV LINK HIGHLIGHTING ─────────────────────────────

const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');
const navHeight = parseInt(getComputedStyle(html).getPropertyValue('--nav-h') || '64', 10);

function updateActiveLink() {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - navHeight - 40) {
            current = sec.id;
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${current}`
        );
    });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

// ── 5. SCROLL REVEAL (IntersectionObserver) ──────────────────────

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── 6. PUBLICATION FILTER ────────────────────────────────────────

const filterBtns = document.querySelectorAll('.filter-btn');
const pubCards   = document.querySelectorAll('.pub-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Toggle active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        pubCards.forEach(card => {
            const match = filter === 'all' || card.dataset.type === filter;
            if (match) {
                card.classList.remove('hidden');
                // Re-trigger reveal if not yet visible
                if (!card.classList.contains('visible')) {
                    card.classList.add('visible');
                }
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ── 7. FOOTER YEAR ───────────────────────────────────────────────

const footerYear = document.getElementById('footerYear');
if (footerYear) footerYear.textContent = new Date().getFullYear();

// ── 8. VISITOR COUNTER (CountAPI) ────────────────────────────────

const visitorCount = document.getElementById('visitorCount');
if (visitorCount) {
    fetch('https://api.countapi.xyz/hit/sumanmaiti100.github.io/visits')
        .then(res => res.json())
        .then(data => {
            visitorCount.textContent = `${data.value} views`;
        })
        .catch(err => {
            console.error('Error fetching visitor count:', err);
            visitorCount.textContent = '';
        });
}
