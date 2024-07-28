// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// In-memory data store
let items = [];

// Middleware
app.use(bodyParser.json());

// Routes
// Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Get a single item by ID
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  res.json(item);
});

// Create a new item
app.post('/items', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).send('Name is required');

  const newItem = {
    id: items.length + 1,
    name
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update an item by ID
app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');

  const { name } = req.body;
  if (!name) return res.status(400).send('Name is required');

  item.name = name;
  res.json(item);
});

// Delete an item by ID
app.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) return res.status(404).send('Item not found');

  items.splice(itemIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});