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
