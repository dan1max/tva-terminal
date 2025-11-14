// Espera a que todo el HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // --- Base de Datos (Simulada) ---
    // NO HAGAS ESTO EN UN SITIO REAL. Las contraseñas NUNCA deben estar en el código.
    const agentCredentials = {
        'general': 'tva123',
        'soldado': 'tva123',
        'analista': 'tva123',
        'juez': 'tva123',
        'oficinista': 'tva123',
        'creador': 'tva123'
    };

    // --- Elementos del DOM ---
    const loginScreen = document.getElementById('login-screen');
    const tvaTerminal = document.getElementById('tva-terminal');
    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');
    const failSafeButton = document.getElementById('fail-safe-button');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('login-error');
    const agentIdSpan = document.getElementById('agent-id');

    const allPanels = document.querySelectorAll('.panel');

    // --- Lógica de Login ---
    loginButton.addEventListener('click', handleLogin);
    passwordInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleLogin();
    });

    function handleLogin() {
        const user = usernameInput.value.toLowerCase();
        const pass = passwordInput.value;

        // Verifica las credenciales
        if (agentCredentials[user] && agentCredentials[user] === pass) {
            // Éxito
            loginScreen.style.display = 'none';
            tvaTerminal.style.display = 'flex'; // Usamos flex por el layout de CSS
            agentIdSpan.textContent = user.toUpperCase();
            
            showPanelForRole(user);

            // Muestra el botón Fail Safe solo para el creador
            if (user === 'creador') {
                failSafeButton.style.display = 'block';
            }

            loginError.style.display = 'none';
            usernameInput.value = '';
            passwordInput.value = '';

        } else {
            // Fallo
            loginError.style.display = 'block';
        }
    }

    // --- Lógica de Paneles ---
    function showPanelForRole(role) {
        // Oculta todos los paneles
        allPanels.forEach(panel => {
            panel.style.display = 'none';
        });

        // Muestra el panel específico
        let panelToShow;
        switch(role) {
            case 'general':
                panelToShow = document.getElementById('panel-general');
                break;
            case 'soldado':
                panelToShow = document.getElementById('panel-soldado');
                break;
            case 'analista':
                panelToShow = document.getElementById('panel-analista');
                break;
            case 'juez':
                panelToShow = document.getElementById('panel-juez');
                break;
            case 'oficinista':
            case 'creador': // El creador ve el panel de oficinista
            default:
                panelToShow = document.getElementById('panel-oficinista');
                break;
        }
        
        if (panelToShow) {
            panelToShow.style.display = 'block';
        }
    }

    // --- Lógica de Botones ---
    logoutButton.addEventListener('click', () => {
        tvaTerminal.style.display = 'none';
        loginScreen.style.display = 'flex';
        failSafeButton.style.display = 'none';
    });

    // 4. FUNCIÓN FAIL SAFE
    failSafeButton.addEventListener('click', () => {
        // Desactiva la página
        document.body.innerHTML = '<h1 style="color: red; font-size: 5vw; text-align: center; margin-top: 40vh;">LA SAGRADA LÍNEA TEMPORAL HA SIDO COMPROMETIDA. PROTOCOLO FAIL SAFE ACTIVADO.</h1>';
        // La única forma de "volver" es recargando la página manualmente (F5)
    });
});

// --- Funciones de Widgets (Globales para que el HTML las vea) ---

function clockIn() {
    document.getElementById('clock-status').textContent = 'En Servicio (Clocked In)';
    alert('Has fichado. ¡Por la sagrada línea temporal!');
}

function clockOut() {
    document.getElementById('clock-status').textContent = 'Fuera de Servicio (Clocked Out)';
    alert('Has terminado tu servicio. No olvides tu papeleo.');
}

function sentence(verdict) {
    alert(`Variante L1130 sentenciada como: ${verdict.toUpperCase()}. El caso ha sido cerrado.`);
}
