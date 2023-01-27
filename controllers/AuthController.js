import user from '../models/User.js';

const register = async (req, res) => {
  try {
    if (!req.body.fullname) {
      throw { code: 428, message: 'FULLNAME_REQUIRED' };
    }
    if (!req.body.email) {
      throw { code: 428, message: 'EMAIL_REQUIRED' };
    }
    if (!req.body.password) {
      throw { code: 428, message: 'PASSWORD_REQUIRED' };
    }

    if (req.body.password !== req.body.retype_password) {
      throw { code: 428, message: 'PASSWORD_MUST_MATCH' };
    }

    const emailExist = await user.findOne({ email: req.body.email });
    if (emailExist) {
      throw { code: 409, message: 'EMAIL_EXIST' };
    }

    const newUser = new user({
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    const User = await newUser.save();

    if (!User) {
      throw { code: 500, message: 'USER_REGISTER_FAILED' };
    }

    return res.status(200).json({
      status: true,
      message: 'USER_REGISTER_SUCCESS',
      User,
    });
  } catch (err) {
    if (!err) {
      err.code = 500;
    }
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

export { register };
