const express = require('express');
const router = express.Router();
const { createBug, getBugs, updateBug, deleteBug } = require('../controllers/bugController');
const { protect } = require('../utils/auth');

router.post('/', protect, createBug);
router.get('/', getBugs);
router.put('/:id', protect, updateBug);
router.delete('/:id', protect, deleteBug);

module.exports = router;
