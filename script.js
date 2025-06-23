// Smooth scrolling for navigation links
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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Gallery item animations
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
    
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05) rotateY(5deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
    });
});

// Intersection Observer for animations
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

// Observe elements for animation
document.querySelectorAll('.feature-card, .branch-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Floating shapes animation
function createFloatingShape(targetSelector = '.hero-background') {
    const shape = document.createElement('div');
    shape.className = 'floating-particle';
    shape.style.cssText = `
        position: absolute;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: 100%;
        animation: floatUp ${Math.random() * 3 + 2}s linear infinite;
        pointer-events: none;
    `;
    const target = document.querySelector(targetSelector);
    if (target) target.appendChild(shape);
    setTimeout(() => {
        shape.remove();
    }, 5000);
}

// Create floating particles in both hero and raffle backgrounds
setInterval(() => createFloatingShape('.hero-background'), 300);
setInterval(() => createFloatingShape('.raffle-background'), 300);

// Add CSS for floating particles
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Schedule consultation function
function scheduleConsultation() {
    alert('سيتم توجيهك إلى نظام الحجز قريباً. يرجى التواصل معنا على الرقم: 1700 666 666');
}

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'جاري الإرسال...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
    
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Counter animation for raffle section
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Trigger counter animation when raffle section is visible
const raffleObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('.prize-count');
            animateCounter(counter, 10);
            raffleObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

raffleObserver.observe(document.querySelector('.raffle'));

// Add hover effects to CTA buttons
document.querySelectorAll('.cta-primary, .cta-secondary, .contact-btn, .raffle-cta').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth reveal animation for sections
const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(section);
});

// Add revealed class styles
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(revealStyle);

// Initialize hero section as revealed
document.querySelector('.hero').classList.add('revealed');

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #0066ff 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'جاري التحميل...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 1.5rem;
        font-weight: 600;
        z-index: 10000;
        animation: pulse 1.5s ease-in-out infinite;
    }
`;
document.head.appendChild(loadingStyle);


// Enhanced animations and interactions

// Advanced particle system
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.init();
    }
    
    init() {
        this.createParticles();
        this.animate();
    }
    
    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.createParticle();
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'advanced-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            z-index: 1;
        `;
        
        this.container.appendChild(particle);
        this.particles.push({
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: Math.random() * 100 + 50
        });
    }
    
    animate() {
        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;
            
            if (particle.life <= 0 || particle.x < 0 || particle.x > window.innerWidth || 
                particle.y < 0 || particle.y > window.innerHeight) {
                particle.element.remove();
                this.particles.splice(index, 1);
                this.createParticle();
            } else {
                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';
                particle.element.style.opacity = particle.life / 100;
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system
window.addEventListener('load', function() {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        new ParticleSystem(heroBackground);
    }
});

// Advanced scroll animations
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-animate]');
        this.init();
    }
    
    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        this.elements.forEach(el => this.observer.observe(el));
    }
    
    animateElement(element) {
        const animationType = element.dataset.animate;
        element.classList.add('animate-' + animationType);
    }
}

// Add animation data attributes to elements
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.feature-card').forEach((el, index) => {
        el.setAttribute('data-animate', 'fadeInUp');
        el.style.animationDelay = `${index * 0.2}s`;
    });
    
    document.querySelectorAll('.branch-card').forEach((el, index) => {
        el.setAttribute('data-animate', 'slideInLeft');
        el.style.animationDelay = `${index * 0.1}s`;
    });
    
    new ScrollAnimations();
});

// Enhanced gallery interactions
class GalleryEnhancer {
    constructor() {
        this.gallery = document.querySelector('.dream-gallery');
        this.items = document.querySelectorAll('.gallery-item');
        this.init();
    }
    
    init() {
        this.items.forEach((item, index) => {
            item.addEventListener('click', () => this.showJobDetails(item, index));
            item.addEventListener('mouseenter', () => this.highlightItem(item));
            item.addEventListener('mouseleave', () => this.resetHighlight(item));
        });
    }
    
