const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

Blog.belongsTo(User, {
  foreignKey: 'creator_id',
});

User.hasMany(Blog, {
  foreignKey: 'creator_id',
});


Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
});

Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
});


Comment.belongsTo(User, {
  foreignKey: 'creator_id',
});

User.hasMany(Comment, {
  foreignKey: 'creator_id',
});

module.exports = { User, Blog, Comment };