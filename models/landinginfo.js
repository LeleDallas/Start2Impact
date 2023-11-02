'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LandingInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LandingInfo.init({
    landed_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'LandingInfo',
  });
  return LandingInfo;
};

//npx sequelize-cli model:generate --name LandingInfo --attributes landed_at:date
