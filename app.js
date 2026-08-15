/* ==========================================================================
   POOJA R - PREMIUM CINEMATIC DEVELOPER PORTFOLIO JAVASCRIPT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initParticleCanvas();
    initSkillFilter();
    initNavbarScroll();
    initMobileMenu();
    initScrollReveal();
    initHeroAnimations();
    init3DTilt();
    initResumeModal();
});

/* --------------------------------------------------------------------------
   1. CUSTOM GLOWING CURSOR
   -------------------------------------------------------------------------- */
function initCursor() {
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (!cursorDot || !cursorRing) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    function renderRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(renderRing);
    }
    renderRing();

    // Hover magnetic cursor effect on buttons and links
    const interactiveElements = document.querySelectorAll('a, button, .skill-pill, .skill-tab, .glass-panel');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.style.width = '54px';
            cursorRing.style.height = '54px';
            cursorRing.style.borderColor = 'rgba(212, 175, 55, 0.8)';
            cursorRing.style.backgroundColor = 'rgba(212, 175, 55, 0.05)';
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.style.width = '36px';
            cursorRing.style.height = '36px';
            cursorRing.style.borderColor = 'rgba(212, 175, 55, 0.4)';
            cursorRing.style.backgroundColor = 'transparent';
        });
    });
}

/* --------------------------------------------------------------------------
   2. ATMOSPHERIC PARTICLE CANVAS
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 2 + 0.5;
            this.vx = (Math.random() - 0.5) * 0.35;
            this.vy = (Math.random() - 0.5) * 0.35;
            this.alpha = Math.random() * 0.55 + 0.25;
            this.color = Math.random() > 0.35 ? '#d4af37' : '#ffffff';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

/* --------------------------------------------------------------------------
   3. HERO ENTRANCE & PARALLAX ANIMATION
   -------------------------------------------------------------------------- */
function initHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    const heroCharacter = document.querySelector('.hero-character-wrapper');

    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(25px)';
        heroContent.style.transition = 'opacity 1s ease 0.2s, transform 1s ease 0.2s';
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }

    if (heroCharacter) {
        heroCharacter.style.opacity = '0';
        heroCharacter.style.transform = 'scale(0.96) translateY(20px)';
        heroCharacter.style.transition = 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s';
        setTimeout(() => {
            heroCharacter.style.opacity = '1';
            heroCharacter.style.transform = 'scale(1) translateY(0)';
        }, 200);
    }
}

/* --------------------------------------------------------------------------
   4. INTERACTIVE SKILL CATEGORY FILTER
   -------------------------------------------------------------------------- */
function initSkillFilter() {
    const tabs = document.querySelectorAll('.skill-tab');
    const cards = document.querySelectorAll('.skill-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.getAttribute('data-cat');

            cards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   5. STICKY NAVBAR SCROLL
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* --------------------------------------------------------------------------
   6. MOBILE HAMBURGER MENU
   -------------------------------------------------------------------------- */
function initMobileMenu() {
    const burger = document.getElementById('hamburgerBtn');
    const menu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!burger || !menu) return;

    burger.addEventListener('click', () => {
        menu.classList.toggle('active');
        burger.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            burger.classList.remove('active');
        });
    });
}

/* --------------------------------------------------------------------------
   7. INTERSECTION OBSERVER SCROLL REVEALS
   -------------------------------------------------------------------------- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.section-title-large, .about-main-card, .project-card, .timeline-content, .edu-card, .cert-card, .contact-card-hero');

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   8. INTERACTIVE 3D PARALLAX CARD TILT
   -------------------------------------------------------------------------- */
function init3DTilt() {
    const wrapper = document.querySelector('.hero-character-wrapper');
    const frame = document.querySelector('.character-frame');

    if (!wrapper || !frame) return;

    wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        frame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    wrapper.addEventListener('mouseleave', () => {
        frame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
}

/* --------------------------------------------------------------------------
   9. RESUME & CONTACT MODAL ENGINE
   -------------------------------------------------------------------------- */
function initResumeModal() {
    const modal = document.getElementById('resumeModal');
    const requestBtn = document.getElementById('requestResumeBtn');
    const closeBtn = document.getElementById('closeModalBtn');
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const copyEmailText = document.getElementById('copyEmailText');

    if (!modal) return;

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (requestBtn) {
        requestBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    if (copyEmailBtn && copyEmailText) {
        copyEmailBtn.addEventListener('click', () => {
            const email = 'poojarudrappa123@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                const originalText = copyEmailText.textContent;
                copyEmailText.textContent = 'COPIED TO CLIPBOARD! ✓';
                copyEmailBtn.style.borderColor = 'rgba(34, 197, 94, 0.6)';
                copyEmailBtn.style.color = '#22c55e';

                setTimeout(() => {
                    copyEmailText.textContent = originalText;
                    copyEmailBtn.style.borderColor = '';
                    copyEmailBtn.style.color = '';
                }, 2200);
            }).catch(err => {
                console.error('Clipboard copy failed: ', err);
            });
        });
    }
}


