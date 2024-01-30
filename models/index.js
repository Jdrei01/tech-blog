const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

Blog.belongsTo(User);
User.hasMany(Blog);

Comment.belongsTo(Blog);
Blog.hasMany(Comment);

Comment.belongsTo(User);
User.hasMany(Comment);

module.exports = { User, Blog, Comment };