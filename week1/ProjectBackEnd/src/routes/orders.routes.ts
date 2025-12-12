import { Router } from 'express';
import * as order from '../controllers/orders.controller';
import { validate } from '../utils/validator';
import { createOrderValidation, getOrderByIdValidation } from '../validations/orders.validation';

const router = Router();

router.get('/', order.getAll)
router.get('/:id', validate(getOrderByIdValidation), order.getById);
router.get('/search', order.search);
router.post('/', validate(createOrderValidation), order.create)
router.put('/:id', order.update);
router.delete('/:id', order.remove );

export default router;