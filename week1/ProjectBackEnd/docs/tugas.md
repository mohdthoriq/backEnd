toko_laptop_db=# create table categories (id serial primary key, name text not null unique);

CREATE TABLE
toko_laptop_db=# \d categories

                            Table "public.categories"
 Column |  Type   | Collation | Nullable |                Default
--------+---------+-----------+----------+----------------------------------------
 id     | integer |           | not null | nextval('categories_id_seq'::regclass)
 name   | text    |           | not null |
Indexes:
    "categories_pkey" PRIMARY KEY, btree (id)
    "categories_name_key" UNIQUE CONSTRAINT, btree (name)


toko_laptop_db=# alter table items
toko_laptop_db-# add category_id int;

ALTER TABLE
toko_laptop_db=# select * from items;

 id |           name            |  category  |    price    | is_active | category_id
----+---------------------------+------------+-------------+-----------+-------------
  1 | Asus ROG Strix G15        | Laptop     | 18000000.00 | t         |
  2 | Lenovo ThinkPad X1 Carbon | Laptop     | 22000000.00 | t         |
  3 | iPhone 14 Pro             | Smartphone | 19000000.00 | t         |
  4 | Samsung Galaxy Tab S9     | Tablet     |  7500000.00 | t         |
(4 rows)

toko_laptop_db=# alter table items
toko_laptop_db-# add constraint fk_items_category
toko_laptop_db-# foreign key (category_id) references categories(id);

ALTER TABLE

toko_laptop_db=# insert into categories (name) values
toko_laptop_db-# ('laptop'),
toko_laptop_db-# ('mouse'),
toko_laptop_db-# ('keyboard');

INSERT 0 3

toko_laptop_db=# update items
toko_laptop_db-# set category_id = 1 where category = 'Laptop';

UPDATE 2
toko_laptop_db=# INSERT INTO categories (name)
toko_laptop_db-# VALUES ('Smartphone'), ('Tablet');
INSERT 0 2
toko_laptop_db=# UPDATE items SET category_id = 4 WHERE category = 'Smartphone';
UPDATE 1
toko_laptop_db=# UPDATE items SET category_id = 5 WHERE category = 'Tablet';
UPDATE 1
toko_laptop_db=# select * from items;

 id |           name            |  category  |    price    | is_active | category_id
----+---------------------------+------------+-------------+-----------+-------------
  1 | Asus ROG Strix G15        | Laptop     | 18000000.00 | t         |           1
  2 | Lenovo ThinkPad X1 Carbon | Laptop     | 22000000.00 | t         |           1
  3 | iPhone 14 Pro             | Smartphone | 19000000.00 | t         |           4
  4 | Samsung Galaxy Tab S9     | Tablet     |  7500000.00 | t         |           5
(4 rows)

toko_laptop_db=# select items.id, items.name as nama_produk, categories.name as kategori, items.price as harga from items
toko_laptop_db-# join categories on items.category_id = categories.id;

 id |        nama_produk        |  kategori  |    harga
----+---------------------------+------------+-------------
  1 | Asus ROG Strix G15        | laptop     | 18000000.00
  2 | Lenovo ThinkPad X1 Carbon | laptop     | 22000000.00
  3 | iPhone 14 Pro             | Smartphone | 19000000.00
  4 | Samsung Galaxy Tab S9     | Tablet     |  7500000.00
(4 rows)

toko_laptop_db=# select categories.name as kategori, count(items.id) as total_produk from categories
toko_laptop_db-# left join items on items.category_id = categories.id
toko_laptop_db-# group by kategori;

  kategori  | total_produk
------------+--------------
 mouse      |            0
 Tablet     |            1
 laptop     |            2
 Smartphone |            1
 keyboard   |            0
(5 rows)

toko_laptop_db=# select categories.name as kategori, max(items.price) as harga_terMAHAL from categories
toko_laptop_db-# join items on items.category_id = categories.id
toko_laptop_db-# group by categories.name
toko_laptop_db-# order by harga_terMahal desc
toko_laptop_db-# limit 1;

 kategori | harga_termahal
----------+----------------
 laptop   |    22000000.00
(1 row)


Kuis SQL — Jawaban
1. Relasi Penulis – Buku (1 penulis banyak buku)

Jawaban: b. One-to-Many

2. Fungsi FOREIGN KEY

Jawaban: b. Menghubungkan satu tabel ke tabel lain

3. Mengambil data dari dua tabel berelasi

Jawaban: c. JOIN

4. JOIN yang hanya menampilkan data jika kedua tabel punya pasangan

Jawaban: c. INNER JOIN

5. LEFT JOIN ketika data di tabel kanan tidak ada

Jawaban: b. Data tabel kanan berisi NULL

6. Fungsi agregasi untuk menghitung jumlah baris data

Jawaban: c. COUNT()

7. GROUP BY biasanya dipakai bersama...

Jawaban: c. Fungsi Agregasi (COUNT, SUM, dll)

8. Memfilter hasil setelah GROUP BY

Jawaban: b. HAVING

9. Kegunaan LIMIT dan OFFSET

Jawaban: c. Untuk Pagination (Halaman)

10. Relasi Many-to-Many membutuhkan...

Jawaban: c. 3 Tabel (1 tabel pivot/penghubung)