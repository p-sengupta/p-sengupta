// Dark mode toggle component
function createDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'dark-mode-toggle';
    toggle.id = 'darkModeToggle';
    toggle.setAttribute('aria-label', 'Toggle dark mode');
    toggle.innerHTML = `
        <svg id="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg id="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    
    return toggle;
}

// Navigation component
function createNavigation(activePage = '') {
    const nav = document.createElement('nav');
    nav.className = 'nav';
    nav.setAttribute('aria-label', 'Primary');
    
    nav.innerHTML = `
        <div class="nav-inner">
            <ul class="nav-links" id="primaryNav">
                <li><a href="/" ${activePage === 'about' ? 'class="active"' : ''}>About</a></li>
                <li><a href="/cv/" ${activePage === 'cv' ? 'class="active"' : ''}>CV</a></li>
                <li><a href="/research/" ${activePage === 'research' ? 'class="active"' : ''}>Research</a></li>
                <li><a href="/teaching/" ${activePage === 'teaching' ? 'class="active"' : ''}>Teaching</a></li>
                <li><a href="/contact/" ${activePage === 'contact' ? 'class="active"' : ''}>Contact</a></li>
            </ul>
            <div class="nav-spacer"></div>
            <button class="hamburger" id="navToggle" aria-controls="primaryNav" aria-expanded="false" aria-label="Toggle navigation">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    `;
    
    return nav;
}

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const primaryNav = document.getElementById('primaryNav');
    
    if (!navToggle || !primaryNav) return;

    function closeOnOutsideClick(event) {
        if (!primaryNav.contains(event.target) && event.target !== navToggle && !navToggle.contains(event.target)) {
            primaryNav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
            document.removeEventListener('click', closeOnOutsideClick);
        }
    }

    navToggle.addEventListener('click', function() {
        const isOpen = primaryNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (isOpen) {
            setTimeout(function() { document.addEventListener('click', closeOnOutsideClick); }, 0);
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            primaryNav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Dark mode functionality
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    
    if (!darkModeToggle || !sunIcon || !moonIcon) return;

    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcons(savedTheme);

    darkModeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcons(newTheme);
    });

    function updateIcons(theme) {
        if (theme === 'dark') {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initDarkMode();
});
