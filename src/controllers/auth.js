import bcryptjs from 'bcryptjs';

import User from '../models/users';

import { generateJWT } from '../helpers/generate-jwt';

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(400).json({
                msg: 'Wrong credentials'
            });
        }

        if (user.state === false) {
            return res.status(400).json({
                msg: 'Wrong credentials'
            });
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Wrong credentials'
            });
        }

        const token = await generateJWT(user.id);

        res.json({msg: 'Logged in successfully', token});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong'
        });
    };
};