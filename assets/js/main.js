/**
 * main.js — Tüm sayfalarda yüklenen ortak script
 * - Mobil menü
 * - Smooth scroll (yalnızca sayfa içi anchor'lar için)
 * - Navbar scroll efekti
 * - Footer yıl güncelleme
 * - Card fade-in animasyonu
 * - Scroll progress bar (sadece makale detay sayfasında)
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        setupMobileMenu();
        setupSmoothScroll();
        setupNavbarScrollEffect();
        setupFooterYear();
        setupFadeInOnScroll();
        setupScrollProgress();
    }

    function setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (!hamburger || !navMenu) return;

        const closeMenu = () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        };

        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('active');
            navMenu.classList.toggle('active', isOpen);
            hamburger.setAttribute('aria-expanded', String(isOpen));
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });
    }

    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href || href === '#') return;
                const target = document.querySelector(href);
                if (!target) return;
                e.preventDefault();
                const navbar = document.querySelector('.navbar');
                const offset = (navbar ? navbar.offsetHeight : 80) + 10;
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.pageYOffset - offset,
                    behavior: 'smooth'
                });
            });
        });
    }

    function setupNavbarScrollEffect() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        const onScroll = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    function setupFooterYear() {
        const slot = document.querySelector('[data-year]');
        if (slot) slot.textContent = String(new Date().getFullYear());
    }

    function setupFadeInOnScroll() {
        if (!('IntersectionObserver' in window)) return;
        const targets = document.querySelectorAll('.method-card, .team-card, .stat-item, .features-list li, .contact-item, .article-card');
        if (!targets.length) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        targets.forEach(el => observer.observe(el));
    }

    function setupScrollProgress() {
        const bar = document.querySelector('.scroll-progress');
        if (!bar) return;
        const onScroll = () => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
            bar.style.width = pct + '%';
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }
})();
