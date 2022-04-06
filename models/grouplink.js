'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groupLink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      groupLink.hasMany(models.link, {
        as: "link",
        foreignKey: {
          name: "idGroup",
        },
      });
    }
  }
  groupLink.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    uniqueLink: DataTypes.STRING,
    viewCount: DataTypes.INTEGER,
    imgBrand: DataTypes.STRING,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'groupLink',
  });
  return groupLink;
};