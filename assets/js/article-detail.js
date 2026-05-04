/**
 * article-detail.js — Tekil makale sayfası (yazi-detay.html)
 * URL'deki ?yazi=<slug> ile manifestten makaleyi bulur, .md dosyasını çekip render eder.
 * Bulunamazsa kullanıcı dostu hata gösterir. SEO meta etiketlerini dinamik günceller.
 */

(function () {
    'use strict';

    const MANIFEST_URL = 'yazilar/index.json';
    const SITE_NAME = 'Hadis Tarihi Dijital Araştırma Projesi';

    document.addEventListener('DOMContentLoaded', init);

    async function init() {
        const params = new URLSearchParams(window.location.search);
        // Geriye uyumluluk: eski ?slug= parametresini de destekle
        const slug = params.get('yazi') || params.get('slug');

        const dom = {
            meta: document.getElementById('articleMeta'),
            body: document.getElementById('articleBody'),
            tags: document.getElementById('articleTags'),
            prev: document.getElementById('prevArticle'),
            next: document.getElementById('nextArticle')
        };

        if (!slug) {
            renderError(dom, 'Yazı belirtilmedi');
            return;
        }

        try {
            const manifest = await fetchManifest();
            const articles = (manifest.articles || []).slice().sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
            const meta = articles.find(a => a.slug === slug);

            if (!meta) {
                renderError(dom, 'Yazı bulunamadı');
                return;
            }

            const markdown = await fetchMarkdown(slug);
            const content = stripFrontMatter(markdown);
            renderArticle(dom, meta, content);
            setupNavigation(dom, articles, slug);
            updateSEO(meta);
        } catch (err) {
            console.error('Makale yüklenirken hata:', err);
            renderError(dom, 'Yazı yüklenirken bir hata oluştu');
        }
    }

    async function fetchManifest() {
        const response = await fetch(MANIFEST_URL, { cache: 'no-cache' });
        if (!response.ok) throw new Error('Manifest yüklenemedi');
        return response.json();
    }

    async function fetchMarkdown(slug) {
        const response = await fetch(`yazilar/${encodeURIComponent(slug)}.md`, { cache: 'no-cache' });
        if (!response.ok) throw new Error('Markdown dosyası bulunamadı');
        return response.text();
    }

    function stripFrontMatter(md) {
        const m = md.match(/^---\s*\n[\s\S]*?\n---\s*\n([\s\S]*)$/);
        return m ? m[1] : md;
    }

    function renderArticle(dom, meta, markdownContent) {
        if (dom.meta) {
            dom.meta.innerHTML = `
                <h1 class="article-title">${escapeHtml(meta.title)}</h1>
                <div class="article-meta-info">
                    <span class="meta-item"><i class="fas fa-user" aria-hidden="true"></i> ${escapeHtml(meta.author || '')}</span>
                    <span class="meta-item"><i class="fas fa-calendar" aria-hidden="true"></i> ${formatDate(meta.date)}</span>
                </div>
            `;
        }
        if (dom.body && typeof marked !== 'undefined') {
            dom.body.innerHTML = marked.parse(markdownContent);
        } else if (dom.body) {
            dom.body.textContent = markdownContent;
        }
        if (dom.tags) {
            const tags = meta.tags || [];
            if (tags.length > 0) {
                dom.tags.innerHTML = `
                    <h4>Etiketler</h4>
                    <div class="tags-container">
                        ${tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
                    </div>
                `;
                dom.tags.hidden = false;
            } else {
                dom.tags.hidden = true;
            }
        }
    }

    function setupNavigation(dom, articles, currentSlug) {
        const idx = articles.findIndex(a => a.slug === currentSlug);

        const setNav = (btn, target) => {
            if (!btn) return;
            if (target) {
                btn.href = `yazi-detay.html?yazi=${encodeURIComponent(target.slug)}`;
                btn.hidden = false;
            } else {
                btn.hidden = true;
            }
        };

        setNav(dom.prev, idx > 0 ? articles[idx - 1] : null);
        setNav(dom.next, idx >= 0 && idx < articles.length - 1 ? articles[idx + 1] : null);
    }

    function updateSEO(meta) {
        document.title = `${meta.title} — ${SITE_NAME}`;
        const setMeta = (selector, value) => {
            const el = document.querySelector(selector);
            if (el && value) el.setAttribute('content', value);
        };
        const desc = meta.excerpt || '';
        setMeta('meta[name="description"]', desc);
        setMeta('meta[property="og:title"]', `${meta.title} — ${SITE_NAME}`);
        setMeta('meta[property="og:description"]', desc);
        setMeta('meta[property="og:url"]', window.location.href);
        setMeta('meta[name="twitter:title"]', `${meta.title} — ${SITE_NAME}`);
        setMeta('meta[name="twitter:description"]', desc);

        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.href = window.location.href;
    }

    function renderError(dom, message) {
        document.title = `Yazı bulunamadı — ${SITE_NAME}`;
        if (dom.body) {
            dom.body.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
                    <h2>${escapeHtml(message)}</h2>
                    <p>Tüm yazılara <a href="yazilar.html">yazılar sayfasından</a> ulaşabilirsiniz.</p>
                </div>
            `;
        }
        if (dom.meta) dom.meta.innerHTML = '';
        if (dom.tags) dom.tags.hidden = true;
        if (dom.prev) dom.prev.hidden = true;
        if (dom.next) dom.next.hidden = true;
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
