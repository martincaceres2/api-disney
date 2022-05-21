import { Router } from 'express';
import { check } from 'express-validator';

import { createGenre, updateGenre, deleteGenre } from '../controllers/genres';
import { validateFields } from '../middlewares/validate-fields';

import { validateJWT } from '../middlewares/validate-jwt';

import multer from 'multer';

const upload = multer({ dest: 'uploads/genres' })

const router = Router();

// Token is needed
router.post('/', upload.single('image'), [validateJWT,
    check('name', 'name is required').not().isEmpty(),
    validateFields
], createGenre);

//Token is needed
router.put('/:id', upload.single('image'),
    [validateJWT, validateFields], updateGenre);

//Token is needed
router.delete('/:id', [validateJWT, validateFields], deleteGenre);

export default router;