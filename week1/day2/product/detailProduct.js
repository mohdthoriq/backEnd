import { makanan, minuman } from './product.js'

export const detailProduct = (id, category) => {
    const productId = Number(id)

    if (category === 'makanan') {
        const food = makanan.find(item => item.id === productId)
        if (food) return { type: 'makanan', ...food }
    }

    if (category === 'minuman') {
        const drink = minuman.find(item => item.id === productId)
        if (drink) return { type: 'minuman', ...drink }
    }

    return null
}
