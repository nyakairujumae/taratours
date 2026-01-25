# TaraTours - Setup Guide

## Quick Start

### 1. Install Node.js
Make sure you have Node.js installed (version 14 or higher). Download from [nodejs.org](https://nodejs.org/)

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Server
```bash
npm start
```

The server will start on `http://localhost:3000`

### 4. Access the Website
- **Website:** http://localhost:3000/
- **Admin Dashboard:** http://localhost:3000/admin/

### 5. Login to Admin
- **Username:** `admin`
- **Password:** `admin123`

⚠️ **Change the default password in production!**

## Admin Dashboard Features

The admin dashboard allows you to edit:

1. **Hero Section** - Main banner content
2. **Services** - Service cards on homepage
3. **Safaris** - Safari packages and tours
4. **Destinations** - Safari destinations
5. **Testimonials** - Customer reviews
6. **About Page** - Company information
7. **Contact Info** - Contact details
8. **Navigation** - Menu items
9. **Settings** - Site-wide settings

## File Structure

```
TaraTours/
├── admin/              # Admin dashboard
│   ├── login.html
│   ├── index.html
│   ├── css/
│   └── js/
├── css/                # Website styles
├── js/                  # Website scripts
├── images/              # Images and media
├── data/                # Content storage (auto-created)
├── uploads/             # Uploaded files (auto-created)
├── server.js            # Backend server
└── package.json         # Dependencies
```

## Development

For development with auto-reload:
```bash
npm run dev
```

## Production Deployment

1. Change default admin password
2. Set up proper authentication
3. Configure environment variables
4. Set up SSL/HTTPS
5. Configure proper file permissions
6. Set up database (optional, for better scalability)

## Troubleshooting

### Port already in use
Change the port in `server.js` or set `PORT` environment variable:
```bash
PORT=3001 npm start
```

### Cannot access admin
- Make sure server is running
- Check browser console for errors
- Clear browser cache

### Changes not saving
- Check `data/` directory exists and is writable
- Check server logs for errors
- Verify API endpoint is accessible

## Support

For issues or questions, check the admin README at `admin/README.md`
