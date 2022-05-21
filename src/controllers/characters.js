import Character from "../models/characters";
import Movie from '../models/movies';

export const getCharacters = async (req, res) => {

    const queryFilter = {
        state: true
    };

    if (req.query.name) {
        queryFilter.name = req.query.name;
    }

    if (req.query.age) {
        queryFilter.age = req.query.age;
    }

    const characters = await Character.findAll({

        where: queryFilter,

        attributes: ['name', 'image'],

        include: {
            model: Movie,
            as: 'movies',
            attributes: ['title']
        }
    });

    res.json(characters);
};


export const getCharacter = async (req, res) => {

    const { id } = req.params;

    const character = await Character.findOne({

        where: {
            id
        },

        include: {
            model: Movie,
            as: 'movies'
        },
    });

    if (!character || character.state === false) {
        res.status(400).json({
            msg: 'There is no character with this id'
        });
    } else {
        res.json(character);
    }
};

export const createCharacter = async (req, res) => {

    const { age, name, weight, history, movies } = req.body;

    if (!req.file?.path) {
        return res.json({
            msg: 'Image must be sent'
        });
    }

    const { path } = req.file;

    try {

        const character = await Character.create({
            image: path,
            age,
            name,
            weight,
            history,
        });

        movies.forEach(async m => {
            const movie = await Movie.findOne({
                where: {
                    title: m
                }
            });

            if (!movie) {
                return;
            }

            await character.addMovie(movie);
        });

        res.json({ msg: 'Character created successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error creating character'
        });
    }
};

export const updateCharacter = async (req, res) => {

    const { id } = req.params;

    const { name, age, weight, history } = req.body;

    const image = req.file?.path;

    try {
        const character = await Character.findByPk(id);

        if (!character || character.status === false) {
            res.status(404).json({
                msg: 'There is no character with this id'
            });
        }

        await character.update({ image, name, age, weight, history });

        res.json({ msg: 'Character updated successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong'
        });
    };
};

export const deleteCharacter = async (req, res) => {

    const { id } = req.params;

    const character = await Character.findByPk(id);

    if (!character) {
        return res.status(404).json({
            msg: 'There is no character with this id'
        });
    }

    await character.update({ state: false });

    res.json({ msg: 'Character deleted successfully' });
};