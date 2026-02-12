// ==================== //
// Mobile Menu Toggle & Overlay
// ==================== //
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navOverlay = document.querySelector('.nav-overlay');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      navOverlay.classList.toggle('active');
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', function() {
      mainNav.classList.remove('active');
      navOverlay.classList.remove('active');
    });
  }

  // Close menu when clicking on a menu link
  const menuLinks = document.querySelectorAll('.main-nav a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      mainNav.classList.remove('active');
      navOverlay.classList.remove('active');
    });
  });
});

// ==================== //
// Search Functionality
// ==================== //
let searchIndex = [];

// Load search index
fetch('/index.json')
  .then(response => response.json())
  .then(data => {
    searchIndex = data;
  })
  .catch(error => console.log('Search index not available'));

function initializeSearch(inputSelector, resultsSelector) {
  const searchInput = document.getElementById(inputSelector);
  const searchResults = document.getElementById(resultsSelector);

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase();

      if (query.length < 2) {
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
        return;
      }

      const results = searchIndex.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)))
      ).slice(0, 5);

      if (results.length > 0) {
        searchResults.innerHTML = results.map(item => `
          <a href="${item.permalink}" class="search-result-item">
            <strong>${item.title}</strong>
            <p>${item.content.substring(0, 100)}...</p>
          </a>
        `).join('');
        searchResults.style.display = 'block';
      } else {
        searchResults.innerHTML = '<div class="no-search-results">找不到相關結果</div>';
        searchResults.style.display = 'block';
      }
    });

    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
      }
    });
  }
}

// Initialize both search boxes
initializeSearch('search-input', 'search-results');
initializeSearch('search-input-mobile', 'search-results-mobile');

// ==================== //
// Map Initialization
// ==================== //

// Initialize main cafes map (homepage)
const cafesMapElement = document.getElementById('cafes-map');
if (cafesMapElement) {
  // Default center (Taiwan)
  const map = L.map('cafes-map').setView([25.033, 121.5654], 11);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  // Add markers from cafe data (this would be populated by Hugo)
  // Example: You'd pass cafe coordinates via data attributes
  const cafeMarkers = document.querySelectorAll('[data-lat][data-lng]');
  cafeMarkers.forEach(marker => {
    const lat = parseFloat(marker.dataset.lat);
    const lng = parseFloat(marker.dataset.lng);
    const title = marker.dataset.title || '咖啡店';
    const url = marker.dataset.url || '#';
    
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(`<strong>${title}</strong><br><a href="${url}">查看詳情</a>`);
  });
}

// Initialize single cafe map
const cafeMapElement = document.getElementById('cafe-map');
if (cafeMapElement) {
  const lat = parseFloat(cafeMapElement.dataset.lat);
  const lng = parseFloat(cafeMapElement.dataset.lng);
  const title = cafeMapElement.dataset.title;
  
  const map = L.map('cafe-map').setView([lat, lng], 15);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`<strong>${title}</strong>`)
    .openPopup();
}

// ==================== //
// Filter & Sort Functionality
// ==================== //
const regionFilter = document.getElementById('region-filter');
const styleFilter = document.getElementById('style-filter');
const priceFilter = document.getElementById('price-filter');
const sortFilter = document.getElementById('sort-filter');
const cafesGrid = document.getElementById('cafes-grid');
const noResults = document.getElementById('no-results');

function applyFiltersAndSort() {
  if (!cafesGrid) return;
  
  const selectedRegion = regionFilter ? regionFilter.value : '';
  const selectedStyle = styleFilter ? styleFilter.value : '';
  const selectedPrice = priceFilter ? priceFilter.value : '';
  const selectedSort = sortFilter ? sortFilter.value : 'date-desc';
  
  const cafeCards = Array.from(cafesGrid.querySelectorAll('.cafe-card'));
  
  // Filter
  let visibleCards = cafeCards.filter(card => {
    const region = card.dataset.region || '';
    const style = card.dataset.style || '';
    const price = card.dataset.price || '';
    
    const regionMatch = !selectedRegion || region === selectedRegion;
    const styleMatch = !selectedStyle || style === selectedStyle;
    const priceMatch = !selectedPrice || price === selectedPrice;
    
    return regionMatch && styleMatch && priceMatch;
  });
  
  // Sort
  visibleCards.sort((a, b) => {
    switch(selectedSort) {
      case 'date-desc':
        return new Date(b.dataset.date) - new Date(a.dataset.date);
      case 'date-asc':
        return new Date(a.dataset.date) - new Date(b.dataset.date);
      case 'rating-desc':
        return parseFloat(b.dataset.rating || 0) - parseFloat(a.dataset.rating || 0);
      case 'rating-asc':
        return parseFloat(a.dataset.rating || 0) - parseFloat(b.dataset.rating || 0);
      default:
        return 0;
    }
  });
  
  // Hide all cards first
  cafeCards.forEach(card => card.style.display = 'none');
  
  // Show filtered and sorted cards
  if (visibleCards.length > 0) {
    visibleCards.forEach(card => {
      card.style.display = 'block';
      cafesGrid.appendChild(card); // Re-append to change order
    });
    if (noResults) noResults.style.display = 'none';
  } else {
    if (noResults) noResults.style.display = 'block';
  }
}

function resetFilters() {
  if (regionFilter) regionFilter.value = '';
  if (styleFilter) styleFilter.value = '';
  if (priceFilter) priceFilter.value = '';
  if (sortFilter) sortFilter.value = 'date-desc';
  applyFiltersAndSort();
}

// Attach event listeners
if (regionFilter) regionFilter.addEventListener('change', applyFiltersAndSort);
if (styleFilter) styleFilter.addEventListener('change', applyFiltersAndSort);
if (priceFilter) priceFilter.addEventListener('change', applyFiltersAndSort);
if (sortFilter) sortFilter.addEventListener('change', applyFiltersAndSort);

// ==================== //
// Image Lazy Loading Enhancement
// ==================== //
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// ==================== //
// Gallery Lightbox (Simple)
// ==================== //
const galleryItems = document.querySelectorAll('.gallery-item img');
galleryItems.forEach(img => {
  img.addEventListener('click', function() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <img src="${this.src}" alt="${this.alt}">
      </div>
    `;
    document.body.appendChild(lightbox);
    
    // Add styles dynamically
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      cursor: pointer;
    `;
    
    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
      position: relative;
      max-width: 90%;
      max-height: 90%;
    `;
    
    const close = lightbox.querySelector('.lightbox-close');
    close.style.cssText = `
      position: absolute;
      top: -40px;
      right: 0;
      font-size: 40px;
      color: white;
      cursor: pointer;
    `;
    
    const imgElement = lightbox.querySelector('img');
    imgElement.style.cssText = `
      max-width: 100%;
      max-height: 90vh;
      border-radius: 10px;
    `;
    
    // Close on click
    lightbox.addEventListener('click', function() {
      document.body.removeChild(lightbox);
    });
  });
});

// ==================== //
// Smooth Scroll
// ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});
