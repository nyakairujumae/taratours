// ==========================================
// TARATOURS ADMIN DASHBOARD
// ==========================================

const API_BASE = '/api';
let currentData = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    loadAllData();
    initModals();
    initEventListeners();
});

// Navigation
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.dataset.section;
            
            // Update active nav
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Update active section
            sections.forEach(sec => sec.classList.remove('active'));
            const targetSection = document.getElementById(`${sectionId}-section`);
            if (targetSection) {
                targetSection.classList.add('active');
                updatePageTitle(sectionId);
            }
        });
    });
    
    // Handle action cards
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const section = card.dataset.section;
            if (section) {
                const navItem = document.querySelector(`[data-section="${section}"]`);
                if (navItem) navItem.click();
            }
        });
    });
}

function updatePageTitle(sectionId) {
    const titles = {
        dashboard: 'Dashboard',
        hero: 'Hero Section',
        services: 'Services',
        safaris: 'Safaris',
        destinations: 'Destinations',
        testimonials: 'Testimonials',
        about: 'About Page',
        contact: 'Contact Info',
        navigation: 'Navigation',
        settings: 'Settings'
    };
    document.getElementById('pageTitle').textContent = titles[sectionId] || 'Dashboard';
}

// Load all data
async function loadAllData() {
    try {
        const response = await fetch(`${API_BASE}/content`);
        if (response.ok) {
            currentData = await response.json();
            renderAllSections();
            updateStats();
        } else {
            // Fallback: use default data structure
            currentData = getDefaultData();
            renderAllSections();
            updateStats();
        }
    } catch (error) {
        console.error('Error loading data:', error);
        currentData = getDefaultData();
        renderAllSections();
        updateStats();
    }
}

