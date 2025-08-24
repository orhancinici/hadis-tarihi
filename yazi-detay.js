// Yazı detay sayfası için JavaScript
class ArticleDetailManager {
    constructor() {
        this.articleMeta = document.getElementById('articleMeta');
        this.articleBody = document.getElementById('articleBody');
        this.articleTags = document.getElementById('articleTags');
        this.prevArticleBtn = document.getElementById('prevArticle');
        this.nextArticleBtn = document.getElementById('nextArticle');
        this.currentSlug = null;
        this.allArticles = [];
        this.init();
    }

    async init() {
        const urlParams = new URLSearchParams(window.location.search);
        const slug = urlParams.get('slug');
        
        if (slug) {
            this.currentSlug = slug;
            await this.loadAllArticles();
            await this.loadArticle(slug);
            this.setupNavigation();
        } else {
            this.showError('Yazı bulunamadı');
        }
    }

    async loadAllArticles() {
        try {
            // Tüm yazıları yükle
            const articleFiles = [
                'hadis-tarihi-dijital-metodoloji.md',
                'III-IX-asir-hadis-ilmi.md'
            ];

            const articlesPromises = articleFiles.map(async (filename) => {
                try {
                    const response = await fetch(`yazilar/${filename}`);
                    if (!response.ok) {
                        console.warn(`Dosya bulunamadı: ${filename}`);
                        return null;
                    }
                    
                    const markdownContent = await response.text();
                    const article = this.parseMarkdownWithFrontMatter(markdownContent);
                    
                    return {
                        ...article,
                        filename: filename,
                        slug: filename.replace('.md', ''),
                        formattedDate: this.formatDate(article.date)
                    };
                } catch (error) {
                    console.error(`Dosya yüklenirken hata: ${filename}`, error);
                    return null;
                }
            });

            const articles = await Promise.all(articlesPromises);
            this.allArticles = articles.filter(article => article !== null);
            
            // Tarihe göre sırala (en yeni önce)
            this.allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            console.log('Yüklenen yazılar:', this.allArticles);
            
        } catch (error) {
            console.error('Yazılar yüklenirken hata:', error);
        }
    }

    setupNavigation() {
        console.log('Navigasyon kuruluyor...');
        console.log('Mevcut slug:', this.currentSlug);
        console.log('Tüm yazılar:', this.allArticles);
        
        const currentIndex = this.allArticles.findIndex(article => article.slug === this.currentSlug);
        console.log('Mevcut yazı indeksi:', currentIndex);
        
        if (currentIndex > 0) {
            const prevArticle = this.allArticles[currentIndex - 1];
            this.prevArticleBtn.href = `yazi-detay.html?slug=${prevArticle.slug}`;
            this.prevArticleBtn.style.display = 'inline-flex';
            console.log('Önceki yazı:', prevArticle.slug);
        } else {
            this.prevArticleBtn.style.display = 'none';
            console.log('Önceki yazı yok');
        }
        
        if (currentIndex < this.allArticles.length - 1 && currentIndex >= 0) {
            const nextArticle = this.allArticles[currentIndex + 1];
            this.nextArticleBtn.href = `yazi-detay.html?slug=${nextArticle.slug}`;
            this.nextArticleBtn.style.display = 'inline-flex';
            console.log('Sonraki yazı:', nextArticle.slug);
        } else {
            this.nextArticleBtn.style.display = 'none';
            console.log('Sonraki yazı yok');
        }
    }

    async loadArticle(slug) {
        try {
            // .md dosyasını fetch et
            const response = await fetch(`yazilar/${slug}.md`);
            
            if (!response.ok) {
                throw new Error('Yazı dosyası bulunamadı');
            }
            
            const markdownContent = await response.text();
            const article = this.parseMarkdownWithFrontMatter(markdownContent);
            
            if (article) {
                this.renderArticle(article);
            } else {
                this.showError('Yazı işlenemedi');
            }
        } catch (error) {
            console.error('Yazı yüklenirken hata:', error);
            this.showError('Yazı yüklenirken bir hata oluştu');
        }
    }

    parseMarkdownWithFrontMatter(markdownContent) {
        // Front matter'ı ayır (--- ile çevrili YAML metadata)
        const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
        const match = markdownContent.match(frontMatterRegex);
        
        if (!match) {
            // Front matter yoksa, tüm içeriği content olarak al
            return {
                title: 'Başlıksız Yazı',
                author: 'Bilinmeyen Yazar',
                date: new Date().toISOString().split('T')[0],
                tags: [],
                content: markdownContent
            };
        }
        
        const frontMatter = match[1];
        const content = match[2];
        
        // Front matter'ı parse et
        const metadata = {};
        frontMatter.split('\n').forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > 0) {
                const key = line.substring(0, colonIndex).trim();
                let value = line.substring(colonIndex + 1).trim();
                
                // Tırnak işaretlerini kaldır
                if ((value.startsWith('"') && value.endsWith('"')) || 
                    (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }
                
                // Tags array'ini parse et
                if (key === 'tags') {
                    try {
                        value = JSON.parse(value);
                    } catch (e) {
                        // JSON parse edilemezse virgülle ayır
                        value = value.split(',').map(tag => tag.trim().replace(/["']/g, ''));
                    }
                }
                
                metadata[key] = value;
            }
        });
        
        return {
            title: metadata.title || 'Başlıksız Yazı',
            author: metadata.author || 'Bilinmeyen Yazar',
            date: metadata.date || new Date().toISOString().split('T')[0],
            tags: metadata.tags || [],
            excerpt: metadata.excerpt || '',
            content: content
        };
    }

    renderArticle(article) {
        // Sayfa başlığını güncelle
        document.title = `${article.title} - Hadis Tarihi Dijital Araştırma Projesi`;

        // Meta bilgileri render et
        if (this.articleMeta) {
            this.articleMeta.innerHTML = `
                <h1 class="article-title">${article.title}</h1>
                <div class="article-meta-info">
                    <span class="meta-item">
                        <i class="fas fa-user"></i> ${article.author}
                    </span>
                    <span class="meta-item">
                        <i class="fas fa-calendar"></i> ${this.formatDate(article.date)}
                    </span>
                </div>
            `;
        }

        // Yazı içeriğini render et
        if (this.articleBody) {
            const htmlContent = marked.parse(article.content);
            this.articleBody.innerHTML = htmlContent;
        }

        // Etiketleri render et
        if (this.articleTags) {
            if (article.tags && article.tags.length > 0) {
                this.articleTags.innerHTML = `
                    <h4>Etiketler:</h4>
                    <div class="tags-container">
                        ${article.tags.map(tag => `
                            <span class="tag">${tag}</span>
                        `).join('')}
                    </div>
                `;
                this.articleTags.style.display = 'block';
            } else {
                this.articleTags.style.display = 'none';
            }
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('tr-TR', options);
    }

    showError(message) {
        if (this.articleBody) {
            this.articleBody.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h2>${message}</h2>
                    <p>Lütfen <a href="yazilar.html">yazılar sayfasına</a> dönün.</p>
                </div>
            `;
        }
    }
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', () => {
    new ArticleDetailManager();
});
