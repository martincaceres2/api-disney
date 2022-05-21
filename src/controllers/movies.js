import Movie from '../models/movies';
import Genre from '../models/genres';
import Character from '../models/characters';

export const getMovies = async (req, res) => {

    const queryFilter = {
        state: true
    };

    if (req.query.name) {
        queryFilter.name = req.query.name
    }

    if (req.query.genre) {
        queryFilter.genre = req.query.genre
    }

    const movies = await Movie.findAll({

        where: queryFilter,

        attributes: ['id', 'image', 'title', 'releaseDate'],
        
        include: [
            {
                model: Character,
                as: 'characters',
                attributes: ['id', 'name']
            },

            {
                model: Genre,
                as: 'genre',
                attributes: ['name']
            }
        ]
    });

    res.json(movies);
};

export const getMovie = async (req, res) => {

    const { id } = req.params;

    const movie = await Movie.findOne({
        where: {
            id
        },

        include: [
            {
                model: Character,
                as: 'characters',
                attributes: ['id', 'name']
            },

            {
                model: Genre,
                as: 'genre',
                attributes: ['name']
            }
        ]
    });

    if (!movie || movie.state === false) {
        res.status(404).json({
            msg: 'There is no movie with this id'
        })
    } else {
        res.json(movie)
    }
};

export const createMovie = async (req, res) => {

    const { title, releaseDate, rating, genre } = req.body;

    if (!req.file?.path) {
        return res.json({
            msg: 'Image must be sent'
        });
    }

    const { path } = req.file;

    try {
        const movie = await Movie.create({
            image: path,
            title,
            releaseDate,
            rating,
        });

        genre.forEach(async g => {
            const genre = await Genre.findOne({
                where: {
                    name: g
                }
            });

            if (!genre) {
                return;
            }

            await movie.addGenre(genre);
        });

        res.json({ msg: 'Movie created successfully' })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error creating movie'
        });
    };
};

export const updateMovie = async (req, res) => {

    const { id } = req.params;
    const { title, releaseDate, rating } = req.body;

    const image = req.file?.path;

    try {
        const movie = await Movie.findByPk(id);

        if (!movie || movie.state === false) {
            res.status(404).json({
                msg: 'There is no movie with this id'
            });
        }

        await movie.update({ image, title, releaseDate, rating });

        await movie.save();

        res.json({ msg: 'Movie updated successfully' });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something went wrong'
        });
    }
};

export const deleteMovie = async (req, res) => {

    const { id } = req.params;

    const movie = await Movie.findByPk(id);

    if (!movie || movie.state === false) {
        res.status(404).json({
            msg: 'There is no movie with this id'
        });
    }

    await movie.update({ state: false });

    res.json({ msg: 'Movie deleted successfully' });
};