/* ==========================================================================
   1. INITIALISATION DES ICONES & CONFIGURATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Initialise le set d'icônes Lucide de manière uniforme sur toute la page
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    initNavigation();
    initFAQ();
    initScrollAnimations();
});

/* ==========================================================================
   2. GESTION DE LA NAVIGATION (SMOOTH SCROLL & MENU BURGER)
   ========================================================================== */
function initNavigation() {
    const burgerMenu = document.querySelector('.burger-menu');
    const closeMenu = document.querySelector('.close-menu');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');

    // Ouvrir le volet mobile
    if (burgerMenu && navMenu) {
        burgerMenu.addEventListener('click', () => {
            navMenu.classList.add('nav-open');
        });
    }

    // Fermer le volet mobile via la croix "X"
    if (closeMenu && navMenu) {
        closeMenu.addEventListener('click', () => {
            navMenu.classList.remove('nav-open');
        });
    }

    // Fermer le volet lorsqu'on clique sur un lien de section
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('nav-open');
        });
    });

    // Rendre le header fixe et persistant au scroll avec une ombre douce
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
}

/* ==========================================================================
   3. ACCORDÉONS DE LA FAQ FLUIDES
   ========================================================================== */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');

        if (trigger && content) {
            trigger.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Ferme toutes les autres questions ouvertes (Comportement exclusif)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-content').style.maxHeight = null;
                    }
                });

                // Alterne l'état de l'élément cliqué
                if (isActive) {
                    item.classList.remove('active');
                    content.style.maxHeight = null;
                } else {
                    item.classList.add('active');
                    // Calcule dynamiquement la hauteur réelle du contenu textuel
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        }
    });
}

/* ==========================================================================
   4. ANIMATIONS D'APPARITION (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollAnimations() {
    // Configuration de l'observer : déclenche l'animation quand 10% de l'élément est visible
    const animationOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajoute la classe qui déclenche la transition CSS
                entry.target.classList.add('reveal-visible');
                // Désactive l'observation de cet élément pour ne jouer l'animation qu'une seule fois
                observer.unobserve(entry.target);
            }
        });
    }, animationOptions);

    // Cibles à animer : On applique l'observation sur les grandes structures de cartes et de sections
    const elementsToAnimate = document.querySelectorAll(
        '.hero-content, .hero-image-wrapper, .benefit-card, .benefits-image, .step-item, .price-card, .faq-item, .contact-card'
    );

    elementsToAnimate.forEach(element => {
        // On injecte la classe CSS de base d'animation de manière logicielle
        element.classList.add('reveal-effect');
        animationObserver.observe(element);
    });
}

/* ==========================================================================
   5. GESTION DU BOUTON BACK TO TOP
   ========================================================================== */
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        // Apparaît si on défile de plus de 400px
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('scroll-visible');
        } else {
            backToTopBtn.classList.remove('scroll-visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}