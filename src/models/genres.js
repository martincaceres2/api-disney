import { DataTypes } from 'sequelize';
import db from '../db/database';

import Movie from '../models/movies';

const Genre = db.define('Genre', {
    name: {
        type: DataTypes.STRING
    },

    image: {
        type: DataTypes.STRING
    },

    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
});

Movie.belongsToMany(Genre, { through: 'Genre_Movie', as: 'genre' });

export default Genre;