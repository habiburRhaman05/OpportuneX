const { findUser } = require('../services/authservices');
const { generateDecodedToken } = require('../utils/authHandler');
const ErrorHandler = require('../utils/errorHandler');

exports.authenticatedRoutes = async (req, res, next) => {
  const AUTH_JWT_SECRIT =  process.env.AUTH_JWT_SECRIT
  try {

    let token =
        req.cookies?.accessToken 
        req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      res.status(401).json({
        message: 'Token Not Found',
      });
      throw new ErrorHandler('Token Not Found', 401);
    }


    
    // Determine which API is being served



    // verify the incoming refresh token requred token and secret key
    const { err, decoded } = await generateDecodedToken(token, process.env.AUTH_JWT_SECRIT);
    if (err) {
      throw new ErrorHandler('Token_Invalid_or_Expire', 401);
    }
    req.user = decoded.data;
    next();
  } catch (error) {
    next(error);
  }
};

exports.authorize = (roles) => {
  return (req, res, next) => {
    console.log(req.user);
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Forbidden: You dont have access',
      });
    }
    next();
  };
};
