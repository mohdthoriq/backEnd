import { AkunBank } from "./akun";
import { bank } from "./bank";

// intance Bank
const BSI = new bank ('Bank Syariah Indonesia', 'jakarta')
const BCA = new bank ('Bank Central Asia', 'bandung')

// instance akun
const akun1 = new AkunBank(BSI, 'Yusuf Ramadhani', 1000000000, '123456789')


// BSI.getNama(), BSI.getAlamat()
// BCA.getNama(), BCA.getAlamat()

akun1.getNama()
akun1.getPemilik()
akun1.getSaldo()
akun1.getNoRekening()

akun1.deposit(1000000)
akun1.getSaldo()
akun1.tarik(2000000)
akun1.getSaldo()