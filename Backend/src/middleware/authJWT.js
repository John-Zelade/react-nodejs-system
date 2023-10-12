const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;
const RefreshToken=db.refreshToken;

const{TokenExpiredError} = jwt;
const catchError =(err, res)=>{
  if (err instanceof TokenExpiredError){
    return res.status(401).send({
      message:"Expired Access Token"
    });
  }
    return res.status(401).send({
      message:"Unauthorized"
    });
}

verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
    const cookie =token.split('=')[1]; 
    jwt.verify(cookie,
              config.secret,
              (err, decoded) => {
                if (err) {
                  return catchError(err, res);
                }
                req.userId = decoded.id;
                next();
              });
  };
  verifyRefresh=(req, res, next)=>{
    let token = req.headers['authorization'];
    if (!token) {
      next();
    }
    next();
  };
  isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send({
          message: "Require Admin Role!"
        });
        return;
      });
    });
  };

  /*verifyRefresh=async(req, res, next)=>{
    let refreshToken = req.cookies['refreshToken'];
    console.log(refreshToken);
    
    if (!refreshToken) {
      return res.status(403).send({
        message: "No refresh token provided!"
      });
    }
    let token=await RefreshToken.findOne({ where: { token:refreshToken} });
    if(!token){
      return res.status(403).send({
        message: "Required Refresh Token."
    });
    }
    if (RefreshToken.verifyExpiration(token)) {
        RefreshToken.destroy({ where: { id: token.id } });
      
        return res.status(403).json({
          message: "Refresh token was expired. Please make a new signin request",
      });
    }
  next();
  };*/
  
  const authJwt = {
    //verifyRefreshToken: verifyRefresh,
    verifyToken: verifyToken,
    isAdmin: isAdmin,
  };
  module.exports = authJwt;