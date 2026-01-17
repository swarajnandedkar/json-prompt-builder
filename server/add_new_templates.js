const db = require('./db');

const newTemplates = [
    {
        name: "VEO 3 JSON prompt Generator template",
        description: "Advanced video generation prompt optimized for VEO 3 structure.",
        json_structure: JSON.stringify({
            "prompt": "A cinematic tracking shot of...",
            "negative_prompt": "blurry, distorted, low resolution, watermark",
            "veo_settings": {
                "visual_style": "Cinematic",
                "motion_strength": "Medium",
                "lighting": "Natural",
                "camera_type": "Drone",
                "perspective": "Wide Angle"
            },
            "technical": {
                "aspect_ratio": "16:9",
                "resolution": "4k",
                "fps": "24",
                "duration": "5s"
            },
            "scene_description": {
                "location": "Detailed location description",
                "weather": "Sunny",
                "time_of_day": "Golden Hour"
            }
        })
    },
    {
        name: "SORA 2 JSON Prompt Generator",
        description: "Structure for high-fidelity Sora 2 video generation.",
        json_structure: JSON.stringify({
            "prompt": "Detailed description of the video...",
            "negative_prompt": "morphing, distortion, bad anatomy",
            "sora_parameters": {
                "model_version": "sora-2-pro",
                "duration_seconds": 12,
                "aspect_ratio": "16:9",
                "frame_rate": 60
            },
            "cinematography": {
                "camera_movement": "Dolly Zoom",
                "shot_type": "Close Up",
                "lighting_style": "Studio",
                "lens_type": "50mm"
            },
            "content_breakdown": {
                "subject": "Main subject description",
                "action": "Action taking place",
                "background": "Background details"
            }
        })
    },
    {
        name: "ChatGPT Image JSON Prompt Generator",
        description: "Optimized for DALL-E 3 image generation via ChatGPT.",
        json_structure: JSON.stringify({
            "instruction": "Generate an image based on the following details",
            "subject": "Description of the main subject",
            "style": "Artistic style (e.g. Cyberpunk, Renaissance)",
            "composition": "Rule of thirds, symmetrical",
            "lighting": "Volumetric, Neon",
            "color_palette": ["Cyan", "Magenta"],
            "dalle_parameters": {
                "size": "1024x1024",
                "quality": "hd",
                "style": "vivid"
            }
        })
    },
    {
        name: "Nano Banana JSON prompt Gernator",
        description: "Specialized prompt structure for Gemini 3 Pro 'Nano Banana'.",
        json_structure: JSON.stringify({
            "meta": {
                "model": "gemini-3-pro-nano-banana",
                "quality": "ultra_photorealistic",
                "aspect_ratio": "16:9"
            },
            "subject": {
                "description": "Detailed subject description",
                "attire": "Clothing and accessories",
                "expression": "Facial expression"
            },
            "scene": {
                "location": "Environment details",
                "lighting": "Lighting conditions",
                "weather": "Weather conditions"
            },
            "technical": {
                "camera": "DSLR",
                "lens": "85mm",
                "aperture": "f/1.8",
                "film_grain": "Medium"
            },
            "style": {
                "aesthetic": "Visual aesthetic",
                "mood": "Emotional atmosphere"
            },
            "negative_constraints": ["blur", "watermark", "oversaturated"]
        })
    }
];

db.serialize(() => {
    const stmt = db.prepare("INSERT INTO templates (name, description, json_structure) VALUES (?, ?, ?)");
    newTemplates.forEach(t => {
        stmt.run(t.name, t.description, t.json_structure, (err) => {
            if (err) {
                console.error(`Error inserting ${t.name}:`, err);
            } else {
                console.log(`Inserted ${t.name}`);
            }
        });
    });
    stmt.finalize(() => {
        console.log("Finished adding templates.");
        // Close the db connection is not strictly necessary as the process will exit, but good practice if we were keeping it open.
        // However, db.js might keep it open.
        // We will just let the process exit.
    });
});
