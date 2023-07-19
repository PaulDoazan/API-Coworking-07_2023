const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('country_languages', {
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'countries',
        key: 'country_id'
      }
    },
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'languages',
        key: 'language_id'
      }
    },
    official: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'country_languages',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "country_id" },
          { name: "language_id" },
        ]
      },
      {
        name: "language_id",
        using: "BTREE",
        fields: [
          { name: "language_id" },
        ]
      },
    ]
  });
};
