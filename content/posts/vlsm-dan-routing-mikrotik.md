---
title: "Catatan Praktikum: Subnetting VLSM, VLAN, dan NAT di MikroTik"
date: "2026-09-18"
excerpt: "Ringkasan alur konfigurasi jaringan multi-ruangan dari perhitungan blok IP VLSM hingga pengujian konektivitas antar-VLAN dan firewall NAT."
tags: ["networking", "mikrotik", "vlan"]
---

## Mengapa mulai dari tabel VLSM?

Kesalahan paling sering saat merancang topologi jaringan bukanlah salah ketik perintah di terminal, melainkan alokasi alamat IP yang tumpang tindih atau boros. Dengan **Variable Length Subnet Mask (VLSM)**, kita mengurutkan kebutuhan host dari divisi terbesar ke terkecil sebelum menyentuh router.

Contoh pembagian untuk blok dasar `192.168.10.0/24`:

| Segmen | Kebutuhan Host | Subnet Mask | Prefix | Rentang Usable IP |
| --- | --- | --- | --- | --- |
| Lab Komputer | 50 host | `255.255.255.192` | `/26` | `192.168.10.1 – 192.168.10.62` |
| Ruang Dosen | 25 host | `255.255.255.224` | `/27` | `192.168.10.65 – 192.168.10.94` |
| Server & Printer | 10 host | `255.255.255.240` | `/28` | `192.168.10.97 – 192.168.10.110` |

## Urutan konfigurasi di MikroTik RouterOS

Agar troubleshooting mudah, saya selalu mengikuti urutan layer bawah ke atas:

1. **Identitas & Interface**: Beri nama jelas pada setiap port (`ether1-wan`, `ether2-trunk`, `ether3-server`).
2. **VLAN Interface**: Buat sub-interface VLAN pada port trunk yang menuju switch manageable.
3. **IP Address & DHCP Pool**: Pasang gateway untuk tiap VLAN sesuai tabel VLSM.
4. **Firewall NAT (Masquerade)**: Izinkan subnet lokal mengakses internet melalui interface WAN.

```bash
/interface vlan
add interface=ether2-trunk name=vlan10-lab vlan-id=10
add interface=ether2-trunk name=vlan20-dosen vlan-id=20

/ip address
add address=192.168.10.1/26 interface=vlan10-lab
add address=192.168.10.65/27 interface=vlan20-dosen

/ip firewall nat
add chain=srcnat out-interface=ether1-wan action=masquerade
```

## Checklist verifikasi cepat

- Ping dari router ke gateway internet (`8.8.8.8`) dan uji resolusi DNS.
- Pastikan klien di `vlan10-lab` mendapat IP dari DHCP sesuai pool `/26`.
- Gunakan **Torch** atau **Wireshark** untuk memastikan tag VLAN (`802.1Q`) keluar masuk sesuai ID yang diharapkan.

