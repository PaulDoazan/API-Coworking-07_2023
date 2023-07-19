const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('regions', {
    region_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    continent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'continents',
        key: 'continent_id'
      }
    }
  }, {
    sequelize,
    tableName: 'regions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "region_id" },
        ]
      },
      {
        name: "continent_id",
        using: "BTREE",
        fields: [
          { name: "continent_id" },
        ]
      },
    ]
  });
};
