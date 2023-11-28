const CommentRating = require('../models/CommentRating');

const commentdata = [ 
    {
        user_id: 2,
        movie_id: 1,
        comment: 'Very confusing',
        rating: 4 
    },
    {
        user_id: 1,
        movie_id: 2,
        comment: 'Great flick',
        rating: 5
    },
];

const seedcomment = () => CommentRating.bulkCreate(commentdata);

module.exports = seedcomment;