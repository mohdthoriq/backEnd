import { bank } from "./bank";

export class AkunBank extends bank {
    public constructor(
        public bank : bank,
        public pemilik: string,
        private saldo: number,
        private noRekening: string,
    ) {
        super(bank.nama, bank.alamat);
    }

    getPemilik() {
        console.log(this.pemilik);
    }
    getSaldo() {
        console.log(this.saldo);
    }
    getNoRekening() {
        console.log(this.noRekening);
    }
    deposit(jumlah: number) {
        if (jumlah <= 0) console.log('jumlah deposit harus lebih dari 0');
        
        this.saldo += jumlah
    }
    tarik(jumlah: number) {
        if (jumlah > this.saldo) return console.log('saldo tidak cukup');
        
        this.saldo -= jumlah
    }
}