const router = require('express').Router();
const { Blog } = require('../../models');

// Create a new blog
router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      userId: req.session.currentUser.userId,
    });
    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// Update a blog by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a blog by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
