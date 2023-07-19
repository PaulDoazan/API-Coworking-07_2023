const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('country_stats', {
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'countries',
        key: 'country_id'
      }
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gdp: {
      type: DataTypes.DECIMAL(15,0),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'country_stats',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "country_id" },
          { name: "year" },
        ]
      },
    ]
  });
};
