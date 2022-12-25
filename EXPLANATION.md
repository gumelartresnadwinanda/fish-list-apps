# List Display

## Table
Dengan banyaknya data yang ditampilkan, untuk dapat dilihat dengan jelas saya menggunakan tampilan tabel dengan penomoran dan warna baris berbeda untuk baris ganjil dan genap

Posisi Tampilan data diatur untuk menampilkan komoditas dan harga terlebih dahulu agar user dengan tampilan mobile dapat melihat informasi utama tanpa harus scroll terlebih dahulu

| No | Komoditas | Ukuran | Harga | Kota | Provinsi | Waktu | Action |
| -- |---------- | ------ | ----- | ---- | -------- | ----- | ------ |

Dalam kolom Action terdapat 2 tombol untuk melakukan operasi update dan delete


## Sort
Sorting di tampilan ini diaplikasikan dengan cara meng-klik judul tabel yang ditandai dengan icon sort
icon sort ini digunakan untuk menginformasikan kepada user kolom mana yang menjadi parameter urutan utama

## Filter
Filter dalam tampilan ini ditandai dengan button yang dapat diklik dan menampilkan modal berisi pilihan filter
isi pilihan tersebut akan berdasarkan dari data yang ada pada list data sehingga kemungkinan user untuk mendapatkan data hasil filter akan lebih banyak dibandingkan dengan isian free text (input)
pilihan ini bentuknya adalah chip yang bisa user klik

selain chip, ada pilihan berupa input minimal dan maksimal untuk field yang bertipe angka (harga dan ukuran)
batasan minimal dan maksimal ditentukan dari list data sebelumnya

## Search
Search dalam tampilan ini berisikan input field dan tombol search, hasil pencarian akan merujuk ke kolom komoditas yang mana adalah informasi utama
terdapat action button yang muncul setelah user input minimal 1 karakter untuk mereset keyword
user dapat menginisiasi pencarian menggunakan tombol search atau tombol `enter` pada keyboard

## Search & Filter
Search & Filter apabila digunakan secara bersamaan akan berfungsi sebagai `&&`
misal: `Filter kota bandung` & search kata `le`, contoh lain `filter kota bandung & filter komoditas nila`
data yang ditampilkan adalah list data dengan komoditas yang terdapat kata `le` dan dari kota bandung

sedangkan apabila dalam 1 field digunakan dengan 2 pilihan filter akan menjadi fungsi `||`
misal: `Filter kota bandung & filter kota cirebon`, contoh lain `komoditas lele & komoditas nila`
data yang ditampilkan adalah list data dari kota cirebon atau dari kota bandung


# Create and Update
## Create
Fungsi Create adalah untuk menambahkan data diinisiasi dengan user klik tombol create
akan muncul modal berisikan form dengan input

## Update
Fungsi Update untuk memperbarukan data yang dapat diinisiasi dengan user mengklik tombol update di masing masing baris data

## Form Data
### Komoditas
input komoditas ini berbentuk text dan wajib diisi
### Area
input area ini berbentuk pilihan dari pasangan kota - provinsi, sehingga user hanya perlu memilih salah satu
### Harga
input harga ini berbentuk nomor dan wajib diisi
### Ukuran
input ukuran ini berbentuk pilihan dari list data size, sehingga user hanya perlu memilih salah satu
### Timestamp & tgl_parsed
data timestamp & tgl_parsed diambil dari waktu saat user input/update sehingga data yang muncul akan up to date


# Cache
menggunakan service worker untuk cache response API dengan metode GET
cache akan diinvalidate setiap 1 jam, sehingga masih up to date setiap jamnya 
dan cache akan diinvalidate setiap update/create/delete data, sehingga data akan tetap up to date saat user memodifikasi data