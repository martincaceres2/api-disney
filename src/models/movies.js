import { DataTypes } from 'sequelize';
import db from '../db/database';

const Movie = db.define('Movie', {
    image: {
        type: DataTypes.STRING
    },

    title: {
        type: DataTypes.STRING
    },

    releaseDate: {
        type: DataTypes.DATEONLY
    },

    rating: {
        type: DataTypes.INTEGER
    },

    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
});

export default Movie;