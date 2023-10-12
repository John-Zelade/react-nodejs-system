const {authJwt}=require("../middleware");
const express = require('express');
const router = express.Router();
const userController=require('../controllers/UserControllers');
const ValidateUser =require("../middleware/validators/ValidateUser");

router.get('/users',[authJwt.verifyToken, authJwt.isAdmin],userController.getUsers);
router.get('/users',[authJwt.verifyToken],userController.getUsers);
//router.post('/add-new-user',ValidateUser.validateNewUser,userController.addUser);
router.put('/edit-user-details/:id',ValidateUser.validateUpdateUser,userController.putUser);
router.delete('/delete-user/:id',userController.deleteUser);
//router.post("/refreshtoken", authController.refreshToken);
//router.post('/log-in/',userController.loginUser);


module.exports=router;