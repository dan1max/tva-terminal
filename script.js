// --- BASE DE DATOS DE LA TVA ---
const TVA_ARCHIVES = {
    "L1130": {
        id: "L1130", alias: "Loki Laufeyson", clearance: "2",
        acs: { containment: "Keter", disruption: "Ekhi", risk: "Critical", level: "5" },
        image: "https://upload.wikimedia.org/wikipedia/en/c/c8/Loki_TV_series_logo.png",
        caption: "Variant L1130 caught utilizing Tesseract.",
        procedures: "Variant is to be held in Time Theater 4 under constant observation. Use of magic Dampeners is mandatory.",
        description: "Variant L1130 is a Frost Giant of Jotunheim, adopted by Asgardian Royalty. Subject deviated from the Sacred Timeline by escaping with the Tesseract during the 2012 Avengers initiative.",
        addendum: { title: "Interrogation Log 1130-A", content: "<strong>Mobius:</strong> You really think you're the king of space?<br><strong>L1130:</strong> I am a God, you dull creature." }
    },
    "S8812": {
        id: "S8812", alias: "Sylvie", clearance: "3",
        acs: { containment: "Esoteric", disruption: "Amida", risk: "Critical", level: "5" },
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Sylvie_Laufeydottir.jpg/220px-Sylvie_Laufeydottir.jpg",
        caption: "Variant S8812 avoiding capture.",
        procedures: "Immediate Pruning on sight. Do not engage. Do not allow physical contact.",
        description: "Female variant of Loki. Extremely hostile. Specializes in mental manipulation via physical contact.",
        addendum: { title: "Incident Report: Roxxcart", content: "Subject bombed the Sacred Timeline using reset charges. Timeline stability dropped to 40%." }
    }
};

const PERSONNEL_FILES = [
    { id: "B-15", rank: "Hunter", status: "Active - Compromised Memory" },
    { id: "C-20", rank: "Hunter", status: "Deceased" },
    { id: "Mobius", rank: "Analyst", status: "Active - Jetski Enthusiast" },
    { id: "Renslayer", rank: "Judge", status: "Active - Command" }
];

const USERS = {
    "minuteman": { pass: "tva123", role: 1, name: "Soldier B-15" },
    "analyst":   { pass: "tva123", role: 2, name: "Agent Mobius" },
    "general":   { pass: "tva123", role: 3, name: "Ravonna Renslayer" },
    "creator":   { pass: "tva123", role: 4, name: "He Who Remains" }
};

