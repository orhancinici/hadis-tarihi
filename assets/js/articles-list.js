/**
 * articles-list.js — Yazılar listesi sayfası (yazilar.html)
 * yazilar/index.json manifestinden makaleleri okur ve grid olarak render eder.
 */

(function () {
    'use strict';

    const MANIFEST_URL = 'yazilar/index.json';

    document.addEventListener('DOMContentLoaded', async () => {
        const grid = document.getElementById('articlesGrid');
        if (!grid) return;

        try {
            const response = await fetch(MANIFEST_URL, { cache: 'no-cache' });
            if (!response.ok) throw new Error(`Manifest yüklenemedi (${response.status})`);
            const data = await response.json();
            const articles = (data.articles || []).slice().sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );

            if (articles.length === 0) {
                renderEmpty(grid);
                return;
            }

            grid.innerHTML = articles.map(renderCard).join('');
        } catch (err) {
            console.error('Yazılar yüklenirken hata:', err);
            renderError(grid);
        }
    });

    function renderCard(article) {
        const tags = (article.tags || [])
            .map(t => `<span class="tag">${escapeHtml(t)}</span>`)
            .join('');

        return `
            <article class="article-card">
                <header class="article-header">
                    <h2 class="article-title">
                        <a href="yazi-detay.html?yazi=${encodeURIComponent(article.slug)}">${escapeHtml(article.title)}</a>
                    </h2>
                    <div class="article-meta">
                        <span class="article-author"><i class="fas fa-user" aria-hidden="true"></i> ${escapeHtml(article.author || '')}</span>
                        <span class="article-date"><i class="fas fa-calendar" aria-hidden="true"></i> ${formatDate(article.date)}</span>
                    </div>
                </header>
                <p class="article-excerpt">${escapeHtml(article.excerpt || '')}</p>
                <div class="article-tags">${tags}</div>
                <footer class="article-footer">
                    <a href="yazi-detay.html?yazi=${encodeURIComponent(article.slug)}" class="btn btn-primary">
                        Devamını Oku <i class="fas fa-arrow-right" aria-hidden="true"></i>
                    </a>
                </footer>
            </article>
        `;
    }

    function renderEmpty(grid) {
        grid.innerHTML = `
            <div class="no-articles">
                <i class="fas fa-file-alt" aria-hidden="true"></i>
                <h3>Henüz yazı bulunmuyor</h3>
                <p>Yakında yeni makaleler eklenecek.</p>
            </div>
        `;
    }

    function renderError(grid) {
        grid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
                <h2>Yazılar yüklenemedi</h2>
                <p>Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.</p>
            </div>
        `;
    }

    function formatDate(dateString) {
        if (!dateString) return '';
        const d = new Date(dateString);
        if (Number.isNaN(d.getTime())) return dateString;
        return d.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    function escapeHtml(str) {
        return String(str ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
})();
