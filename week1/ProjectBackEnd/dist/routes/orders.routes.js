import { Router } from 'express';
import * as order from '../controllers/orders.controller';
import { validate } from '../utils/validator';
import { checkoutOrderValidation, createOrderValidation, getOrderByIdValidation } from '../validations/orders.validation';
import { authenticate } from '../middlewares/auth.middlleware';
const router = Router();
router.get('/', order.getAll);
router.get('/:id', validate(getOrderByIdValidation), order.getById);
router.get('/checkout/:id', validate(getOrderByIdValidation), order.checkoutById);
router.get('/search', order.search);
router.post('/checkout', authenticate, order.checkout);
router.post('/', validate(createOrderValidation), order.create);
router.put('/:id', order.update);
router.delete('/:id', order.remove);
export default router;
//# sourceMappingURL=orders.routes.js.map