import type { Request, Response } from "express";
import type { IOrderItemService } from "../services/order_items.service";
export declare class OrderItemController {
    private orderItemService;
    constructor(orderItemService: IOrderItemService);
    getAll: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    remove: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=order_items.cotroller.d.ts.map