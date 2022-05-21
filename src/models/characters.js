import { DataTypes } from 'sequelize';
import db from '../db/database';

import Movie from './movies';

const Character = db.define('Character', {
    image: {
        type: DataTypes.STRING
    },

    name: {
        type: DataTypes.STRING
    },

    age: {
        type: DataTypes.INTEGER
    },

    weight: {
        type: DataTypes.DECIMAL
    },

    history: {
        type: DataTypes.STRING
    },

    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
});

Character.belongsToMany(Movie, { through: 'Character_Movie', as: 'movies' });
Movie.belongsToMany(Character, { through: 'Character_Movie', as: 'characters' });

export default Character;