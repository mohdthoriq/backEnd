import express, { type Application, type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import {
    body,
    param,
    query,
    validationResult,
    type ValidationChain
} from 'express-validator';
import dotenv from 'dotenv'

dotenv.config

const app: Application = express()
const HOST = process.env.HOST || 'http://localhost'
const PORT = process.env.PORT || 3000

interface CustomRequest extends Request {
    startTime?: number;
}


app.use(express.json())
app.use(morgan('dev')) // Middleware logging HTTP request
// `morgan('dev')`: Middleware logging HTTP request. Format 'dev' memberikan output yang ringkas dan berwarna,
//                 sangat berguna saat pengembangan untuk melihat request yang masuk dan status responsnya.
app.use(helmet()) // Middleware keamanan header
// `helmet()`: Membantu mengamankan aplikasi Express dengan mengatur berbagai HTTP headers.
//             Ini melindungi dari beberapa kerentanan web yang diketahui seperti XSS.
app.use(cors()) // Middleware biar bisa di akses dari frontend
// `cors()`: Memungkinkan atau membatasi resource di server agar dapat diakses oleh domain lain (Cross-Origin Resource Sharing).
//           Sangat penting untuk API yang akan diakses oleh frontend dari domain berbeda.


app.use((req: CustomRequest, res: Response, next: NextFunction) => {
    console.log(`Request masuk : ${req.method} ${req.path}`);
    req.startTime = Date.now();
    next();
})

app.use((req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        const err: any = new Error("API Key tidak ditemukan");
        err.statusCode = 401;
        throw err;
    }

    if (typeof apiKey !== 'string') {
        const err: any = new Error("API Key harus berupa string");
        err.statusCode = 403;
        throw err;
    }

    if (apiKey !== 'katasandi123') {
        const err: any = new Error("API Key salah");
        err.statusCode = 403;
        throw err;
    }

    next();
});


interface Produts {
    id: number;
    nama: string;
    deskripsi: string;
    harga: number;
}

let products: Produts[] = [
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

interface ApiResponse {
  success: boolean;
  status?: number;
  message: string;
  data?: unknown;
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
  errors?: Array<{
    field: string;

    message: string;
  }> | { stack?: string };
}

const successResponse = (
  res: Response,
  message: string,
  data: unknown = null,
  pagination: { page: number; limit: number; total: number } | null = null,
  statusCode: number = 200
) => {
  const response: ApiResponse = {
    success: true,
    message,
  };

  if (data !== null) response.data = data;
  if (pagination) response.pagination = pagination;

  return res.status(statusCode).json(response);
};

const errorResponse = (
  res: Response,
  message: string,
  statusCode: number = 400,
  errors: Array<{ field: string; message: string }> | { stack?: string } | null = null
) => {
  const response: ApiResponse = {
    success: false,
    status: statusCode,
    message,
  };

  if (errors) response.errors = errors;

  return res.status(statusCode).json(response);
};

const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)))

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }

        const errorList = errors.array().map(err => ({
            field: err.type === 'field' ? err.path : 'body',
            message: err.msg
        }))
        return errorResponse(res, 'Validation Error', 400, errorList)
    }
}

const createBookValidation = [
    body('judul')
        .trim()
        .notEmpty()
        .withMessage('Judul harus diisi')
        .isLength({ min: 3, max: 100})
        .withMessage('Judul tidak boleh kurang dari 3 karakter atau lebih dari 100 karakter'),
    body('penulis')
        .trim()
        .notEmpty()
        .withMessage('Penulis harus diisi')
        .isLength({ min: 3 })
        .withMessage('Penulis tidak boleh kurang dari 3 karakter'),
    body('tahun')
        .trim()
        .notEmpty()
        .withMessage('Tahun harus diisi')
        .isInt({ min: 1900, max: new Date().getFullYear() }),
    body('harga')
        .trim()
        .notEmpty()
        .withMessage('Harga harus diisi')
        .isInt({ min: 10000 })
]

const getBooksByIdValidation = [
    param('id')
        .isNumeric()
        .withMessage('ID harus berupa angka')
]

app.get('/', (_req: Request, res: Response) => {
    successResponse(
        res,
        "Selamat datang di API E-Commerce!",
        {
            hari: 3,
            status: "Server hidup!"
        ,}
    )
})

