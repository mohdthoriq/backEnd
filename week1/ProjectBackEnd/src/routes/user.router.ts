import { Router } from "express";
import { UserRepository } from "../repository/user.repository";
import { PrismaInstance } from "../prisma";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";

const router = Router();

const repo = new UserRepository(PrismaInstance)
const service = new UserService(repo)
const controller = new UserController(service)


router.post('/register', controller.register);
router.post('/login', controller.login)

export default router;