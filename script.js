// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Story Rating System
const starsRating = document.querySelectorAll('.stars-rating i');
const ratingCount = document.querySelector('.rating-count');
let currentRating = 0;
let totalRatings = 0;
let ratingSum = 0;

starsRating.forEach((star, index) => {
    star.addEventListener('click', () => {
        const rating = index + 1;
        
        // Update visual stars
        starsRating.forEach((s, i) => {
            if (i < rating) {
                s.classList.remove('far');
                s.classList.add('fas', 'active');
            } else {
                s.classList.remove('fas', 'active');
                s.classList.add('far');
            }
        });
        
        // Update rating statistics
        totalRatings++;
        ratingSum += rating;
        currentRating = (ratingSum / totalRatings).toFixed(1);
        
        ratingCount.textContent = `${totalRatings} rating${totalRatings > 1 ? 's' : ''} (Average: ${currentRating}/5)`;
        
        // Animation feedback
        star.style.animation = 'none';
        setTimeout(() => {
            star.style.animation = 'pulse 0.5s ease';
        }, 10);
        
        // Show thank you message
        showNotification('Dhanyavad! Aapki rating save ho gayi hai 🌟');
    });
    
    // Hover effect
    star.addEventListener('mouseenter', () => {
        starsRating.forEach((s, i) => {
            if (i <= index) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });
});

document.querySelector('.stars-rating').addEventListener('mouseleave', () => {
    starsRating.forEach((s, i) => {
        if (currentRating === 0) {
            s.classList.remove('active');
        }
    });
});

// Feedback System
const feedbackText = document.getElementById('feedback-text');
const submitFeedback = document.getElementById('submit-feedback');
const feedbackList = document.getElementById('feedback-list');

submitFeedback.addEventListener('click', () => {
    const feedback = feedbackText.value.trim();
    
    if (feedback === '') {
        showNotification('Kripya apni feedback likhein', 'error');
        feedbackText.focus();
        return;
    }
    
    // Create feedback item
    const feedbackItem = document.createElement('div');
    feedbackItem.className = 'feedback-item';
    
    const now = new Date();
    const dateStr = now.toLocaleDateString('hi-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    feedbackItem.innerHTML = `
        <p>${feedback}</p>
        <div class="feedback-date">${dateStr}</div>
    `;
    
    feedbackList.insertBefore(feedbackItem, feedbackList.firstChild);
    
    // Clear textarea
    feedbackText.value = '';
    
    // Show success message
    showNotification('Aapki feedback save ho gayi hai! Dhanyavad 💙');
    
    // Scroll to feedback
    feedbackItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// Contact Form
const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        message: document.getElementById('message').value
    };
    
    // Validate
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
        showNotification('Kripya sabhi required fields bharein', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Kripya valid email address enter karein', 'error');
        return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[+]?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
        showNotification('Kripya valid phone number enter karein', 'error');
        return;
    }
    
    // Simulate sending (in real app, this would be an API call)
    console.log('Contact Form Data:', formData);
    
    // Hide form and show success message
    contactForm.style.display = 'none';
    contactSuccess.classList.add('show');
    
    // Reset form after 5 seconds
    setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'block';
        contactSuccess.classList.remove('show');
    }, 5000);
    
    showNotification('Message successfully bhej diya gaya! 🎉');
});

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);

// Scroll animations for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all story sections and cards
document.querySelectorAll('.story-section, .story-card, .upcoming-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 500;
    }
});

// Add floating animation to stars
function createFloatingStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'floating-star';
        star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: white;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 3 + 2}s infinite;
            opacity: ${Math.random()};
        `;
        starsContainer.appendChild(star);
    }
}

createFloatingStars();

// Interactive cursor effect (optional enhancement)
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'custom-cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #6366f1;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(newCursor);
    }
    
    const cursorElement = document.querySelector('.custom-cursor');
    if (cursorElement) {
        cursorElement.style.left = e.clientX + 'px';
        cursorElement.style.top = e.clientY + 'px';
    }
});

// Add hover effect on interactive elements
document.querySelectorAll('a, button, .story-card, .upcoming-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.background = 'rgba(99, 102, 241, 0.2)';
        }
    });
    
    el.addEventListener('mouseleave', () => {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.background = 'transparent';
        }
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add typing effect to hero title (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// const heroTitle = document.querySelector('.glitch');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 100);
// }

console.log('Dream Stories Website Loaded Successfully! 🌙✨');
console.log('Created with ❤️ for sharing beautiful stories');