app.get('/api/books', (_req: Request, res: Response) => {
    successResponse(
        res,
        "Daftar buku ditemukan",
        books,
        null
    )
})

app.get('/api/books/:id', validate(getBooksByIdValidation), (req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("ID tidak ditemukan");
    }
    const id = parseInt(req.params.id);
    const book = books.find(p => p.id === id);

    if (!book) {
      throw new Error("Buku tidak ditemukan");
    }

    successResponse(
        res,
        "Buku ditemukan",
        book,
    )
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


    successResponse(
        res,
        "Hasil pencarian ditemukan",
        result,
        null
    )
});

app.post('/api/books', validate(createBookValidation), (req: Request, res: Response) => {
    const { judul, penulis, tahun, harga } = req.body;

    const number = Number(harga);

    if (isNaN(number)) {
        throw new Error("Harga harus berupa angka");
    }

    const numberTahun = Number(tahun);
    if (isNaN(numberTahun) || tahun.toString().length !== 4) {
       throw new Error("Tahun harus berupa angka 4 digit");
    }


    const newBook = {
        id: products.length + 1,
        judul,
        penulis,
        tahun: numberTahun,
        harga: number
    };

    books.push(newBook);

    successResponse(
        res,
        "Buku berhasil ditambahkan",
        newBook,
        null,
        201
    )
});

app.put('/api/books/:id', (req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("ID tidak ditemukan");
    }

    const id = parseInt(req.params.id);
    const index = books.findIndex(p => p.id === id);

    if (index === -1) {
        successResponse(
            res,
            "Buku tidak ditemukan",
            null,
            null,
            404
        );
        return;
    }

    // Penggunaan Spread Operator (`...`):
    // `...products[index]` akan menyalin semua properti dari objek produk yang sudah ada.
    // `...req.body` akan menyalin semua properti dari data yang dikirimkan di body request.
    // Jika ada properti yang sama, properti dari `req.body` akan menimpa properti dari `products[index]`.
    // Ini memungkinkan kita untuk melakukan partial update (hanya mengubah properti yang dikirim).
    books[index] = { ...books[index], ...req.body };

    successResponse(
        res,
        "Buku berhasil diperbarui",
        books[index],
        null,
        200
    )
});

app.delete('/api/books/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id!);
  const index = books.findIndex(p => p.id === id);

  if (index === -1) {
   throw new Error("Buku tidak ditemukan");
  }

  const deleted = books.splice(index, 1);

  successResponse(
    res,
    "Buku berhasil dihapus",
    deleted,
    null,
    200
  )
});

const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Promise.resolve digunakan untuk memastikan fungsi fn yang dijalankan selalu mengembalikan Promise.
    // Ini penting agar .catch(next) dapat menangkap error yang terjadi, baik dari fungsi async
    // maupun fungsi synchronous yang melempar error. Tanpa asyncHandler, setiap fungsi controller
    // yang bersifat async dan berpotensi melempar error perlu dibungkus dengan try-catch manual.
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

app.get('/api/async', asyncHandler(async(req:Request, res:Response) => {
    await new Promise(resolve => setTimeout(resolve, 100))
    successResponse(res, "Berhasil mengambil data", null)
}))

// app.get('/api/async', async (_req: Request, res: Response) => {
//     try {
//         await new Promise(resolve => setTimeout(resolve, 100))
//         successResponse(res, "Berhasil mengambil data", null)
//     } catch (error) {
//         errorResponse(res, "Terjadi kesalahan", 500)
//     }
// })

app.get(/.*/, (req: Request, res: Response) => {
    // errorResponse(res, "Halaman tidak ditemukan")
    throw new Error(`Route ${req.originalUrl} tidak ada di API E-Commerce`);
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('ERROR:', err.message);

  const statusCode =
    err.statusCode ||                       
    (err.message.includes('tidak ditemukan') ? 404 : 400); 

  const debugInfo =
    process.env.NODE_ENV === 'development'
      ? { stack: err.stack }
      : null;

  errorResponse(res, err.message || 'Terjadi kesalahan server', statusCode, debugInfo);
});


app.listen(PORT, () => {
    console.log(`Server jalan → ${HOST}:${PORT}`);
    console.log(`Coba buka semua route di atas pakai Postman!`);
});