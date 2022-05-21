import Genre from '../models/genres';

export const createGenre = async (req, res) => {

    const { name } = req.body;

    if (!req.file?.path) {
        return res.json({
            msg: 'Image must be sent'
        });
    }

    const { path } = req.file;

    try {
        await Genre.create({
            image: path,
            name
        });

        res.json({
            msg: 'Genre created successfully'
        });

    } catch (error) {
        console.log(error)
        res.status(404).json({
            msg: 'Error creating genre'
        });
    };
};

export const updateGenre = async (req, res) => {

    const { id } = req.params;
    const { name, relatedMedia } = req.body;

    const image = req.file?.path;

    try {
        const genre = await Genre.findByPk(id);

        if (!genre || genre.state === false) {
            res.status(404).json({
                msg: 'There is no genre with this id'
            });
        }

        await genre.update({ image, name, relatedMedia });

        res.json({msg: 'Genre updated successfully'});

    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: 'Something went wrong'
        });
    };
};

export const deleteGenre = async (req, res) => {

    const { id } = req.params;

    const genre = await Genre.findByPk(id);

    if (!genre || genre.state === false) {
        res.status(404).json({
            msg: 'There is no genre with this id'
        });
    }

    await genre.update({ state: false });

    res.json({msg: 'Genre deleted successfully'});
};

