// --- [ 1. SIMULATED TVA DATABASE ] ---
const TVA_DATA = {
    // Database of all variants
    variants: {
        'M2021': { id: 'M2021', alias: 'Mobius', nexus: 'Bought a Jet-Ski in 2005.', threat: 'LOW', status: 'In Custody', clearance: 1, notes: 'Variant is cooperative. Obsessed with Jet-Skis. Do not allow access to watercraft catalogs.' },
        'B015': { id: 'B015', alias: 'Hunter B-15', nexus: 'Remembered her past life on Earth.', threat: 'LOW', status: 'Re-integrated', clearance: 1, notes: 'Variant was reset and returned to duty. Monitor for further memory divergence.' },
        'L1130': { id: 'L1130', alias: 'Loki', nexus: 'Escaped custody with the Tesseract in 2012.', threat: 'HIGH', status: 'Pending Sentence', clearance: 2, notes: 'Extremely dangerous. Do not trust. Caused Nexus Event that led to Variant S8812.' },
        'S8812': { id: 'S8812', alias: 'Sylvie', nexus: 'Born as a female Loki.', threat: 'CRITICAL', status: 'At Large', clearance: 2, notes: 'Hunted by the TVA for her entire life. Responsible for the death of He Who Remains. DO NOT ENGAGE.' },
        'L1190': { id: 'L1190', alias: 'President Loki', nexus: 'Attempted to betray other Lokis in the Void.', threat: 'HIGH', status: 'Contained (Void)', clearance: 3, notes: 'Lost his hand to Alligator Loki. Considered a nuisance.' },
        'L000A': { id: 'L000A', alias: 'Alligator Loki', nexus: 'Ate the wrong neighbor\'s cat.', threat: 'HIGH', status: 'Contained (Void)', clearance: 3, notes: 'Is, in fact, an alligator. Do not attempt to pet.' },
        'K4404': { id: 'K4404', alias: 'He Who Remains', nexus: '--- REDACTED BY ORDER OF O.B. ---', threat: 'SACRED', status: 'DECEASED', clearance: 4, notes: 'File locked. All data has been archived.' }
    },
    // Database of personnel files
    personnel: {
        'B-15': { id: 'B-15', rank: 'Hunter', status: 'ACTIVE', record: ['Distinguished service in the 1888 London incident.', 'Commendation for capturing Variant L1130.', 'Reprimanded for unauthorized Nexus investigation (Ref: 2012).', 'Currently monitoring Sacred Timeline.'] },
        'C-20': { id: 'C-20', rank: 'Hunter', status: 'DECEASED', record: ['Served for 300 cycles.', 'Captured by Variant S8812.', 'Deceased in the field.'] },
        'X-5': { id: 'X-5', rank: 'Hunter', status: 'DEFECTED (AWOL)', record: ['Exemplary service record for 150 cycles.', 'Abandoned post during mission in 1977.', 'Currently living as "Brad Wolfe" on Sacred Timeline.'] },
        'M-M': { id: 'M-M', rank: 'Analyst', status: 'ACTIVE', record: ['Lead analyst on the Loki variant case.', 'Repeatedly requests Jet-Ski for "field analysis." (Denied)', 'Currently assisting Ouroboros in temporal mechanics.'] }
    },
    // Database of handbook chapters
    handbook: [
        'Chapter 1: What is the TVA?',
        'Chapter 2: Understanding the Sacred Timeline',
        'Chapter 3: Identifying a Nexus Event',
        'Chapter 4: Proper Pruning & Resetting Procedure',
        'Chapter 5: Dealing with Loki Variants (A Guide)',
        'Chapter 6: Filing Form 3B-Alpha (In Triplicate)'
    ],
    // Database of random charges for Judge Panel
    randomCharges: [
        "Unauthorized time travel", "Creating a Nexus Event", "Sequence breaking", "Conspiring with a variant", "Possession of non-TVA tech", "Eating the wrong salad", "Being late for work", "Altering a fixed point in time", "Telling a bad joke"
    ]
};

