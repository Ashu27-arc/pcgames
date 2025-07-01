// js/script.js

// Language translations
const translations = {
    en: {
        title: "PC Games",
        searchPlaceholder: "Search games...",
        home: "HOME",
        newGames: "NEW GAMES",
        topGames: "TOP GAMES",
        contact: "CONTACT US"
    },
    es: {
        title: "Juegos de PC",
        searchPlaceholder: "Buscar juegos...",
        home: "INICIO",
        newGames: "JUEGOS NUEVOS",
        topGames: "MEJORES JUEGOS",
        contact: "CONTÁCTENOS"
    },
    fr: {
        title: "Jeux PC",
        searchPlaceholder: "Rechercher des jeux...",
        home: "ACCUEIL",
        newGames: "NOUVEAUX JEUX",
        topGames: "MEILLEURS JEUX",
        contact: "NOUS CONTACTER"
    },
    de: {
        title: "PC-Spiele",
        searchPlaceholder: "Spiele suchen...",
        home: "STARTSEITE",
        newGames: "NEUE SPIELE",
        topGames: "TOP SPIELE",
        contact: "KONTAKT"
    }
};

// Function to change the language
function changeLanguage(event) {
    const selectedLanguage = event.target.value;
    const translation = translations[selectedLanguage];

    // Update the title and search placeholder
    document.querySelector('.logo h1').textContent = translation.title;
    const searchInput = document.querySelector('.search-container input');
    if (searchInput) {
        searchInput.placeholder = translation.searchPlaceholder;
    }

    // Update navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    if (navLinks.length > 0) {
        navLinks[0].textContent = translation.home;
        navLinks[1].textContent = translation.newGames;
        navLinks[2].textContent = translation.topGames;
        navLinks[3].textContent = translation.contact;
    }
}

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;
    let isMenuOpen = false;
    
    // Make sure elements exist
    if (!menuToggle || !navLinks || !menuOverlay) {
        console.error('Required elements not found for mobile menu');
        return;
    }

    // Toggle menu function
    function toggleMenu() {
        if (isMenuOpen) {
            closeMenu();
            return;
        }
        
        // Open menu
        isMenuOpen = true;
        menuToggle.classList.add('active');
        body.classList.add('menu-open');
        
        // Show overlay and force reflow
        menuOverlay.style.display = 'block';
        void menuOverlay.offsetWidth;
        
        // Add active class to start transitions
        menuOverlay.classList.add('active');
        navLinks.classList.add('active');
        
        menuToggle.setAttribute('aria-expanded', 'true');
        navLinks.setAttribute('aria-hidden', 'false');
        
        // Disable body scroll
        document.documentElement.style.overflow = 'hidden';
        document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
        
        // Add event listeners
        document.addEventListener('keydown', handleKeyDown);
        
        // Set focus to first nav item when menu opens
        setTimeout(() => {
            const firstNavItem = navLinks.querySelector('a, button, [tabindex="0"]');
            if (firstNavItem) {
                firstNavItem.focus();
            }
        }, 100);
    }

    // Handle keyboard navigation
    function handleKeyDown(e) {
        // Close menu on Escape key
        if (e.key === 'Escape' || e.key === 'Esc') {
            e.preventDefault();
            closeMenu();
            return;
        }
        
        // Only handle tab key when menu is open
        if (!isMenuOpen) return;
        
        const focusableElements = Array.from(navLinks.querySelectorAll('a, button, [tabindex="0"]'));
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement;
        
        // If tabbing forward from last element, go to first
        if (e.key === 'Tab' && !e.shiftKey && activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
        // If shift+tabbing from first element, go to last
        else if (e.key === 'Tab' && e.shiftKey && activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        }
        // If tab focus leaves the menu, bring it back in
        else if (e.key === 'Tab' && !navLinks.contains(activeElement)) {
            e.preventDefault();
            if (e.shiftKey) {
                lastElement.focus();
            } else {
                firstElement.focus();
            }
        }
    }

    // Close menu function
    function closeMenu() {
        if (!isMenuOpen) return;
        
        isMenuOpen = false;
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        navLinks.classList.remove('active');
        
        // Wait for the transition to complete before hiding the overlay
        setTimeout(() => {
            menuOverlay.style.display = 'none';
        }, 300); // Match this with your CSS transition duration
        
        body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('aria-hidden', 'true');
        
        // Re-enable body scroll and reset padding
        document.documentElement.style.overflow = '';
        document.body.style.paddingRight = '';
        
        // Set focus back to menu toggle button
        menuToggle.focus();
    }

    // Close menu when clicking outside
    function handleClickOutside(e) {
        if (isMenuOpen && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.menu-toggle') &&
            !e.target.closest('.menu-overlay')) {
            closeMenu();
        }
    }

    // Close menu when a nav link is clicked
    function handleNavLinkClick(e) {
        // Only close if it's not a dropdown toggle or submenu link
        if (!e.target.closest('.dropdown') && !e.target.closest('.submenu')) {
            closeMenu();
        }
    }

    // Initialize the mobile menu
    function initMobileMenu() {
        if (!menuToggle || !navLinks) return;
        
        // Set initial ARIA attributes and variables
        let resizeTimer;
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-controls', 'main-navigation');
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        navLinks.setAttribute('aria-hidden', 'true');
        navLinks.setAttribute('aria-label', 'Main navigation');
        
        // Add event listeners with proper cleanup
        function setupEventListeners() {
            // Toggle menu on button click
            menuToggle.addEventListener('click', handleMenuToggle, false);
            
            // Close when clicking overlay
            menuOverlay.addEventListener('click', closeMenu, false);
            
            // Close when clicking outside
            document.addEventListener('click', handleClickOutside, false);
            
            // Close when clicking a nav link
            const navLinksList = navLinks.querySelectorAll('a');
            navLinksList.forEach(link => {
                link.addEventListener('click', handleNavLinkClick, false);
                // Add keyboard navigation support
                link.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            });
            
            // Close menu on window resize (for when switching to desktop)
            window.addEventListener('resize', handleResize, false);
            
            // Handle keyboard navigation in the menu
            navLinks.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeMenu();
                }
            });
        }
        
        // Handle menu toggle
        function handleMenuToggle(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        }
        
        // Handle window resize
        function handleResize() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 768 && isMenuOpen) {
                    closeMenu();
                }
            }, 250);
        }
        
        // Initialize
        setupEventListeners();
    }

    // Initialize the mobile menu
    initMobileMenu();
});

