'use-strict';

module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image',
        {
            listingId: DataTypes.INTEGER,
            imageUrl: DataTypes.TEXT,
        },
        {}
    );
    Image.associate = function (models) {
        Image.belongsTo(models.Listing, { foreignKey: "listingId" });
    }
    return Image;
}