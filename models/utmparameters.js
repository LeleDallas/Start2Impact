'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UTMParameters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UTMParameters.init({
    utm_campaign: DataTypes.STRING,
    utm_medium: DataTypes.STRING,
    utm_source: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UTMParameters',
  });
  return UTMParameters;
};

//npx sequelize-cli model:generate --name UTMParameters --attributes utm_campaign:string,utm_medium:string,utm_source:string
