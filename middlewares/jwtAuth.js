import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

const env = dotenv.config().parsed;

const jwtAuth = () => {
  //next digunakan untuk melanjutkan ke function berikutnya pada file2 routes
  return function (req, res, next) {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const verify = jsonwebtoken.verify(token, env.JWT_ACCESS_TOKEN_SECRET);
        //verify tidak bisa pakai throw
        req.jwt = verify;
        next();
      } else {
        throw { message: 'TOKEN_REQUIRED' };
      }
    } catch (err) {
      console.log(err);

      if (err.message == 'jwt expired') {
        err.message = 'ACCESSS_TOKEN_EXPIRED';
      } else if (err.message == 'TOKEN_REQUIRED') {
        err.message = 'TOKEN_REQUIRED';
      } else {
        err.message = 'TOKEN_INVALID';
      }

      //   if (err.message == 'jwt expired') {
      //     err.message = 'ACCESSS_TOKEN_EXPIRED';
      //   } else if (err.message == 'jwt malformed' || err.message == 'jwt signiture' || err.message == 'jwt invalid') {
      //     err.message = 'TOKEN_INVALID';
      //   }

      return res.status(401).json({
        status: false,
        message: err.message,
      });
    }
  };
};

export default jwtAuth;
