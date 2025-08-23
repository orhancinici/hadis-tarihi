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
        // Yazılar klasöründeki markdown dosyalarını yükle
        const articleFiles = [
            {
                filename: 'hadis-tarihi-dijital-metodoloji.md',
                title: 'Hadis Tarihi Araştırmalarında Dijital Metodolojinin Kullanımı',
                author: 'Proje Yürütücüsü',
                date: '2025-05-15',
                tags: ['dijital metodoloji', 'hadis tarihi', 'CBS', 'sosyal ağ analizi'],
                excerpt: 'Bu yazıda, hadis tarihi araştırmalarında dijital teknolojilerin kullanımı ve bu alanda yeni açılımlar ele alınmaktadır.'
            },
            {
                filename: 'III-IX-asir-hadis-ilmi.md',
                title: 'III./IX. Asır Sonrası Hadis İlminin Gelişimi',
                author: 'Proje Yürütücüsü',
                date: '2025-06-15',
                tags: ['III. asır', 'IX. asır', 'hadis ilmi', 'muhaddisler', 'tarihsel analiz'],
                excerpt: 'III./IX. asır sonrasında hadis ilminin gelişimi ve muhaddislerin faaliyetlerinin dijital analizi.'
            }
        ];

        this.articles = articleFiles.map(article => ({
            ...article,
            slug: article.filename.replace('.md', ''),
            formattedDate: this.formatDate(article.date)
        }));
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
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', () => {
    new ArticlesManager();
});
