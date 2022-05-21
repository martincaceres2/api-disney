import bcryptjs from 'bcryptjs';
import User from '../models/users';

import sgMail from '@sendgrid/mail'

//This would have a required token and an admin role
export const getUsers = async (req, res) => {

  const users = await User.findAll({
    where: {
      state: true
    }
  });

  res.json({ users });
};

export const getUser = async (req, res) => {

  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user || user.state === false) {
    res.status(404).json({
      msg: 'There is no user with this id'
    });
  } else {
    res.json(user);
  }
};

//Register controller
export const createUser = async (req, res) => {

  const { email, password } = req.body;

  try {
    const emailExists = await User.findOne({
      where: {
        email: email
      }
    });

    if (emailExists?.state === false && password === password) {
      emailExists.state = true;

      await emailExists.update({ state: true });

      return res.json({ msg: 'Your account has been reactivated' });
    }

    if (emailExists) {
      return res.status(400).json({
        msg: 'Email is already registered'
      });
    }

    const user = new User({ email, password });

    //Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: user.email,
      from: 'disneychallengeapi@gmail.com',
      subject: 'Registration',
      text: 'You have been successfully registered. Welcome to our Disney API.'
    };

    sgMail
    .send(msg)
    .then(() => {}, error => {
      console.error(error);
  
      if (error.response) {
        console.error(error.response.body)
      }
    });
    
    res.json({ msg: 'You have signed up successfylly. Please check your welcome email' });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'User creation failed'
    });
  }
};

export const updateUser = async (req, res) => {

  const { id } = req.params;
  const { email, password } = req.body;

  try {
    const user = await User.findByPk(id)

    if (!user) {
      return res.status(404).json({
        msg: 'There is no user with this id'
      });
    }

    await user.update({ email, password });

    if (password) {
      const salt = bcryptjs.genSaltSync();
      user.password = bcryptjs.hashSync(password, salt);
    }

    await user.save();

    res.json({ msg: 'User updated successfully' });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Something went wrong'
    });
  };
};

export const deleteUser = async (req, res) => {

  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      msg: 'There is no user with this id'
    });
  }

  await user.update({ state: false });

  res.json({ msg: 'User deleted successfully' });
};