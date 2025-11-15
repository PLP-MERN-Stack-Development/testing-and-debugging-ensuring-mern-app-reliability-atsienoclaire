const Bug = require('../models/Bug');

exports.createBug = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const bug = await Bug.create({
      title,
      description,
      reporter: req.user._id,
    });
    res.status(201).json(bug);
  } catch (err) {
    next(err);
  }
};

exports.getBugs = async (req, res, next) => {
  try {
    const bugs = await Bug.find();
    res.json(bugs);
  } catch (err) {
    next(err);
  }
};

exports.updateBug = async (req, res, next) => {
  try {
    const { status } = req.body;
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ error: 'Bug not found' });
    if (bug.reporter.toString() !== req.user._id.toString())
      return res.status(403).json({ error: 'Not authorized' });

    bug.status = status || bug.status;
    await bug.save();
    res.json(bug);
  } catch (err) {
    next(err);
  }
};

exports.deleteBug = async (req, res, next) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ error: 'Bug not found' });
    if (bug.reporter.toString() !== req.user._id.toString())
      return res.status(403).json({ error: 'Not authorized' });

    await bug.remove();
    res.json({ message: 'Bug deleted' });
  } catch (err) {
    next(err);
  }
};
