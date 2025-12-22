import type { Request, Response } from "express";
import type { IOrderService } from "../services/orders.service";
export interface IOrderController {
    checkout(req: Request, res: Response): Promise<void>;
    list(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    remove(req: Request, res: Response): Promise<void>;
}
export declare class OrderController implements IOrderController {
    private orderService;
    constructor(orderService: IOrderService);
    checkout(req: Request, res: Response): Promise<void>;
    list(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    remove(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=orders.controller.d.ts.map