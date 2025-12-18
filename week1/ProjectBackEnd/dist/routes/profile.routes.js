import { Router } from "express";
import * as profile from '../controllers/profile.controller';
import { validate } from "../utils/validator";
import { createProfileValidation, updateProfileValidation } from "../validations/profile.validation";
import { authenticate } from "../middlewares/auth.middlleware";
import { upload } from "../middlewares/upload.middleware";
const router = Router();
router.get('/:id', profile.getById);
router.post('/', authenticate, upload.single('profile_picture_url'), validate(createProfileValidation), profile.create);
router.put('/:id', validate(updateProfileValidation), profile.update);
router.delete('/:id', profile.remove);
export default router;
//# sourceMappingURL=profile.routes.js.map