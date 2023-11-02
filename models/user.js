'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      hasMany(models.LandingInfo, { foreignKey: 'userId' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    fullName: DataTypes.STRING,
    age: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

//npx sequelize-cli model:generate --name User --attributes username:string,email:string,fullName:string,age:number