// --- [ 2. DOM CONTENT LOADED & CORE EVENT LISTENERS ] ---
document.addEventListener('DOMContentLoaded', () => {

    // --- Simulated User Database ---
    const agentCredentials = {
        'general': { pass: 'tva123', role: 'general' },
        'soldier': { pass: 'tva123', role: 'soldier' },
        'analyst': { pass: 'tva123', role: 'analyst' },
        'judge': { pass: 'tva123', role: 'judge' },
        'officeworker': { pass: 'tva123', role: 'officeworker' },
        'creator': { pass: 'tva123', role: 'creator' }
    };
    
    // --- DOM Elements ---
    const loginScreen = document.getElementById('login-screen');
    const tvaTerminal = document.getElementById('tva-terminal');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const loginProgress = document.getElementById('login-progress');
    const loginProgressText = document.getElementById('login-progress-text');
    const progressBarInner = document.getElementById('progress-bar-inner');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const agentIdSpan = document.getElementById('agent-id');
    const allScreens = document.querySelectorAll('.screen');
    const roleNavItems = document.querySelectorAll('.nav-role');
    const logoutButton = document.getElementById('logout-button');
    const navList = document.getElementById('nav-list');
    
    // Audio Elements
    const audioClick = document.getElementById('audio-click');
    const audioAlert = document.getElementById('audio-alert');

    // --- Audio Logic ---
    function playClick() { if (audioClick) audioClick.play().catch(e => {}); }
    function playAlert() { if (audioAlert) audioAlert.play().catch(e => {}); }
    
    // Add click sound to all buttons and nav items
    document.querySelectorAll('button, .tva-button, #terminal-nav li').forEach(el => {
        el.addEventListener('click', playClick);
    });

    // --- Login Logic ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleLogin();
    });

    function handleLogin() {
        const user = usernameInput.value.toLowerCase();
        const pass = passwordInput.value;
        const agent = agentCredentials[user];

        if (agent && agent.pass === pass) {
            // Success
            loginError.style.display = 'none';
            loginForm.style.display = 'none';
            loginProgress.style.display = 'block';
            
            // Simulate login delay
            simulateLogin(agent);

        } else {
            // Failure
            loginError.style.display = 'block';
        }
    }
    
    function simulateLogin(agent) {
        loginProgressText.textContent = "Connecting to Mainframe...";
        progressBarInner.style.width = '30%';
        
        setTimeout(() => {
            loginProgressText.textContent = "Authorizing Credentials...";
            progressBarInner.style.width = '70%';
        }, 800);
        
        setTimeout(() => {
            loginProgressText.textContent = "Access Granted.";
            progressBarInner.style.width = '100%';
        }, 1500);
        
        setTimeout(() => {
            // Show terminal
            loginScreen.style.display = 'none';
            tvaTerminal.style.display = 'flex';
            agentIdSpan.textContent = agent.role.toUpperCase();
            
            configureNavForRole(agent.role);
            showScreen('screen-home');

            // Reset login form for next time
            loginForm.style.display = 'block';
            loginProgress.style.display = 'none';
            loginProgressText.textContent = 'Connecting...';
            progressBarInner.style.width = '0%';
            usernameInput.value = '';
            passwordInput.value = '';
        }, 2000);
    }
    
    // --- Navigation & Role Logic ---
    function configureNavForRole(role) {
        document.body.className = `role-${role}`;
        roleNavItems.forEach(item => item.style.display = 'none');

        // Define role-to-nav mapping
        const roleNavMapping = {
            'soldier': ['nav-minuteman'],
            'analyst': ['nav-analyst'],
            'judge': ['nav-judge'],
            'general': ['nav-minuteman', 'nav-analyst', 'nav-tactical', 'nav-personnel'],
            'creator': ['nav-minuteman', 'nav-analyst', 'nav-judge', 'nav-tactical', 'nav-personnel', 'nav-creator']
        };

        // Show nav items
        if (roleNavMapping[role]) {
            roleNavMapping[role].forEach(navId => {
                const el = document.getElementById(navId);
                if (el) el.style.display = 'block';
            });
        }
        
        // Special: Attach purge button listener for creator
        if (role === 'creator') {
            const purgeButton = document.getElementById('purge-button');
            if (purgeButton) {
                // Remove old listener to avoid duplicates, then add new one
                purgeButton.replaceWith(purgeButton.cloneNode(true));
                document.getElementById('purge-button').addEventListener('click', () => {
                    playAlert(); // *** BUG 2: ALARM SOUND IS ONLY HERE ***
                    triggerFailsafe();
                });
            }
        }
    }
    
    logoutButton.addEventListener('click', () => {
        tvaTerminal.style.display = 'none';
        loginScreen.style.display = 'flex';
        document.body.className = '';
        
        // *** BUG 3 FIX: Reset the login form ***
        loginForm.style.display = 'block';
        loginProgress.style.display = 'none';
        progressBarInner.style.width = '0%';
        loginProgressText.textContent = 'Connecting...';
    });

    // --- Core Screen Navigation ---
    // Event delegation for all nav clicks
    navList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI' && e.target.dataset.screen) {
            showScreen(e.target.dataset.screen);
        }
    });
    // Add listeners for any other buttons that switch screens
    document.body.addEventListener('click', (e) => {
        if (e.target.dataset.screen) {
            showScreen(e.target.dataset.screen);
        }
    });

    function showScreen(screenId) {
        allScreens.forEach(screen => screen.style.display = 'none');
        const screenToShow = document.getElementById(screenId);
        if (screenToShow) screenToShow.style.display = 'block';

        // Dynamic content loaders
        if (screenId === 'screen-tribunal') loadNewCase();
        if (screenId === 'screen-variants') populateVariantTable();
        if (screenId === 'screen-personnel') populatePersonnelTable();
        if (screenId === 'screen-handbook') populateHandbook();
    }
    
    // --- Failsafe Logic ---
    function triggerFailsafe() {
        const failsafeScreen = document.getElementById('failsafe-screen');
        const failsafeTimer = document.getElementById('failsafe-timer');
        const failsafeMessage = document.getElementById('failsafe-message');
        
        failsafeScreen.style.display = 'flex';
        tvaTerminal.style.display = 'none';

        let count = 10;
        failsafeTimer.textContent = count;
        
        const countdown = setInterval(() => {
            count--;
            failsafeTimer.textContent = count;
            if (count <= 0) {
                clearInterval(countdown);
                failsafeTimer.textContent = 'PURGE COMPLETE';
                failsafeMessage.textContent = 'THIS TERMINAL HAS BEEN RESET.';
            }
        }, 1000);
    }
    
    // --- [ 3. DYNAMIC CONTENT LOADERS ] ---

    // --- JUDGE PANEL ---
    window.loadNewCase = function() {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const newID = `${randomLetter}${randomNum}`;
        const newCharge = TVA_DATA.randomCharges[Math.floor(Math.random() * TVA_DATA.randomCharges.length)];

        document.getElementById('case-id').textContent = newID;
        document.getElementById('case-charge').textContent = newCharge;
    }

    // --- VARIANT TABLE & DETAILS ---
    function populateVariantTable() {
        const tableBody = document.getElementById('variant-table-body');
        tableBody.innerHTML = ''; // Clear table
        for (const [id, variant] of Object.entries(TVA_DATA.variants)) {
            const row = document.createElement('tr');
            row.className = `clearance-${variant.clearance > 3 ? 'locked' : variant.clearance}`; // e.g. clearance-1
            
            row.innerHTML = `
                <td>${variant.id}</td>
                <td>${variant.alias}</td>
                <td class="text-${variant.threat.toLowerCase()}">${variant.threat}</td>
                <td>${variant.status}</td>
                <td><button class="tva-button" onclick="window.showVariantDetail('${id}')" ${variant.clearance === 4 ? 'disabled' : ''}>[VIEW]</button></td>
            `;
            tableBody.appendChild(row);
        }
    }
    
    window.showVariantDetail = function(variantId) {
        const variant = TVA_DATA.variants[variantId];
        if (!variant) return;
        
        // Populate detail screen
        document.getElementById('variant-detail-title').textContent = `[ FILE: ${variant.id} ]`;
        document.getElementById('variant-detail-id').textContent = variant.id;
        document.getElementById('variant-detail-alias').textContent = variant.alias;
        document.getElementById('variant-detail-threat').className = `text-${variant.threat.toLowerCase()}`;
        document.getElementById('variant-detail-threat').textContent = variant.threat;
        document.getElementById('variant-detail-status').textContent = variant.status;
        document.getElementById('variant-detail-nexus').textContent = variant.nexus;
        document.getElementById('variant-detail-notes').textContent = variant.notes;
        
        // Show the screen
        showScreen('screen-variant-detail');
    }

    // --- PERSONNEL TABLE & DETAILS ---
    function populatePersonnelTable() {
        const tableBody = document.getElementById('personnel-table-body');
        tableBody.innerHTML = ''; // Clear table
        for (const [id, agent] of Object.entries(TVA_DATA.personnel)) {
            const row = document.createElement('tr');
            let statusClass = agent.status === 'ACTIVE' ? 'text-success' : 'text-danger';
            
            row.innerHTML = `
                <td>${agent.id}</td>
                <td>${agent.rank}</td>
                <td class="${statusClass}">${agent.status}</td>
                <td><button class="tva-button" onclick="window.showPersonnelDetail('${id}')">[VIEW]</button></td>
            `;
            tableBody.appendChild(row);
        }
    }
    
    window.showPersonnelDetail = function(agentId) {
        const agent = TVA_DATA.personnel[agentId];
        if (!agent) return;
        
        // Populate detail screen
        document.getElementById('personnel-detail-title').textContent = `[ FILE: ${agent.id} ]`;
        document.getElementById('personnel-detail-id').textContent = agent.id;
        document.getElementById('personnel-detail-rank').textContent = agent.rank;
        document.getElementById('personnel-detail-status').className = agent.status === 'ACTIVE' ? 'text-success' : 'text-danger';
        document.getElementById('personnel-detail-status').textContent = agent.status;
        
        const recordList = document.getElementById('personnel-detail-record');
        recordList.innerHTML = ''; // Clear list
        agent.record.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `> ${item}`;
            recordList.appendChild(li);
        });
        
        // Show the screen
        showScreen('screen-personnel-detail');
    }

    // --- HANDBOOK ---
    function populateHandbook() {
        const toc = document.getElementById('handbook-toc');
        toc.innerHTML = ''; // Clear list
        TVA_DATA.handbook.forEach(chapter => {
            const li = document.createElement('li');
            li.textContent = `> ${chapter}`;
            li.onclick = () => alert('File is corrupted or currently in use by another agent.');
            toc.appendChild(li);
        });
    }

    // --- Make functions globally accessible for HTML onClicks ---
    window.playClick = playClick;
    window.playAlert = playAlert;

}); // End DOMContentLoaded

// --- [ 4. GLOBAL WIDGET FUNCTIONS ] ---
// (Must be global for HTML onClicks)

function clockIn() {
    document.getElementById('clock-status').textContent = 'ON DUTY';
    alert('Clocked In. For all time. Always.');
}

function clockOut() {
    document.getElementById('clock-status').textContent = 'OFF DUTY';
    alert('Clocked Out. Be sure to file your reports.');
}

function sentence(verdict) {
    // *** BUG 2 FIX: Removed alarm sound from here ***
    const caseId = document.getElementById('case-id').textContent;
    alert(`Variant ${caseId} sentenced as: ${verdict.toUpperCase()}. Case file closed.`);
    window.loadNewCase(); // Load the next case
}
