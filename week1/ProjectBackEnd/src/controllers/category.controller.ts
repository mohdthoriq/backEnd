import type { Request, Response } from "express";
import { successResponse } from "../utils/response";
import type { ICategoryService } from "../services/category.service";

export interface ICategoryController {
  list(req: Request, res: Response): Promise<void>;
  getById(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
  remove(req: Request, res: Response): Promise<void>;
}


export class CategoryController implements ICategoryController {
  constructor(private categoryService: ICategoryService) {}

  async list(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as any;
    const sortBy = req.query.sortBy as string;
    const sortOrder = req.query.sortOrder as "asc" | "desc";

    const result = await this.categoryService.list({
      page,
      limit,
      search,
      sortBy,
      sortOrder
    });

    const pagination = {
      page: result.currentPage,
      limit,
      total: result.total,
      totalPages: result.totalPages
    };

    successResponse(
      res,
      "Daftar Category ditemukan",
      result,
      pagination
    );
  }

  async getById(req: Request, res: Response) {
    if (!req.params.id) {
      throw new Error("ID category tidak ditemukan");
    }

    const category = await this.categoryService.getById(req.params.id);

    successResponse(
      res,
      "Category ditemukan",
      category
    );
  }

  async create(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
      throw new Error("Nama category wajib diisi");
    }

    const category = await this.categoryService.create(name);

    successResponse(
      res,
      "Category berhasil dibuat",
      category,
      null,
      201
    );
  }

  async update(req: Request, res: Response) {
    if (!req.params.id) {
      throw new Error("ID category tidak ditemukan");
    }

    const category = await this.categoryService.update(
      req.params.id,
      req.body
    );

    successResponse(
      res,
      "Category berhasil diperbarui",
      category
    );
  }

  async remove(req: Request, res: Response) {
    if (!req.params.id) {
      throw new Error("ID category tidak ditemukan");
    }

    const deleted = await this.categoryService.delete(req.params.id);

    successResponse(
      res,
      "Category berhasil dihapus",
      deleted
    );
  }
}

