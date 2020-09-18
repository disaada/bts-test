'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  };
  order.init({
    id_order: DataTypes.TEXT,
    id_user: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};