'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LandingInfo extends Model {
    static associate(models) {
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
