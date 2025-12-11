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


## Kuis Pilihan Ganda (Latihan)

1. **Mengapa kita perlu melakukan validasi input?**  
   **Jawaban:** b. Mencegah data sampah atau berbahaya masuk ke sistem

2. **Library populer untuk validasi di Express.js adalah...**  
   **Jawaban:** b. express-validator

3. **HTTP Status Code yang tepat jika validasi gagal adalah...**  
   **Jawaban:** c. 400 Bad Request

4. **Dalam Prisma, relasi One-to-Many didefinisikan dengan...**  
   **Jawaban:** a. Array di satu sisi (Product[]) dan field relation di sisi lain

5. **Apa fungsi include saat melakukan query findMany?**  
   **Jawaban:** c. Mengambil data relasi (join) agar ikut muncul di response

6. **Jika Product punya categoryId, maka categoryId disebut sebagai...**  
   **Jawaban:** b. Foreign Key

7. **Apa arti @relation(fields: [categoryId], references: [id]) di schema Prisma?**  
   **Jawaban:** c. Mendefinisikan hubungan Foreign Key

8. **Format JSON response error validasi yang baik adalah...**  
   **Jawaban:** c. {"success": false, "errors": [...]}

9. **Kapan validasi sebaiknya dilakukan?**  
   **Jawaban:** b. Sebelum data diproses atau disimpan ke database

10. **Library validasi modern yang sangat Type-safe dan cocok dengan TypeScript adalah...**  
    **Jawaban:** b. Zod

11. **File konfigurasi utama setup Prisma kustom adalah...**  
    **Jawaban:** b. prisma.config.ts

12. **Lokasi file schema model sesuai prisma.config.ts adalah...**  
    **Jawaban:** c. src/prisma/schema/

13. **Entry point schema di prisma.config.ts adalah...**  
    **Jawaban:** a. src/prisma/schema/base.prisma

14. **Cara mendefinisikan fungsi service?**  
    **Jawaban:** c. export const getAllProducts = async () => {}

15. **Lokasi file migrasi sesuai konfigurasi?**  
    **Jawaban:** b. src/prisma/migrations

16. **Jika ingin membuat model baru Transaction, apa yang harus dilakukan?**  
    **Jawaban:** b. Buat file baru src/prisma/schema/Transaction.prisma

17. **Cara mengimport semua fungsi dari product.service.ts ke controller?**  
    **Jawaban:** c. import * as productService from '../services/product.service'

18. **Dari mana prisma.config.ts mengambil URL database?**  
    **Jawaban:** c. Langsung dari process.env

19. **Mengapa schema dipecah jadi modular?**  
    **Jawaban:** b. Agar file tidak terlalu panjang dan mudah di-maintain
