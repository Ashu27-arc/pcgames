// js/script.js

// Language translations
const translations = {
    en: {
        title: "PC Games",
        searchPlaceholder: "Search games...",
        // Add more translations as needed
    },
    es: {
        title: "Juegos de PC",
        searchPlaceholder: "Buscar juegos...",
        // Add more translations as needed
    },
    fr: {
        title: "Jeux PC",
        searchPlaceholder: "Rechercher des jeux...",
        // Add more translations as needed
    },
    de: {
        title: "PC-Spiele",
        searchPlaceholder: "Spiele suchen...",
        // Add more translations as needed
    }
};

// Function to change the language
function changeLanguage(event) {
    const selectedLanguage = event.target.value;
    const translation = translations[selectedLanguage];

    // Update the title and search placeholder
    document.querySelector('.logo h1').textContent = translation.title;
    document.querySelector('.search-container input').placeholder = translation.searchPlaceholder;
    // Update other elements as needed
}

// Existing code... 