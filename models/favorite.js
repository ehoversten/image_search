module.exports = function(sequelize, DataTypes) {
    var Favorite = sequelize.define("Favorite", {
        photographer: DataTypes.STRING,
        photographer_url: DataTypes.STRING,
        photo_url: DataTypes.STRING
    });
    return Favorite;
}