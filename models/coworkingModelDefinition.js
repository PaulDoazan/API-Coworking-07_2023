module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Coworking', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Le nom ne peut pas être vide'
                }
            },
            unique: {
                msg: 'Le nom est déjà pris'
            }
        },
        price: DataTypes.JSON,
        superficy: {
            type: DataTypes.INTEGER,
            validate: {
                isInt: {
                    msg: 'La superficie doit être un nombre entier'
                },
                isNumeric: {
                    msg: 'La superficie doit être un nombre'
                }
            }
        },
        capacity: {
            type: DataTypes.INTEGER,
            validate: {
                isInt: {
                    msg: 'La superficie doit être un nombre entier'
                },
                isNumeric: {
                    msg: 'La superficie doit être un nombre'
                }
            }
        },
        address: DataTypes.JSON,
    });
}