// Slider functionality
let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    if (slides.length === 0) return;
    
    slides.forEach(slide => slide.classList.remove('active'));
    if (dots.length > 0) {
        dots.forEach(dot => dot.classList.remove('active'));
    }
    
    currentSlide = (index + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startSlider() {
    if (slides.length > 0) {
        slideInterval = setInterval(nextSlide, 5000);
    }
}

function stopSlider() {
    clearInterval(slideInterval);
}

// Initialize slider if slides exist
if (slides.length > 0) {
    showSlide(0);
    startSlider();

    // Pause slider on hover
    const slider = document.querySelector('.slider-container');
    if (slider) {
        slider.addEventListener('mouseenter', stopSlider);
        slider.addEventListener('touchstart', stopSlider);
        slider.addEventListener('mouseleave', startSlider);
        slider.addEventListener('touchend', startSlider);
    }

    // Event listeners for slider navigation
    const nextBtn = document.querySelector('.slider-btn.next');
    const prevBtn = document.querySelector('.slider-btn.prev');
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Click on dot to navigate to specific slide
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });
    }
}

// Filter games by genre
function filterGamesByGenre(genre) {
    const games = document.querySelectorAll('.game-card');
    if (games.length === 0) return;
    
    games.forEach(game => {
        if (genre === 'all' || game.dataset.genre.includes(genre)) {
            game.style.display = 'block';
        } else {
            game.style.display = 'none';
        }
    });
    
    // Scroll to games section after filtering
    const gamesSection = document.querySelector('.games-grid');
    if (gamesSection) {
        gamesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Show bookmarks (placeholder function)
function showBookmarks() {
    alert('Bookmarks feature coming soon!');
}

// Close mobile menu on window resize if it becomes desktop view
function handleResize() {
    if (window.innerWidth > 768) {
        if (menuToggle) menuToggle.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
        body.classList.remove('menu-open');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }
}

// Add event listener for window resize
window.addEventListener('resize', handleResize);

// Initialize tooltips and other accessibility features
document.addEventListener('DOMContentLoaded', function() {
    // Add aria-labels to elements with data-tooltip
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.setAttribute('aria-label', tooltip.getAttribute('data-tooltip'));
    });

    // Add skip to content link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add focus styles for keyboard navigation
    document.body.addEventListener('keyup', function(e) {
        if (e.key === 'Tab') {
            document.documentElement.classList.add('keyboard-focus');
        }
    });

    document.body.addEventListener('mousedown', function() {
        document.documentElement.classList.remove('keyboard-focus');
    });

    // Initialize language selector
    const languageSelect = document.getElementById('language');
    if (languageSelect) {
        languageSelect.addEventListener('change', changeLanguage);
    }
});