document.addEventListener('DOMContentLoaded', () => {
    // Referencias DOM
    const loginScreen = document.getElementById('login-screen');
    const tvaTerminal = document.getElementById('tva-terminal');
    const navList = document.getElementById('nav-list');
    const wikiContainer = document.getElementById('wiki-container');
    const loginForm = document.getElementById('login-form');
    
    let currentUser = null;

    // --- LÓGICA DE LOGIN ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Detiene la recarga de la página
        
        // Limpiamos espacios en blanco con .trim()
        const u = document.getElementById('username').value.trim().toLowerCase();
        const p = document.getElementById('password').value.trim();

        console.log("Intentando login con:", u, p); // Debug

        if (USERS[u] && USERS[u].pass === p) {
            currentUser = USERS[u];
            // Éxito visual
            document.querySelector('.login-container').style.borderColor = "#00FF41"; 
            document.getElementById('login-button').innerText = "ACCESS GRANTED";
            document.getElementById('login-button').style.background = "#00FF41";

            setTimeout(() => {
                loginScreen.style.display = 'none';
                tvaTerminal.style.display = 'flex'; 
                document.getElementById('user-display').textContent = currentUser.name;
                buildNavigation();
                loadHome();
            }, 1000);
        } else {
            // Error visual
            document.getElementById('login-error').style.display = 'block';
            document.querySelector('.login-container').style.borderColor = "red";
        }
    });

    document.getElementById('logout-button').addEventListener('click', () => {
        window.location.reload();
    });

    // --- NAVEGACIÓN ---
    function buildNavigation() {
        navList.innerHTML = '';
        addNavItem("Main Database", () => loadHome());

        if (currentUser.role >= 2) {
            const cat = document.createElement('li');
            cat.innerHTML = "<strong>// VARIANT ARCHIVES</strong>";
            cat.style.cursor = "default"; 
            navList.appendChild(cat);

            for (const [key, data] of Object.entries(TVA_ARCHIVES)) {
                if (currentUser.role >= parseInt(data.clearance)) {
                    addNavItem(`> ${data.id} (${data.alias})`, () => loadVariant(key));
                }
            }
        }

        if (currentUser.role >= 3) {
            addNavItem("// TRIBUNAL (JUDGE)", () => loadTribunal());
            addNavItem("// PERSONNEL FILES", () => loadPersonnel());
        }
    }

    function addNavItem(text, onClick) {
        const li = document.createElement('li');
        li.textContent = text;
        li.addEventListener('click', onClick);
        navList.appendChild(li);
    }

    // --- RENDERIZADORES ---
    function loadHome() {
        wikiContainer.innerHTML = `
            <div class="warning-box">
                <div class="warning-header">TVA SECURE TERMINAL</div>
                <div class="warning-text">FOR ALL TIME. ALWAYS.</div>
            </div>
            <h1 class="page-title">Welcome, ${currentUser.name}</h1>
            <p>You have accessed the Time Variance Authority's main heuristic mainframe.</p>
            <div class="image-block" style="float:none; width:100%; text-align:center;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/TVA_Logo.svg/1200px-TVA_Logo.svg.png" style="width:200px; margin:0 auto;">
                <div class="image-caption">Miss Minutes is watching.</div>
            </div>
        `;
    }

    function loadVariant(id) {
        const data = TVA_ARCHIVES[id];
        const threatClass = data.acs.risk === "Critical" ? "threat-critical" : "threat-high";

        wikiContainer.innerHTML = `
            <div class="warning-box">
                <div class="warning-header">LEVEL ${data.acs.level} // CLASSIFIED</div>
                <div class="warning-text">UNAUTHORIZED ACCESS WILL RESULT IN IMMEDIATE PRUNING</div>
            </div>
            <div class="acs-bar">
                <div class="acs-left"><span>ITEM #</span><div class="big-number">${data.id}</div></div>
                <div class="acs-center">
                    <div class="acs-segment"><div class="acs-header">CONTAINMENT</div><div class="acs-value threat-med">${data.acs.containment}</div></div>
                    <div class="acs-segment"><div class="acs-header">DISRUPTION</div><div class="acs-value threat-high">${data.acs.disruption}</div></div>
                    <div class="acs-segment"><div class="acs-header">RISK CLASS</div><div class="acs-value ${threatClass}">${data.acs.risk}</div></div>
                </div>
                <div class="acs-right"><span>LEVEL</span><div class="level-num">${data.acs.level}</div></div>
            </div>
            <h1 class="page-title">VARIANT ${data.id}</h1>
            <div class="image-block"><img src="${data.image}" alt="${data.alias}"><div class="image-caption">${data.caption}</div></div>
            <p><strong>Alias:</strong> ${data.alias}</p>
            <p><strong>Pruning Protocols:</strong> ${data.procedures}</p>
            <h3>Variant Profile</h3><p>${data.description}</p>
            <br style="clear:both;">
            <details><summary>ACCESS FILE: ${data.addendum.title}</summary><div class="collapsible-content"><blockquote>${data.addendum.content}</blockquote></div></details>
        `;
    }

    function loadTribunal() {
        wikiContainer.innerHTML = `
            <h1 class="page-title">TRIBUNAL CHAMBER</h1>
            <div class="judge-panel">
                <h2>CURRENT CASE: <span id="case-id">LOADING...</span></h2>
                <p><strong>CHARGE:</strong> <span id="case-charge">CRIMES AGAINST THE SACRED TIMELINE</span></p>
                <div style="margin: 30px 0;">
                    <button class="judge-btn btn-reset" onclick="sentence('RESET')">RESET TIMELINE</button>
                    <button class="judge-btn btn-prune" onclick="sentence('PRUNE')">PRUNE VARIANT</button>
                </div>
            </div>
        `;
        nextCase();
    }

    function loadPersonnel() {
        let rows = PERSONNEL_FILES.map(p => `<tr><td style="padding:10px; border:1px solid #ccc;">${p.id}</td><td style="padding:10px; border:1px solid #ccc;">${p.rank}</td><td style="padding:10px; border:1px solid #ccc;">${p.status}</td></tr>`).join('');
        wikiContainer.innerHTML = `<h1 class="page-title">ACTIVE PERSONNEL</h1><table style="width:100%; border-collapse:collapse; border: 1px solid var(--tva-brown);"><thead style="background:var(--tva-orange); color:white;"><tr><th style="padding:10px;">ID</th><th style="padding:10px;">RANK</th><th style="padding:10px;">STATUS</th></tr></thead><tbody>${rows}</tbody></table>`;
    }

    // Funciones globales
    window.nextCase = function() {
        const id = "VAR-" + Math.floor(Math.random() * 9000 + 1000);
        const crimes = ["Nexus Event Level 4", "Killing a key figure", "Being late to work", "Stealing an Infinity Stone"];
        document.getElementById('case-id').textContent = id;
        document.getElementById('case-charge').textContent = crimes[Math.floor(Math.random() * crimes.length)];
    }

    window.sentence = function(type) {
        alert(`VARIANT SENTENCED TO: ${type}`);
        nextCase();
    }
});
