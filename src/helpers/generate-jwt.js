import jwt from 'jsonwebtoken';

export const generateJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '1d'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Token couldnt be generated');
            } else {
                resolve(token);
            };
        });
    });
};