const JWT = require('jsonwebtoken');
// require('dotenv').config();  here i need to require because i am calling procss.env outside of createTokenForUser but no needed when i user this in this function 


function createTokenForUser(user){
  const secret = process.env.JWT_SECRET || "test_secret";
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role
  };

  const token = JWT.sign(payload, secret);
  return token;
}

function validateToken(token){
  const payload = JWT.verify(token, process.env.JWT_SECRET);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken
}