// Animate table rows on scroll
const variantsObserverOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
};

const variantsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, variantsObserverOptions);

// Animate table container
const tableContainer = document.querySelector('.table-container');
if (tableContainer) {
    tableContainer.style.opacity = '0';
    tableContainer.style.transform = 'translateY(30px)';
    tableContainer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    variantsObserver.observe(tableContainer);
}

// Animate each table row with a delay
document.querySelectorAll('.variant-table tbody tr').forEach((row, index) => {
    row.style.opacity = '0';
    row.style.transform = 'translateX(-20px)';
    row.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    row.style.transitionDelay = `${index * 0.05}s`;
    
    // Only observe the first few rows to avoid too many observers
    if (index < 5) {
        variantsObserver.observe(row);
    } else {
        // For rows further down, just animate when table becomes visible
        setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, 500 + (index * 50));
    }
});

// Add hover effect to highlight row
document.querySelectorAll('.variant-table tbody tr').forEach(row => {
    row.addEventListener('mouseenter', function() {
        this.style.borderLeft = '4px solid #ff8c42';
    });
    
    row.addEventListener('mouseleave', function() {
        this.style.borderLeft = 'none';
    });
});

// Animate threat level badges
document.querySelectorAll('.threat-extreme').forEach(badge => {
    badge.style.animation = 'pulse 2s infinite';
});
