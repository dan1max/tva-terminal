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