    showJobDetails(item, index) {
        const jobTitle = item.getAttribute('data-job');
        const modal = this.createJobModal(jobTitle, item.querySelector('img').src);
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
    
    createJobModal(title, imageSrc) {
        const modal = document.createElement('div');
        modal.className = 'job-modal';
        modal.innerHTML = `
            <div class="job-modal-content">
                <span class="job-modal-close">&times;</span>
                <img src="${imageSrc}" alt="${title}">
                <h3>${title}</h3>
                <p>اكتشف كيف يمكن أن تبدو في هذه المهنة!</p>
                <a href="https://chatgpt.com/g/g-684d5e12d6a8819190a75b2499f8aabf-dream-job-galaxy" 
                   target="_blank" class="job-modal-cta">إنشاء صورتك المهنية</a>
            </div>
        `;
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('job-modal-close')) {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            }
        });
        
        return modal;
    }
    
    highlightItem(item) {
        this.items.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.style.opacity = '0.5';
                otherItem.style.transform = 'scale(0.95)';
            }
        });
        
        item.style.transform = 'scale(1.1) translateY(-10px)';
        item.style.zIndex = '10';
    }
    
    resetHighlight(item) {
        this.items.forEach(otherItem => {
            otherItem.style.opacity = '1';
            otherItem.style.transform = 'scale(1)';
            otherItem.style.zIndex = '1';
        });
    }
}

// Initialize gallery enhancer
new GalleryEnhancer();

// Advanced typing effect
class TypeWriter {
    constructor(element, texts, speed = 100, deleteSpeed = 50, pauseTime = 2000) {
        this.element = element;
        this.texts = Array.isArray(texts) ? texts : [texts];
        this.speed = speed;
        this.deleteSpeed = deleteSpeed;
        this.pauseTime = pauseTime;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }
    
    init() {
        this.element.classList.add('typing-cursor');
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.speed;
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize enhanced typing effect
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.title-main');
    if (heroTitle) {
        const texts = [
            'قصّر المشوار',
            'مهنة بالإيد ولا شهادة عالشجرة',
            'كـل شي بيـن إيديـك'
        ];
        new TypeWriter(heroTitle, texts, 150, 75, 2000);
    }
});

