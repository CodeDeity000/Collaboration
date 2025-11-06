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

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for animations
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

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Animate stats numbers
const animateNumber = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '') + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '') + (element.textContent.includes('+') ? '+' : '');
        }
    }, 30);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number) {
                    animateNumber(statNumber, number);
                }
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// Time bar animation
const timeBarsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const timeFill = entry.target.querySelector('.time-fill');
            if (timeFill) {
                const width = timeFill.style.width;
                timeFill.style.width = '0';
                setTimeout(() => {
                    timeFill.style.width = width;
                }, 100);
            }
            timeBarsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.time-item').forEach(item => {
    timeBarsObserver.observe(item);
});

// Add active class to nav links on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Form submission (if you add a contact form later)
document.addEventListener('DOMContentLoaded', () => {
    console.log('Website loaded successfully!');
    loadTestimonials();
});

// Testimonials Data - Showcasing Advantages and Achievements
const testimonialsData = [
    {
        name: "Michael Johnson",
        role: "Senior Full-Stack Developer",
        location: "United States",
        duration: "Partner since 2023",
        achievement: "300% Income Increase",
        quote: "Before joining this collaboration, I was struggling to find quality projects while managing my full-time job. Now, I'm earning 3x more than before with minimal time investment. The team handles everything—bidding, client communication, and project delivery. I just oversee finances and receive regular income. It's been life-changing!",
        metrics: {
            income: "+300%",
            projects: "45+",
            time: "2 hrs/month"
        },
        rating: 5
    },
    {
        name: "Juan dela Cruz",
        role: "Junior Frontend Developer",
        location: "Philippines",
        duration: "Partner since 2024",
        achievement: "Account Growth Success",
        quote: "As a junior developer, I had a hard time competing for projects. Through this collaboration, my account has grown tremendously. I've received 25+ projects in just 6 months, and my profile rating went from 4.2 to 4.9 stars. The best part? I'm learning from their proven strategies while earning passive income.",
        metrics: {
            income: "+250%",
            projects: "25+",
            rating: "4.9★"
        },
        rating: 5
    },
    {
        name: "David Williams",
        role: "Non-Technical Professional",
        location: "United Kingdom",
        duration: "Partner since 2023",
        achievement: "Passive Income Stream",
        quote: "I'm not a developer, but I had a freelancing account from previous projects. This collaboration turned it into a reliable passive income source. I earn $2,500+ monthly without doing any work. The team is professional, transparent, and always keeps me informed. Highly recommend!",
        metrics: {
            income: "$2,500+/mo",
            projects: "30+",
            time: "1 hr/month"
        },
        rating: 5
    },
];

// Load and render testimonials
function loadTestimonials() {
    const container = document.getElementById('testimonials-container');
    if (!container) return;

    container.innerHTML = testimonialsData.map(testimonial => `
        <div class="testimonial-card">
            <div class="testimonial-header">
                <div class="testimonial-achievement">
                    <span class="achievement-badge">${testimonial.achievement}</span>
                </div>
                <div class="testimonial-rating">
                    ${'★'.repeat(testimonial.rating)}
                </div>
            </div>
            <div class="testimonial-content">
                <p class="testimonial-quote">"${testimonial.quote}"</p>
            </div>
            <div class="testimonial-metrics">
                ${Object.entries(testimonial.metrics).map(([key, value]) => `
                    <div class="metric-item">
                        <span class="metric-value">${value}</span>
                        <span class="metric-label">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="testimonial-footer">
                <div class="testimonial-author">
                    <div class="author-name">${testimonial.name}</div>
                    <div class="author-details">
                        <span class="author-role">${testimonial.role}</span>
                        <span class="author-location">${testimonial.location}</span>
                    </div>
                </div>
                <div class="testimonial-duration">${testimonial.duration}</div>
            </div>
        </div>
    `).join('');
}

