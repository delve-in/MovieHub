const User = require('./User');
const Wish = require('./Wishlist');
const Comment = require('./CommentRating');
const Movie = require('./Movie');

User.hasMany(Wish, {
    foreignKey: 'user_id',
});

Wish.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, { 
    foreignKey: 'user_id',
});

Comment.belongsTo(Movie, {
    foreignKey: 'movie_id',
});

Movie.hasMany(Comment, {
    foreignKey: 'movie_id',
});

Wish.belongsTo(Movie, {
    foreignKey: 'movie_id',
});

Movie.hasMany(Wish, {
    foreignKey: 'movie_id',
}),




module.exports = {
    User,
    Wish,
    Comment,
    Movie,
};
