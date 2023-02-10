import user from '../models/User.js';

const index = async (req, res) => {
  try {
    const users = await user.paginate(
      {},
      {
        page: req.query.page || 1, //pakai query karena mengirim parameternya via url
        limit: req.query.limit || 10,
      }
    );

    if (!users) {
      throw { code: 500, message: 'GET_USER_FAILED' };
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

export { index };