// Interactive background
class InteractiveBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    
    init() {
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        document.querySelector('.hero-background').appendChild(this.canvas);
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            const distance = Math.sqrt(
                Math.pow(particle.x - this.mouse.x, 2) + 
                Math.pow(particle.y - this.mouse.y, 2)
            );
            
            if (distance < 100) {
                particle.opacity = Math.min(1, particle.opacity + 0.02);
            } else {
                particle.opacity = Math.max(0.1, particle.opacity - 0.02);
            }
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize interactive background
if (window.innerWidth > 768) { // Only on desktop for performance
    new InteractiveBackground();
}

// Enhanced form validation
class FormValidator {
    constructor(form) {
        this.form = form;
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearError(field));
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'هذا الحقل مطلوب';
        } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            message = 'يرجى إدخال بريد إلكتروني صحيح';
        } else if (field.type === 'tel' && value && !this.isValidPhone(value)) {
            isValid = false;
            message = 'يرجى إدخال رقم هاتف صحيح';
        }
        
        this.showFieldError(field, isValid, message);
        return isValid;
    }
    
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    isValidPhone(phone) {
        return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 9;
    }
    
    showFieldError(field, isValid, message) {
        const errorElement = field.parentNode.querySelector('.field-error');
        
        if (!isValid) {
            if (!errorElement) {
                const error = document.createElement('div');
                error.className = 'field-error';
                error.textContent = message;
                field.parentNode.appendChild(error);
            } else {
                errorElement.textContent = message;
            }
            field.classList.add('error');
        } else {
            if (errorElement) {
                errorElement.remove();
            }
            field.classList.remove('error');
        }
    }
    
    clearError(field) {
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
        field.classList.remove('error');
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const fields = this.form.querySelectorAll('input, select, textarea');
        let isFormValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            this.submitForm();
        } else {
            this.showFormError('يرجى تصحيح الأخطاء أعلاه');
        }
    }
    
    submitForm() {
        const submitBtn = this.form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.innerHTML = '<div class="loading-spinner"></div>';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            this.showSuccessMessage();
            this.form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    showFormError(message) {
        const existingError = this.form.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
        
        const error = document.createElement('div');
        error.className = 'form-error';
        error.textContent = message;
        this.form.insertBefore(error, this.form.firstChild);
        
        setTimeout(() => error.remove(), 5000);
    }
    
    showSuccessMessage() {
        const success = document.createElement('div');
        success.className = 'success-message';
        success.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.</span>
        `;
        document.body.appendChild(success);
        
        setTimeout(() => {
            success.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            success.classList.remove('show');
            setTimeout(() => success.remove(), 300);
        }, 3000);
    }
}

// Initialize form validator
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        new FormValidator(contactForm);
    }

    // Countdown Timer
    const countdown = () => {
        const countToDate = new Date("2025-07-31T23:59:59").getTime();
        const now = new Date().getTime();
        const difference = countToDate - now;

        if (difference < 0) {
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
            if(interval) clearInterval(interval);
            // Optionally, hide or change the offer section
            const offerSection = document.getElementById('early-bird-offer');
            if(offerSection) {
                offerSection.innerHTML = '<div class="early-bird-content"><div class="early-bird-text"><h2 class="early-bird-title">انتهى العرض</h2><p class="early-bird-description">للأسف، لقد انتهى عرض التسجيل المبكر. ترقبوا عروضنا القادمة!</p></div></div>';
            }
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days < 10 ? '0' + days : days;
        document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
    };

    const interval = setInterval(countdown, 1000);
    countdown(); // initial call
});

// Add ripple effect to buttons
document.querySelectorAll('.cta-primary, .cta-secondary, .contact-btn, .raffle-cta, .submit-btn').forEach(button => {
    button.classList.add('ripple');
});

// Performance optimization
const optimizePerformance = () => {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduced-animations');
    }
    
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Initialize performance optimizations
optimizePerformance();

// === Raffle Details Modal ===
function showRaffleDetailsModal() {
    const modal = document.createElement('div');
    modal.className = 'job-modal';
    modal.innerHTML = `
        <div class="job-modal-content">
            <span class="job-modal-close">&times;</span>
            <h3 style="color:#7c3aed;">تفاصيل السحب</h3>
            <ul style="text-align:right; font-size:1.1rem; line-height:2; color:#333; margin-bottom:2rem;">
                <li>كل من يسجل في أحد برامج جلاكسي خلال فترة الحملة يدخل تلقائياً السحب.</li>
                <li>سيتم السحب على 10 أجهزة لابتوب حديثة.</li>
                <li>إعلان الفائزين سيتم في بث مباشر على صفحة جلاكسي على فيسبوك.</li>
                <li>يجب أن تكون بياناتك صحيحة وكاملة لضمان دخولك السحب.</li>
                <li>للاستفسار، تواصل معنا عبر الهاتف أو البريد الإلكتروني.</li>
            </ul>
            <button class="job-modal-cta" style="margin-top:1rem;" onclick="document.querySelector('.job-modal.show')?.classList.remove('show'); setTimeout(()=>{document.querySelector('.job-modal')?.remove();},300);">إغلاق</button>
        </div>
    `;
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('job-modal-close')) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    });
    document.body.appendChild(modal);
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Attach to raffle details button
const raffleDetailsBtn = document.querySelector('a[href="#raffle-details"]');
if (raffleDetailsBtn) {
    raffleDetailsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showRaffleDetailsModal();
    });
}
