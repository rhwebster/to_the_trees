'use-strict';

module.exports = (sequelize, DataTypes) => {
    const RentalApp = sequelize.define("RentalApp",
        {
            userId: DataTypes.INTEGER,
            body: DataTypes.TEXT,
            type: DataTypes.BOOLEAN,
        },
        {}
    );
    RentalApp.associate = function (models) {
        RentalApp.belongsTo(models.User, { foreignKey: "userId" });
    };
    return RentalApp;
};