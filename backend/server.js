import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// In-memory/File-based database paths
const DATA_DIR = path.join(__dirname, "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const SERVICES_FILE = path.join(DATA_DIR, "services.json");
const TESTIMONIALS_FILE = path.join(DATA_DIR, "testimonials.json");
const TEAM_FILE = path.join(DATA_DIR, "team.json");
const BLOG_FILE = path.join(DATA_DIR, "blog.json");

// Default initial datasets for CMS
const initialProjects = [
  {
    id: "1",
    title: "THE BRUTAL RESIDENCE",
    category: "Residential Architecture",
    location: "Zurich, Switzerland",
    image: "/assets/projects/project1.jpg",
    year: "2025",
    description: "A monolithic villa carved from raw concrete and structural oak, framing the Swiss alpine panorama through sheer glass facades."
  },
  {
    id: "2",
    title: "LINEN & PLASTER SUITE",
    category: "Bespoke Interior Design",
    location: "Milano, Italy",
    image: "/assets/projects/project2.jpg",
    year: "2024",
    description: "An editorial bedroom concept emphasizing silence and light. Structured plaster walls pair with custom linen textiles and raw bronze elements."
  },
  {
    id: "3",
    title: "OBSIDIAN KITCHEN",
    category: "Spatial Curation",
    location: "Kyoto, Japan",
    image: "/assets/projects/project3.jpg",
    year: "2025",
    description: "A minimal culinary workspace showcasing a central block of dark obsidian granite, warm travertine stone floors, and hidden customized wood panels."
  }
];

const initialServices = [
  {
    id: "1",
    title: "Residential Interior Design",
    icon: "Home",
    description: "Symphonic layout choreography. From raw site framing to structural partitions, we sculpt the foundational lines of luxury residential architecture."
  },
  {
    id: "2",
    title: "Luxury Villa Design",
    icon: "Sparkles",
    description: "Bespoke architectural masterworks. We develop comprehensive conceptual schematics, framing natural vistas and crafting spatial harmony."
  },
  {
    id: "3",
    title: "Commercial Spaces",
    icon: "Briefcase",
    description: "Editorial spatial identity. We design retail showrooms, corporate galleries, and premium workspaces that communicate brand refinement."
  },
  {
    id: "4",
    title: "Custom Furniture Design",
    icon: "Layers",
    description: "Bespoke artisanal commissions. We design limited-run furniture, custom storage configurations, and sculpt tactile wooden and stone details."
  }
];

const initialTestimonials = [
  {
    id: "1",
    name: "Sophia Vance",
    company: "VANCE Studio",
    image: "/assets/testimonials/client1.jpg",
    rating: 5,
    review: "Maison D'Art transformed our industrial warehouse into an editorial gallery of light, shadow, and texture. Their care for spatial silence is unparalleled."
  },
  {
    id: "2",
    name: "Marcus Thorne",
    company: "Thorne Technologies",
    image: "/assets/testimonials/client2.jpg",
    rating: 5,
    review: "Their precise alignment of apertures created a home that feels like living inside a minimalist sculpture. It captures raw, natural beauty."
  }
];

const initialTeam = [
  {
    id: "1",
    name: "Jean-Louis Dupont",
    role: "Principal Architect",
    bio: "Focuses on brutalist geometry, monolithic construction, and high-end material sourcing."
  },
  {
    id: "2",
    name: "Elena Rostova",
    role: "Director of Spatial Curation",
    bio: "Curator of rare, antique furniture and specialist in warm-neutral texturing."
  }
];

const initialBlog = [
  {
    id: "1",
    title: "The Poetics of Concrete: Brutalism in Modern Living",
    category: "Architecture",
    date: "August 2026",
    summary: "Exposing the natural grain and aesthetic honesty of structural concrete in bespoke residential planning."
  },
  {
    id: "2",
    title: "Sculpting Light: How Apertures Define Spatial Volume",
    category: "Lighting Design",
    date: "July 2026",
    summary: "A brief guide on choreographing natural sunlight and deep shadows inside minimal living spaces."
  }
];

// DB Helper functions to read and write collections (CMS Structure)
async function writeDb(file, data) {
  await fs.writeFile(file, JSON.stringify(data, null, 2));
}

async function readDb(file, fallback) {
  try {
    const data = await fs.readFile(file, "utf-8");
    return JSON.parse(data);
  } catch {
    await writeDb(file, fallback);
    return fallback;
  }
}

// Database initialization
async function initDb() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    // Init CMS Collections
    await readDb(PROJECTS_FILE, initialProjects);
    await readDb(SERVICES_FILE, initialServices);
    await readDb(TESTIMONIALS_FILE, initialTestimonials);
    await readDb(TEAM_FILE, initialTeam);
    await readDb(BLOG_FILE, initialBlog);
    
    // Init inquiries
    try {
      await fs.access(INQUIRIES_FILE);
    } catch {
      await writeDb(INQUIRIES_FILE, []);
    }
    console.log("File-based database collections successfully initialized.");
  } catch (error) {
    console.error("Failed to initialize database collections:", error);
  }
}
initDb();