function getDefaultData() {
    return {
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
}

// Render sections
function renderAllSections() {
    renderHeroSection();
    renderServices();
    renderSafaris();
    renderDestinations();
    renderTestimonials();
    renderAbout();
    renderContact();
    renderNavigation();
    renderSettings();
}

function renderHeroSection() {
    if (!currentData.hero) return;
    const h = currentData.hero;
    document.getElementById('heroBadge').value = h.badge || '';
    document.getElementById('heroTitle1').value = h.title1 || '';
    document.getElementById('heroTitle2').value = h.title2 || '';
    document.getElementById('heroTitle3').value = h.title3 || '';
    document.getElementById('heroSubtitle').value = h.subtitle || '';
}

function renderServices() {
    const container = document.getElementById('servicesList');
    if (!container || !currentData.services) return;
    
    container.innerHTML = currentData.services.map(service => `
        <div class="item-card" data-id="${service.id}">
            <div class="item-card-content">
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            </div>
            <div class="item-card-actions">
                <button class="btn-edit" onclick="editService(${service.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-delete" onclick="deleteService(${service.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function renderSafaris() {
    const container = document.getElementById('safarisList');
    if (!container || !currentData.safaris) return;
    
    if (currentData.safaris.length === 0) {
        container.innerHTML = '<p style="color: var(--color-text-secondary);">No safaris added yet. Click "Add Safari" to create one.</p>';
        return;
    }
    
    container.innerHTML = currentData.safaris.map(safari => `
        <div class="item-card" data-id="${safari.id}">
            <div class="item-card-content">
                <h3>${safari.title}</h3>
                <p>${safari.description || ''}</p>
            </div>
            <div class="item-card-actions">
                <button class="btn-edit" onclick="editSafari(${safari.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-delete" onclick="deleteSafari(${safari.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function renderDestinations() {
    const container = document.getElementById('destinationsList');
    if (!container || !currentData.destinations) return;
    
    if (currentData.destinations.length === 0) {
        container.innerHTML = '<p style="color: var(--color-text-secondary);">No destinations added yet.</p>';
        return;
    }
    
    container.innerHTML = currentData.destinations.map(dest => `
        <div class="item-card" data-id="${dest.id}">
            <div class="item-card-content">
                <h3>${dest.title}</h3>
                <p>${dest.description || ''}</p>
            </div>
            <div class="item-card-actions">
                <button class="btn-edit" onclick="editDestination(${dest.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-delete" onclick="deleteDestination(${dest.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function renderTestimonials() {
    const container = document.getElementById('testimonialsList');
    if (!container || !currentData.testimonials) return;
    
    if (currentData.testimonials.length === 0) {
        container.innerHTML = '<p style="color: var(--color-text-secondary);">No testimonials added yet.</p>';
        return;
    }
    
    container.innerHTML = currentData.testimonials.map(test => `
        <div class="item-card" data-id="${test.id}">
            <div class="item-card-content">
                <h3>${test.name}</h3>
                <p>${test.text || ''}</p>
            </div>
            <div class="item-card-actions">
                <button class="btn-edit" onclick="editTestimonial(${test.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-delete" onclick="deleteTestimonial(${test.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function renderAbout() {
    if (!currentData.about) return;
    const a = currentData.about;
    document.getElementById('aboutStoryTitle').value = a.storyTitle || '';
    document.getElementById('aboutStoryDesc').value = a.storyDesc || '';
    document.getElementById('aboutCompanyName').value = a.companyName || '';
    document.getElementById('aboutCompanyDesc').value = a.companyDesc || '';
    document.getElementById('aboutVision').value = a.vision || '';
    document.getElementById('aboutMission').value = a.mission || '';
}

function renderContact() {
    if (!currentData.contact) return;
    const c = currentData.contact;
    document.getElementById('contactPhone').value = c.phone || '';
    document.getElementById('contactEmail').value = c.email || '';
    document.getElementById('contactAddress').value = c.address || '';
    document.getElementById('contactWhatsApp').value = c.whatsapp || '';
}

function renderNavigation() {
    const container = document.getElementById('navItemsList');
    if (!container || !currentData.navigation) return;
    
    container.innerHTML = currentData.navigation.map((nav, index) => `
        <div class="form-group">
            <label>Menu Item ${index + 1}</label>
            <div style="display: flex; gap: 10px;">
                <input type="text" value="${nav.text}" placeholder="Menu Text" data-index="${index}" data-field="text" style="flex: 1;">
                <input type="text" value="${nav.link}" placeholder="Link" data-index="${index}" data-field="link" style="flex: 1;">
                <button type="button" class="btn-delete" onclick="deleteNavItem(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function renderSettings() {
    if (!currentData.settings) return;
    const s = currentData.settings;
    document.getElementById('siteTitle').value = s.siteTitle || '';
    document.getElementById('siteDescription').value = s.siteDescription || '';
    document.getElementById('siteKeywords').value = s.siteKeywords || '';
}

// Update stats
function updateStats() {
    document.getElementById('safarisCount').textContent = currentData.safaris?.length || 0;
    document.getElementById('servicesCount').textContent = currentData.services?.length || 0;
    document.getElementById('destinationsCount').textContent = currentData.destinations?.length || 0;
    document.getElementById('testimonialsCount').textContent = currentData.testimonials?.length || 0;
}

// Event Listeners
function initEventListeners() {
    // Save buttons
    document.getElementById('saveBtn')?.addEventListener('click', saveCurrentSection);
    
    // Form changes
    document.getElementById('heroForm')?.addEventListener('input', () => showSaveButton());
    document.getElementById('aboutForm')?.addEventListener('input', () => showSaveButton());
    document.getElementById('contactForm')?.addEventListener('input', () => showSaveButton());
    document.getElementById('settingsForm')?.addEventListener('input', () => showSaveButton());
    
    // Add buttons
    document.getElementById('addServiceBtn')?.addEventListener('click', () => openServiceModal());
    document.getElementById('addSafariBtn')?.addEventListener('click', () => openSafariModal());
    document.getElementById('addDestinationBtn')?.addEventListener('click', () => openDestinationModal());
    document.getElementById('addTestimonialBtn')?.addEventListener('click', () => openTestimonialModal());
    document.getElementById('addNavItemBtn')?.addEventListener('click', addNavItem);
}

function showSaveButton() {
    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) saveBtn.style.display = 'inline-flex';
}

function saveCurrentSection() {
    const activeSection = document.querySelector('.content-section.active');
    if (!activeSection) return;
    
    const sectionId = activeSection.id.replace('-section', '');
    
    switch(sectionId) {
        case 'hero':
            saveHero();
            break;
        case 'services':
            // Services are saved individually via modals
            break;
        case 'safaris':
            // Safaris are saved individually via modals
            break;
        case 'about':
            saveAbout();
            break;
        case 'contact':
            saveContact();
            break;
        case 'settings':
            saveSettings();
            break;
    }
}

// Save functions
function saveHero() {
    currentData.hero = {
        badge: document.getElementById('heroBadge').value,
        title1: document.getElementById('heroTitle1').value,
        title2: document.getElementById('heroTitle2').value,
        title3: document.getElementById('heroTitle3').value,
        subtitle: document.getElementById('heroSubtitle').value,
        video: currentData.hero?.video || 'images/vid1.mp4'
    };
    saveData();
    showNotification('Hero section saved successfully!', 'success');
}

function saveAbout() {
    currentData.about = {
        storyTitle: document.getElementById('aboutStoryTitle').value,
        storyDesc: document.getElementById('aboutStoryDesc').value,
        companyName: document.getElementById('aboutCompanyName').value,
        companyDesc: document.getElementById('aboutCompanyDesc').value,
        vision: document.getElementById('aboutVision').value,
        mission: document.getElementById('aboutMission').value
    };
    saveData();
    showNotification('About page saved successfully!', 'success');
}

function saveContact() {
    currentData.contact = {
        phone: document.getElementById('contactPhone').value,
        email: document.getElementById('contactEmail').value,
        address: document.getElementById('contactAddress').value,
        whatsapp: document.getElementById('contactWhatsApp').value
    };
    saveData();
    showNotification('Contact information saved successfully!', 'success');
}

function saveSettings() {
    currentData.settings = {
        siteTitle: document.getElementById('siteTitle').value,
        siteDescription: document.getElementById('siteDescription').value,
        siteKeywords: document.getElementById('siteKeywords').value,
        logo: currentData.settings?.logo || 'images/logo/logo.png'
    };
    saveData();
    showNotification('Settings saved successfully!', 'success');
}

// Save data to API
async function saveData() {
    try {
        const response = await fetch(`${API_BASE}/content`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentData)
        });
        
        if (response.ok) {
            document.getElementById('saveBtn').style.display = 'none';
        }
    } catch (error) {
        console.error('Error saving data:', error);
        // Fallback: save to localStorage
        localStorage.setItem('taratours_content', JSON.stringify(currentData));
        showNotification('Data saved locally (API unavailable)', 'info');
    }
}

// Modal functions
function initModals() {
    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelModal');
    
    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
}

function openModal(title, content) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = content;
    document.getElementById('modalOverlay').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
}

// Service functions
function openServiceModal(serviceId = null) {
    const service = serviceId ? currentData.services.find(s => s.id === serviceId) : null;
    const content = `
        <form id="serviceForm">
            <div class="form-group">
                <label>Icon (Font Awesome class)</label>
                <input type="text" id="serviceIcon" value="${service?.icon || 'fas fa-star'}" placeholder="fas fa-paw">
            </div>
            <div class="form-group">
                <label>Title</label>
                <input type="text" id="serviceTitle" value="${service?.title || ''}" required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea id="serviceDesc" rows="3" required>${service?.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label>Link</label>
                <input type="text" id="serviceLink" value="${service?.link || ''}" placeholder="safaris.html">
            </div>
        </form>
    `;
    openModal(serviceId ? 'Edit Service' : 'Add Service', content);
    
    document.getElementById('saveModal').onclick = () => {
        const icon = document.getElementById('serviceIcon').value;
        const title = document.getElementById('serviceTitle').value;
        const desc = document.getElementById('serviceDesc').value;
        const link = document.getElementById('serviceLink').value;
        
        if (!title || !desc) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (serviceId) {
            const index = currentData.services.findIndex(s => s.id === serviceId);
            if (index !== -1) {
                currentData.services[index] = { id: serviceId, icon, title, description: desc, link };
            }
        } else {
            const newId = Math.max(...currentData.services.map(s => s.id), 0) + 1;
            currentData.services.push({ id: newId, icon, title, description: desc, link });
        }
        
        saveData();
        renderServices();
        updateStats();
        closeModal();
        showNotification('Service saved successfully!', 'success');
    };
}

function editService(id) {
    openServiceModal(id);
}

function deleteService(id) {
    if (confirm('Are you sure you want to delete this service?')) {
        currentData.services = currentData.services.filter(s => s.id !== id);
        saveData();
        renderServices();
        updateStats();
        showNotification('Service deleted!', 'success');
    }
}

// Safari functions
function openSafariModal(safariId = null) {
    const safari = safariId ? currentData.safaris.find(s => s.id === safariId) : null;
    const content = `
        <form id="safariForm">
            <div class="form-group">
                <label>Title</label>
                <input type="text" id="safariTitle" value="${safari?.title || ''}" required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea id="safariDesc" rows="3" required>${safari?.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label>Image URL</label>
                <input type="text" id="safariImage" value="${safari?.image || ''}" placeholder="images/kenya/img1.jpg">
            </div>
            <div class="form-group">
                <label>Price</label>
                <input type="text" id="safariPrice" value="${safari?.price || ''}" placeholder="$1,299">
            </div>
            <div class="form-group">
                <label>Duration</label>
                <input type="text" id="safariDuration" value="${safari?.duration || ''}" placeholder="7 Days">
            </div>
            <div class="form-group">
                <label>Rating</label>
                <input type="text" id="safariRating" value="${safari?.rating || ''}" placeholder="4.9 (128)">
            </div>
            <div class="form-group">
                <label>Country</label>
                <input type="text" id="safariCountry" value="${safari?.country || ''}" placeholder="Kenya">
            </div>
        </form>
    `;
    openModal(safariId ? 'Edit Safari' : 'Add Safari', content);
    
    document.getElementById('saveModal').onclick = () => {
        const title = document.getElementById('safariTitle').value;
        const desc = document.getElementById('safariDesc').value;
        const image = document.getElementById('safariImage').value;
        const price = document.getElementById('safariPrice').value;
        const duration = document.getElementById('safariDuration').value;
        const rating = document.getElementById('safariRating').value;
        const country = document.getElementById('safariCountry').value;
        
        if (!title || !desc) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (safariId) {
            const index = currentData.safaris.findIndex(s => s.id === safariId);
            if (index !== -1) {
                currentData.safaris[index] = { id: safariId, title, description: desc, image, price, duration, rating, country };
            }
        } else {
            const newId = Math.max(...(currentData.safaris.map(s => s.id) || [0]), 0) + 1;
            if (!currentData.safaris) currentData.safaris = [];
            currentData.safaris.push({ id: newId, title, description: desc, image, price, duration, rating, country });
        }
        
        saveData();
        renderSafaris();
        updateStats();
        closeModal();
        showNotification('Safari saved successfully!', 'success');
    };
}

function editSafari(id) {
    openSafariModal(id);
}

function deleteSafari(id) {
    if (confirm('Are you sure you want to delete this safari?')) {
        currentData.safaris = currentData.safaris.filter(s => s.id !== id);
        saveData();
        renderSafaris();
        updateStats();
        showNotification('Safari deleted!', 'success');
    }
}

// Destination functions
function openDestinationModal(destId = null) {
    const dest = destId ? currentData.destinations.find(d => d.id === destId) : null;
    const content = `
        <form id="destinationForm">
            <div class="form-group">
                <label>Title</label>
                <input type="text" id="destTitle" value="${dest?.title || ''}" required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea id="destDesc" rows="3" required>${dest?.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label>Image URL</label>
                <input type="text" id="destImage" value="${dest?.image || ''}" placeholder="images/kenya/img6.jpg">
            </div>
            <div class="form-group">
                <label>Country</label>
                <input type="text" id="destCountry" value="${dest?.country || ''}" placeholder="Kenya">
            </div>
        </form>
    `;
    openModal(destId ? 'Edit Destination' : 'Add Destination', content);
    
    document.getElementById('saveModal').onclick = () => {
        const title = document.getElementById('destTitle').value;
        const desc = document.getElementById('destDesc').value;
        const image = document.getElementById('destImage').value;
        const country = document.getElementById('destCountry').value;
        
        if (!title || !desc) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (destId) {
            const index = currentData.destinations.findIndex(d => d.id === destId);
            if (index !== -1) {
                currentData.destinations[index] = { id: destId, title, description: desc, image, country };
            }
        } else {
            const newId = Math.max(...(currentData.destinations.map(d => d.id) || [0]), 0) + 1;
            if (!currentData.destinations) currentData.destinations = [];
            currentData.destinations.push({ id: newId, title, description: desc, image, country });
        }
        
        saveData();
        renderDestinations();
        updateStats();
        closeModal();
        showNotification('Destination saved successfully!', 'success');
    };
}

function editDestination(id) {
    openDestinationModal(id);
}

function deleteDestination(id) {
    if (confirm('Are you sure you want to delete this destination?')) {
        currentData.destinations = currentData.destinations.filter(d => d.id !== id);
        saveData();
        renderDestinations();
        updateStats();
        showNotification('Destination deleted!', 'success');
    }
}

// Testimonial functions
function openTestimonialModal(testId = null) {
    const test = testId ? currentData.testimonials.find(t => t.id === testId) : null;
    const content = `
        <form id="testimonialForm">
            <div class="form-group">
                <label>Name</label>
                <input type="text" id="testName" value="${test?.name || ''}" required>
            </div>
            <div class="form-group">
                <label>Text</label>
                <textarea id="testText" rows="4" required>${test?.text || ''}</textarea>
            </div>
            <div class="form-group">
                <label>Rating</label>
                <input type="number" id="testRating" value="${test?.rating || 5}" min="1" max="5">
            </div>
            <div class="form-group">
                <label>Location (optional)</label>
                <input type="text" id="testLocation" value="${test?.location || ''}" placeholder="Nairobi, Kenya">
            </div>
        </form>
    `;
    openModal(testId ? 'Edit Testimonial' : 'Add Testimonial', content);
    
    document.getElementById('saveModal').onclick = () => {
        const name = document.getElementById('testName').value;
        const text = document.getElementById('testText').value;
        const rating = parseInt(document.getElementById('testRating').value) || 5;
        const location = document.getElementById('testLocation').value;
        
        if (!name || !text) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (testId) {
            const index = currentData.testimonials.findIndex(t => t.id === testId);
            if (index !== -1) {
                currentData.testimonials[index] = { id: testId, name, text, rating, location };
            }
        } else {
            const newId = Math.max(...(currentData.testimonials.map(t => t.id) || [0]), 0) + 1;
            if (!currentData.testimonials) currentData.testimonials = [];
            currentData.testimonials.push({ id: newId, name, text, rating, location });
        }
        
        saveData();
        renderTestimonials();
        updateStats();
        closeModal();
        showNotification('Testimonial saved successfully!', 'success');
    };
}

function editTestimonial(id) {
    openTestimonialModal(id);
}

function deleteTestimonial(id) {
    if (confirm('Are you sure you want to delete this testimonial?')) {
        currentData.testimonials = currentData.testimonials.filter(t => t.id !== id);
        saveData();
        renderTestimonials();
        updateStats();
        showNotification('Testimonial deleted!', 'success');
    }
}

// Navigation functions
function addNavItem() {
    if (!currentData.navigation) currentData.navigation = [];
    currentData.navigation.push({ text: 'New Item', link: '#' });
    saveData();
    renderNavigation();
    showNotification('Navigation item added!', 'success');
}

function deleteNavItem(index) {
    if (confirm('Are you sure you want to delete this menu item?')) {
        currentData.navigation.splice(index, 1);
        saveData();
        renderNavigation();
        showNotification('Navigation item deleted!', 'success');
    }
}

// Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? 'rgba(34, 197, 94, 0.95)' : type === 'error' ? 'rgba(239, 68, 68, 0.95)' : 'rgba(13, 148, 136, 0.95)'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add slideIn animation
if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}
