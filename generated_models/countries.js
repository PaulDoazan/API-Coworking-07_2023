const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('countries', {
    country_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    area: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    national_day: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    country_code2: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      unique: "country_code2"
    },
    country_code3: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      unique: "country_code3"
    },
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'regions',
        key: 'region_id'
      }
    }
  }, {
    sequelize,
    tableName: 'countries',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "country_id" },
        ]
      },
      {
        name: "country_code2",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "country_code2" },
        ]
      },
      {
        name: "country_code3",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "country_code3" },
        ]
      },
      {
        name: "region_id",
        using: "BTREE",
        fields: [
          { name: "region_id" },
        ]
      },
    ]
  });
};
