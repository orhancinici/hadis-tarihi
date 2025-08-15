# Hadis Tarihi Dijital Araştırma Projesi

TÜBİTAK destekli hadis tarihi araştırma projesinin web sitesi. Bu proje, III./IX. asır sonrası hadis ilminin gelişimini dijital teknolojilerle incelemeyi amaçlamaktadır.

## 🎯 Proje Amacı

Hadis tarihi, hadis ilminin ve muhaddislerin İslam'ın ilk asırlarından itibaren zaman ve mekan ekseninde incelendiği bir disiplindir. Bu proje, dijital beşeri bilimler, coğrafi bilgi sistemleri (CBS), sosyal ağ analizleri (SNA) ve tanımlayıcı istatistiksel analiz yöntemleriyle hadis tarihi araştırmalarında yeni bir yol haritası çizmeyi amaçlamaktadır.

## 🚀 Özellikler

- **Modern Tasarım**: Responsive ve kullanıcı dostu arayüz
- **Dijital Metodoloji**: CBS, SNA ve istatistiksel analiz araçları
- **TÜBİTAK Destekli**: Resmi proje web sitesi
- **İletişim Formu**: Proje hakkında bilgi almak için
- **Mobil Uyumlu**: Tüm cihazlarda mükemmel görünüm

## 🛠️ Teknolojiler

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Deployment**: Heroku
- **Fontlar**: Amiri (Arapça), Inter (Latin)
- **İkonlar**: Font Awesome

## 📁 Proje Yapısı

```
hadis-tarihi-projesi/
├── index.html          # Ana sayfa
├── styles.css          # CSS stilleri
├── script.js           # JavaScript fonksiyonları
├── server.js           # Express.js server
├── package.json        # Node.js bağımlılıkları
├── Procfile            # Heroku deployment
└── README.md           # Proje dokümantasyonu
```

## 🚀 Kurulum ve Çalıştırma

### Yerel Geliştirme

1. **Projeyi klonlayın:**
   ```bash
   git clone <repository-url>
   cd hadis-tarihi-projesi
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev
   ```

4. **Tarayıcıda açın:**
   ```
   http://localhost:3000
   ```

### Production Sunucusu

1. **Sunucuyu başlatın:**
   ```bash
   npm start
   ```

2. **Tarayıcıda açın:**
   ```
   http://localhost:3000
   ```

## 🌐 Heroku Deployment

### Otomatik Deployment

1. **Heroku CLI'yi yükleyin**
2. **Heroku'da yeni uygulama oluşturun:**
   ```bash
   heroku create hadis-tarihi-projesi
   ```

3. **Git repository'yi Heroku'ya bağlayın:**
   ```bash
   git remote add heroku https://git.heroku.com/hadis-tarihi-projesi.git
   ```

4. **Deploy edin:**
   ```bash
   git push heroku main
   ```

### Manuel Deployment

1. **Heroku Dashboard'a gidin**
2. **"New App" butonuna tıklayın**
3. **GitHub repository'nizi bağlayın**
4. **"Deploy Branch" butonuna tıklayın**

## 📧 API Endpoints

### İletişim Formu

**POST** `/api/contact`

**Request Body:**
```json
{
  "name": "Ad Soyad",
  "email": "email@example.com",
  "message": "Mesaj içeriği"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Mesajınız başarıyla gönderildi!"
}
```

## 🎨 Tasarım Özellikleri

- **Renk Paleti**: Yeşil tonları (İslami tema)
- **Tipografi**: Amiri (Arapça metinler için), Inter (Latin metinler için)
- **Animasyonlar**: CSS ve JavaScript ile smooth animasyonlar
- **Responsive**: Mobile-first yaklaşım
- **Accessibility**: WCAG standartlarına uygun

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Özelleştirme

### Renkleri Değiştirme

`styles.css` dosyasındaki CSS değişkenlerini düzenleyin:

```css
:root {
    --primary-color: #2c5530;
    --secondary-color: #8fbc8f;
    --accent-color: #d4af37;
    /* ... */
}
```

### İçerik Güncelleme

`index.html` dosyasındaki metinleri düzenleyerek içeriği güncelleyebilirsiniz.

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👥 Ekip

- **Araştırmacı**: Hadis Tarihi Uzmanı
- **Danışman**: Akademik Danışman
- **Teknik Uzman**: Dijital Teknolojiler

## 📞 İletişim

- **E-posta**: info@hadistarihi.com
- **Kurum**: TÜBİTAK Destekli Proje
- **Konum**: Türkiye

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📝 Changelog

### v1.0.0 (2024)
- İlk sürüm
- Temel web sitesi özellikleri
- Heroku deployment desteği
- Responsive tasarım
- İletişim formu

## 🔮 Gelecek Planları

- [ ] Veritabanı entegrasyonu
- [ ] Admin paneli
- [ ] Araştırma sonuçları bölümü
- [ ] Çoklu dil desteği
- [ ] Blog bölümü
- [ ] Sosyal medya entegrasyonu

---

**Not**: Bu proje TÜBİTAK destekli akademik bir araştırma projesidir. Tüm içerik akademik standartlara uygun olarak hazırlanmıştır.
