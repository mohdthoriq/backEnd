import express, { type Application, type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { successResponse } from "./utils/response";
import { errorHandler } from "./middlewares/error.handler";
import productRouter from "./routes/product.routes";
import userRouter from "./routes/user.router";
import categoryRouter from "./routes/category.routes";
import orderRouter from "./routes/orders.routes";
import orderItemRouter from "./routes/order_items.routes";
import { requestLogger } from "./middlewares/logging.middleware";
import { authenticate } from "./middlewares/auth.middlleware";

const app: Application = express()

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

app.use(requestLogger)

app.use('/auth', userRouter)

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

app.use('/api/products', productRouter)
app.use('/api/categories',  categoryRouter)
app.use('/api/orders', authenticate, orderRouter)
app.use('/api/order-items', orderItemRouter);

app.get(/.*/, (req: Request, res: Response) => {
    throw new Error(`Route ${req.originalUrl} tidak ada di API E-Commerce`);
})

app.use(errorHandler)

export default app;