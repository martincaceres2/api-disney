import { Router } from 'express';
import { check } from 'express-validator';

import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/user';

import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';

const router = Router();

//This would require a token and an admin role
router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
], createUser);

// Token is needed
router.put('/:id', [validateJWT, validateFields], updateUser);

//Token is needed
router.delete('/:id', [validateJWT, validateFields], deleteUser);

export default router;