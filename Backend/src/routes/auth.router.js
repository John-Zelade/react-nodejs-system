const authController = require('../controllers/auth.controller');
const {verifySignUp} = require("../middleware");
const express = require('express');
const router= express.Router();
const {authJwt}=require("../middleware");

router.post('/signup', [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ], authController.signup);

router.post("/signin", authController.login);
router.get("/refresh-access-token", authController.refreshAccessToken);
router.get("/logout", authController.logout);
router.get("/refresh-token", authController.getRefreshToken);

module.exports=router;
