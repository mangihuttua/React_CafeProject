# ☕ Cafe Web - Platform Manajemen Cafe Online

Aplikasi full-stack untuk mengelola cafe dengan fitur browsing menu, keranjang belanja, dan checkout yang user-friendly.

## 🎯 Fitur Utama

- **🔍 Pencarian Menu** - Cari produk cafe dengan mudah
- **🛒 Keranjang Belanja** - Tambah/hapus produk, kelola jumlah
- **💳 Checkout** - Proses pemesanan yang lengkap
- **📱 Responsive Design** - Bekerja di mobile & desktop
- **📄 Halaman Informasi** - About, Contact, Footer
- **🎨 Tampilan Menu** - Grid menu dengan pagination

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **Vite** - Build tool & dev server
- **React Router** - Navigation antar halaman
- **Context API** - State management untuk cart
- **CSS** - Styling


## 📁 Struktur Folder

```
cafe_web/
├── frontend/
│   ├── src/
│   │   ├── components/      # Komponen reusable (Navbar, Menu, Cart, dll)
│   │   ├── pages/           # Halaman utama (Home, Cart, Checkout, MenuDetail)
│   │   ├── context/         # CartContext untuk state management
│   │   ├── data/            # menuData.js (data menu produk)
│   │   ├── layouts/         # MainLayout
│   │   ├── routes/          # AppRoutes (routing setup)
│   │   ├── assets/          # Gambar menu & aset lainnya
│   │   ├── App.jsx          # Root component
│   │   └── main.jsx         # Entry point
│   ├── vite.config.js       # Konfigurasi Vite
│   └── package.json


```
## 📦 Dependencies Utama

**Frontend:**
- react
- react-router-dom
- vite


## 🤝 Kontribusi

Silakan buat branch baru untuk fitur/fix yang baru dan buat pull request.

## 📝 Lisensi

Proyek ini open source dan bebas digunakan.
