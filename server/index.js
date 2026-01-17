const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');
const db = require('./db');

const app = express();
const PORT = 3001;
const API_KEY = process.env.API_KEY || 'default-dev-key';

// Security Middleware
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(cors({
  origin: 'http://localhost:5173' // Restrict to frontend origin
}));

app.use(express.json());

// Authentication Middleware
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

app.use(authenticate);

// Validation Schemas
const promptSchema = z.object({
  template_id: z.number(),
  prompt_data: z.record(z.any()),
  plain_text: z.string().optional()
});

// Get all templates
app.get('/api/templates', (req, res) => {
  db.all("SELECT * FROM templates", [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    const safeData = rows.map(row => {
      try {
        return { ...row, json_structure: JSON.parse(row.json_structure) };
      } catch (e) {
        console.error(`Failed to parse JSON for template ${row.id}:`, e);
        return { ...row, json_structure: {} }; // Fallback to empty object
      }
    });
    res.json({
      data: safeData
    });
  });
});

// Save a new prompt
app.post('/api/prompts', (req, res) => {
  try {
    const { template_id, prompt_data, plain_text } = promptSchema.parse(req.body);

    const sql = "INSERT INTO prompts (template_id, prompt_data, plain_text) VALUES (?, ?, ?)";
    const params = [template_id, JSON.stringify(prompt_data), plain_text];

    db.run(sql, params, function (err) {
      if (err) {
        console.error('DB Error:', err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json({
        message: "success",
        data: { id: this.lastID }
      });
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation Error:', error.errors);
      res.status(400).json({ error: "Invalid input", details: error.errors });
    } else {
      console.error('Unexpected Error:', error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// Get recent prompts
app.get('/api/prompts', (req, res) => {
  db.all("SELECT * FROM prompts ORDER BY created_at DESC LIMIT 20", [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json({
      data: rows.map(row => ({ ...row, prompt_data: JSON.parse(row.prompt_data) }))
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});