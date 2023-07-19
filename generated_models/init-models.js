var DataTypes = require("sequelize").DataTypes;
var _continents = require("./continents");
var _countries = require("./countries");
var _country_languages = require("./country_languages");
var _country_stats = require("./country_stats");
var _guests = require("./guests");
var _languages = require("./languages");
var _region_areas = require("./region_areas");
var _regions = require("./regions");
var _vips = require("./vips");

function initModels(sequelize) {
  var continents = _continents(sequelize, DataTypes);
  var countries = _countries(sequelize, DataTypes);
  var country_languages = _country_languages(sequelize, DataTypes);
  var country_stats = _country_stats(sequelize, DataTypes);
  var guests = _guests(sequelize, DataTypes);
  var languages = _languages(sequelize, DataTypes);
  var region_areas = _region_areas(sequelize, DataTypes);
  var regions = _regions(sequelize, DataTypes);
  var vips = _vips(sequelize, DataTypes);

  countries.belongsToMany(languages, { as: 'language_id_languages', through: country_languages, foreignKey: "country_id", otherKey: "language_id" });
  languages.belongsToMany(countries, { as: 'country_id_countries', through: country_languages, foreignKey: "language_id", otherKey: "country_id" });
  regions.belongsTo(continents, { as: "continent", foreignKey: "continent_id"});
  continents.hasMany(regions, { as: "regions", foreignKey: "continent_id"});
  country_languages.belongsTo(countries, { as: "country", foreignKey: "country_id"});
  countries.hasMany(country_languages, { as: "country_languages", foreignKey: "country_id"});
  country_stats.belongsTo(countries, { as: "country", foreignKey: "country_id"});
  countries.hasMany(country_stats, { as: "country_stats", foreignKey: "country_id"});
  country_languages.belongsTo(languages, { as: "language", foreignKey: "language_id"});
  languages.hasMany(country_languages, { as: "country_languages", foreignKey: "language_id"});
  countries.belongsTo(regions, { as: "region", foreignKey: "region_id"});
  regions.hasMany(countries, { as: "countries", foreignKey: "region_id"});

  return {
    continents,
    countries,
    country_languages,
    country_stats,
    guests,
    languages,
    region_areas,
    regions,
    vips,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
