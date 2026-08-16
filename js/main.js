/* =========================================================
   TEMPLE MARQUEE
   Reads Amavasai / Pournami / Festival dates directly from the
   tables in timings.html (#amavasai-table, #pournami-table,
   #festival-table). No event dates are duplicated here — this
   file only contains logic to read, parse and render them.
========================================================= */

function parseEventDate(dateStr) {
    if (!dateStr) return null;

    const parts = dateStr.trim().split('.');
    if (parts.length !== 3) return null;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (!day || !month || !year) return null;

    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        return null;
    }
    return date;
}

function extractEventsFromDoc(doc) {
    const events = [];

    doc.querySelectorAll('#amavasai-table tbody tr').forEach((row) => {
        const cells = row.querySelectorAll('td');
        if (cells.length < 3) return;

        const dateStr = cells[0].textContent.trim();
        const date = parseEventDate(dateStr);
        if (!date) return;

        events.push({
            type: 'amavasai',
            date,
            dateStr,
            tamilDate: cells[1].textContent.trim(),
            weekday: cells[2].textContent.trim(),
            house: cells[3] ? cells[3].textContent.trim() : ''
        });
    });

    doc.querySelectorAll('#pournami-table tbody tr').forEach((row) => {
        const cells = row.querySelectorAll('td');
        if (cells.length < 3) return;

        const dateStr = cells[0].textContent.trim();
        const date = parseEventDate(dateStr);
        if (!date) return;

        events.push({
            type: 'pournami',
            date,
            dateStr,
            tamilDate: cells[1].textContent.trim(),
            weekday: cells[2].textContent.trim()
        });
    });

    doc.querySelectorAll('#festival-table tbody tr').forEach((row) => {
        const cells = row.querySelectorAll('td');
        if (cells.length < 2) return;

        const dateStr = cells[0].textContent.trim();
        const date = parseEventDate(dateStr);
        if (!date) return;

        events.push({
            type: 'festival',
            date,
            dateStr,
            eventName: cells[1].textContent.trim(),
            tamilDate: cells[2] ? cells[2].textContent.trim() : '',
            weekday: cells[3] ? cells[3].textContent.trim() : ''
        });
    });

    return events;
}

async function loadTempleEvents() {
    const alreadyOnTimingsPage = document.getElementById('amavasai-table') || document.getElementById('pournami-table');
    if (alreadyOnTimingsPage) {
        return extractEventsFromDoc(document);
    }

    try {
        const response = await fetch('timings.html');
        if (!response.ok) throw new Error('timings.html fetch failed');
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return extractEventsFromDoc(doc);
    } catch (error) {
        return [];
    }
}

function getUpcomingEvents(events, count) {
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return events
        .filter((event) => event.date.getTime() >= todayStart.getTime())
        .sort((a, b) => a.date - b.date)
        .slice(0, count);
}

function createMarqueeSpan(className, text) {
    const span = document.createElement('span');
    if (className) span.className = className;
    span.textContent = text;
    return span;
}

function buildEventItem(event) {
    const item = document.createElement('span');
    item.className = 'marquee-item';

    const iconByType = { amavasai: '🌑', pournami: '🌕', festival: '🎉' };
    const labelByType = { amavasai: 'அமாவாசை', pournami: 'பௌர்ணமி', festival: 'திருவிழா' };

    item.appendChild(createMarqueeSpan('marquee-label', `${iconByType[event.type]} ${labelByType[event.type]}`));
    item.appendChild(createMarqueeSpan('marquee-date', event.dateStr));

    if (event.eventName) {
        item.appendChild(createMarqueeSpan('marquee-separator', '|'));
        item.appendChild(createMarqueeSpan('marquee-event-name', event.eventName));
    }
    if (event.tamilDate) {
        item.appendChild(createMarqueeSpan('marquee-separator', '|'));
        item.appendChild(createMarqueeSpan('marquee-tamil-date', event.tamilDate));
    }
    if (event.weekday) {
        item.appendChild(createMarqueeSpan('marquee-separator', '|'));
        item.appendChild(createMarqueeSpan('marquee-day', event.weekday));
    }
    if (event.house) {
    item.appendChild(createMarqueeSpan('marquee-separator', '|'));
    item.appendChild(
        createMarqueeSpan(
            'marquee-house',
            `${event.house} கோவில் வீடு`
        )
    );
}

    return item;
}

