const authJwt = require("../middleware/authJWT");
const verifySignUp = require("../middleware/verifySignup");

module.exports = {
  authJwt,
  verifySignUp
};