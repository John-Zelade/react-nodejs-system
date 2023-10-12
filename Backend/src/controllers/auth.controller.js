const db = require("../models");
const config = require("../config/auth.config");
const { users: User, roles: Role, refreshToken: RefreshToken } = db;

const Op = db.Sequelize.Op;

const jwt=require("jsonwebtoken");

var bcrypt=require("bcryptjs");

class authController{
    static signup = async(req, res)=>{
       // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
  //SIGN IN USER.
  static login=async(req, res)=>{
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(async(user) => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
        
        const token = jwt.sign({ id: user.id },
                                config.secret,
                                {
                                  algorithm: 'HS256',
                                  allowInsecureKeySizes: true,
                                  expiresIn: config.jwtExpiration //86400,  24 hours
                                });
        const refreshToken = await RefreshToken.createToken(user);
        
        var authorities = [];
        user.getRoles().then(roles => {
          //console.log(roles.length);
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          //console.log(roles[0].id);
          }
          res.cookie('authToken', token,{httpOnly:false, secure:true, maxAge: 15 * 60 * 1000});
          res.cookie('refreshToken',refreshToken,{secure: true, httpOnly: true, sameSite: 'lax', maxAge: 15 * 60 * 1000})
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles:authorities[0],
            accessToken: token,
            refreshToken:refreshToken

          });
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });   
  };
  //ACCESS TOKEN
  static refreshAccessToken = async (req, res)=>{
    //const {refreshToken : requestToken}=req.body;//"use this statement in post request."
    let requestToken = req.cookies['refreshToken'];
    console.log("Request Token: "+requestToken);
    if (requestToken == null){
      return res.status(403).send({
        message:"Refresh Token is required."
      });
    }
    try {
      let refreshToken = await RefreshToken.findOne({
          where:{
            token:requestToken
          }
      });
      if (!refreshToken) {
        res.status(403).json({ message: "Refresh token is not in database!" });
        return;
      }
  
      if (RefreshToken.verifyExpiration(refreshToken)) {
        RefreshToken.destroy({ where: { id: refreshToken.id } });
        
        res.status(403).json({
          message: "Refresh token was expired. Please make a new signin request",
        });
        return;
      }
  
      const user = await refreshToken.getUser();
      //console.log(user);
      let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });
  
      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: refreshToken.token,
      });

    }
    catch(err){
      return res.status(500).send({
          message:err
      });
    }
  }
  static getRefreshToken =async(req, res)=>{
      let refreshToken = req.cookies['refreshToken'];
      //console.log("Refresh Token: "+refreshToken);
      res.status(200).send({
        refreshToken:refreshToken,
      });
  }

  static logout = async(req, res)=>{
    try {
      req.session = null;
      return res.status(200).send({
        message: "You've been signed out!"
      });
    } catch (err) {
      this.next(err);
    };
  }
}
  
module.exports=authController