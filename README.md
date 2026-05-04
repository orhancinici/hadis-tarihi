# Hadis Tarihi Dijital Araştırma Projesi

[hadistarihi.dev](https://hadistarihi.dev) — TÜBİTAK 3005 destekli "Mısır Bölgesi Hadis Araştırmaları (Fâtımîler Dönemi 358/969–567/1171): Bir Yöntem Denemesi" araştırma projesinin tanıtım ve yayın sitesi.

## Teknoloji

Saf statik site: HTML5 + CSS3 + Vanilla JavaScript. Build adımı yok. GitHub Pages üzerinden yayınlanır.

## Dosya Yapısı

```
.
├── index.html              # Ana sayfa
├── yazilar.html            # Makale listesi
├── yazi-detay.html         # Tek makale görüntüleme
├── 404.html                # Hata sayfası
├── CNAME                   # GitHub Pages özel alan adı
├── robots.txt
├── sitemap.xml
│
├── assets/
│   ├── css/                # 5 modüler CSS dosyası
│   │   ├── base.css        # reset, değişkenler, tipografi
│   │   ├── layout.css      # navbar, footer, page header
│   │   ├── components.css  # butonlar, kartlar, formlar
│   │   ├── pages.css       # sayfa-spesifik stiller
│   │   └── responsive.css  # tüm media query'ler
│   ├── js/
│   │   ├── main.js             # ortak: navbar, smooth scroll, fade-in
│   │   ├── home.js             # ana sayfa: iletişim formu
│   │   ├── articles-list.js    # yazılar listesi
│   │   └── article-detail.js   # tek makale render
│   └── img/
│       ├── logo.png
│       └── tubitak-logo.png
│
└── yazilar/
    ├── index.json          # Makale manifesti
    └── *.md                # Makale içerikleri (front-matter + Markdown)
```

## Yerel Önizleme

Statik site olduğu için herhangi bir HTTP sunucusu yeterlidir.

```bash
# Python ile
python -m http.server 8000

# Node ile
npx http-server -p 8000

# VS Code: "Live Server" eklentisi
```

Tarayıcıda `http://localhost:8000` adresini açın.

## Yeni Makale Ekleme

1. `yazilar/<slug>.md` dosyasını oluştur. Front-matter zorunlu:

   ```markdown
   ---
   title: "Yazının Başlığı"
   author: "Yazar Adı"
   date: "2026-05-04"
   tags: ["etiket1", "etiket2"]
   excerpt: "Kısa özet (yazılar listesinde gözükür)."
   ---

   # Başlık

   Yazı içeriği...
   ```

2. `yazilar/index.json` dosyasına yeni bir kayıt ekle:

   ```json
   {
     "slug": "<slug>",
     "title": "Yazının Başlığı",
     "author": "Yazar Adı",
     "date": "2026-05-04",
     "excerpt": "Kısa özet.",
     "tags": ["etiket1", "etiket2"]
   }
   ```

3. (Opsiyonel) `sitemap.xml` dosyasına yeni URL ekle.

4. Commit ve push — GitHub Pages otomatik yayınlar.

## Deployment

`main` branch'ine push edildiğinde GitHub Pages otomatik yayın yapar. Özel alan adı `CNAME` dosyasıyla yapılandırılmıştır: `hadistarihi.dev`.

## Lisans

İçerik: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
