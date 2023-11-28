const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');

class Movie extends Model {}

Movie.init(
    {
        id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true, 
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        IMDB_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        img_link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'movie',

    }
)

module.exports = Movie;