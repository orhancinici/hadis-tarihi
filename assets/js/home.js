/**
 * home.js — Yalnızca ana sayfada (index.html) yüklenir.
 * - İletişim formu (mailto fallback ile)
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const form = document.querySelector('.contact-form form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.querySelector('input[type="text"]').value.trim();
            const email = form.querySelector('input[type="email"]').value.trim();
            const message = form.querySelector('textarea').value.trim();

            if (!name || !email || !message) {
                showNotification('Lütfen tüm alanları doldurun.', 'error');
                return;
            }
            if (!isValidEmail(email)) {
                showNotification('Lütfen geçerli bir e-posta adresi girin.', 'error');
                return;
            }

            const subject = encodeURIComponent(`Hadis Tarihi Projesi — ${name}`);
            const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
            window.location.href = `mailto:orhancinici@gmail.com?subject=${subject}&body=${body}`;
            showNotification('E-posta uygulamanız açılıyor...', 'info');
            form.reset();
        });
    });

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showNotification(message, type = 'info') {
        document.querySelector('.notification')?.remove();
        const el = document.createElement('div');
        el.className = `notification notification-${type}`;
        el.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close" aria-label="Kapat">&times;</button>
            </div>
        `;
        document.body.appendChild(el);
        requestAnimationFrame(() => el.classList.add('visible'));

        const dismiss = () => {
            el.classList.remove('visible');
            setTimeout(() => el.remove(), 300);
        };
        el.querySelector('.notification-close').addEventListener('click', dismiss);
        setTimeout(dismiss, 5000);
    }
})();
