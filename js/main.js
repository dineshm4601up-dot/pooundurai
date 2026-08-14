document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCloseBtn = document.querySelector('.lightbox-close');

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

    const closeLightbox = () => {
        if (lightbox) {
            lightbox.classList.remove('active');
        }
    };

    const openLightbox = (element) => {
        if (!lightbox || !lightboxImg) return;

        const img = element.querySelector('img');
        if (img && img.src) {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        }
    };

    document.querySelectorAll('.gallery-item').forEach((item) => {
        item.addEventListener('click', () => openLightbox(item));
    });

    if (lightboxCloseBtn) {
        lightboxCloseBtn.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (menuBtn && navLinks && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
            closeLightbox();
        }
    });
});