function renderMarquee(marqueeEl, track, upcomingEvents) {
    if (!marqueeEl || !track) return;

    track.innerHTML = '';
    marqueeEl.classList.remove('marquee-static');

    if (!upcomingEvents.length) {
        track.appendChild(createMarqueeSpan('marquee-item marquee-message', '🛕 அடுத்த விசேஷ நாட்களின் விவரங்கள் விரைவில் அறிவிக்கப்படும்.'));
        marqueeEl.classList.add('marquee-static');
        return;
    }

    const buildSet = () => {
        const fragment = document.createDocumentFragment();
        fragment.appendChild(createMarqueeSpan('marquee-item marquee-lead', '🛕 அடுத்த விசேஷ நாட்கள் :'));
        upcomingEvents.forEach((event) => fragment.appendChild(buildEventItem(event)));
        return fragment;
    };

    track.appendChild(buildSet());
    track.appendChild(buildSet());

    const halfWidth = track.scrollWidth / 2;
    const pixelsPerSecond = 70;
    const duration = Math.max(12, halfWidth / pixelsPerSecond);
    track.style.setProperty('--marquee-duration', `${duration}s`);
}

// Measures the ACTUAL rendered header/marquee heights (rather than
// guessing fixed pixel values) and publishes them as CSS variables,
// so .temple-marquee's `top` and body's `padding-top` always match
// the real fixed header + marquee stack, on any screen size.
function updateFixedHeaderOffsets() {
    const header = document.querySelector('header');
    const marquee = document.getElementById('temple-marquee');

    if (header) {
        document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    }
    if (marquee) {
        document.documentElement.style.setProperty('--marquee-height', `${marquee.offsetHeight}px`);
    }
}

async function initializeTempleMarquee() {
    const header = document.querySelector('header');
    if (!header || document.getElementById('temple-marquee')) return;

    const marquee = document.createElement('div');
    marquee.className = 'temple-marquee';
    marquee.id = 'temple-marquee';

    const track = document.createElement('div');
    track.className = 'marquee-track';
    track.id = 'marquee-track';
    track.appendChild(createMarqueeSpan('marquee-item', '🛕 ஏற்றப்படுகிறது...'));

    marquee.appendChild(track);
    header.insertAdjacentElement('afterend', marquee);
    updateFixedHeaderOffsets();

    const events = await loadTempleEvents();
    const upcoming = getUpcomingEvents(events, 2);
    renderMarquee(marquee, track, upcoming);
    updateFixedHeaderOffsets();

    // The Mukta Malar webfont swaps in asynchronously and can change
    // the header's text metrics (and therefore its height) after our
    // measurements above already ran — resync once it's actually loaded.
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(updateFixedHeaderOffsets);
    }

    let resizeFrame = null;
    window.addEventListener('resize', () => {
        if (resizeFrame) return;
        resizeFrame = requestAnimationFrame(() => {
            resizeFrame = null;
            updateFixedHeaderOffsets();
        });
    });
}

/* =========================================================
   GALLERY SLIDESHOW
   Drives .gallery-slideshow / .gallery-slides / .gallery-slide /
   .gallery-prev / .gallery-next / .gallery-dots wherever they
   appear (currently gallery.html only).
========================================================= */

