import { Router } from 'express';
import { check } from 'express-validator';

import { getCharacters, getCharacter, createCharacter, updateCharacter, deleteCharacter } from '../controllers/characters';

import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';

import multer from 'multer';

const upload = multer({ dest: 'uploads/characters' });

const router = Router();

router.get('/', getCharacters);

router.get('/:id', getCharacter);

//Create a character - token is needed
router.post('/', upload.single('image'), [validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('age', 'Age is required').not().isEmpty(),
    check('weight', 'Weight is required').not().isEmpty(),
    check('history', 'History is required').not().isEmpty(),
    validateFields
], createCharacter);

//Update a character - token is needed
router.put('/:id', upload.single('image'),
    [validateJWT, validateFields], updateCharacter);

//Delete a character - token is needed
router.delete('/:id', [validateJWT, validateFields], deleteCharacter);

export default router;
