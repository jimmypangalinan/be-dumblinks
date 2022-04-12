'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      brand.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "id"
        }
      });

      brand.hasMany(models.link, {
        as: "link",
        foreignKey: {
          name: "idBrand",
        },
      });
    }
  }
  brand.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    uniqueLink: DataTypes.STRING,
    viewCount: DataTypes.INTEGER,
    imgBrand: DataTypes.STRING,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'brand',
  });
  return brand;
};