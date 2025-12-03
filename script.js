// --- BASE DE DATOS DE LA TVA (Estructura inspirada en SCP) ---
const TVA_ARCHIVES = {
    // Variantes (Equivalente a SCPs)
    "L1130": {
        id: "L1130",
        alias: "Loki Laufeyson",
        clearance: "2", // Nivel de acceso requerido
        // Datos para la Barra ACS
        acs: {
            containment: "Keter", // Dificultad
            disruption: "Ekhi",   // Daño a la línea temporal
            risk: "Critical",     // Peligro físico
            level: "5"            // Nivel de autorización del archivo
        },
        image: "https://upload.wikimedia.org/wikipedia/en/c/c8/Loki_TV_series_logo.png", // Placeholder
        caption: "Variant L1130 caught utilizing Tesseract.",
        // Contenido del artículo
        procedures: "Variant is to be held in Time Theater 4 under constant observation by Minute-Men. Use of magic Dampeners is mandatory.",
        description: "Variant L1130 is a Frost Giant of Jotunheim, adopted by Asgardian Royalty. Subject deviated from the Sacred Timeline by escaping with the Tesseract during the 2012 Avengers initiative. Subject exhibits extreme narcissism, illusion projection capabilities, and a penchant for betrayal.",
        addendum: {
            title: "Interrogation Log 1130-A",
            content: "<strong>Mobius:</strong> You really think you're the king of space?<br><strong>L1130:</strong> I am a God, you dull creature.<br><strong>Mobius:</strong> *Sighs* Reset the timeline."
        }
    },
    "S8812": {
        id: "S8812",
        alias: "Sylvie",
        clearance: "3",
        acs: { containment: "Esoteric", disruption: "Amida", risk: "Critical", level: "5" },
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Sylvie_Laufeydottir.jpg/220px-Sylvie_Laufeydottir.jpg",
        caption: "Variant S8812 avoiding capture in an apocalypse event.",
        procedures: "Immediate Pruning on sight. Do not engage in conversation. Do not allow physical contact (Enchantment risk).",
        description: "Female variant of Loki. Extremely hostile towards TVA authority. Specializes in mental manipulation via physical contact. Has spent centuries hiding within apocalypses to mask her temporal aura.",
        addendum: {
            title: "Incident Report: Roxxcart",
            content: "Subject bombed the Sacred Timeline using multiple reset charges. Timeline stability dropped to 40%. All hands on deck."
        }
    }
};

// --- BASE DE DATOS DE PERSONAL (Solo para Generales) ---
const PERSONNEL_FILES = [
    { id: "B-15", rank: "Hunter", status: "Active - Compromised Memory" },
    { id: "C-20", rank: "Hunter", status: "Deceased (Mental deterioration)" },
    { id: "Mobius", rank: "Analyst", status: "Active - Jetski Enthusiast" },
    { id: "Renslayer", rank: "Judge", status: "Active - Command" }
];

