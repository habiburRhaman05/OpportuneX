const jwt = require('jsonwebtoken');
const logger = require('./logger');
const ErrorHandler = require('./errorHandler');

// Get the Token

const generateTokens = async (user,expire, secret) => {

  
  try {
    let token = await jwt.sign(
    { data: { email: user?.email, id: user._id, role: user.role } },
    secret,
    {
      // expiresIn: new Date(new Date().getTime() + 15 * 60 * 1000),
      expiresIn:expire ,
    }
  );

  let refreshToken = await jwt.sign(
    { data: { email: user?.email, id: user._id, role: user.role } },
    secret,
    {
      expiresIn: '7d',
    }
  );
  return { token, refreshToken };
  } catch (error) {
        logger.error(error.message);
      throw new  ErrorHandler("failed to generate Token",400)

  }
};

const generateDecodedToken = async (token, secret) => {
  const { err, decoded } = await jwt.verify(
    token,
    secret,
    function (err, decoded) {
     if(err){
      console.log("erro-from decode ",err);
      
     }
      return { err, decoded };
    }
  );
  return { err, decoded };
};
module.exports = { generateTokens, generateDecodedToken };

