import { books } from "../models/product.model"

export const getAllBooks = () => {
    return { books, total: books.length }
}

export const getBookById = (id: string) => {
    const numId = parseInt(id);
    const book = books.find(p => p.id === numId);

    if (!book) {
        throw new Error("Buku tidak ditemukan");
    }
    return book;
}

export const searchBooks = (name?: string, max_price?: string, min_price?: string) => {
    let result = books;

    if (typeof name === "string" && name.trim() !== "") {
        result = result.filter(p =>
            p.judul.toLowerCase().includes((name as string).toLowerCase())
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
    return result;
}

export const createBook = (judul: string, penulis: string, tahun: number, harga: number) => {
    const number = Number(harga);

    if (isNaN(number)) {
        throw new Error("Harga harus berupa angka");
    }

    const numberTahun = Number(tahun);
    if (isNaN(numberTahun) || tahun.toString().length !== 4) {
        throw new Error("Tahun harus berupa angka 4 digit");
    }

    const newBook = {
        id: books.length + 1,
        judul,
        penulis,
        tahun: numberTahun,
        harga: number
    };

    books.push(newBook);

    return books;
}

export const updateBook = (id: string, data: any) => {
    const numId = parseInt(id);
    const index = books.findIndex(p => p.id === numId);

    if (index === -1) {
        throw new Error("Buku tidak ditemukan");
    }

    books[index] = { ...books[index], ...data };

    return books[index];

}

export const deleteBook = (id: string) => {
    const numId = parseInt(id);
      const index = books.findIndex(p => p.id === numId);
    
      if (index === -1) {
       throw new Error("Buku tidak ditemukan");
      }
    
      const deleted = books.splice(index, 1);

      return deleted;
}