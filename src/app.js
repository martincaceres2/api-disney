import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import dotenv from 'dotenv';
dotenv.config();

//Import routes
import charactersRoute from './routes/characters';
import genresRoute from './routes/genres';
import loginRoute from './routes/auth';
import moviesRoute from './routes/movies';
import userRoute from './routes/user';

import db from './db/database';

//Initialization
const app = express();

//DB connection
db.sync();

//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(json());


//Routes
app.use('/characters', charactersRoute);
app.use('/genres', genresRoute);
app.use('/auth/login', loginRoute);
app.use('/movies', moviesRoute);
app.use('/auth/register', userRoute);

export default app;