// Smooth scroll for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Add fade-in animation to cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Animate timeline items
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    item.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(item);
});

// Animate stat boxes
document.querySelectorAll('.stat-box').forEach((box, index) => {
    box.style.opacity = '0';
    box.style.transform = 'scale(0.8)';
    box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    box.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(box);
});

// Animate info boxes on scroll
const aboutObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const aboutObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, aboutObserverOptions);

// Animate info boxes
document.querySelectorAll('.info-box').forEach((box, index) => {
    box.style.opacity = '0';
    box.style.transform = 'translateX(-30px)';
    box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    box.style.transitionDelay = `${index * 0.2}s`;
    aboutObserver.observe(box);
});

// Animate list items
document.querySelectorAll('ul li').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    item.style.transitionDelay = `${index * 0.1}s`;
    aboutObserver.observe(item);
});

// Animate headings
document.querySelectorAll('.section h2').forEach((heading, index) => {
    heading.style.opacity = '0';
    heading.style.transform = 'translateY(-10px)';
    heading.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    heading.style.transitionDelay = `${index * 0.15}s`;
    aboutObserver.observe(heading);
});
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
// Animate mission cards on scroll
const missionObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const missionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, missionObserverOptions);

// Animate each mission card
document.querySelectorAll('.mission-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-50px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    card.style.transitionDelay = `${index * 0.15}s`;
    missionObserver.observe(card);
});

// Animate alert banner
const alertBanner = document.querySelector('.alert-banner');
if (alertBanner) {
    alertBanner.style.opacity = '0';
    alertBanner.style.transform = 'translateY(-20px)';
    alertBanner.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    setTimeout(() => {
        alertBanner.style.opacity = '1';
        alertBanner.style.transform = 'translateY(0)';
    }, 200);
}
