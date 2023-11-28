const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class CommentRating extends Model {}

CommentRating.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true, 
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id",
            },

        },
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "movie",
                key: "id",
            },
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'commentrating',
    }
);

module.exports = CommentRating;