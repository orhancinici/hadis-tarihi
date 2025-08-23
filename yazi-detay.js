// Yazı detay sayfası için JavaScript
class ArticleDetailManager {
    constructor() {
        this.articleMeta = document.getElementById('articleMeta');
        this.articleBody = document.getElementById('articleBody');
        this.articleTags = document.getElementById('articleTags');
        this.init();
    }

    async init() {
        const urlParams = new URLSearchParams(window.location.search);
        const slug = urlParams.get('slug');
        
        if (slug) {
            await this.loadArticle(slug);
        } else {
            this.showError('Yazı bulunamadı');
        }
    }

    async loadArticle(slug) {
        // Yazı verilerini tanımla
        const articles = {
            'hadis-tarihi-dijital-metodoloji': {
                title: 'Hadis Tarihi Araştırmalarında Dijital Metodolojinin Kullanımı',
                author: 'Proje Yürütücüsü',
                date: '2025-05-15',
                tags: ['dijital metodoloji', 'hadis tarihi', 'CBS', 'sosyal ağ analizi'],
                content: `
# Hadis Tarihi Araştırmalarında Dijital Metodolojinin Kullanımı
*UYARI: BU METİN DENEME AMAÇLI YAZILMIŞTIR. LÜTFEN DİKKATE ALMAYINIZ*

## Giriş

Hadis tarihi, İslam'ın ilk asırlarından itibaren hadis ilminin gelişimini ve muhaddislerin faaliyetlerini inceleyen önemli bir disiplindir. Geleneksel araştırma yöntemleri, bu alanda önemli katkılar sağlamış olsa da, dijital teknolojilerin sunduğu imkanlar, hadis tarihi araştırmalarında yeni perspektifler açmaktadır.

## Dijital Metodolojinin Avantajları

### 1. Coğrafi Bilgi Sistemleri (CBS)

CBS teknolojisi, hadis ilminin coğrafi yayılımını görselleştirmek ve analiz etmek için kullanılabilir. Bu yaklaşım:

- Muhaddislerin seyahat rotalarını haritalandırma
- Hadis merkezlerinin coğrafi dağılımını analiz etme
- Bölgesel hadis geleneklerinin karşılaştırmalı incelemesi

gibi konularda önemli veriler sunar.

### 2. Sosyal Ağ Analizleri (SNA)

Muhaddisler arasındaki ilişkileri ve bilgi aktarım ağlarını incelemek için SNA kullanılabilir:

- Hoca-öğrenci ilişkilerinin görselleştirilmesi
- Hadis rivayet zincirlerinin analizi
- Bilgi aktarım ağlarının haritalandırılması

### 3. İstatistiksel Analiz

Dijital araçlar, hadis tarihi verilerinin istatistiksel analizini kolaylaştırır:

- Zaman serisi analizleri
- Korelasyon çalışmaları
- Trend analizleri

## Metodolojik Yaklaşım

### Veri Toplama

Araştırmamızda kullanılan veri toplama yöntemleri:

1. **Birincil Kaynaklar**: Hadis tarihi eserlerinin dijital ortamda taranması
2. **İkincil Kaynaklar**: Modern araştırmaların sistematik incelenmesi
3. **Arşiv Verileri**: Tarihi belgelerin dijital ortamda analizi

### Veri İşleme

Toplanan veriler şu aşamalardan geçirilir:

1. **Temizleme**: Veri kalitesinin artırılması
2. **Kodlama**: Kategorik verilerin sayısal hale getirilmesi
3. **Analiz**: İstatistiksel ve görsel analizler

## Sonuç

Dijital metodolojinin hadis tarihi araştırmalarına entegrasyonu, bu alanda yeni açılımlar sağlamaktadır. Özellikle III./IX. asır sonrası dönemlerin incelenmesinde, dijital teknolojiler önemli katkılar sunmaktadır.

## Kaynaklar

1. Al-Khatib al-Baghdadi, *Tarikh Baghdad*
2. Ibn Hajar al-Asqalani, *Tahdhib al-Tahdhib*
3. Modern dijital beşeri bilimler literatürü

---

*Bu yazı, TÜBİTAK destekli "Hadis Tarihi Dijital Araştırma Projesi" kapsamında hazırlanmıştır.*
                `
            },
            'III-IX-asir-hadis-ilmi': {
                title: 'III./IX. Asır Sonrası Hadis İlminin Gelişimi',
                author: 'Proje Yürütücüsü',
                date: '2025-06-15',
                tags: ['III. asır', 'IX. asır', 'hadis ilmi', 'muhaddisler', 'tarihsel analiz'],
                content: `
# III./IX. Asır Sonrası Hadis İlminin Gelişimi
*UYARI: BU METİN DENEME AMAÇLI YAZILMIŞTIR. LÜTFEN DİKKATE ALMAYINIZ*

## Tarihsel Arka Plan

III./IX. asır, İslam tarihinin önemli dönüm noktalarından biridir. Bu dönemde hadis ilmi, önceki asırlarda oluşan temeller üzerine daha da gelişmiş ve sistematik hale gelmiştir.

## Dönemin Özellikleri

### Siyasi Koşullar

III./IX. asırda İslam dünyasında yaşanan siyasi değişimler:

- Abbasilerin güç kaybetmesi
- Bölgesel devletlerin ortaya çıkması
- İlmi merkezlerin çeşitlenmesi

### İlmi Gelişmeler

Bu dönemde hadis ilminde görülen gelişmeler:

1. **Hadis Koleksiyonları**: Büyük hadis külliyatlarının oluşturulması
2. **Rical İlmi**: Muhaddislerin biyografilerinin detaylandırılması
3. **Metodoloji**: Hadis değerlendirme kriterlerinin geliştirilmesi

## Dijital Analiz Sonuçları

### Coğrafi Dağılım

CBS analizlerimiz şu sonuçları ortaya koymaktadır:

- **Bağdat**: Ana ilmi merkez olarak önemini korumuştur
- **Şam**: Yeni bir hadis merkezi olarak gelişmiştir
- **Mısır**: Fustat'ta önemli muhaddisler yetişmiştir
- **Horasan**: Doğu İslam dünyasının önemli merkezi

### Sosyal Ağ Analizi

Muhaddisler arasındaki ilişkilerin analizi:

- **Hoca-Öğrenci İlişkileri**: Yoğun bilgi aktarım ağları
- **Seyahat Ağları**: Muhaddislerin seyahat rotaları
- **İlmi İlişkiler**: Farklı bölgeler arası bağlantılar

## Önemli Muhaddisler

### Bağdat Okulu

- **Al-Khatib al-Baghdadi** (392-463/1002-1071)
- **Ibn al-Jawzi** (510-597/1116-1201)

### Şam Okulu

- **Ibn Asakir** (499-571/1105-1176)
- **Al-Dhahabi** (673-748/1274-1348)

### Mısır Okulu

- **Ibn Hajar al-Asqalani** (773-852/1372-1449)
- **Al-Suyuti** (849-911/1445-1505)

## Metodolojik Yenilikler

### Hadis Değerlendirme

Bu dönemde geliştirilen yeni kriterler:

1. **Sened Analizi**: Zincir güvenilirliğinin detaylı incelenmesi
2. **Metin Analizi**: Hadis metinlerinin içerik analizi
3. **Tarihsel Bağlam**: Hadislerin tarihsel arka planının incelenmesi

### Eser Türleri

Yeni eser türlerinin ortaya çıkması:

- **Müstedrek**: Eksik hadislerin tamamlanması
- **Müstahrec**: Farklı senedlerle aynı hadislerin toplanması
- **Cami'**: Kapsamlı hadis külliyatları

## Dijital Veri Analizi

### İstatistiksel Bulgular

Analizlerimizden çıkan önemli bulgular:

- **Hadis Sayısı**: Bu dönemde kaydedilen hadis sayısında artış
- **Muhaddis Sayısı**: Aktif muhaddis sayısında önemli artış
- **Eser Sayısı**: Telif edilen eser sayısında büyük artış

### Zaman Serisi Analizi

Hadis ilminin zaman içindeki gelişimi:

- **Erken Dönem** (200-300/815-912): Temel eserlerin oluşturulması
- **Orta Dönem** (300-400/912-1009): Sistematik gelişim
- **Geç Dönem** (400-500/1009-1106): Olgunluk dönemi

## Sonuç

III./IX. asır sonrası dönem, hadis ilminin en verimli dönemlerinden biri olmuştur. Dijital analizler, bu dönemin önemini ve karmaşıklığını daha net ortaya koymaktadır.

## Kaynaklar

1. Al-Khatib al-Baghdadi, *Tarikh Baghdad*
2. Ibn Hajar al-Asqalani, *Tahdhib al-Tahdhib*
3. Al-Dhahabi, *Siyar A'lam al-Nubala*
4. Modern dijital analiz araçları ve metodolojileri

---

*Bu araştırma, TÜBİTAK destekli proje kapsamında dijital metodolojiler kullanılarak gerçekleştirilmiştir.*
                `
            }
        };

        const article = articles[slug];
        
        if (article) {
            this.renderArticle(article);
        } else {
            this.showError('Yazı bulunamadı');
        }
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
            this.articleTags.innerHTML = `
                <h4>Etiketler:</h4>
                <div class="tags-container">
                    ${article.tags.map(tag => `
                        <span class="tag">${tag}</span>
                    `).join('')}
                </div>
            `;
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
