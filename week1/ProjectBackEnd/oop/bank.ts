interface IBank {
    nama: string
    alamat: string

    getNama(): void
    getAlamat(): void
}


export class bank implements IBank {
    nama : string
    alamat : string

    constructor(nama: string, alamat: string) {
        this.nama = nama
        this.alamat = alamat
    }

    getNama() {
        console.log(this.nama);
    }
    getAlamat() {
        console.log(this.alamat);
    }

}