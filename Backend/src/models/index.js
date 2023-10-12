const dbConfig=require("../config/databaseConnection");
const {Sequelize}=require('sequelize');

const sequelize=new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
        host:dbConfig.HOST,
        dialect:dbConfig.dialect,
        operationsAliases:false,
        pool:{
            max: dbConfig.pool.max,
	        min: dbConfig.pool.min,
	        acquire: dbConfig.pool.acquire,
	        idle: dbConfig.pool.idle
        },
        logging:false
    });
sequelize.authenticate()
.then(()=>{
    console.log('Successfully connected to the database');
})
.catch(err=>{
    console.log("ERROR! Unable to connect: "+err);
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/User.js")(sequelize, Sequelize);
db.roles = require("../models/role.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(sequelize, Sequelize);

db.roles.belongsToMany(db.users, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.users.belongsToMany(db.roles, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.refreshToken.belongsTo(db.users, {
  foreignKey: 'userId', targetKey: 'id'
});
db.users.hasOne(db.refreshToken, {
  foreignKey: 'userId', targetKey: 'id'
});

db.ROLES = ["user","admin"];

db.sequelize.sync().then(() => {
    console.log('Resync Database');
 }).catch((error) => {
    console.error('Unable Resync Database: ', error);
 });

module.exports = db;