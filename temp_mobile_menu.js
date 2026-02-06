
/**
 * Mobile Menu Logic
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.hero-sidebar'); // Logic for home
    // For other pages, we might check if sidebar-wrapper exists or create a mobile menu overlay

    // Determine target menu
    // On Homepage: .hero-sidebar acts as the mobile menu source?
    // User request: "Sidebar menu" not showing.
    // If not on home, we might need a dedicated mobile menu container.
    // But typically reuse .hero-sidebar content or .nav-links content.

    // Let's check if we have a generic mobile menu container
    let mobileMenu = document.querySelector('.mobile-menu-overlay');

    if (!mobileMenu) {
        // Create one if it doesn't exist (simpler for this fix)
        // Or reuse .hero-sidebar if present.
        if (sidebar) {
            // Homepage logic: reusing hero-sidebar as menu?
            // responsive.css says .hero-sidebar { display: none; /* Mobile Menu handles this */ }
            // So we probably clone it into a slide-out menu.
        } else {
            // Other pages
        }
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // User: "Bấm vào menu giờ lỗi không hiển thị thanh sidebar menu ra"
            // This implies there WAS a mechanism. responsive.css lines 16-18 hide .sidebar-wrapper.
            // But usually mobile menu shows .nav-links + .cat-list.

            // FIX: Create a simple slide-out menu combining Navbar Categories + Links
            toggleMobileMenu();
        });
    }

    function toggleMobileMenu() {
        // Check if existing overlay
        let overlay = document.querySelector('.mobile-menu-container');
        if (!overlay) {
            createMobileMenu();
            overlay = document.querySelector('.mobile-menu-container');
        }
        overlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    function createMobileMenu() {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-container';

        // Content from Categories
        const categories = document.querySelector('.cat-list') ? document.querySelector('.cat-list').innerHTML : '';
        // Content from Nav Links
        const navLinks = document.querySelector('.nav-links') ? document.querySelector('.nav-links').innerHTML : '';

        overlay.innerHTML = `
            <div class="mobile-menu-backdrop"></div>
            <div class="mobile-menu-content">
                <div class="mobile-menu-header">
                    <img src="assets/images/logo.png" alt="Logo" class="mobile-logo">
                    <button class="close-menu-btn"><i class="fa-solid fa-times"></i></button>
                </div>
                <div class="mobile-menu-body">
                    <div class="mobile-section">
                        <h3>Danh mục</h3>
                        <ul class="mobile-cat-list">${categories}</ul>
                    </div>
                    <div class="divider"></div>
                    <div class="mobile-section">
                        <h3>Menu</h3>
                        <ul class="mobile-nav-links">${navLinks}</ul>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Events
        overlay.querySelector('.mobile-menu-backdrop').addEventListener('click', toggleMobileMenu);
        overlay.querySelector('.close-menu-btn').addEventListener('click', toggleMobileMenu);
    }
}
