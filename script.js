// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form handling with AJAX
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formMessage = document.getElementById('formMessage');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Disable button and show loading
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Get form data
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch('https://formspree.io/f/xvzgwvql', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Sorry, there was an error. Please try again later.';
            console.error('Error:', error);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and platform items
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .platform-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Mobile menu toggle (for future enhancement)
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    if (window.innerWidth <= 768) {
        // Mobile menu functionality can be added here if needed
        console.log('Mobile view detected');
    }
};

window.addEventListener('resize', createMobileMenu);
window.addEventListener('load', createMobileMenu);
