const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('region_areas', {
    region_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    region_area: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'region_areas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "region_name" },
        ]
      },
    ]
  });
};
