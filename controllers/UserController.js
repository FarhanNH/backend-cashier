import user from '../models/User.js';
import { isEmailExist, isEmailExistWithUserId } from '../libraries/isEmailExist.js';
import bcrypt from 'bcrypt';

const index = async (req, res) => {
  try {
    let find = {
      fullname: { $regex: `^${req.query.search}`, $options: 'i' },
    };

    let options = {
      page: req.query.page || 1, //pakai query karena mengirim parameternya via url
      limit: req.query.limit || 10,
    };

    const users = await user.paginate(find, options);

    if (!users) {
      throw { code: 404, message: 'USER_NOT_FOUND' };
    }

    return res.status(200).json({
      status: true,
      total: users.length,
      users,
    });
  } catch (err) {
    err.code = err.code || 500;
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

const show = async (req, res) => {
  try {
    if (!req.params.id) {
      throw { code: 428, message: 'ID_REQUIRED' };
    }

    const User = await user.findById(req.params.id);

    if (!User) {
      throw { code: 404, message: 'USER_NOT_FOUND' };
    }

    return res.status(200).json({
      status: true,
      user: User,
    });
  } catch (err) {
    err.code = err.code || 500;
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

const store = async (req, res) => {
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
    if (!req.body.role) {
      throw { code: 428, message: 'ROLE_REQUIRED' };
    }

    if (req.body.password !== req.body.retype_password) {
      throw { code: 428, message: 'PASSWORD_NOT_MATCH' };
    }

    const emailExist = await isEmailExist(req.body.email);
    if (emailExist) {
      throw { code: 409, message: 'EMAIL_EXIST' };
    }

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(req.body.password, salt);

    const newUser = new user({
      fullname: req.body.fullname,
      email: req.body.email,
      role: req.body.role,
      password: hash,
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
    err.code = err.code || 500;
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

const update = async (req, res) => {
  try {
    if (!req.body.fullname) {
      throw { code: 428, message: 'FULLNAME_REQUIRED' };
    }
    if (!req.body.email) {
      throw { code: 428, message: 'EMAIL_REQUIRED' };
    }
    if (!req.body.role) {
      throw { code: 428, message: 'ROLE_REQUIRED' };
    }

    if (req.body.password !== req.body.retype_password) {
      throw { code: 428, message: 'PASSWORD_NOT_MATCH' };
    }

    const emailExist = await isEmailExistWithUserId(req.params.id, req.body.email);
    if (emailExist) {
      throw { code: 409, message: 'EMAIL_EXIST' };
    }

    let fields = {
      fullname: req.body.fullname,
      email: req.body.email,
      role: req.body.role,
    };

    if (req.body.password) {
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(req.body.password, salt);
      fields.password = hash;
    }

    const User = await user.findByIdAndUpdate(req.params.id, fields, { new: true });

    if (!User) {
      throw { code: 500, message: 'USER_UPDATE_FAILED' };
    }

    return res.status(200).json({
      status: true,
      message: 'USER_UPDATE_SUCCESS',
      User,
    });
  } catch (err) {
    err.code = err.code || 500;
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

export { index, store, update, show };