// Simple in-memory Rate Limiter / Spam Protection middleware
const ipLimits = new Map();
function rateLimiter(req, res, next) {
  const ip = req.ip || req.headers["x-forwarded-for"] || "anonymous";
  const now = Date.now();
  const limitWindow = 60 * 1000; // 1 minute window
  const maxSubmissions = 3;      // limit to 3 requests per minute

  if (!ipLimits.has(ip)) {
    ipLimits.set(ip, []);
  }

  const timestamps = ipLimits.get(ip).filter((time) => now - time < limitWindow);
  timestamps.push(now);
  ipLimits.set(ip, timestamps);

  if (timestamps.length > maxSubmissions) {
    return res.status(429).json({
      success: false,
      message: "Too many inquiry submissions. Please wait 60 seconds before trying again."
    });
  }
  next();
}

// CMS Endpoints
app.get("/api/projects", async (req, res) => {
  const data = await readDb(PROJECTS_FILE, initialProjects);
  res.json({ success: true, data });
});

app.get("/api/services", async (req, res) => {
  const data = await readDb(SERVICES_FILE, initialServices);
  res.json({ success: true, data });
});

app.get("/api/testimonials", async (req, res) => {
  const data = await readDb(TESTIMONIALS_FILE, initialTestimonials);
  res.json({ success: true, data });
});

app.get("/api/team", async (req, res) => {
  const data = await readDb(TEAM_FILE, initialTeam);
  res.json({ success: true, data });
});

app.get("/api/blog", async (req, res) => {
  const data = await readDb(BLOG_FILE, initialBlog);
  res.json({ success: true, data });
});

// Inquiry Submission Endpoint (with rate-limiting)
app.post("/api/contact", rateLimiter, async (req, res) => {
  const { name, email, phone, projectType, budget, message } = req.body;

  // Validation Check
  if (!name || !email || !phone || !projectType || !budget || !message) {
    return res.status(400).json({
      success: false,
      message: "Required parameter fields are missing. Please complete all fields."
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Format error. Please submit a valid email address."
    });
  }

  const newInquiry = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    projectType,
    budget,
    message,
    createdAt: new Date().toISOString()
  };

  try {
    const data = await readDb(INQUIRIES_FILE, []);
    data.push(newInquiry);
    await writeDb(INQUIRIES_FILE, data);

    res.status(201).json({
      success: true,
      message: "Inquiry successfully recorded.",
      data: newInquiry
    });
  } catch (error) {
    console.error("Failed to save client inquiry:", error);
    res.status(500).json({
      success: false,
      message: "Server database write failure. Please try again."
    });
  }
});

app.listen(PORT, () => {
  console.log(`MAISON API Server is running on port ${PORT}`);
});
