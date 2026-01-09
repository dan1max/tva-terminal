// Contact form handling
const anomalyForm = document.getElementById('anomalyForm');
const formSuccess = document.getElementById('formSuccess');

if (anomalyForm) {
    anomalyForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Generate a random report ID
        const reportId = 'TVA-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        
        // Display success message
        document.getElementById('reportId').textContent = reportId;
        
        // Hide form and show success message
        anomalyForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Optional: Reset form after a delay
        setTimeout(() => {
            anomalyForm.reset();
        }, 1000);
    });
}

// Animate form groups on scroll
const contactObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const contactObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, contactObserverOptions);

// Animate form container
const formContainer = document.querySelector('.form-container');
if (formContainer) {
    formContainer.style.opacity = '0';
    formContainer.style.transform = 'translateY(30px)';
    formContainer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    contactObserver.observe(formContainer);
}

// Animate each form group with stagger
document.querySelectorAll('.form-group').forEach((group, index) => {
    group.style.opacity = '0';
    group.style.transform = 'translateX(-20px)';
    group.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    group.style.transitionDelay = `${index * 0.1}s`;
    contactObserver.observe(group);
});

// Add focus animation to inputs
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateX(5px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateX(0)';
    });
});

// Highlight urgent checkbox
const urgentCheckbox = document.getElementById('urgent');
if (urgentCheckbox) {
    urgentCheckbox.addEventListener('change', function() {
        const warningBox = document.querySelector('.warning-box');
        if (this.checked && warningBox) {
            warningBox.style.animation = 'pulse 1s infinite';
            warningBox.style.background = '#ff4444';
        } else if (warningBox) {
            warningBox.style.animation = 'pulse 2s infinite';
            warningBox.style.background = '#d43f3f';
        }
    });
}
