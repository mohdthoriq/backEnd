import http from 'http'
import { hello } from './hello.js'
import moment from 'moment'
import { Product, makanan, minuman } from './product/product.js'
import { detailProduct } from './product/detailProduct.js'

const server = http.createServer((req, res) => {
    const url = req.url
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json') // klo cuma text/plain itu cuma text: string biasa yang gak bisa di proses sama frontEnd

    if (url.startsWith('/product')) {
        if (url.startsWith('/product/') && url.includes('/detail/')) {
            const parts = url.split('/')  
            const category = parts[2]        
            const id = parts[4]
            let listProduct = []
            

            if (category === 'makanan') listProduct = makanan
            if (category === 'minuman') listProduct = minuman

            const detail = detailProduct(id, category)

            if (!detail) {
                res.write(JSON.stringify({
                    status: 'failed',
                    message: 'product ga ketemu bro'
                }))
                return res.end()
            }

            res.write(JSON.stringify({
                status: 'success',
                data: detail,
                time: moment().calendar()
            }))
            return res.end()
        }

        if (url.includes('makanan')) {
            res.write(JSON.stringify({
                status: 'success',
                data: makanan,
                time: moment().calendar()
            }))
        } else if (url.includes('minuman')) {
            res.write(JSON.stringify({
                status: 'success',
                data: minuman,
                time: moment().calendar()
            }))
        } else {
            res.write(JSON.stringify({
                status: 'success',
                data: Product,
                time: moment().calendar()
            }))
        }
        return res.end()
    }

    switch (url) {
        case '/':
            res.write(JSON.stringify({
                status: 'success',
                data: {
                    message: hello,
                    time: moment().calendar()
                }
            }))
            break;
        case '/about':
            res.write(JSON.stringify({
                status: 'success',
                data: {
                    message: 'halaman about',
                    time: moment().calendar()
                }
            }))
            break;
        case '/contact':
            res.write(JSON.stringify({
                status: 'success',
                data: {
                    message: 'halaman contact',
                    time: moment().calendar()
                }
            }))
            break;
        case '/profile': 
            res.write(JSON.stringify({
                status: 'success',
                data: {
                    message: 'halaman profile',
                    time: moment().calendar()
                }
            }))
            break;
        case '/setting':
            res.write(JSON.stringify({
                status: 'success',
                data: {
                    message: 'halaman setting',
                    time: moment().calendar()
                }
            }))
            break;
        case '/a1':
            res.write(JSON.stringify({
                status: 'success',
                data: {
                    message: 'halaman a1',
                    time: moment().calendar()
                }
            }))
            break;
        case '/a2':
            res.write(JSON.stringify({
                status: 'success',
                data: {
                    message: 'halaman a2',
                    time: moment().calendar()
                }
            }))
            break;
        case '/a3':
            res.write(JSON.stringify({
                status: 'success',
                data: {
                    message: 'halaman a3',
                    time: moment().calendar()
                }
            }))
            break;
        case '/a4':
            res.write(JSON.stringify({
                status: 'success',
                data: {
                    message: 'halaman a4',
                    time: moment().calendar()
                }
            }))
            break;
        default:
            res.write(JSON.stringify({
                status: 'failed',
                message: 'halaman tidak ditemukan'
            }))
            break;
    }
    res.end()
})

const hostname = '127.0.0.1'
const port = 3000
server.listen(port, hostname, () => {
    console.log(`server running as http://${hostname}:${port} on ${moment().calendar()}`);
})

