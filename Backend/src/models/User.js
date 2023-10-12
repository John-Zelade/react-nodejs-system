module.exports=(sequelize, DataTypes)=>{
   const User=sequelize.define("User",{
        id:{
            type:DataTypes.INTEGER(11),
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },
   });
   return User;
};
