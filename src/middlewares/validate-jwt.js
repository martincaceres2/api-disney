import jwt from 'jsonwebtoken';

import User from '../models/users';

export const validateJWT = async (req, res, next) => {

    const token = req.header('d-token');

    if (!token) {
        return res.status(400).json({
            msg: 'There is no token'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findByPk(uid);

        if (!user.state) {
            return res.status(401).json({
                msg: 'Invalid token'
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Invalid token'
        });
    }
};
