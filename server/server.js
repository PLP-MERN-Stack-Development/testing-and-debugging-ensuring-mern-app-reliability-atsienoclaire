const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // ✅ Added

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Auth Routes
app.use('/api/auth', authRoutes); // ✅ Added

// Dummy bugs
let bugs = [];

// Bugs routes
app.get('/api/bugs', (req, res) => res.json(bugs));

app.post('/api/bugs', (req, res) => {
  const { title, description } = req.body;
  const bug = { _id: Date.now().toString(), title, description, status: 'open' };
  bugs.push(bug);
  res.json(bug);
});

app.delete('/api/bugs/:id', (req, res) => {
  bugs = bugs.filter(b => b._id !== req.params.id);
  res.json({ message: 'Deleted' });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
