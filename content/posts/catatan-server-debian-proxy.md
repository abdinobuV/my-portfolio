---
title: "Menyiapkan Lab Server Debian: Apache2 & Squid Proxy dari Terminal"
date: "2026-10-04"
excerpt: "Dokumentasi langkah demi langkah menyiapkan web server lokal dan caching/filtering proxy menggunakan Debian Linux di lingkungan virtual."
tags: ["linux", "debian", "server"]
---

## Mengapa Debian untuk belajar administrasi sistem?

Debian terkenal stabil, ringan dijalankan di mesin virtual dengan RAM terbatas, dan struktur konfigurasi di dalam `/etc` sangat rapi. Saat berlatih tanpa antarmuka grafis (GUI), kita dipaksa memahami bagaimana layanan jaringan bekerja di balik layar.

## 1. Virtual Host pada Apache2

Setelah menginstal paket `apache2`, memisahkan konfigurasi tiap situs di `/etc/apache2/sites-available/` jauh lebih bersih daripada mengubah `000-default.conf` secara langsung:

```bash
sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/lab.conf
sudo a2ensite lab.conf
sudo systemctl reload apache2
```

Selalu uji sintaks konfigurasi sebelum me-reload layanan:

```bash
sudo apache2ctl configtest
```

## 2. Filtering dan Caching Dasar dengan Squid Proxy

Squid berguna untuk menghemat bandwidth sekaligus membatasi akses domain tertentu pada jaringan praktikum. Di `/etc/squid/squid.conf`, urutan aturan `http_access` sangat menentukan:

```conf
acl jaringan_lab src 192.168.10.0/26
acl situs_terlarang dstdomain "/etc/squid/blokir.txt"

http_access deny situs_terlarang
http_access allow jaringan_lab
http_access deny all
```

Setelah memperbarui daftar domain, bangun ulang cache dan muat ulang konfigurasi:

```bash
sudo squid -k parse
sudo systemctl reload squid
```

## Pelajaran penting

Biasakan membaca log secara langsung (`journalctl -u squid -f` atau `/var/log/apache2/error.log`) setiap kali layanan gagal menyala—pesan error di terminal hampir selalu menunjuk baris konfigurasi yang keliru.

