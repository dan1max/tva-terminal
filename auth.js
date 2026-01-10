// User database with roles and permissions
const users = {
    'timekeeper': {
        password: 'a',
        role: 'Time-Keeper',
        level: 5,
        permissions: ['all']
    },
    'judge_renslayer': {
        password: 'a',
        role: 'Judge',
        level: 4,
        permissions: ['missions', 'variants', 'contact', 'about']
    },
    'hunter_b15': {
        password: 'a',
        role: 'Hunter',
        level: 3,
        permissions: ['missions', 'variants', 'about']
    },
    'analyst_casey': {
        password: 'a',
        role: 'Analyst',
        level: 2,
        permissions: ['missions', 'contact', 'about']
    },
    'minuteman_d90': {
        password: 'a',
        role: 'Minuteman',
        level: 1,
        permissions: ['about']
    },
    'mobius': {
        password: 'a',
        role: 'Analyst',
        level: 2,
        permissions: ['missions', 'contact', 'about']
    }
};

// Check if user is logged in (run on every page)
function checkAuth() {
    const currentUser = sessionStorage.getItem('tvaUser');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // If on login page, don't check auth
    if (currentPage === 'login.html') {
        // If already logged in, redirect to home
        if (currentUser) {
            window.location.href = 'index.html';
        }
        return;
    }
    
    // If not logged in, redirect to login
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Check if user has permission for current page
    const userData = JSON.parse(currentUser);
    const pageName = currentPage.replace('.html', '');
    
    if (!hasPermission(userData, pageName)) {
        alert('ACCESS DENIED: You do not have permission to view this page.');
        window.location.href = getDefaultPage(userData);
    }
}

// Check if user has permission for a specific page
function hasPermission(userData, page) {
    // Home page (index) is accessible to all authenticated users
    if (page === 'index' || page === '') {
        return true;
    }
    
    // Time-Keepers have access to everything
    if (userData.permissions.includes('all')) {
        return true;
    }
    
    // Check specific permission
    return userData.permissions.includes(page);
}

// Get default page based on user role
function getDefaultPage(userData) {
    if (userData.permissions.includes('all')) {
        return 'index.html';
    }
    if (userData.permissions.includes('missions')) {
        return 'missions.html';
    }
    if (userData.permissions.includes('about')) {
        return 'about.html';
    }
    return 'index.html';
}

// Handle login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.toLowerCase().trim();
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('loginError');
        
        // Check credentials
        if (users[username] && users[username].password === password) {
            // Login successful
            const userData = {
                username: username,
                role: users[username].role,
                level: users[username].level,
                permissions: users[username].permissions
            };
            
            // Store user data in session
            sessionStorage.setItem('tvaUser', JSON.stringify(userData));
            
            // Show success animation
            const terminalWindow = document.querySelector('.terminal-window');
            terminalWindow.style.borderColor = '#4caf50';
            
            // Redirect to appropriate page
            setTimeout(() => {
                window.location.href = getDefaultPage(userData);
            }, 500);
        } else {
            // Login failed
            errorMessage.style.display = 'block';
            const terminalWindow = document.querySelector('.terminal-window');
            terminalWindow.style.borderColor = '#d43f3f';
            
            // Reset border color after animation
            setTimeout(() => {
                terminalWindow.style.borderColor = '#d4a574';
            }, 2000);
            
            // Clear password field
            document.getElementById('password').value = '';
        }
    });
}

// Logout function
function logout() {
    sessionStorage.removeItem('tvaUser');
    window.location.href = 'login.html';
}

// Panic button - emergency shutdown
function panicShutdown() {
    const confirmShutdown = confirm('⚠ EMERGENCY PROTOCOL ⚠\n\nThis will immediately terminate your session and lock the terminal.\n\nProceed with emergency shutdown?');
    
    if (confirmShutdown) {
        // Clear session
        sessionStorage.clear();
        
        // Create shutdown screen
        document.body.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #000;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                color: #d43f3f;
                font-family: 'Courier New', monospace;
                z-index: 99999;
            ">
                <div style="font-size: 3rem; font-weight: bold; animation: pulse 1s infinite;">
                    ⚠ EMERGENCY SHUTDOWN ⚠
                </div>
                <div style="font-size: 1.5rem; margin-top: 2rem;">
                    TERMINAL LOCKED
                </div>
                <div style="font-size: 1rem; margin-top: 1rem; color: #d4a574;">
                    ALL SESSIONS TERMINATED
                </div>
                <div style="font-size: 1rem; margin-top: 3rem; color: #f4e4c1;">
                    Contact Time-Keeper to restore access
                </div>
            </div>
            <style>
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            </style>
        `;
        
        // Redirect to login after 5 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 5000);
    }
}

// Update navigation based on user permissions
function updateNavigation() {
    const currentUser = sessionStorage.getItem('tvaUser');
    if (!currentUser) return;
    
    const userData = JSON.parse(currentUser);
    const nav = document.querySelector('nav');
    
    if (nav) {
        // Get all nav links
        const links = nav.querySelectorAll('a');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            const page = href.replace('.html', '');
            
            // Hide links user doesn't have permission for
            if (page !== 'index' && !hasPermission(userData, page)) {
                link.style.opacity = '0.3';
                link.style.pointerEvents = 'none';
                link.style.cursor = 'not-allowed';
                link.title = 'Access Denied - Insufficient Permissions';
            }
        });
        
        // Add user info and buttons to nav
        const userInfo = document.createElement('div');
        userInfo.className = 'user-info';
        userInfo.innerHTML = `
            <span class="user-role">${userData.role}</span>
            <span class="user-name">${userData.username}</span>
            <button onclick="logout()" class="logout-btn">LOGOUT</button>
            <button onclick="panicShutdown()" class="panic-btn">⚠ PANIC</button>
        `;
        nav.appendChild(userInfo);
    }
}

// Run auth check on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    updateNavigation();
});
