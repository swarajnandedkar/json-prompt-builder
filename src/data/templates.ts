import type { Template } from '../api';

export const LOCAL_TEMPLATES: Template[] = [
    {
        id: 1,
        name: "Veo 3 Optimized",
        description: "High-fidelity video generation prompt optimized for Veo 3 model structure.",
        json_structure: {
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
        }
    },
    {
        id: 2,
        name: "Video Gen (Sora/Gen-2)",
        description: "Structured prompt for general AI video generation.",
        json_structure: {
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
        }
    },
    {
        id: 3,
        name: "Image Gen (Midjourney)",
        description: "Detailed parameters for high-quality image generation.",
        json_structure: {
            subject: "A portrait of a warrior",
            style: "Oil Painting",
            artists: ["Greg Rutkowski", "Alphonse Mucha"],
            parameters: {
                ar: "3:2",
                stylize: 100,
                chaos: 0,
                quality: 1
            }
        }
    },
    {
        id: 4,
        name: "General AI Assistant (Pro)",
        description: "Advanced structure with Chain of Thought, Persona, and Few-Shot capabilities.",
        json_structure: {
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
        }
    },
    {
        id: 5,
        name: "VEO 3 JSON prompt Generator template",
        description: "Advanced video generation prompt optimized for VEO 3 structure.",
        json_structure: {
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
        }
    },
    {
        id: 6,
        name: "SORA 2 JSON Prompt Generator",
        description: "Structure for high-fidelity Sora 2 video generation.",
        json_structure: {
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
        }
    },
    {
        id: 7,
        name: "ChatGPT Image JSON Prompt Generator",
        description: "Optimized for DALL-E 3 image generation via ChatGPT.",
        json_structure: {
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
        }
    },
    {
        id: 8,
        name: "Nano Banana JSON prompt Generator",
        description: "Specialized prompt structure for Gemini 3 Pro 'Nano Banana'.",
        json_structure: {
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
        }
    }
];
