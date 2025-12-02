import express, { type Application, type Request, type Response } from "express";
import dotenv from 'dotenv'

dotenv.config

const app: Application = express()
const HOST = process.env.HOST || 'http://localhost'
const PORT = process.env.PORT || 5000


app.use(express.json())

let products = [
    { id: 1, nama: "Laptop Gaming", deskripsi: "Intel i7, RTX 3060", harga: 15000000 },
    { id: 2, nama: "Keyboard Mekanikal", deskripsi: "Blue Switch, RGB", harga: 800000 },
    { id: 3, nama: "Mouse Wireless", deskripsi: "Ergonomic, Silent Click", harga: 300000 }
];

let books = [
  { 
    id: 1, 
    judul: "Belajar JavaScript", 
    penulis: "Andi Wijaya", 
    tahun: 2021,
    harga: 120000
  },
  { 
    id: 2, 
    judul: "Node.js untuk Pemula", 
    penulis: "Siti Rahma", 
    tahun: 2020,
    harga: 95000
  },
  { 
    id: 3, 
    judul: "Mastering React", 
    penulis: "Budi Santoso", 
    tahun: 2023,
    harga: 145000
  }
];





app.get('/', (_req: Request, res: Response) => {
    res.json({
        message: "Selamat datang di API E-Commerce!",
        hari: 3, // Mengubah menjadi hari 3
        status: "Server hidup!"
    })
})

app.get('/api/books', (_req: Request, res: Response) => {
    res.json({
        success: true,
        jumlah: products.length,
        data: products
    })
})

app.get('/api/books/:id', (req: Request, res: Response) => {
    if (!req.params.id) {
        res.json({
            success: false,
            message: "ID tidak ditemukan",
        })
        return
    }
    const id = parseInt(req.params.id);
    const book = books.find(p => p.id === id);

    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Buku tidak ditemukan"
        });
    }

    res.json({
        success: true,
        data: book
    });
});

app.get('/api/search', (req: Request, res: Response) => {
    const { name, max_price, min_price } = req.query;

    let result = products;

    if (typeof name === "string" && name.trim() !== "") {
        result = result.filter(p =>
            p.nama.toLowerCase().includes((name as string).toLowerCase())
        );
    }

    if (max_price) {
        const max = Number(max_price);
        if (!isNaN(max)) {
            result = result.filter(p => p.harga <= max);
        }
    }

    if (min_price) {
        const min = Number(min_price);
        if (!isNaN(min)) {
            result = result.filter(p => p.harga >= min);
        }
    }


    res.json({
        success: true,
        jumlah: result.length,
        filtered_result: result
    });
});

app.post('/api/products', (req: Request, res: Response) => {
    const { judul, penulis, tahun, harga } = req.body;

    const number = Number(harga);

    if (isNaN(number)) {
        return res.status(400).json({
            success: false,
            message: "Harga harus berupa angka"
        });
    }

    const numberTahun = Number(tahun);
    if (isNaN(numberTahun) || tahun.toString().length !== 4) {
        return res.status(400).json({
            success: false,
            message: "Tahun harus berupa angka 4 digit"
        });
    }


    const newBook = {
        id: products.length + 1,
        judul,
        penulis,
        tahun: numberTahun,
        harga: number
    };

    books.push(newBook);

    res.status(201).json({
        success: true,
        message: "Buku berhasil ditambahkan",
        data: newBook
    });
});

app.put('/api/books/:id', (req: Request, res: Response) => {
    if (!req.params.id) {
        res.json({
            success: false,
            message: "ID tidak ditemukan",
        })
        return
    }

    const id = parseInt(req.params.id);
    const index = books.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ success: false, message: "Buku tidak ada" });
    }

    // Penggunaan Spread Operator (`...`):
    // `...products[index]` akan menyalin semua properti dari objek produk yang sudah ada.
    // `...req.body` akan menyalin semua properti dari data yang dikirimkan di body request.
    // Jika ada properti yang sama, properti dari `req.body` akan menimpa properti dari `products[index]`.
    // Ini memungkinkan kita untuk melakukan partial update (hanya mengubah properti yang dikirim).
    books[index] = { ...books[index], ...req.body };

    res.json({
        success: true,
        message: "Produk berhasil diupdate",
        data: books[index]
    });
});

app.delete('/api/products/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id!);
  const index = books.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Buku tidak ada" });
  }

  const deleted = books.splice(index, 1);

  res.json({
    success: true,
    message: "Buku berhasil dihapus",
    data: deleted[0]
  });
});


app.listen(PORT, () => {
    console.log(`Server jalan → ${HOST}:${PORT}`);
    console.log(`Coba buka semua route di atas pakai Postman!`);
});