const UserModel=require('../models');
const users=UserModel.users;
 
class UserControllers{
    //RETRIEVE ALL DATA.
    static getUsers = async(req, res)=>{
        const user_list=await users.findAll({});
        if(user_list.length > 0){
            res.status(200).json({
                Status: 200,
                User_list:user_list
            });
        }else{
            res.status(404).json({
                Status: 404,
                Message: "No users found."
            });
        }
    }
    //UPDATE SELECTED USER.
    static putUser=async(req, res)=>{
        const id = req.params.id;

        await users.update(req.body,{
            where:{id:id}
        }).then((num) => {
            if (num == 1) {
              res.status(200).json({
                Status: 200,
                message:"User details was updated successfully."
            });
            } else {
              res.status(404).json({
                Status: 404,
                Message: "User not found."
            });
            }
          });
    }
    //DELETE SELECTED ID USER.
    static deleteUser=async(req, res)=>{
        const id=req.params.id;

        await users.destroy({
            where:{id:id}
        }).then((response)=>{
            console.log(response);
          if(response == 1){
            res.status(200).json({
                Status: 200,
                message:"User removed successfully."
            });
          }else{
            res.status(404).json({
                Status: 404,
                Message: "User not found."
            });
          }
        });
    }
    /*SIGNUP.
    static addUser = async(req, res)=>{
        let data={
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        let ExistingEmail= await users.findOne({
            where:{
                email:data.email
            }
        });
        if(ExistingEmail){
            res.status(409).json({
                status:409,
                error:"Email already exist."
            })
        }else{
            const new_user=await users.create(data)
            res.status(200).json({
                Status: 200,
                message:"New user successfully added."
            })
        }
    }
    // LOGIN AUTHORIZE USER.
    static loginUser=async(req, res)=>{
        const email=req.body.email;
        const password=req.body.password;

        const user=await users.findOne({
            where:{
                email:email,
                password:password
            }
        });
        if (user) {
            res.status(200).json({
                Status: 200,
                Message: "Authorize user. Login Successful."
            });
        }else{
            res.status(401).json({
                Status: 401,
                Message: "Check your credentials and try again."
            });
        }
    }*/
}
module.exports=UserControllers