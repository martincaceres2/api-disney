import { Router } from 'express';
import { check } from 'express-validator';

import { getMovies, getMovie, createMovie, updateMovie, deleteMovie } from '../controllers/movies';
import { validateFields } from '../middlewares/validate-fields';

import { validateJWT } from '../middlewares/validate-jwt';

import multer from 'multer';

const upload = multer({ dest: 'uploads/movies' })

const router = Router();

router.get('/', getMovies);

router.get('/:id', getMovie);

// Token is needed
router.post('/', upload.single('image'), [validateJWT,
    check('title', 'Title is required').not().isEmpty(),
    check('releaseDate', 'Release date is required').not().isEmpty(),
    check('rating', 'Rating is required').not().isEmpty(),
    check('genre', 'Genre is required').not().isEmpty(),
    validateFields
], createMovie);

//Token is needed
router.put('/:id', upload.single('image'),
    [validateJWT, validateFields], updateMovie);

//Token is needed
router.delete('/:id', [validateJWT, validateFields], deleteMovie);

export default router;