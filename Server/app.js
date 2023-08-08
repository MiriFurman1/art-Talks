const express = require('express');
const jsonfile = require('jsonfile');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(cors());

// Serve the pictures data from db.json
app.get('/api/pictures', (req, res) => {
  const dbPath = path.join(__dirname, 'db.json');
  const db = jsonfile.readFileSync(dbPath);
  res.json(db);
});

app.get('/api/pictures/:id', (req, res) => {
  const dbPath = path.join(__dirname, 'db.json');
  const db = jsonfile.readFileSync(dbPath);
  const pictureId = parseInt(req.params.id);
  const selectedPicture = db.find((picture) => picture.id === pictureId);
  
  if (!selectedPicture) {
    return res.status(404).json({ error: 'Picture not found.' });
  }

  res.json(selectedPicture);
});

// Serve static files from the public directory
app.use(express.static('public'));
app.use('/images', express.static(path.join(__dirname, 'images')));
// WebSocket server logic
wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    
    // Broadcast the received message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsedMessage));
      }
    });
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
