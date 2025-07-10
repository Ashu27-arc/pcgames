// Genre filtering functionality
function filterGamesByGenre(genre) {
    const gameCards = document.querySelectorAll('.game-card');
    const gamesHeader = document.querySelector('.games-header h2');
    let visibleGames = 0;

    // Update header with selected genre
    gamesHeader.textContent = genre.charAt(0).toUpperCase() + genre.slice(1) + ' Games';

    // Show/hide games based on genre
    gameCards.forEach(card => {
        const cardGenres = card.dataset.genre.split(' ');
        if (cardGenres.includes(genre.toLowerCase())) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease-in-out';
            visibleGames++;
        } else {
            card.style.display = 'none';
        }
    });

    // Show "no games found" message if necessary
    const noGamesMessage = document.querySelector('.no-games-message') || createNoGamesMessage();
    if (visibleGames === 0) {
        noGamesMessage.style.display = 'block';
    } else {
        noGamesMessage.style.display = 'none';
    }

    // Scroll to games section
    document.querySelector('.games-grid').scrollIntoView({ behavior: 'smooth' });

    // Update active state of genre links
    updateActiveGenre(genre);
}

function createNoGamesMessage() {
    const message = document.createElement('div');
    message.className = 'no-games-message';
    message.innerHTML = `
        <div class="no-games-content">
            <i class="fas fa-gamepad"></i>
            <h3>No Games Found</h3>
            <p>We couldn't find any games in this category.</p>
        </div>
    `;
    document.querySelector('.games-grid').appendChild(message);
    return message;
}

function updateActiveGenre(selectedGenre) {
    const genreLinks = document.querySelectorAll('.genre-list a');
    genreLinks.forEach(link => {
        const linkGenre = link.getAttribute('onclick').match(/'([^']+)'/)[1];
        if (linkGenre === selectedGenre) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Show all games function
function showAllGames() {
    const gameCards = document.querySelectorAll('.game-card');
    const gamesHeader = document.querySelector('.games-header h2');
    const noGamesMessage = document.querySelector('.no-games-message');

    gamesHeader.textContent = 'All Games';
    
    gameCards.forEach(card => {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.5s ease-in-out';
    });

    if (noGamesMessage) {
        noGamesMessage.style.display = 'none';
    }

    // Remove active state from all genre links
    document.querySelectorAll('.genre-list a').forEach(link => {
        link.classList.remove('active');
    });
}

// Search functionality
function searchGames() {
    const searchInput = document.querySelector('.search-container input');
    const searchTerm = searchInput.value.toLowerCase().trim();
    const gameCards = document.querySelectorAll('.game-card');
    const gamesHeader = document.querySelector('.games-header h2');
    let visibleGames = 0;

    // Update header
    gamesHeader.textContent = searchTerm ? `Search Results for "${searchTerm}"` : 'All Games';

    gameCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const genre = card.querySelector('.game-genre').textContent.toLowerCase();
        const description = card.querySelector('.game-description').textContent.toLowerCase();

        if (title.includes(searchTerm) || genre.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease-in-out';
            visibleGames++;
        } else {
            card.style.display = 'none';
        }
    });

    // Show "no games found" message if necessary
    const noGamesMessage = document.querySelector('.no-games-message') || createNoGamesMessage();
    if (visibleGames === 0) {
        noGamesMessage.style.display = 'block';
        noGamesMessage.querySelector('h3').textContent = 'No Games Found';
        noGamesMessage.querySelector('p').textContent = `No games match your search "${searchTerm}"`;
    } else {
        noGamesMessage.style.display = 'none';
    }

    // Scroll to games section
    document.querySelector('.games-grid').scrollIntoView({ behavior: 'smooth' });

    // Remove active state from genre links
    document.querySelectorAll('.genre-list a').forEach(link => {
        link.classList.remove('active');
    });
}

// Initialize when document loads
document.addEventListener('DOMContentLoaded', function() {
    // Add click handler for "All Games"
    const gamesHeader = document.querySelector('.games-header h2');
    if (gamesHeader) {
        gamesHeader.style.cursor = 'pointer';
        gamesHeader.addEventListener('click', showAllGames);
    }

    // Add search button click handler
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) searchBtn.addEventListener('click', searchGames);

    // Add search input enter key handler
    const searchInput = document.querySelector('.search-container input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchGames();
            }
        });
        // Add search input clear handler
        searchInput.addEventListener('input', function(e) {
            if (e.target.value === '') {
                showAllGames();
            }
        });
    }
});

// Initialize slider variables
let ashuCurrentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Function to show the current slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
    updateDots(index);
}

// Function to go to the next slide
function nextSlide() {
    ashuCurrentSlide = (ashuCurrentSlide + 1) % totalSlides; // Loop back to the first slide
    showSlide(ashuCurrentSlide);
}

// Function to go to the previous slide
function prevSlide() {
    ashuCurrentSlide = (ashuCurrentSlide - 1 + totalSlides) % totalSlides; // Loop back to the last slide
    showSlide(ashuCurrentSlide);
}

// Function to update dots
function updateDots(index) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
}

// Event listeners for slider buttons
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);

// Show the first slide initially
showSlide(ashuCurrentSlide);