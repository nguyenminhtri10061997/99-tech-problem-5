import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { LoginDto } from '../dtos/authDtos/loginDTO.';
import { validateDto } from '../middlewares/validateDto';

const router = Router();
const authController = new AuthController();

router.post('/login', validateDto(LoginDto), authController.login);

export default router;
