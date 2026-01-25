// ==========================================
// TARATOURS - Express Backend Server
// ==========================================

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.')); // Serve static files

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = uploadsDir;
        
        // Organize by file type
        if (file.mimetype.startsWith('image/')) {
            uploadPath = path.join(uploadsDir, 'images');
        } else if (file.mimetype.startsWith('video/')) {
            uploadPath = path.join(uploadsDir, 'videos');
        }
        
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Content data file path
const contentFile = path.join(dataDir, 'content.json');

// Initialize default content if file doesn't exist
function initializeContent() {
    if (!fs.existsSync(contentFile)) {
        const defaultContent = {
            hero: {
                badge: "East Africa's Premier Safari Experts",
                title1: "Discover",
                title2: "East Africa's",
                title3: "Untamed Wildlife",
                subtitle: "Experience the magic of Kenya, Tanzania, Uganda, Rwanda & Congo with expert safari guides. Personalized safaris, hassle-free travel services, and unforgettable adventures await.",
                video: "images/vid1.mp4"
            },
            services: [
                {
                    id: 1,
                    icon: "fas fa-paw",
                    title: "Wildlife Safaris",
                    description: "Expert-guided safaris across Kenya, Tanzania, Uganda, Rwanda & Congo with professional wildlife guides.",
                    link: "safaris.html"
                },
                {
                    id: 2,
                    icon: "fas fa-campground",
                    title: "Safari Lodges",
                    description: "Authentic safari lodges and tented camps in the heart of East Africa's national parks.",
                    link: "hotels.html"
                },
                {
                    id: 3,
                    icon: "fas fa-plane",
                    title: "Flight Tickets",
                    description: "Domestic and international flights to East Africa's major airports and safari destinations.",
                    link: "flights.html"
                },
                {
                    id: 4,
                    icon: "fas fa-passport",
                    title: "Visa Processing",
                    description: "East Africa visa assistance for Kenya, Tanzania, Uganda, Rwanda & Congo.",
                    link: "visa.html"
                }
            ],
            safaris: [],
            destinations: [],
            testimonials: [],
            about: {
                storyTitle: "Our Story Our Pride",
                storyDesc: "We specialize in crafting unforgettable safaris and tours while ensuring that our operations directly benefit the communities in which we work.",
                companyName: "TaraTours",
                companyDesc: "TaraTours is a Destination Management Company (DMC) dedicated to providing world-class safari and travel experiences.",
                vision: "",
                mission: ""
            },
            contact: {
                phone: "+256 703 900 937",
                email: "info@taratours.com",
                address: "",
                whatsapp: "+256703900937"
            },
            navigation: [
                { text: "Home", link: "index.html", active: true },
                { text: "Safaris", link: "safaris.html" },
                { text: "Tours", link: "tours.html" },
                { text: "Lodges", link: "hotels.html" },
                { text: "Flights", link: "flights.html" },
                { text: "Visa", link: "visa.html" },
                { text: "About", link: "about.html" },
                { text: "Contact", link: "contact.html" }
            ],
            settings: {
                siteTitle: "TaraTours",
                siteDescription: "TaraTours - Your trusted partner for East African safaris, tours, hotels, flights, and visa processing.",
                siteKeywords: "safari tours, East Africa, Kenya safari, Tanzania safari, Uganda gorilla trekking",
                logo: "images/logo/logo.png"
            }
        };
        
        fs.writeFileSync(contentFile, JSON.stringify(defaultContent, null, 2));
    }
}

// Initialize content on startup
initializeContent();

// Helper function to read content
function readContent() {
    try {
        const data = fs.readFileSync(contentFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading content:', error);
        return null;
    }
}

// Helper function to write content
function writeContent(content) {
    try {
        fs.writeFileSync(contentFile, JSON.stringify(content, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing content:', error);
        return false;
    }
}

// ==========================================
// API Routes
// ==========================================

// Get all content
app.get('/api/content', (req, res) => {
    const content = readContent();
    if (content) {
        res.json(content);
    } else {
        res.status(500).json({ error: 'Failed to read content' });
    }
});

// Save all content
app.post('/api/content', (req, res) => {
    const content = req.body;
    if (writeContent(content)) {
        res.json({ success: true, message: 'Content saved successfully' });
    } else {
        res.status(500).json({ error: 'Failed to save content' });
    }
});

// File upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const fileUrl = `/uploads/${req.file.mimetype.startsWith('image/') ? 'images' : 'videos'}/${req.file.filename}`;
    res.json({ 
        success: true, 
        url: fileUrl,
        filename: req.file.filename
    });
});

// Get uploaded files list
app.get('/api/uploads', (req, res) => {
    const imagesDir = path.join(uploadsDir, 'images');
    const videosDir = path.join(uploadsDir, 'videos');
    
    const files = {
        images: [],
        videos: []
    };
    
    if (fs.existsSync(imagesDir)) {
        files.images = fs.readdirSync(imagesDir).map(file => ({
            name: file,
            url: `/uploads/images/${file}`
        }));
    }
    
    if (fs.existsSync(videosDir)) {
        files.videos = fs.readdirSync(videosDir).map(file => ({
            name: file,
            url: `/uploads/videos/${file}`
        }));
    }
    
    res.json(files);
});

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 TaraTours Server running on http://localhost:${PORT}`);
    console.log(`📁 Admin Dashboard: http://localhost:${PORT}/admin/`);
    console.log(`🌐 Website: http://localhost:${PORT}/`);
});
