// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add scroll reveal animation to project cards
const projectCards = document.querySelectorAll('.project-card');
const skillItems = document.querySelectorAll('.skill-item');

const revealElement = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(revealElement, {
    root: null,
    threshold: 0.3,
});

projectCards.forEach(card => observer.observe(card));
skillItems.forEach(item => observer.observe(item));

// Mobile navigation toggle
const createMobileNav = () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (!document.querySelector('.mobile-nav-toggle')) {
        const mobileNavToggle = document.createElement('button');
        mobileNavToggle.classList.add('mobile-nav-toggle');
        mobileNavToggle.innerHTML = '<span></span><span></span><span></span>';
        nav.insertBefore(mobileNavToggle, navLinks);

        mobileNavToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileNavToggle.classList.toggle('active');
        });
    }
};

// Initialize mobile navigation on load and resize
window.addEventListener('load', createMobileNav);
window.addEventListener('resize', createMobileNav); 