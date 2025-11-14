document.addEventListener('DOMContentLoaded', () => {

    // --- Simulated Database ---
    const agentCredentials = {
        'general': 'tva123',
        'soldier': 'tva123',
        'analyst': 'tva123',
        'judge': 'tva123',
        'officeworker': 'tva123',
        'creator': 'tva123'
    };
    
    // --- DOM Elements ---
    const loginScreen = document.getElementById('login-screen');
    const tvaTerminal = document.getElementById('tva-terminal');
    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');
    // We will get 'purgeButton' later, only if creator logs in
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('login-error');
    const agentIdSpan = document.getElementById('agent-id');
    const allScreens = document.querySelectorAll('.screen');
    const roleNavItems = document.querySelectorAll('.nav-role');

    // --- Login Logic ---
    loginButton.addEventListener('click', handleLogin);
    passwordInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleLogin();
    });

    function handleLogin() {
        const user = usernameInput.value.toLowerCase();
        const pass = passwordInput.value;

        if (agentCredentials[user] && agentCredentials[user] === pass) {
            // Success
            loginScreen.style.display = 'none';
            tvaTerminal.style.display = 'flex';
            agentIdSpan.textContent = user.toUpperCase();
            
            configureNavForRole(user);
            showScreen('screen-home'); // Show home screen by default

            loginError.style.display = 'none';
            usernameInput.value = '';
            passwordInput.value = '';

        } else {
            // Failure
            loginError.style.display = 'block';
        }
    }
    
    // --- Navigation Logic ---
    function configureNavForRole(role) {
        // Hide all role-specific nav items
        roleNavItems.forEach(item => {
            item.style.display = 'none';
        });

        // Show nav items based on role
        if (role === 'soldier') {
            document.getElementById('nav-minuteman').style.display = 'block';
        }
        if (role === 'analyst') {
            document.getElementById('nav-analyst').style.display = 'block';
        }
        if (role === 'judge') {
            document.getElementById('nav-judge').style.display = 'block';
        }
        if (role === 'general') {
            document.getElementById('nav-minuteman').style.display = 'block';
            document.getElementById('nav-analyst').style.display = 'block';
            document.getElementById('nav-tactical').style.display = 'block';
        }
        if (role === 'creator') {
            // Creator sees all
            roleNavItems.forEach(item => {
                item.style.display = 'block';
            });
            
            // **IMPROVEMENT**: Find and attach the purge button listener ONLY after creator logs in
            const purgeButton = document.getElementById('purge-button');
            if (purgeButton) {
                purgeButton.addEventListener('click', triggerFailsafe);
            }
        }
    }
    
    logoutButton.addEventListener('click', () => {
        tvaTerminal.style.display = 'none';
        loginScreen.style.display = 'flex';
    });

    // --- Failsafe Logic ---
    function triggerFailsafe() {
        const failsafeScreen = document.getElementById('failsafe-screen');
        const failsafeTimer = document.getElementById('failsafe-timer');
        const failsafeMessage = document.getElementById('failsafe-message');
        
        failsafeScreen.style.display = 'flex';
        tvaTerminal.style.display = 'none'; // Hide the terminal

        let count = 10;
        failsafeTimer.textContent = count;
        
        const countdown = setInterval(() => {
            count--;
            failsafeTimer.textContent = count;
            
            if (count <= 0) {
                clearInterval(countdown);
                failsafeTimer.textContent = 'PURGE COMPLETE';
                failsafeMessage.textContent = 'THIS TERMINAL HAS BEEN RESET. ALL DATA ERASED.';
                // At this point, the page is "bricked". Nothing else will work.
            }
        }, 1000);
    }
    
    // Make the showScreen function global so HTML onClicks can see it
    window.showScreen = (screenId) => {
        allScreens.forEach(screen => {
            screen.style.display = 'none';
        });
        document.getElementById(screenId).style.display = 'block';
    }
});

// --- Global Widget Functions (These are outside DOMContentLoaded) ---
function clockIn() {
    document.getElementById('clock-status').textContent = 'ON DUTY';
    alert('Clocked In. For all time. Always.');
}

function clockOut() {
    document.getElementById('clock-status').textContent = 'OFF DUTY';
    alert('Clocked Out. Be sure to file your reports.');
}

function sentence(verdict) {
    alert(`Variant L1130 sentenced as: ${verdict.toUpperCase()}. Case file closed.`);
}