// --- CREDENCIALES ---
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
        e.preventDefault();
        const u = document.getElementById('username').value.toLowerCase();
        const p = document.getElementById('password').value;

        if (USERS[u] && USERS[u].pass === p) {
            currentUser = USERS[u];
            // Animación simple de éxito
            document.querySelector('.login-container').style.borderColor = "#00FF41"; // Verde temporal
            setTimeout(() => {
                loginScreen.style.display = 'none';
                tvaTerminal.style.display = 'flex'; // O block dependiendo del layout
                document.getElementById('user-display').textContent = currentUser.name;
                buildNavigation();
                loadHome(); // Cargar página de inicio
            }, 1000);
        } else {
            document.getElementById('login-error').style.display = 'block';
        }
    });

    document.getElementById('logout-button').addEventListener('click', () => {
        window.location.reload();
    });

    // --- CONSTRUCCIÓN DEL MENÚ SEGÚN ROL ---
    function buildNavigation() {
        navList.innerHTML = '';
        
        // 1. Home
        addNavItem("Main Database", () => loadHome());

        // 2. Variantes (Si tiene nivel 2+)
        if (currentUser.role >= 2) {
            const cat = document.createElement('li');
            cat.innerHTML = "<strong>// VARIANT ARCHIVES</strong>";
            cat.style.cursor = "default";
            navList.appendChild(cat);

            for (const [key, data] of Object.entries(TVA_ARCHIVES)) {
                // Solo mostrar si el rol es igual o mayor a la clearance del archivo
                if (currentUser.role >= parseInt(data.clearance)) {
                    addNavItem(`> ${data.id} (${data.alias})`, () => loadVariant(key));
                }
            }
        }

        // 3. Tribunal (Solo Generales/Creator)
        if (currentUser.role >= 3) {
            addNavItem("// TRIBUNAL (JUDGE)", () => loadTribunal());
        }

        // 4. Personal (Solo Generales/Creator)
        if (currentUser.role >= 3) {
            addNavItem("// PERSONNEL FILES", () => loadPersonnel());
        }
    }

    function addNavItem(text, onClick) {
        const li = document.createElement('li');
        li.textContent = text;
        li.addEventListener('click', onClick);
        navList.appendChild(li);
    }

    // --- RENDERIZADORES DE PÁGINA (El núcleo "Wiki") ---

    // A. Página de Inicio
    function loadHome() {
        wikiContainer.innerHTML = `
            <div class="warning-box">
                <div class="warning-header">TVA SECURE TERMINAL</div>
                <div class="warning-text">FOR ALL TIME. ALWAYS.</div>
            </div>
            <h1 class="page-title">Welcome, ${currentUser.name}</h1>
            <p>You have accessed the Time Variance Authority's main heuristic mainframe.</p>
            <p><strong>Reminder:</strong> Failure to report a Nexus Event within 5 minutes of detection is a pruning offense.</p>
            <div class="image-block" style="float:none; width:100%; text-align:center;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/TVA_Logo.svg/1200px-TVA_Logo.svg.png" style="width:200px; margin:0 auto;">
                <div class="image-caption">Miss Minutes is watching.</div>
            </div>
        `;
    }

    // B. Página de Variante (Estilo SCP clonado)
    function loadVariant(id) {
        const data = TVA_ARCHIVES[id];
        
        // Determinar colores de ACS
        const threatClass = data.acs.risk === "Critical" ? "threat-critical" : "threat-high";

        wikiContainer.innerHTML = `
            <div class="warning-box">
                <div class="warning-header">LEVEL ${data.acs.level} // CLASSIFIED</div>
                <div class="warning-text">UNAUTHORIZED ACCESS WILL RESULT IN IMMEDIATE PRUNING</div>
            </div>

            <div class="acs-bar">
                <div class="acs-left">
                    <span>ITEM #</span>
                    <div class="big-number">${data.id}</div>
                </div>
                <div class="acs-center">
                    <div class="acs-segment">
                        <div class="acs-header">CONTAINMENT</div>
                        <div class="acs-value threat-med">${data.acs.containment}</div>
                    </div>
                    <div class="acs-segment">
                        <div class="acs-header">DISRUPTION</div>
                        <div class="acs-value threat-high">${data.acs.disruption}</div>
                    </div>
                    <div class="acs-segment">
                        <div class="acs-header">RISK CLASS</div>
                        <div class="acs-value ${threatClass}">${data.acs.risk}</div>
                    </div>
                </div>
                <div class="acs-right">
                    <span>LEVEL</span>
                    <div class="level-num">${data.acs.level}</div>
                </div>
            </div>

            <h1 class="page-title">VARIANT ${data.id}</h1>
            
            <div class="image-block">
                <img src="${data.image}" alt="${data.alias}">
                <div class="image-caption">${data.caption}</div>
            </div>

            <p><strong>Alias:</strong> ${data.alias}</p>
            <p><strong>Pruning Protocols:</strong> ${data.procedures}</p>
            
            <h3>Variant Profile</h3>
            <p>${data.description}</p>

            <br style="clear:both;">

            <details>
                <summary>ACCESS FILE: ${data.addendum.title}</summary>
                <div class="collapsible-content">
                    <blockquote>${data.addendum.content}</blockquote>
                </div>
            </details>
        `;
    }

    // C. Tribunal Dinámico
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
                <p><em>"The Time Keepers are watching."</em></p>
            </div>
        `;
        nextCase(); // Generar primer caso
    }

    // D. Archivos de Personal
    function loadPersonnel() {
        let rows = PERSONNEL_FILES.map(p => `
            <tr>
                <td style="padding:10px; border:1px solid #ccc;">${p.id}</td>
                <td style="padding:10px; border:1px solid #ccc;">${p.rank}</td>
                <td style="padding:10px; border:1px solid #ccc;">${p.status}</td>
            </tr>
        `).join('');

        wikiContainer.innerHTML = `
            <h1 class="page-title">ACTIVE PERSONNEL</h1>
            <table style="width:100%; border-collapse:collapse; border: 1px solid var(--tva-brown);">
                <thead style="background:var(--tva-orange); color:white;">
                    <tr>
                        <th style="padding:10px;">ID</th>
                        <th style="padding:10px;">RANK</th>
                        <th style="padding:10px;">STATUS</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;
    }

    // --- UTILIDADES DEL TRIBUNAL ---
    window.nextCase = function() {
        const id = "VAR-" + Math.floor(Math.random() * 9000 + 1000);
        const crimes = ["Nexus Event Level 4", "Killing a key figure", "Being late to work", "Stealing an Infinity Stone"];
        const crime = crimes[Math.floor(Math.random() * crimes.length)];
        
        const elId = document.getElementById('case-id');
        const elCharge = document.getElementById('case-charge');
        
        if(elId) elId.textContent = id;
        if(elCharge) elCharge.textContent = crime;
    }

    window.sentence = function(type) {
        alert(`VARIANT SENTENCED TO: ${type}`);
        // Efecto visual rápido
        const panel = document.querySelector('.judge-panel');
        panel.style.opacity = 0;
        setTimeout(() => {
            nextCase();
            panel.style.opacity = 1;
        }, 500);
    }
});
