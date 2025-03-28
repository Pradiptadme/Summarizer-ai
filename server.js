// This file serves as a basic server to handle routing for deployment
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from client directory
app.use(express.static(path.join(__dirname, 'client')));

// Handle API routes by forwarding to the actual server
app.use('/api', (req, res) => {
  // Forward to the actual API server
  res.redirect(307, `http://localhost:${PORT}/api${req.url}`);
});

// For all other routes, serve the main index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});