function initializeGallerySlideshow() {
    const slideshow = document.querySelector('.gallery-slideshow');
    const slidesWrap = document.querySelector('.gallery-slides');
    const dotsWrap = document.querySelector('.gallery-dots');
    if (!slideshow || !slidesWrap) return;

    const slides = Array.from(slidesWrap.querySelectorAll('.gallery-slide'));
    if (!slides.length) return;

    const prevBtn = slideshow.querySelector('.gallery-prev');
    const nextBtn = slideshow.querySelector('.gallery-next');
    const AUTOPLAY_MS = 5000;

    let current = slides.findIndex((slide) => slide.classList.contains('active'));
    if (current === -1) current = 0;

    let dots = [];
    if (dotsWrap) {
        dotsWrap.innerHTML = '';
        dots = slides.map((_, index) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'gallery-dot';
            dot.setAttribute('aria-label', `படம் ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index, true));
            dotsWrap.appendChild(dot);
            return dot;
        });
    }

    // Sizes .gallery-slides to the ACTIVE slide's own natural
    // width/height ratio, so object-fit: contain shows the full
    // image at a large size without cropping or distortion.
    function fitSlideHeight() {
        const img = slidesWrap.querySelector('.gallery-slide.active img');
        if (!img) return;

        const applyHeight = () => {
            if (!img.naturalWidth || !img.naturalHeight) return;
            const ratio = img.naturalHeight / img.naturalWidth;
            const width = slidesWrap.clientWidth;
            const maxHeight = window.innerHeight * 0.8;
            slidesWrap.style.height = `${Math.min(width * ratio, maxHeight)}px`;
        };

        if (img.complete && img.naturalWidth) {
            applyHeight();
        } else {
            img.addEventListener('load', applyHeight, { once: true });
        }
    }

    function render() {
        slides.forEach((slide, index) => slide.classList.toggle('active', index === current));
        dots.forEach((dot, index) => dot.classList.toggle('active', index === current));
        fitSlideHeight();
    }

    function goToSlide(index, userInitiated) {
        current = (index + slides.length) % slides.length;
        render();
        if (userInitiated) restartAutoplay();
    }

    let autoplayTimer = null;

    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(() => goToSlide(current + 1, false), AUTOPLAY_MS);
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }

    function restartAutoplay() {
        startAutoplay();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(current - 1, true));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(current + 1, true));

    slideshow.addEventListener('mouseenter', stopAutoplay);
    slideshow.addEventListener('mouseleave', startAutoplay);

    let resizeFrame = null;
    window.addEventListener('resize', () => {
        if (resizeFrame) return;
        resizeFrame = requestAnimationFrame(() => {
            resizeFrame = null;
            fitSlideHeight();
        });
    });

    render();
    startAutoplay();
}

/* =========================================================
   POOJA DETAILS INTERACTION
   Drives .pooja-tab / .pooja-description (matched by their shared
   data-pooja value) wherever they appear (currently timings.html
   only). Clicking a tab shows its description and hides the rest;
   the first tab is activated automatically on load.
========================================================= */

function initializePoojaDetails() {
    const tabs = Array.from(document.querySelectorAll('.pooja-tab'));
    const panels = Array.from(document.querySelectorAll('.pooja-description'));
    if (!tabs.length || !panels.length) return;

    function activate(key) {
        tabs.forEach((tab) => {
            const isActive = tab.dataset.pooja === key;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
        panels.forEach((panel) => {
            panel.classList.toggle('active', panel.dataset.pooja === key);
        });
    }

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => activate(tab.dataset.pooja));
    });

    activate(tabs[0].dataset.pooja);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeTempleMarquee();
    initializeGallerySlideshow();
    initializePoojaDetails();

    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');

    document.querySelectorAll('#current-year').forEach((yearEl) => {
        yearEl.textContent = new Date().getFullYear();
    });

    if (menuBtn && navLinks) {
        menuBtn.type = 'button';

        const closeMenu = () => {
            navLinks.classList.remove('show');
            menuBtn.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
        };

        const openMenu = () => {
            navLinks.classList.add('show');
            menuBtn.classList.add('active');
            menuBtn.setAttribute('aria-expanded', 'true');
        };

        menuBtn.addEventListener('click', () => {
            navLinks.classList.contains('show') ? closeMenu() : openMenu();
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', (event) => {
            if (!menuBtn.contains(event.target) && !navLinks.contains(event.target) && navLinks.classList.contains('show')) {
                closeMenu();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (menuBtn && navLinks && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });
});