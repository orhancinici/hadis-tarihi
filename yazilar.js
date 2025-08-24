// Yazılar sayfası için JavaScript
class ArticlesManager {
    constructor() {
        this.articles = [];
        this.articlesGrid = document.getElementById('articlesGrid');
        this.init();
    }

    async init() {
        await this.loadArticles();
        this.renderArticles();
    }

    async loadArticles() {
        try {
            // Yazılar klasöründeki tüm .md dosyalarını al
            const articleFiles = [
                'hadis-tarihi-dijital-metodoloji.md',
                'III-IX-asir-hadis-ilmi.md'
            ];

            // Her dosyayı fetch et ve metadata'sını al
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
            this.articles = articles.filter(article => article !== null);
            
            // Tarihe göre sırala (en yeni önce)
            this.articles.sort((a, b) => new Date(b.date) - new Date(a.date));
            
        } catch (error) {
            console.error('Yazılar yüklenirken hata:', error);
            this.showError('Yazılar yüklenirken bir hata oluştu');
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
                excerpt: 'Özet bulunamadı',
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
            excerpt: metadata.excerpt || 'Özet bulunamadı',
            content: content
        };
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

    renderArticles() {
        if (!this.articlesGrid) return;

        if (this.articles.length === 0) {
            this.articlesGrid.innerHTML = `
                <div class="no-articles">
                    <i class="fas fa-file-alt"></i>
                    <h3>Henüz yazı bulunmuyor</h3>
                    <p>Yazılar yüklenirken bir sorun oluştu veya henüz yazı eklenmemiş.</p>
                </div>
            `;
            return;
        }

        this.articlesGrid.innerHTML = this.articles.map(article => `
            <article class="article-card">
                <div class="article-header">
                    <h3 class="article-title">
                        <a href="yazi-detay.html?slug=${article.slug}">${article.title}</a>
                    </h3>
                    <div class="article-meta">
                        <span class="article-author">
                            <i class="fas fa-user"></i> ${article.author}
                        </span>
                        <span class="article-date">
                            <i class="fas fa-calendar"></i> ${article.formattedDate}
                        </span>
                    </div>
                </div>
                <div class="article-excerpt">
                    <p>${article.excerpt}</p>
                </div>
                <div class="article-tags">
                    ${article.tags.map(tag => `
                        <span class="tag">${tag}</span>
                    `).join('')}
                </div>
                <div class="article-footer">
                    <a href="yazi-detay.html?slug=${article.slug}" class="btn btn-primary">
                        Devamını Oku <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `).join('');
    }

    showError(message) {
        if (this.articlesGrid) {
            this.articlesGrid.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h2>${message}</h2>
                    <p>Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.</p>
                </div>
            `;
        }
    }
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', () => {
    new ArticlesManager();
});
