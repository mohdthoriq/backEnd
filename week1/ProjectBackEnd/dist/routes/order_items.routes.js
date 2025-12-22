import { Router } from 'express';
import { validate } from '../utils/validator';
import { createOrderItemValidation, getOrderItemByIdValidation } from '../validations/order_items.validation';
import { PrismaInstance } from '../prisma';
import { OrderItemRepository } from '../repository/order_items.repository';
import { OrderItemService } from '../services/order_items.service';
import { OrderItemController } from '../controllers/order_items.cotroller';
const router = Router();
const repo = new OrderItemRepository(PrismaInstance);
const service = new OrderItemService(PrismaInstance, repo);
const controller = new OrderItemController(service);
router.get('/', controller.getAll);
router.get('/:id', validate(getOrderItemByIdValidation), controller.getById);
router.post('/', validate(createOrderItemValidation), controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
export default router;
//# sourceMappingURL=order_items.routes.js.map