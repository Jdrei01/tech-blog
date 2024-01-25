const router = require('express').Router();
const { Blog, Comment, User } = require('../models');
const withAuth = require('../utils/auth.js');

// GET all blogs for homepage
router.get('/', async (req, res) => {
  try {
    const blogsData = await Blog.findAll({
      include: [{ model: User }],
    });

    const blogs = blogsData.map((el) => el.get({ plain: true })).reverse();

    res.render('homepage', {
      loggedIn: req.session.currentUser?.loggedIn,
      blogs,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// GET a blog for individual blag's page
router.get('/blogs/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        { model: User },
        {
          model: Comment,
          include: [{ model: User }],
        },
      ],
    });
    if (!blogData) {
      res.status(404).json({ message: 'No blog with this id!' });
      return;
    }

    const blog = blogData.get({ plain: true });

    res.render('blogDetails', {
      loggedIn: req.session.currentUser?.loggedIn,
      ...blog,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// GET all blogs for user's dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const blogsData = await Blog.findAll({
      where: { userId: req.session.currentUser.userId },
      include: [{ model: User }],
    });

    const blogs = blogsData.map((el) => el.get({ plain: true })).reverse();

    res.render('dashboard', {
      loggedIn: req.session.currentUser?.loggedIn,
      blogs,
      idDashboard: true,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Create blog page
router.get('/dashboard/create', withAuth, async (req, res) => {
  res.render('CRUDBlog', {
    loggedIn: req.session.currentUser?.loggedIn,
    isCreate: true,
    idDashboard: true,
  });
});

// Update blog page
router.get('/dashboard/update/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);
    if (!blogData) {
      res.status(404).json({ message: 'No blog with this id!' });
      return;
    }

    const blog = blogData.get({ plain: true });

    res.render('CRUDBlog', {
      loggedIn: req.session.currentUser?.loggedIn,
      idDashboard: true,
      ...blog,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Login page
router.get('/login', (req, res) => {
  if (req.session.currentUser?.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;