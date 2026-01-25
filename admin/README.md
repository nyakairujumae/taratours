# TaraTours Admin Dashboard

Complete content management system for TaraTours website.

## Features

- ✅ **Hero Section Editor** - Edit hero title, subtitle, badge, and video
- ✅ **Services Management** - Add, edit, delete services
- ✅ **Safaris Management** - Manage safari packages
- ✅ **Destinations Management** - Edit destination information
- ✅ **Testimonials** - Add and manage customer reviews
- ✅ **About Page** - Edit company story, vision, mission
- ✅ **Contact Information** - Update contact details
- ✅ **Navigation Menu** - Customize menu items
- ✅ **Site Settings** - Update site title, description, logo

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

### 3. Access Admin Dashboard

1. Open your browser and go to: `http://localhost:3000/admin/`
2. Login with default credentials:
   - **Username:** `admin`
   - **Password:** `admin123`

⚠️ **Important:** Change the default password in production!

## Default Login Credentials

- Username: `admin`
- Password: `admin123`

## File Structure

```
admin/
├── login.html          # Admin login page
├── index.html          # Admin dashboard
├── css/
│   └── admin.css       # Admin styles
└── js/
    ├── admin.js        # Main admin functionality
    └── admin-auth.js   # Authentication logic
```

## API Endpoints

- `GET /api/content` - Get all website content
- `POST /api/content` - Save all website content
- `POST /api/upload` - Upload images/videos
- `GET /api/uploads` - List uploaded files

## Data Storage

Content is stored in `data/content.json`. This file is automatically created with default content on first server start.

## Security Notes

- The current authentication is basic. For production, implement:
  - Proper password hashing (bcrypt)
  - JWT tokens
  - Session management
  - Role-based access control
  - Rate limiting
  - Input validation and sanitization

## Troubleshooting

### Can't access admin dashboard
- Make sure the server is running (`npm start`)
- Check that you're accessing `http://localhost:3000/admin/`
- Clear browser cache and localStorage

### Changes not saving
- Check browser console for errors
- Verify server is running
- Check `data/content.json` file permissions

### Images not uploading
- Check `uploads/` directory exists and is writable
- Verify file size is under 50MB
- Check server logs for errors
