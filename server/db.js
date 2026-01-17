const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.serialize(() => {
  // Create Templates Table
  db.run(`CREATE TABLE IF NOT EXISTS templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    json_structure TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Create Prompts Table
  db.run(`CREATE TABLE IF NOT EXISTS prompts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    template_id INTEGER,
    prompt_data TEXT NOT NULL,
    plain_text TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (template_id) REFERENCES templates (id)
  )`);
  
  // Seed some initial templates if empty
  db.get("SELECT count(*) as count FROM templates", (err, row) => {
    if (row.count === 0) {
      const defaultTemplates = [
        {
          name: "Veo 3 Optimized",
          description: "High-fidelity video generation prompt optimized for Veo 3 model structure.",
          json_structure: JSON.stringify({
            prompt: "A cinematic tracking shot of...",
            negative_prompt: "blurry, distorted, low resolution, watermark",
            veo_settings: {
              visual_style: "Cinematic",
              motion_strength: "Medium",
              camera_type: "Drone",
              hdr_mode: "Enabled"
            },
            technical: {
              aspect_ratio: "16:9",
              resolution: "4k",
              fps: "24"
            }
          })
        },
        {
          name: "Video Gen (Sora/Gen-2)",
          description: "Structured prompt for general AI video generation.",
          json_structure: JSON.stringify({
            prompt: "A cinematic shot of...",
            negative_prompt: "blurry, low quality, distorted",
            technical_settings: {
              aspect_ratio: "16:9",
              camera_angle: "Wide Angle",
              camera_movement: "Pan Right",
              lighting: "Golden Hour",
              resolution: "4k"
            },
            scene: {
              location: "Cyberpunk City",
              time_of_day: "Night",
              weather: "Rainy"
            }
          })
        },
        {
          name: "Image Gen (Midjourney)",
          description: "Detailed parameters for high-quality image generation.",
          json_structure: JSON.stringify({
            subject: "A portrait of a warrior",
            style: "Oil Painting",
            artists: ["Greg Rutkowski", "Alphonse Mucha"],
            parameters: {
              ar: "3:2",
              stylize: 100,
              chaos: 0,
              quality: 1
            }
          })
        },
        {
          name: "General AI Assistant (Pro)",
          description: "Advanced structure with Chain of Thought, Persona, and Few-Shot capabilities.",
          json_structure: JSON.stringify({
            meta: {
              model_preference: "GPT-4",
              temperature: "0.7",
              max_tokens: "2000"
            },
            persona: {
              role: "Senior Solutions Architect",
              tone: "Professional",
              expertise: ["System Design", "Cloud Computing"],
              audience: "Technical Stakeholders"
            },
            task: {
              primary_goal: "Explain the benefits of Microservices",
              context: "The client is currently using a monolithic architecture and facing scaling issues.",
              constraints: ["Avoid jargon where possible", "Focus on cost-efficiency"]
            },
            strategy: {
              methodology: "Chain of Thought",
              steps: ["Analyze current architecture", "Identify bottlenecks", "Propose microservices solution", "List pros and cons"]
            },
            few_shot_examples: [
              {
                input: "What is API Gateway?",
                output: "An API Gateway is a management tool that sits between a client and a collection of backend services..."
              }
            ],
            output_format: {
              format: "Markdown",
              structure: "Introduction -> Analysis -> Proposal -> Conclusion"
            }
          })
        }
      ];

      const stmt = db.prepare("INSERT INTO templates (name, description, json_structure) VALUES (?, ?, ?)");
      defaultTemplates.forEach(t => {
        stmt.run(t.name, t.description, t.json_structure);
      });
      stmt.finalize();
      console.log("Seeded default templates.");
    }
  });
});

module.exports = db;