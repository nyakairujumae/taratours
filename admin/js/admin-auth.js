// ==========================================
// Admin Authentication
// ==========================================

const API_BASE = '/api';

// Check if user is logged in
function checkAuth() {
    const token = localStorage.getItem('adminToken');
    if (!token && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Login function
function handleLogin(e) {
    if (e) e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    // Simple authentication (in production, use proper backend)
    // Default credentials: admin / admin123
    if (username === 'admin' && password === 'admin123') {
        const token = btoa(`${username}:${Date.now()}`);
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', username);
        window.location.href = 'index.html';
    } else {
        errorDiv.textContent = 'Invalid username or password';
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
    }
}

// Logout function
function handleLogout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = 'login.html';
}

// Initialize auth
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
}

if (document.getElementById('logoutBtn')) {
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
}

// Check auth on dashboard pages
if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('admin/')) {
    if (!checkAuth()) {
        window.location.href = 'login.html';
    }
}
