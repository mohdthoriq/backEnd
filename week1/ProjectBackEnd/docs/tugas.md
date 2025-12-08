toko_laptop_db=# select * from items;

 id |           name            |  category  |    price    | is_active
----+---------------------------+------------+-------------+-----------
  1 | Asus ROG Strix G15        | Laptop     | 18000000.00 | t
  2 | Lenovo ThinkPad X1 Carbon | Laptop     | 22000000.00 | t
  3 | iPhone 14 Pro             | Smartphone | 19000000.00 | t
  4 | Samsung Galaxy Tab S9     | Tablet     |  12000000.00  | t
  5 | Xiaomi Mi Band 8          | Smartwatch |   750000.00 | t
(5 rows)

toko_laptop_db=# select * from items where price > 5000000;

 id |           name            |  category  |    price    | is_active
----+---------------------------+------------+-------------+-----------
  1 | Asus ROG Strix G15        | Laptop     | 18000000.00 | t
  2 | Lenovo ThinkPad X1 Carbon | Laptop     | 22000000.00 | t
  3 | iPhone 14 Pro             | Smartphone | 19000000.00 | t
  4 | Samsung Galaxy Tab S9     | Tablet     | 12000000.00 | t
(4 rows)

toko_laptop_db=# select * from items where category = 'Laptop';

 id |           name            | category |    price    | is_active
----+---------------------------+----------+-------------+-----------
  1 | Asus ROG Strix G15        | Laptop   | 18000000.00 | t
  2 | Lenovo ThinkPad X1 Carbon | Laptop   | 22000000.00 | t
(2 rows)

toko_laptop_db=# select * from items order by id asc;

 id |           name            |  category  |    price    | is_active
----+---------------------------+------------+-------------+-----------
  1 | Asus ROG Strix G15        | Laptop     | 18000000.00 | t
  2 | Lenovo ThinkPad X1 Carbon | Laptop     | 22000000.00 | t
  3 | iPhone 14 Pro             | Smartphone | 19000000.00 | t
  4 | Samsung Galaxy Tab S9     | Tablet     |  7500000.00 | t            // update
  5 | Xiaomi Mi Band 8          | Smartwatch |   750000.00 | t
(5 rows)

toko_laptop_db=# delete from items
toko_laptop_db-# where id = 5;

DELETE 1

toko_laptop_db=# select * from items;

 id |           name            |  category  |    price    | is_active
----+---------------------------+------------+-------------+-----------
  1 | Asus ROG Strix G15        | Laptop     | 18000000.00 | t
  2 | Lenovo ThinkPad X1 Carbon | Laptop     | 22000000.00 | t
  3 | iPhone 14 Pro             | Smartphone | 19000000.00 | t
  4 | Samsung Galaxy Tab S9     | Tablet     |  7500000.00 | t
(4 rows)

## Jawaban Kuis SQL

1. **Apa kepanjangan dari SQL?**  
   **➡ b. Structured Query Language**

2. **Manakah yang termasuk database Relasional (SQL)?**  
   **➡ c. PostgreSQL**

3. **Perintah untuk mengambil data dari tabel adalah...**  
   **➡ c. SELECT**

4. **Tipe data paling tepat untuk menyimpan harga barang agar presisi adalah...**  
   **➡ c. DECIMAL**

5. **Apa fungsi PRIMARY KEY?**  
   **➡ b. Sebagai pengenal unik setiap baris data**

6. **Query menampilkan produk stok habis (0)**  
   **➡ a. SELECT * FROM products WHERE stock = 0;**

7. **ORDER BY price DESC artinya...**  
   **➡ b. Urutkan harga dari termahal ke termahal**

8. **DELETE FROM products; tanpa WHERE akan...**  
   **➡ c. Semua data di tabel products akan terhapus**

9. **Untuk mengubah data yang sudah ada, kita pakai...**  
   **➡ c. UPDATE**

10. **VARCHAR(50) artinya...**  
    **➡ b. Teks maksimal 50 karakter**
