/* ─────────────────────────────────────────────────────────────
   SUMAN MAITI — ACADEMIC SITE · script.js
   ───────────────────────────────────────────────────────────── */
'use strict';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root = document.documentElement;

/* ── Toast & clipboard ─────────────────────────────────────── */
const toastEl = $('#toast');
let toastTimer;
function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2000);
}

async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        const ta = Object.assign(document.createElement('textarea'), { value: text });
        ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        const ok = document.execCommand('copy');
        ta.remove();
        return ok;
    }
}

/* ── Theme (follows system unless the visitor picks one) ───── */
const themeBtn = $('#themeToggle');
const isDark = () => root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;

function syncThemeIcon() {
    themeBtn.firstElementChild.className = isDark() ? 'fas fa-sun' : 'fas fa-moon';
}
syncThemeIcon();
themeBtn.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch {}
    syncThemeIcon();
});

/* ── Mobile menu ───────────────────────────────────────────── */
const nav = $('#nav');
const navLinks = $('#navLinks');
const menuBtn = $('#menuBtn');

function setMenu(open) {
    navLinks.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.firstElementChild.className = open ? 'fas fa-xmark' : 'fas fa-bars';
}
menuBtn.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
navLinks.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('click', e => { if (!nav.contains(e.target)) setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

/* ── Active section in nav ─────────────────────────────────── */
const linkFor = Object.fromEntries($$('a[href^="#"]', navLinks).map(a => [a.hash.slice(1), a]));
const tracked = $$('main section[id]').filter(s => linkFor[s.id]);

function updateActive() {
    let current = '';
    for (const s of tracked) if (s.offsetTop - 100 <= scrollY) current = s.id;
    for (const [id, a] of Object.entries(linkFor)) a.classList.toggle('active', id === current);
}
addEventListener('scroll', updateActive, { passive: true });
updateActive();

/* ── Publication filter ────────────────────────────────────── */
const pubEmpty = $('#pubEmpty');

$$('.filter-btn').forEach(btn => btn.addEventListener('click', () => {
    $$('.filter-btn').forEach(b => {
        b.classList.toggle('is-on', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
    });
    const f = btn.dataset.filter;
    $$('.pub').forEach(p => { p.hidden = f !== 'all' && p.dataset.type !== f; });
    // Hide group headings with nothing left under them
    $$('.pubs').forEach(list => {
        const empty = !$$('.pub', list).some(p => !p.hidden);
        list.hidden = empty;
        list.previousElementSibling.hidden = empty;
    });
    pubEmpty.hidden = $$('.pub').some(p => !p.hidden);
}));

// Highlight a paper when jumped to from the Research section
document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#pub-"]');
    const target = a && document.getElementById(a.hash.slice(1));
    if (!target) return;
    if (target.hidden) $('.filter-btn[data-filter="all"]').click();
    target.classList.remove('flash');
    void target.offsetWidth;
    target.classList.add('flash');
});

/* ── BibTeX ────────────────────────────────────────────────── */
const bibModal = $('#bibModal');
const bibText = $('#bibText');

function toBib(p) {
    const title = $('.pub-title', p).textContent.trim();
    const authors = $('.pub-authors', p).textContent.trim().split(/\s*,\s*/).join(' and ');
    const type = p.dataset.bibType;
    const venueField = type === 'article' ? 'journal' : type === 'misc' ? 'howpublished' : 'booktitle';
    const fields = [
        ['title', `{${title}}`],
        ['author', authors],
        [venueField, p.dataset.bibVenue],
        ['year', p.dataset.bibYear],
    ].filter(([, v]) => v);
    const w = Math.max(...fields.map(([k]) => k.length));
    return `@${type}{${p.dataset.bibKey},\n` +
        fields.map(([k, v]) => `  ${k.padEnd(w)} = {${v}}`).join(',\n') + '\n}';
}

$$('[data-bib]').forEach(btn => btn.addEventListener('click', () => {
    bibText.textContent = toBib(btn.closest('.pub'));
    bibModal.showModal();
}));
$('#copyBib').addEventListener('click', async () => {
    if (await copyText(bibText.textContent)) toast('BibTeX copied');
});

/* ── Dialogs & video player ────────────────────────────────── */
$$('dialog.modal').forEach(d => d.addEventListener('click', e => {
    if (e.target === d || e.target.closest('[data-close]')) d.close();
}));

const videoModal = $('#videoModal');
const videoFrame = $('#videoFrame');
document.addEventListener('click', e => {
    const v = e.target.closest('[data-video]');
    if (!v || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    videoFrame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${v.dataset.video}?autoplay=1&rel=0" title="YouTube video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    videoModal.showModal();
});
videoModal.addEventListener('close', () => { videoFrame.innerHTML = ''; });

/* ── Copy email, footer year ───────────────────────────────── */
const copyEmail = $('#copyEmail');
copyEmail.addEventListener('click', async () => {
    if (await copyText(copyEmail.dataset.email)) toast('Email address copied');
});
$('#year').textContent = new Date().getFullYear();
