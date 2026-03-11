document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once element is visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial load animation trigger
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(element => {
            observer.observe(element);
        });
    }, 100);
});

// Function to handle changing product image via color swatches
function changeProductImage(element, imgId, newSrc) {
    // Update the image source
    const imgElement = document.getElementById(imgId);
    if (imgElement) {
        // Simple fade effect
        imgElement.style.opacity = '0.5';
        setTimeout(() => {
            imgElement.src = newSrc;
            imgElement.style.opacity = '1';
        }, 150);
    }

    // Update the active state on the swatches
    const swatches = element.parentElement.querySelectorAll('.color-swatch');
    swatches.forEach(swatch => swatch.classList.remove('active'));
    element.classList.add('active');
}
