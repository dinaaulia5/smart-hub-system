<div align="center">

# Smart Hub Management System

Smart Hub Management System adalah aplikasi berbasis Laravel untuk mengelola peminjaman ruang kerja dan inventaris studio secara mandiri.

</div>

---

## 📖 Deskripsi Project

Smart Hub Management System digunakan untuk membantu proses pengelolaan ruang kerja dan peralatan studio secara terintegrasi. Sistem mendukung dua jenis pengguna:

- **Admin** → Mengelola data melalui dashboard web
- **User** → Mengakses data dan melakukan peminjaman melalui API

Fitur utama sistem meliputi:

- Monitoring booking
- Check-in booking
- Activity log
- Autentikasi API
- Manajemen inventaris
- Role Based Access Control (RBAC)

---

## 🛠 Teknologi Yang Digunakan

### Backend

- Laravel 13
- Laravel Sanctum
- Laravel Breeze
- MySQL

### Frontend

- React JS
- Inertia JS
- Tailwind CSS
- Shadcn UI
- Tabler Icons

### Tools

- Git
- Postman
- Laragon

---

## ✨ Fitur Utama

### Dashboard

- Statistik User
- Statistik Booking
- Statistik Ruangan
- Statistik Equipment
- Activity Log

### User Management

- Tambah User
- Edit User
- Hapus User

### Room Management

- CRUD Ruangan

### Equipment Management

- CRUD Peralatan Studio

### Booking Management

- Booking Ruangan
- Booking Equipment
- Check-in Booking

Status Booking:

- Pending
- Active
- Rejected

### Activity Log

- Riwayat aktivitas pengguna
- Browser detection
- Operating System detection
- IP Address tracking

### Authentication

- Laravel Sanctum API
- Role Based Access Control (RBAC)

Role:

- Admin
- User

---

## 🗄 Database Schema

### Tabel Utama

- users
- rooms
- equipments
- bookings
- booking_items
- activity_logs

---

## 📷 Screenshot Aplikasi

### Dashboard

Drive Screenshot:

https://drive.google.com/drive/folders/1pcY6WX1cD4vD3PhLedfzv3I8yz3s3qDo?hl=ID

Atau simpan screenshot lokal:

```text
docs/screenshots/
├── dashboard.png
├── users.png
├── room.png
├── equipment.png
├── booking.png
├── activity-log.png
└── erd.png
```

Contoh:

```md
### Dashboard

![Dashboard](docs/screenshots/dashboard.png)

### Data Pengguna

![Users](docs/screenshots/users.png)

### Data Ruangan

![Room](docs/screenshots/room.png)

### Data Equipment

![Equipment](docs/screenshots/equipment.png)

### Activity Log

![Activity Log](docs/screenshots/activity-log.png)
```

---

## ⚙️ Instalasi

Clone repository:

```bash
git clone https://github.com/username/smart-hub-system.git
```

Masuk ke project:

```bash
cd smart-hub-system
```

Install dependency:

```bash
composer install

npm install
```

Copy file environment:

```bash
cp .env.example .env
```

Generate key:

```bash
php artisan key:generate
```

Migrasi database:

```bash
php artisan migrate --seed
```

Jalankan project:

```bash
php artisan serve

npm run dev
```

---

## 🔗 API Endpoint

### Authentication

```http
POST /api/v1/main/register
POST /api/v1/main/login
POST /api/v1/main/logout
```

### Equipment

```http
GET    /api/v1/main/equipment
POST   /api/v1/main/equipment
PUT    /api/v1/main/equipment/{id}
DELETE /api/v1/main/equipment/{id}
```

### Room

```http
GET    /api/v1/main/room
POST   /api/v1/main/room
PUT    /api/v1/main/room/{id}
DELETE /api/v1/main/room/{id}
```

### Booking

```http
GET    /api/v1/main/booking
POST   /api/v1/main/booking
POST   /api/v1/main/booking/{id}/check-in
```

---

## 🔑 Login Demo

### Admin

Email:

```text
admin@test.com
```

Password:

```text
12345678
```

### User

Email:

```text
user@test.com
```

Password:

```text
12345678
```

---

© 2026 Smart Hub Management System
